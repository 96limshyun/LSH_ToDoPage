"use client";
import { useRouter } from "next/navigation";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { useRef } from "react";
import useOnClickOutside from "@/app/_hooks/useOnClickOutside";

export default function CreateDashboard() {
    const router = useRouter();
    const modalRef = useRef<HTMLDivElement>(null);

    useOnClickOutside(modalRef, () => router.back());
    return (
        <div ref={modalRef} className="bg-defaultCard shadow-lg w-[300px] h-[200px] border-[0.5px] rounded flex flex-col ">
                <div className="flex p-4 justify-between">
                    <h1>Create Dashboard</h1>
                    <XMarkIcon
                        className="w-6 h-6 cursor-pointer"
                        onClick={() => router.back()}
                    />
                </div>
                
                <input className="m-4 p-2 bg-black rounded border-[0.5px]"/>
                <div className="m-4 flex justify-end gap-2 text-sm font-bold ">
                    <button className="p-2 bg-black rounded border-[0.5px] hover:bg-gray-500 text-red-500">cancel</button>
                    <button className="p-2 bg-black rounded border-[0.5px] hover:bg-gray-500 text-blue-500">create</button>
                </div>
            </div>
    )
}