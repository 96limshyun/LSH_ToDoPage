"use client";
import EditDashboard from "@/app/ui/dashboard/Edit";
import { use } from "react";
import { Params } from "@/app/_types";
import { useSearchParams } from "next/navigation";

export default function EditPage({ params }: { params: Promise<Params> }) {
    const unwrappedParams = use(params);
    const id = unwrappedParams.id;

    const searchParams = useSearchParams();
    const name = searchParams.get("name") || "";
    const position = Number(searchParams.get("position")) || 0;

    return (
        <EditDashboard id={id} initialName={name} initialPosition={position} />
    );
}
