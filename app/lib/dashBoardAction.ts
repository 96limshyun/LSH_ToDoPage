"use server";

import { neon } from "@neondatabase/serverless";
import { State } from "../_types";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { FIRST_ROW, ERROR_MESSAGES, DEFAULT_POSITION, POSITION_INCREMENT, HOME_PATH } from "../_contants";

export async function createDashboard(prevState: State, formData: FormData) {
    const inputValue = formData.get("name")?.toString().trim();

    if (!inputValue) {
        return {
            message: ERROR_MESSAGES.NAME_REQUIRED,
            errors: { name: ERROR_MESSAGES.EMPTY_NAME },
        };
    }

    try {
        const sql = neon(process.env.DATABASE_URL!);

        const result = await sql`
            SELECT COALESCE(MAX(position), 0) AS max_position FROM dashboards;
        `;
        const maxPosition = result[FIRST_ROW]?.max_position ?? DEFAULT_POSITION;
        const lastPosition = maxPosition + POSITION_INCREMENT;

        await sql`
            INSERT INTO dashboards (name, position)
            VALUES (${inputValue}, ${lastPosition});
        `;
    } catch (error) {
        console.error(ERROR_MESSAGES.CREATE_FAIL, error);
        return {
            message: ERROR_MESSAGES.CREATE_FAIL,
            errors: { name: ERROR_MESSAGES.CREATE_FAIL_RETRY },
        };
    }
    revalidatePath(HOME_PATH);
    redirect(HOME_PATH);
}

export async function editDashboard(id: string, initialPosition: number, formData: FormData) {
    const newInputValue = formData.get("name")?.toString().trim();

    if (!newInputValue) {
        return {
            message: ERROR_MESSAGES.NAME_REQUIRED,
            errors: { name: ERROR_MESSAGES.EMPTY_NAME },
        };
    }

    try {
        const sql = neon(process.env.DATABASE_URL!);

        await sql`
            UPDATE dashboards
            SET name = ${newInputValue}, position = ${initialPosition}
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
    redirect(HOME_PATH);
}

export async function deleteDashboard(id: string) {
    const sql = neon(process.env.DATABASE_URL!);

    await sql`DELETE FROM dashboards WHERE id = ${id}`;
    revalidatePath(HOME_PATH);
    redirect(HOME_PATH);
}