"use client";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { useRouter } from "next/navigation";

export default function EditTask({ id }: { id: string }) {
    const router = useRouter();

    return (
        <div className="bg-defaultCard shadow-lg w-[300px] h-[200px] border-[0.5px] rounded flex flex-col ">
            <div className="flex p-4 justify-between">
                <h1>Edit Task</h1>
                <XMarkIcon
                    className="w-6 h-6 cursor-pointer"
                    onClick={() => router.back()}
                />
            </div>

            <input className="m-4 p-2 bg-black rounded border-[0.5px]" />
            <div className="m-4 flex justify-end gap-2 text-sm">
                <button className="p-2 bg-black rounded border-[0.5px] hover:bg-gray-500 text-red-500">
                    cancel
                </button>
                <button className="p-2 bg-black rounded border-[0.5px] hover:bg-gray-500 text-blue-500">
                    create
                </button>
            </div>
        </div>
    );
}
