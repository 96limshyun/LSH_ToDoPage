"use client";

import { use } from "react";
import { Params } from "@/app/_types";
import EditTask from "@/app/ui/task/Edit";
export default function EditModal({ params }: { params: Promise<Params> }) {
    const unwrappedParams = use(params);
    const id = unwrappedParams.id;
    return <EditTask id={id} />;
}
