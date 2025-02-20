import { neon } from "@neondatabase/serverless";
import { DashboardWithTask } from "../_types/dashboardType";

export default async function fetchDashboards() {
    try {
        const sql = neon(process.env.DATABASE_URL!);

        const dashboards = await sql`
        SELECT id, name, position FROM dashboards ORDER BY position ASC;
    `;

    const tasks = await sql`
        SELECT id::uuid, content, position, dashboard_id::uuid FROM tasks;
    `;

        const dashboardsWithTasks = dashboards.map((dashboard) => ({
            ...dashboard,
            tasks: tasks.filter((task) => task.dashboard_id === dashboard.id),
        })) as DashboardWithTask[];

        return dashboardsWithTasks;
    } catch (error) {
        console.error("Failed to fetch dashboards:", error);
        throw new Error("데이터를 불러오는 데 실패했습니다.");
    }
}
