"use server";

import supabase from "./supabaseClient";
import { HOME_PATH } from "../_constants";
import { revalidatePath } from "next/cache";
import { DashboardWithTask, Task } from "../_types/dashboardType";

export async function updateDashBoardPosition(
    updatedDashBoards: DashboardWithTask[]
) {

    const updates = updatedDashBoards.map((dashboard, index) => ({
        id: dashboard.id,
        name: dashboard.name,
        position: index,
    }));

    const { error: updateError } = await supabase
        .from("dashboards")
        .upsert(updates, { onConflict: "id" });

    if (updateError) return;

    revalidatePath(HOME_PATH);
}

export async function updateTaskPosition(
    fromDashboardId: string,
    toDashboardId: string,
    fromTasks: Task[],
    toTasks: Task[]
) {
    if (fromDashboardId === toDashboardId) {
        const updates = fromTasks.map((task, index) => ({
            id: task.id,
            content: task.content,
            position: index,
            dashboard_id: fromDashboardId,
        }));

        const { error: updateError } = await supabase
            .from("tasks")
            .upsert(updates, { onConflict: "id" });

        if (updateError) throw updateError;
    } 
    else {
        const fromUpdates = fromTasks.map((task, index) => ({
            id: task.id,
            content: task.content,
            position: index,
            dashboard_id: fromDashboardId,
        }));

        const toUpdates = toTasks.map((task, index) => ({
            id: task.id,
            content: task.content,
            position: index,
            dashboard_id: toDashboardId,
        }));

        const { error: updateError } = await supabase
            .from("tasks")
            .upsert([...fromUpdates, ...toUpdates], { onConflict: "id" });

        if (updateError) throw updateError;
    }

    revalidatePath(HOME_PATH);
}