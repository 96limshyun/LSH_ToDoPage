"use client";

import Modal from "@/app/ui/Modal";
import { use } from "react";
import { Params } from "@/app/_types";
import EditDashboard from "@/app/ui/dashboard/Edit";
export default function EditModal({ params }: { params: Promise<Params> }) {
    const unwrappedParams = use(params);
    const id = unwrappedParams.id;
    return (
        <Modal>
            <EditDashboard id={id} />
        </Modal>
    );
}
