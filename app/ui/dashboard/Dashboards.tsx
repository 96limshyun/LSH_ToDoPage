import fetchDashboards from "@/app/lib/data";
import { DashboardType } from "@/app/_types/dashboardType";
import { PlusIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import DashboardItem from "./DashboardItem";

export default async function Dashboards() {
    const dashboards: DashboardType[] = await fetchDashboards();

    return (
        <div className="flex w-full h-full gap-4">
            {dashboards.map((dashboard) => (
                <DashboardItem key={dashboard.id} dashboard={dashboard} />
            ))}
            <Link href="#" className="w-6 h-6 bg-toDoCard border-[0.5px] rounded cursor-pointer flex items-center justify-center">
                <PlusIcon className="w-6 h-6" />
            </Link>
        </div>
    );
}
