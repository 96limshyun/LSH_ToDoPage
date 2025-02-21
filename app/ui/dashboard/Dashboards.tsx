"use client";

import { DashboardWithTask } from "@/app/_types/dashboardType";
import { PlusIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import DashboardItem from "./DashboardItem";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import {
    updateDashBoardPosition,
    updateTaskPosition,
} from "@/app/lib/dndAction";
import { DND_Result } from "@/app/_types/dndType";
interface DashboardsProps {
    dashboards: DashboardWithTask[];
}

export default function Dashboards({ dashboards }: DashboardsProps) {

    const handleDragEnd = async (result: DND_Result) => {
        await (result.type === "DASHBOARD"
            ? updateDashBoardPosition(result)
            : updateTaskPosition(result));
    };

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable
                droppableId="dashboards"
                direction="horizontal"
                type="DASHBOARD"
            >
                {(provided) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className="flex w-full h-full gap-4"
                    >
                        {dashboards.map((dashboard, index) => (
                            <Draggable
                                key={dashboard.id}
                                draggableId={dashboard.id.toString()}
                                index={index}
                            >
                                {(provided) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                    >
                                        <DashboardItem
                                            key={dashboard.id}
                                            dashboard={dashboard}
                                        />
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                        <Link
                            href="/dashboard/create"
                            scroll={false}
                            className="w-6 h-6 bg-defaultCard border-[0.5px] rounded cursor-pointer flex items-center justify-center"
                        >
                            <PlusIcon className="w-6 h-6" />
                        </Link>
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
}
