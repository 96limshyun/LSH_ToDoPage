import EditDashboard from "@/app/ui/dashboard/Edit";
import { use } from "react";
import { Params } from "@/app/_types";

export default function EditPage({ params }: { params: Promise<Params> }) {
    const unwrappedParams = use(params);
    const id = unwrappedParams.id;

    return <EditDashboard id={id} />;
}
