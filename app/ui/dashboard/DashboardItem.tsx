"use client";
import { DashboardWithTask } from "@/app/_types/dashboardType";
import { PlusIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import TaskItem from "../task/TaskItem";
import MenuButton from "./MenuButton";

interface DashboardItemProps {
    dashboard: DashboardWithTask;
}

export default function DashboardItem({ dashboard }: DashboardItemProps) {
    const {id, name, position,tasks} = dashboard;

    return (
        <div
            className="flex flex-col rounded-md border-[0.5px] bg-bolderCard w-72 gap-4 justify-between"
        >
            <div className="flex flex-col gap-6 p-4">
                <div className="text-xl font-bold flex justify-between">
                    <h2>{name}</h2>
                    <MenuButton id={id} name={name} position={position}/>
                </div>
                <div className="flex flex-col gap-2">
                    {tasks.map((task) => (
                        <TaskItem key={task.id} task={task} />  
                    ))}
                </div>
            </div>
            <Link href={`/task/create`} scroll={false} className="p-2 rounded-b-md flex gap-2 hover:bg-defaultCard">
                <PlusIcon className="w-6 h-6" />
                <div>Add item</div>
            </Link>
        </div>
    );
}
