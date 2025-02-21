"use server";

import { neon } from "@neondatabase/serverless";
import { revalidatePath } from "next/cache";
import { FIRST_ROW, ERROR_MESSAGES, DEFAULT_POSITION, POSITION_INCREMENT, HOME_PATH } from "../_contants";

export async function createTask(id: string, formData: FormData) {
    const inputValue = formData.get("content")?.toString().trim();

    if (!inputValue) {
        return {
            message: ERROR_MESSAGES.NAME_REQUIRED,
            errors: { name: ERROR_MESSAGES.EMPTY_NAME },
        };
    }

    try {
        const sql = neon(process.env.DATABASE_URL!);

        const result = await sql`
            SELECT COALESCE(MAX(position), 0) AS max_position FROM tasks;
        `;
        const maxPosition = result[FIRST_ROW]?.max_position ?? DEFAULT_POSITION;
        const lastPosition = maxPosition + POSITION_INCREMENT;

        await sql`
            INSERT INTO tasks (content, dashboard_id, position)
            VALUES (${inputValue}, ${id}, ${lastPosition});
        `;
    } catch (error) {
        console.error(ERROR_MESSAGES.CREATE_FAIL, error);
        return {
            message: ERROR_MESSAGES.CREATE_FAIL,
            errors: { name: ERROR_MESSAGES.CREATE_FAIL_RETRY },
        };
    }
    revalidatePath(HOME_PATH);
}

export async function editTask(id: string, initialPosition: number, formData: FormData) {
    const newContent = formData.get("content")?.toString().trim();

    if (!newContent) {
        return {
            message: ERROR_MESSAGES.NAME_REQUIRED,
            errors: { name: ERROR_MESSAGES.EMPTY_NAME },
        };
    }

    try {
        const sql = neon(process.env.DATABASE_URL!);

        await sql`
            UPDATE tasks
            SET content = ${newContent}, position = ${initialPosition}
            WHERE id = ${id};
        `
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
    const sql = neon(process.env.DATABASE_URL!);

    await sql`DELETE FROM tasks WHERE id = ${id}`;

    revalidatePath(HOME_PATH);
}