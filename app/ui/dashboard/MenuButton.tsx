import { useState, useRef } from "react";
import { EllipsisHorizontalIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import useOnClickOutside from "@/app/_hooks/useOnClickOutside";
import { deleteDashboard } from "@/app/lib/dashBoardAction";
interface MenuButtonProps {
    id: string;
    name: string;
    position: number;
}

export default function MenuButton({ id, name, position }: MenuButtonProps) {
    const [isOpen, setOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    useOnClickOutside(menuRef, () => setOpen(false));

    const deleteDashboardWithId = deleteDashboard.bind(null, id);

    return (
        <div ref={menuRef} className="relative">
            <button onClick={() => setOpen(!isOpen)}>
                <EllipsisHorizontalIcon className="w-6 h-6 cursor-pointer" />
            </button>

            {isOpen && (
                <div className="absolute top-full mt-2 right-0 w-20 bg-defaultCard shadow-lg border rounded-md z-50 flex flex-col text-sm text-center font-bold">
                    <Link
                        href={`/dashboard/edit/${id}?name=${name}&position=${position}`}
                        className="p-2 hover:bg-gray-500"
                        onClick={() => setOpen(false)}
                        scroll={false}
                    >
                        Edit
                    </Link>
                    <form
                        action={deleteDashboardWithId}
                        className="p-2 hover:bg-gray-500 text-red-500"
                    >
                        <button>Delete</button>
                    </form>
                </div>
            )}
        </div>
    );
}
