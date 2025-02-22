"use client";

import { DashboardWithTask } from "@/app/_types/dashboardType";
import DashboardItem from "./DashboardItem";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import {
    updateDashBoardPosition,
    updateTaskPosition,
} from "@/app/lib/dndAction";
import { DND_Result } from "@/app/_types/dndType";
import DashBoardAddBtn from "./DashBoardAddBtn";
interface DashboardsProps {
    dashboards: DashboardWithTask[];
}

export default function DashboardList({ dashboards }: DashboardsProps) {

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
                        <DashBoardAddBtn/>
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
}
