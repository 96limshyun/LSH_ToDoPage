"use client";

import Modal from "@/app/ui/Modal";
import { use } from "react";
import { Params } from "@/app/_types";
import Card from "@/app/ui/Card";
import { FORM_CARD_TITLES, INPUT_NAME, OK_BUTTON_TEXT } from "@/app/_constants";
import { createTask } from "@/app/lib/taskAction";
import useFormAction from "@/app/_hooks/useFormAction";
import Form from "@/app/ui/Form";

export default function Page({ params }: { params: Promise<Params> }) {
    const unwrappedParams = use(params);
    const id = unwrappedParams.id;

    const { state, formAction, isPending } = useFormAction((formData) =>
        createTask(id, formData)
    );

    return (
        <Modal>
            <Card title={FORM_CARD_TITLES.CREATE_TASK}>
                <Form
                    state={state}
                    isPending={isPending}
                    formAction={formAction}
                    inputName={INPUT_NAME.TASK}
                    initialValue=""
                    okButtonText={OK_BUTTON_TEXT.CREATE}
                />
            </Card>
        </Modal>
    );
}
