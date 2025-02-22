"use client";

import { useRef } from "react";
import useOnClickOutside from "../_hooks/useOnClickOutside";
import { XMarkIcon } from "@heroicons/react/20/solid";
import useRouterBack from "../_hooks/useRouteBack";

interface FormCardProps {
    title: string;
    children: React.ReactNode;
}

export default function Card({ title, children }: FormCardProps) {
    const modalRef = useRef<HTMLDivElement>(null);
    const { routeBack } = useRouterBack();

    useOnClickOutside(modalRef, routeBack);
    return (
        <div
            ref={modalRef}
            className="bg-defaultCard shadow-lg w-[300px] min-h-[200px] border-[0.5px] rounded flex flex-col "
        >
            <div className="flex p-4 justify-between">
                <h1>{title}</h1>
                <XMarkIcon
                    className="w-6 h-6 cursor-pointer"
                    onClick={routeBack}
                />
            </div>
            {children}
        </div>
    );
}
