import { Task } from "@/app/_types/dashboardType";
import MenuButton from "./MenuButton";

interface TaskItemProps {
    task: Task;
}

export default function TaskItem({ task }: TaskItemProps) {
    const {id, content } = task;
    return (
        <div className="p-4 bg-defaultCard rounded border-[0.5px] flex justify-between">
            <div>{content}</div>
            <MenuButton id={id} />
        </div>
    );
}
