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
export async function createTask(dashBoardId: string, formData: FormData) {
    const inputValue = formData.get("content")?.toString().trim();

    if (!inputValue) {
        return {
            message: ERROR_MESSAGES.NAME_REQUIRED,
            errors: { name: ERROR_MESSAGES.EMPTY_NAME },
        };
    }

    try {
        const { data } = await supabase
            .from("tasks")
            .select("*")
            .eq("dashboard_id", dashBoardId)
            .order("position", { ascending: false })
            .limit(1);

        const maxPosition = data?.[FIRST_ROW]?.position ?? DEFAULT_POSITION;
        const lastPosition = maxPosition + POSITION_INCREMENT;

        await supabase.from("tasks").insert([
            {
                content: inputValue,
                dashboard_id: dashBoardId,
                position: lastPosition,
            },
        ]);

    } catch (error) {
        console.error(ERROR_MESSAGES.CREATE_FAIL, error);
        return {
            message: ERROR_MESSAGES.CREATE_FAIL,
            errors: { name: ERROR_MESSAGES.CREATE_FAIL_RETRY },
        };
    }
    revalidatePath(HOME_PATH);
}

export async function editTask(
    taskId: string,
    initialPosition: number,
    formData: FormData
) {
    const newContent = formData.get("content")?.toString().trim();

    if (!newContent) {
        return {
            message: ERROR_MESSAGES.NAME_REQUIRED,
            errors: { name: ERROR_MESSAGES.EMPTY_NAME },
        };
    }

    try {
        const { error: updateError } = await supabase
            .from("tasks")
            .update({ content: newContent, position: initialPosition })
            .eq("id", taskId);

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

export async function deleteTask(id: string, deletePosition: number, dashBoardId: string) {
    const { error: deleteError } = await supabase
        .from("tasks")
        .delete()
        .eq("id", id);

    if (deleteError) throw deleteError;

    const { data: tasks, error: fetchError } = await supabase
        .from("tasks")
        .select("id, position")
        .eq("dashboard_id", dashBoardId) 
        .gt("position", deletePosition) 
        .order("position", { ascending: true });

    if (fetchError || !tasks?.length) {
        revalidatePath(HOME_PATH);
        return;   
    }

    const updates = tasks.map(task => ({
        id: task.id,
        position: task.position - 1,
    }));

    const { error: updateError } = await supabase
        .from("tasks")
        .upsert(updates, { onConflict: "id" });

    if (updateError) throw updateError;

    revalidatePath(HOME_PATH);
}