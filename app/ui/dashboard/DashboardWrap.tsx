"use server";

import fetchDashboards from "@/app/lib/data";
import Dashboards from "./Dashboards";

export default async function DashboardsWrapper() {
    const dashboards = await fetchDashboards();
    
    return <Dashboards dashboards={dashboards} />;
}