import { Task } from "@/app/_types/dashboardType";
import { deleteTask } from "@/app/lib/taskAction";
import Menu from "../Menu";

interface TaskItemProps {
    task: Task;
    dashBoardId: string;
}

export default function TaskItem({ task, dashBoardId }: TaskItemProps) {
    const { id: taskId, content, position } = task;
    const deleteTaskWithId = deleteTask.bind(null, taskId, position, dashBoardId);
    
    return (
        <div className="p-4 bg-defaultCard rounded border-[0.5px] flex justify-between">
            <div>{content}</div>
            <Menu path={`/task/edit/${taskId}?content=${content}&position=${position}`} deleteAction={deleteTaskWithId} />
        </div>
    );
}
