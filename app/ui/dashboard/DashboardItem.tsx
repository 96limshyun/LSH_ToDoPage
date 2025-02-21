"use client";

import { DashboardWithTask } from "@/app/_types/dashboardType";
import { PlusIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import TaskItem from "../task/TaskItem";
import MenuButton from "./MenuButton";
import { Droppable, Draggable } from "@hello-pangea/dnd";

interface DashboardItemProps {
    dashboard: DashboardWithTask;
}

export default function DashboardItem({ dashboard }: DashboardItemProps) {
    const { id, name, position, tasks } = dashboard;

    return (
        <div className="flex flex-col rounded-md border-[0.5px] bg-bolderCard w-72 gap-4 justify-between h-full">
            <div className="flex flex-col gap-6 p-4">
                <div className="text-xl font-bold flex justify-between">
                    <h2>{name}</h2>
                    <MenuButton id={id} name={name} position={position}/>
                </div>

                <Droppable droppableId={id} type="TASK">
                    {(provided) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className="flex flex-col gap-2 min-h-[50px]"
                        >
                            {tasks.map((task, index) => (
                                <Draggable
                                    key={task.id}
                                    draggableId={task.id}
                                    index={index}
                                >
                                    {(provided) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                        >
                                            <TaskItem task={task} />
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </div>

            <Link
                href={`/task/create/${id}`}
                scroll={false}
                className="p-2 rounded-b-md flex gap-2 hover:bg-defaultCard"
            >
                <PlusIcon className="w-6 h-6" />
                <div>Add item</div>
            </Link>
        </div>
    );
}
