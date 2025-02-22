import Link from "next/link";
import { PlusIcon } from "@heroicons/react/20/solid";

export default function TaskAddBtn({ id }: { id: string }) {
    return (
        <Link
            href={`/task/create/${id}`}
            scroll={false}
            className="p-2 rounded-b-md flex gap-2 hover:bg-defaultCard"
        >
            <PlusIcon className="w-6 h-6" />
            <div>Add item</div>
        </Link>
    );
}
