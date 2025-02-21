"use server";
import { neon } from "@neondatabase/serverless";
import { HOME_PATH } from "../_contants";
import { revalidatePath } from "next/cache";
import { DND_Result } from "../_types/dndType";


export async function updateDashBoardPosition(result: DND_Result) {
    if (!result.destination) return;

    const sql = neon(process.env.DATABASE_URL!);
    const { source, destination } = result;
    const fromIndex = source.index;
    const toIndex = destination.index;

    const currentDashboards = await sql`
        SELECT id, position FROM dashboards ORDER BY position ASC;
    `;

    if (!currentDashboards.length) return;

    const movingDashboard = currentDashboards[fromIndex];

    if (!movingDashboard) return;

    const filteredDashboards = currentDashboards.filter((_, index) => index !== fromIndex);
    filteredDashboards.splice(toIndex, 0, movingDashboard);

    await Promise.all(
        filteredDashboards.map(async (dashboard, index) => {
            await sql`
                UPDATE dashboards
                SET position = ${index + 1}
                WHERE id = ${dashboard.id};
            `;
        })
    );

    revalidatePath(HOME_PATH);
}

export async function updateTaskPosition(result: DND_Result) {
    if (!result.destination) return;
    
    const sql = neon(process.env.DATABASE_URL!);

    const { draggableId: taskId, source, destination } = result;
    const fromDashboardId = source.droppableId;
    const toDashboardId = destination.droppableId;
    const newIndex = destination.index;

    const currentTasks = await sql`
        SELECT id, position FROM tasks WHERE dashboard_id = ${toDashboardId} ORDER BY position ASC;
    `;

    if (fromDashboardId === toDashboardId) {
        const filteredTasks = currentTasks.filter((task) => task.id !== taskId);

        filteredTasks.splice(newIndex, 0, { id: taskId });

        for (const [index, task] of filteredTasks.entries()) {
            await sql`
                UPDATE tasks
                SET position = ${index}
                WHERE id = ${task.id};
            `;
        }
    } else {
        await sql`
            UPDATE tasks
            SET position = position - 1
            WHERE dashboard_id = ${fromDashboardId} AND position > ${source.index};
        `;

        await sql`
            UPDATE tasks
            SET position = position + 1
            WHERE dashboard_id = ${toDashboardId} AND position >= ${newIndex};
        `;

        await sql`
            UPDATE tasks
            SET dashboard_id = ${toDashboardId}, position = ${newIndex}
            WHERE id = ${taskId};
        `;
    }

    revalidatePath(HOME_PATH);
}