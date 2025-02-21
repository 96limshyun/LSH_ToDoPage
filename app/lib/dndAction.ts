"use server";

import supabase from "./supabaseClient";
import { HOME_PATH } from "../_contants";
import { revalidatePath } from "next/cache";
import { DND_Result } from "../_types/dndType";

export async function updateDashBoardPosition(result: DND_Result) {
    if (!result.destination) return;

    const { source, destination } = result;
    const fromIndex = source.index;
    const toIndex = destination.index;

    const { data: currentDashboards, error: fetchError } = await supabase
        .from("dashboards")
        .select("*") 
        .order("position", { ascending: true });

    if (fetchError || !currentDashboards?.length) return;

    const movingDashboard = currentDashboards[fromIndex];

    if (!movingDashboard) return;

    const filteredDashboards = currentDashboards.filter((_, index) => index !== fromIndex);
    filteredDashboards.splice(toIndex, 0, movingDashboard);

    const updates = filteredDashboards.map((dashboard, index) => ({
        id: dashboard.id,
        name: dashboard.name,
        position: index + 1,
    }));

    const { error: updateError } = await supabase
        .from("dashboards")
        .upsert(updates, { onConflict: "id" });

    if (updateError) return

    revalidatePath(HOME_PATH);
}

export async function updateTaskPosition(result: DND_Result) {
    if (!result.destination) return;

    const { draggableId: taskId, source, destination } = result;
    const fromDashboardId = source.droppableId;
    const toDashboardId = destination.droppableId;
    const newIndex = destination.index;

    const { data: currentTasks, error: fetchError } = await supabase
        .from("tasks")
        .select("id, position")
        .eq("dashboard_id", toDashboardId)
        .order("position", { ascending: true });

    if (fetchError) return;

    if (fromDashboardId === toDashboardId) {
        const filteredTasks = currentTasks.filter((task) => task.id !== taskId);
        filteredTasks.splice(newIndex, 0, { id: taskId, position: newIndex });

        const updates = filteredTasks.map((task, index) => ({
            id: task.id,
            position: index,
        }));

        const { error: updateError } = await supabase
            .from("tasks")
            .upsert(updates, { onConflict: "id" });

        if (updateError) return;
    } else {
        await supabase.rpc("decrement_task_position", { from_dashboard_id: fromDashboardId, from_index: source.index });

        await supabase.rpc("increment_task_position", { to_dashboard_id: toDashboardId, new_index: newIndex });

        const { error: moveError } = await supabase
            .from("tasks")
            .update({ dashboard_id: toDashboardId, position: newIndex })
            .eq("id", taskId);

        if (moveError) return;
    }

    revalidatePath(HOME_PATH);
}
