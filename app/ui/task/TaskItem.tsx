import { Task } from "@/app/_types/dashboardType";
import { deleteTask } from "@/app/lib/taskAction";
import Menu from "../Menu";

interface TaskItemProps {
    task: Task;
}

export default function TaskItem({ task }: TaskItemProps) {
    const { id, content, position } = task;
    const deleteTaskWithId = deleteTask.bind(null, id);
    
    return (
        <div className="p-4 bg-defaultCard rounded border-[0.5px] flex justify-between">
            <div>{content}</div>
            <Menu path={`/task/edit/${id}?content=${content}&position=${position}`} deleteAction={deleteTaskWithId} />
        </div>
    );
}
