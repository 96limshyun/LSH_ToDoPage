"use client";

import Modal from "@/app/ui/Modal";
import CreateTask from "@/app/ui/task/Create";
import { use } from "react";
import { Params } from "@/app/_types";

export default function CreatePage({ params }: { params: Promise<Params> }) {
    const unwrappedParams = use(params);
    const id = unwrappedParams.id;
    return (
        <Modal>
            <CreateTask id={id}/>
        </Modal>
    );
}
