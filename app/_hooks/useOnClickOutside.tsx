"use client"
import { useEffect, RefObject } from "react";

const useOnClickOutside = (ref: RefObject<HTMLElement | null>, handler: () => void) => {
    useEffect(() => {
        const listener = (event: MouseEvent) => {
            if (!ref.current || ref.current.contains(event.target as Node)) {
                return;
            }
            handler();
        };

        document.addEventListener("mousedown", listener);

        return () => {
            document.removeEventListener("mousedown", listener);
        };
    }, [ref, handler]);
};

export default useOnClickOutside;