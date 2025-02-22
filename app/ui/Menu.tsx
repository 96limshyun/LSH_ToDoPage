import { useRef, useState } from "react";
import { EllipsisHorizontalIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import useOnClickOutside from "../_hooks/useOnClickOutside";

interface MenuProps {
    path: string;
    deleteAction: () => void;
}

export default function Menu({ path, deleteAction }: MenuProps) {
    const [isOpen, setOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    useOnClickOutside(menuRef, () => setOpen(false));

    return (
        <div ref={menuRef} className="relative">
            <button onClick={() => setOpen(!isOpen)}>
                <EllipsisHorizontalIcon className="w-6 h-6 cursor-pointer" />
            </button>

            {isOpen && (
                <div className="absolute top-full mt-2 right-0 w-20 bg-defaultCard shadow-lg border rounded-md z-50 flex flex-col text-sm text-center font-bold">
                    <Link
                        href={`${path}`}
                        className="p-2 hover:bg-gray-500"
                        onClick={() => setOpen(false)}
                        scroll={false}
                    >
                        Edit
                    </Link>
                    <form
                        action={deleteAction}
                        className="p-2 hover:bg-gray-500 text-red-500"
                    >
                        <button>Delete</button>
                    </form>
                </div>
            )}
        </div>
    );
}
