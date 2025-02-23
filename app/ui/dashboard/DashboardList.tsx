"use client";

import { DashboardWithTask } from "@/app/_types/dashboardType";
import DashboardItem from "./DashboardItem";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import DashBoardAddBtn from "./DashBoardAddBtn";
import useDashBoard from "@/app/_hooks/useDashBoard";
interface DashboardsProps {
    initialDashboards: DashboardWithTask[];
}

export default function DashboardList({ initialDashboards }: DashboardsProps) {
    const { dashboards, handleDragEnd } = useDashBoard({ initialDashboards: initialDashboards });
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
