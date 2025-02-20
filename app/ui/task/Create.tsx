"use client";
import { useRouter } from "next/navigation";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { useRef, useActionState } from "react";
import { State } from "@/app/_types";
import useOnClickOutside from "@/app/_hooks/useOnClickOutside";
import { createTask } from "@/app/lib/taskAction";

const initialState: State = { message: null, errors: {} };

export default function CreateTask({id}: {id: string}) {
    const createHandler = async (state: State | undefined, formData: FormData) => {
        const result = await createTask(id, formData);
        if (result?.errors) return result;

        router.back();
        return result;
    };

    const [state, formAction] = useActionState(createHandler, initialState);

    const router = useRouter();
    const modalRef = useRef<HTMLDivElement>(null);

    const routeBack = () => router.back();

    useOnClickOutside(modalRef, () => router.back());

    return (
        <div
            ref={modalRef}
            className="bg-defaultCard shadow-lg w-[300px] min-h-[200px] border-[0.5px] rounded flex flex-col "
        >
            <div className="flex p-4 justify-between">
                <h1>Create Task</h1>
                <XMarkIcon
                    className="w-6 h-6 cursor-pointer"
                    onClick={routeBack}
                />
            </div>
            <form action={formAction} className="flex flex-col p-4 gap-4">
                <input name="content" className="p-2 bg-black rounded border-[0.5px]" />

                {state?.errors?.name && (
                    <p className="text-sm text-red-500">{state.errors.name}</p>
                )}
                <div className="flex justify-end gap-2 text-sm font-bold ">
                    <button
                        type="button"
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
    )
}