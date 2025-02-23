"use client"
import Card from "@/app/ui/Card";
import { FORM_CARD_TITLES, INPUT_NAME, OK_BUTTON_TEXT } from "@/app/_constants";
import useFormAction from "@/app/_hooks/useFormAction";
import { createDashboard } from "@/app/lib/dashBoardAction";
import Form from "@/app/ui/Form";

export default function Page() {
    const { state, formAction, isPending } = useFormAction((formData) =>
        createDashboard(formData)
    );  

    return (
        <Card title={FORM_CARD_TITLES.CREATE_DASHBOARD}>
            <Form
                state={state}
                isPending={isPending}
                formAction={formAction}
                inputName={INPUT_NAME.DASHBOARD}
                initialValue=""
                okButtonText={OK_BUTTON_TEXT.CREATE}
            />
        </Card>
    );
}
