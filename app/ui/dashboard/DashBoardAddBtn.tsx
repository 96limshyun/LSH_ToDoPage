import Link from "next/link";
import { PlusIcon } from "@heroicons/react/20/solid";

export default function DashBoardAddBtn() {
    return (
        <Link
            href="/dashboard/create"
            scroll={false}
            className="w-6 h-6 bg-defaultCard border-[0.5px] rounded cursor-pointer flex items-center justify-center"
        >
            <PlusIcon className="w-6 h-6" />
        </Link>
    );
}
