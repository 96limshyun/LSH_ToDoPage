"use client";

import { useRouter } from "next/navigation";

export default function useRouterBack() {
    const router = useRouter();
    const routeBack = () => router.back();
    return { routeBack };
}
