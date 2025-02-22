"use client";

import { FORM_CARD_TITLES, INPUT_NAME, OK_BUTTON_TEXT } from "@/app/_constants";
import useFormAction from "@/app/_hooks/useFormAction";
import { createDashboard } from "@/app/lib/dashBoardAction";
import Card from "@/app/ui/Card";
import Form from "@/app/ui/Form";
import Modal from "@/app/ui/Modal";

export default function Page() {
    const { state, formAction } = useFormAction((formData) =>
        createDashboard(formData)
    );

    return (
        <Modal>
            <Card title={FORM_CARD_TITLES.CREATE_DASHBOARD}>
                <Form
                    state={state}
                    formAction={formAction}
                    inputName={INPUT_NAME.DASHBOARD}
                    initialValue=""
                    okButtonText={OK_BUTTON_TEXT.CREATE}
                />
            </Card>
        </Modal>
    );
}
