import useRouterBack from "../_hooks/useRouteBack";
import { InputName, OkButtonText, State } from "../_types";

interface FormProps {
    state: State | undefined;
    formAction: (formData: FormData) => void;
    inputName: InputName;
    initialValue: string;
    okButtonText: OkButtonText;
}

export default function Form({ state, formAction, inputName, initialValue, okButtonText }: FormProps) {
    const { routeBack } = useRouterBack();

    return (
        <form action={formAction} className="flex flex-col p-4 gap-4">
            <input
                name={inputName}
                defaultValue={initialValue}
                className="p-2 bg-black rounded border-[0.5px]"
            />

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
                <button
                    type="submit"
                    className="p-2 bg-black rounded border-[0.5px] hover:bg-gray-500 text-blue-500"
                >
                    {okButtonText}
                </button>
            </div>
        </form>
    );
}
