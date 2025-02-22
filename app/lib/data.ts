import supabase from "./supabaseClient";
import { DashboardWithTask } from "../_types/dashboardType";
import { DATABASE_ERROR_MESSAGES } from "../_constants";

export default async function fetchDashboards() {
    try {
        const { data: dashboards, error: dashboardsError } = await supabase
            .from("dashboards")
            .select("id, name, position")
            .order("position", { ascending: true });

        if (dashboardsError) throw dashboardsError;

        const { data: tasks, error: tasksError } = await supabase
            .from("tasks")
            .select("id, content, position, dashboard_id")
            .order("position", { ascending: true });

        if (tasksError) throw tasksError;

        const dashboardsWithTasks = dashboards.map((dashboard) => ({
            ...dashboard,
            tasks: tasks.filter((task) => task.dashboard_id === dashboard.id),
        })) as DashboardWithTask[];

        return dashboardsWithTasks;
    } catch (error) {
        console.error(DATABASE_ERROR_MESSAGES.GET_FAIL, error);
        throw new Error(DATABASE_ERROR_MESSAGES.GET_FAIL);
    }
}
