"use client";
import { useRouter } from "next/navigation";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { useRef, useActionState } from "react";
import { createDashboard } from "@/app/lib/dashBoardAction";
import { State } from "@/app/_types";
import useOnClickOutside from "@/app/_hooks/useOnClickOutside";

const initialState: State = { message: null, errors: {} };

export default function CreateDashboard() {
    const [state, formAction] = useActionState(createDashboard, initialState);

    const router = useRouter();
    const modalRef = useRef<HTMLDivElement>(null);

    const routeBack = () => router.back();

    useOnClickOutside(modalRef, routeBack);

    return (
        <div
            ref={modalRef}
            className="bg-defaultCard shadow-lg w-[300px] min-h-[200px] border-[0.5px] rounded flex flex-col "
        >
            <div className="flex p-4 justify-between">
                <h1>Create Dashboard</h1>
                <XMarkIcon
                    className="w-6 h-6 cursor-pointer"
                    onClick={routeBack}
                />
            </div>
            <form action={formAction} className="flex flex-col p-4 gap-4">
                <input name="name" className="p-2 bg-black rounded border-[0.5px]" />

                {state.errors?.name && (
                    <p className="text-sm text-red-500">{state.errors.name}</p>
                )}
                <div className="flex justify-end gap-2 text-sm font-bold ">
                    <button
                        className="p-2 bg-black rounded border-[0.5px] hover:bg-gray-500 text-red-500"
                        onClick={routeBack}
                    >
                        Cancel
                    </button>
                    <button type="submit" className="p-2 bg-black rounded border-[0.5px] hover:bg-gray-500 text-blue-500">
                        Create
                    </button>
                </div>
            </form>
        </div>
    );
}
