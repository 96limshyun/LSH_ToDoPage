import { neon } from "@neondatabase/serverless";
import { DashboardWithTask } from "../_types/dashboardType";
import { ERROR_MESSAGES } from "../_contants";

export default async function fetchDashboards() {
    try {
        const sql = neon(process.env.DATABASE_URL!);

        const dashboards = await sql`
        SELECT id, name, position FROM dashboards ORDER BY position ASC;
    `;

    const tasks = await sql`
        SELECT id, content, position, dashboard_id FROM tasks ORDER BY position ASC;
    `;

        const dashboardsWithTasks = dashboards.map((dashboard) => ({
            ...dashboard,
            tasks: tasks.filter((task) => task.dashboard_id === dashboard.id),
        })) as DashboardWithTask[];

        return dashboardsWithTasks;
    } catch (error) {
        console.error(ERROR_MESSAGES.GET_FAIL, error);
        throw new Error(ERROR_MESSAGES.GET_FAIL);
    }
}
