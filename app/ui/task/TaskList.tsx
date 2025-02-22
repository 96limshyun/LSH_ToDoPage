import { Task } from "@/app/_types/dashboardType";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import TaskItem from "./TaskItem";

interface TaskListProps {
    dashBoardId: string;
    tasks: Task[]
}

export default function TaskList({ dashBoardId, tasks}: TaskListProps) {
    return (
        <Droppable droppableId={dashBoardId} type="TASK">
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
                                    <TaskItem task={task} dashBoardId={dashBoardId}/>
                                </div>
                            )}
                        </Draggable>
                    ))}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    );
}
