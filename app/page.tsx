import fetchDashboards from "./lib/data";
import DashboardList from "./ui/dashboard/DashboardList";

export default async function Page() {
    const dashboards = await fetchDashboards();

    return (
        <>
            <div className="w-full">
                <h1 className="font-bold text-2xl">LSH TO DO PAGE</h1>
            </div>
            <main className="w-full h-full p-3">
                <DashboardList dashboards={dashboards} />
            </main>
        </>
    );
}
