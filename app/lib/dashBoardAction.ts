"use server";

import supabase from "./supabaseClient";
import { revalidatePath } from "next/cache";
import {
    FIRST_ROW,
    ERROR_MESSAGES,
    DEFAULT_POSITION,
    POSITION_INCREMENT,
    HOME_PATH,
} from "../_constants";

export async function createDashboard(formData: FormData) {
    const inputValue = formData.get("name")?.toString().trim();

    if (!inputValue) {
        return {
            message: ERROR_MESSAGES.NAME_REQUIRED,
            errors: { name: ERROR_MESSAGES.EMPTY_NAME },
        };
    }

    try {
        const { data, error: fetchError } = await supabase
            .from("dashboards")
            .select("position")
            .order("position", { ascending: false })
            .limit(1);

        if (fetchError) throw fetchError;

        const maxPosition = data?.[FIRST_ROW]?.position ?? DEFAULT_POSITION;
        const lastPosition = maxPosition + POSITION_INCREMENT;

        const { error: insertError } = await supabase
            .from("dashboards")
            .insert([{ name: inputValue, position: lastPosition }]);

        if (insertError) throw insertError;
    } catch (error) {
        console.error(ERROR_MESSAGES.CREATE_FAIL, error);
        return {
            message: ERROR_MESSAGES.CREATE_FAIL,
            errors: { name: ERROR_MESSAGES.CREATE_FAIL_RETRY },
        };
    }
    revalidatePath(HOME_PATH);
}

export async function editDashboard(
    id: string,
    initialPosition: number,
    formData: FormData
) {
    const newInputValue = formData.get("name")?.toString().trim();

    if (!newInputValue) {
        return {
            message: ERROR_MESSAGES.NAME_REQUIRED,
            errors: { name: ERROR_MESSAGES.EMPTY_NAME },
        };
    }

    try {
        const { error: updateError } = await supabase
            .from("dashboards")
            .update({ name: newInputValue, position: initialPosition })
            .eq("id", id);

        if (updateError) throw updateError;
    } catch (error) {
        console.error(ERROR_MESSAGES.EDIT_FAIL, error);
        return {
            message: ERROR_MESSAGES.EDIT_FAIL,
            errors: { name: ERROR_MESSAGES.EDIT_FAIL_RETRY },
        };
    }
    revalidatePath(HOME_PATH);
}

export async function deleteDashboard(id: string, deletePosition: number) {
    await supabase
        .from("tasks")
        .delete()
        .eq("dashboard_id", id);

    await supabase
        .from("dashboards")
        .delete()
        .eq("id", id);
    
    const { data: dashboards, error: fetchError } = await supabase
    .from("dashboards")
    .select("*")
    .gt("position", deletePosition)
    .order("position", { ascending: true });
    
    if (fetchError || !dashboards?.length) {
        revalidatePath(HOME_PATH);
        return;
    }
    
    const updates = dashboards.map(dashboard => ({
        id: dashboard.id,
        name: dashboard.name,
        position: dashboard.position - 1,
    }));

    const { error: updateError } = await supabase
        .from("dashboards")
        .upsert(updates, { onConflict: "id" });

    if (updateError) throw updateError;

    revalidatePath(HOME_PATH);
}
