"use client";

import { useActionState } from "react";
import { State } from "../_types";
import useRouterBack from "./useRouteBack";

const initialState: State = { message: null, errors: {} };

type FormAction = (formData: FormData) => Promise<State | undefined>;

export default function useFormAction(action: FormAction) {
    const {routeBack} = useRouterBack();

    const handler = async (state: State | undefined, formData: FormData) => {
        const result = await action(formData);
        if (!result?.errors) routeBack();
        return result;
    };

    const [state, formAction] = useActionState(handler, initialState);

    return { state, formAction };
}