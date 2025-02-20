import { DashboardType } from "@/app/_types/dashboardType";
import { PlusIcon, EllipsisHorizontalIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import TaskItem from "../task/TaskItem";

interface DashboardItemProps {
    dashboard: DashboardType;
}

export default function DashboardItem({ dashboard }: DashboardItemProps) {
    const { name, tasks} = dashboard;

    return (
        <div
            className="flex flex-col rounded-md border-[0.5px] bg-bolderCard w-72 gap-4 justify-between"
        >
            <div className="flex flex-col gap-6 p-4">
                <div className="text-xl font-bold flex justify-between">
                    <h2>{name}</h2>
                    <Link href={`/dashboard/edit/${dashboard.id}`}>
                        <EllipsisHorizontalIcon className="w-6 h-6 cursor-pointer" />
                    </Link>
                </div>
                <div className="flex flex-col gap-2">
                    {tasks.map((task) => (
                        <TaskItem key={task.id} task={task} />  
                    ))}
                </div>
            </div>
            <div className="p-2 rounded-b-md flex gap-2 hover:bg-toDoCard">
                <PlusIcon className="w-6 h-6" />
                <div>Add item</div>
            </div>
        </div>
    );
}
