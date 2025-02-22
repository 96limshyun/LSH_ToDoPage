"use client";

import { DashboardWithTask } from "@/app/_types/dashboardType";
import Menu from "../Menu";
import { deleteDashboard } from "@/app/lib/dashBoardAction";
import TaskAddBtn from "../task/TaskAddBtn";
import TaskList from "../task/TaskList";

interface DashboardItemProps {
    dashboard: DashboardWithTask;
}

export default function DashboardItem({ dashboard }: DashboardItemProps) {
    const { id, name, position, tasks } = dashboard;
    const deleteDashboardWithId = deleteDashboard.bind(null, id, position);
    
    return (
        <div className="flex flex-col rounded-md border-[0.5px] bg-bolderCard w-72 gap-4 justify-between h-full">
            <div className="flex flex-col gap-6 p-4">
                <div className="text-xl font-bold flex justify-between">
                    <h2>{name}</h2>
                    <Menu path={`/dashboard/edit/${id}?name=${name}&position=${position}`} deleteAction={deleteDashboardWithId} />
                </div>
                <TaskList dashBoardId={id} tasks={tasks} />
            </div>

            <TaskAddBtn id={id}/>
        </div>
    );
}
