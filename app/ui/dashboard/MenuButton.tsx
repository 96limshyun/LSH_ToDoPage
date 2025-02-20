import { useState, useRef } from "react";
import { EllipsisHorizontalIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import useOnClickOutside from "@/app/_hooks/useOnClickOutside";
interface MenuButtonProps {
    id: string;
}

export default function MenuButton({ id }: MenuButtonProps) {
    const [isOpen, setOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    useOnClickOutside(menuRef, () => setOpen(false));
    
    return (
        <div ref={menuRef} className="relative">
            <button onClick={() => setOpen(!isOpen)}>
                <EllipsisHorizontalIcon className="w-6 h-6 cursor-pointer" />
            </button>

            {isOpen && (
                <div
                    className="absolute top-full mt-2 right-0 w-20 bg-defaultCard shadow-lg border rounded-md z-50 flex flex-col text-sm text-center font-bold"
                >
                    <Link
                        href={`/dashboard/edit/${id}`}
                        className="p-2 hover:bg-gray-500"
                        onClick={() => setOpen(false)}
                        scroll={false}
                    >
                        Edit
                    </Link>
                    <button
                        className="p-2 hover:bg-gray-500 text-red-500"
                        onClick={() => {
                            console.log("삭제 기능 추가 예정");
                            setOpen(false);
                        }}
                    >
                        Delete
                    </button>
                </div>
            )}
        </div>
    );
}