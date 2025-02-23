"use client";

import Modal from "@/app/ui/Modal";
import { use } from "react";
import { Params } from "@/app/_types";
import { useSearchParams } from "next/navigation";
import Card from "@/app/ui/Card";
import { FORM_CARD_TITLES, INPUT_NAME, OK_BUTTON_TEXT } from "@/app/_constants";
import useFormAction from "@/app/_hooks/useFormAction";
import { editDashboard } from "@/app/lib/dashBoardAction";
import Form from "@/app/ui/Form";

export default function Page({ params }: { params: Promise<Params> }) {
    const unwrappedParams = use(params);
    const id = unwrappedParams.id;

    const searchParams = useSearchParams();
    const name = searchParams.get("name") || "";
    const position = Number(searchParams.get("position")) || 0;

    const { state, formAction, isPending } = useFormAction((formData) => editDashboard(id, position, formData));

    return (
        <Modal>
            <Card title={FORM_CARD_TITLES.EDIT_DASHBOARD}>
                <Form
                    state={state}
                    isPending={isPending}
                    formAction={formAction}
                    inputName={INPUT_NAME.DASHBOARD}
                    initialValue={name}
                    okButtonText={OK_BUTTON_TEXT.EDIT}
                />
            </Card>
        </Modal>
    );
}
