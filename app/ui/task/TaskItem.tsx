import { EllipsisHorizontalIcon } from "@heroicons/react/20/solid";
import { Task } from "@/app/_types/dashboardType";

interface TaskItemProps {
    task: Task;
}

export default function TaskItem({ task }: TaskItemProps) {
    const { content } = task;
    return (
        <div className="p-4 bg-toDoCard rounded border-[0.5px] flex justify-between">
            <div>{content}</div>
            <EllipsisHorizontalIcon className="w-6 h-6 cursor-pointer" />
        </div>
    );
}
