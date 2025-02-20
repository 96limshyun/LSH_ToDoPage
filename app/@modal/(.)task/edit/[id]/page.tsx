"use client";

import Modal from "@/app/ui/Modal";
import { use } from "react";
import { Params } from "@/app/_types";
import EditTask from "@/app/ui/task/Edit";
import { useSearchParams } from "next/navigation";

export default function EditModal({ params }: { params: Promise<Params> }) {
    const unwrappedParams = use(params);
    const id = unwrappedParams.id;

    const searchParams = useSearchParams();
    const content = searchParams.get("content") || "";
    const position = Number(searchParams.get("position")) || 0;
    return (
        <Modal>
            <EditTask
                id={id}
                initialContent={content}
                initialPosition={position}
            />
        </Modal>
    );
}
