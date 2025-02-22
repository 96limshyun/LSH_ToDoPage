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
export async function createTask(id: string, formData: FormData) {
    const inputValue = formData.get("content")?.toString().trim();

    if (!inputValue) {
        return {
            message: ERROR_MESSAGES.NAME_REQUIRED,
            errors: { name: ERROR_MESSAGES.EMPTY_NAME },
        };
    }

    try {
        const { data, error: fetchError } = await supabase
            .from("tasks")
            .select("position")
            .order("position", { ascending: false })
            .limit(1);

        if (fetchError) throw fetchError;

        const maxPosition = data?.[FIRST_ROW]?.position ?? DEFAULT_POSITION;
        const lastPosition = maxPosition + POSITION_INCREMENT;

        const { error: insertError } = await supabase.from("tasks").insert([
            {
                content: inputValue,
                dashboard_id: id,
                position: lastPosition,
            },
        ]);

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

export async function editTask(
    id: string,
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

export async function deleteTask(id: string) {
    const { error: deleteError } = await supabase
        .from("tasks")
        .delete()
        .eq("id", id);

    if (deleteError) throw deleteError;
    revalidatePath(HOME_PATH);
}
