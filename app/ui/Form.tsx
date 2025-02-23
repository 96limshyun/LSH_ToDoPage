import { useEffect, useRef } from "react";
import useRouterBack from "../_hooks/useRouteBack";
import { InputName, OkButtonText, State } from "../_types";
import { ArrowPathIcon } from "@heroicons/react/20/solid";

interface FormProps {
    state: State | undefined;
    isPending: boolean;
    formAction: (formData: FormData) => void;
    inputName: InputName;
    initialValue: string;
    okButtonText: OkButtonText;
}

export default function Form({
    state,
    isPending,
    formAction,
    inputName,
    initialValue,
    okButtonText,
}: FormProps) {
    const { routeBack } = useRouterBack();
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => inputRef?.current?.focus(), []);
    
    return (
        <form action={formAction} className="flex flex-col p-4 gap-4">
            <input
                ref={inputRef}
                name={inputName}
                defaultValue={initialValue}
                className="p-2 bg-black rounded border-[0.5px]"
            />

            {state?.errors?.name && (
                <p className="text-sm text-red-500">{state.errors.name}</p>
            )}
            <div className="flex justify-end gap-2 text-sm font-bold">
                <button
                    type="button"
                    className="w-20 p-2 bg-black rounded border-[0.5px] hover:bg-gray-500 text-red-500 flex justify-center items-center"
                    onClick={routeBack}
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="w-20 p-2 bg-black rounded border-[0.5px] hover:bg-gray-500 text-blue-500 flex justify-center items-center"
                >
                    {isPending ? (
                        <ArrowPathIcon className="w-5 h-5 animate-spin" />
                    ) : (
                        <div>{okButtonText}</div>
                    )}
                </button>
            </div>
        </form>
    );
}
