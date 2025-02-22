import type { Metadata } from "next";
import "./globals.css";
import React from "react";

export const metadata: Metadata = {
    title: "ToDoPage",
    description: "프론트엔드 사전 과제",
};

export default function RootLayout({
    children,
    modal
}: Readonly<{
    children: React.ReactNode;
    modal: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className="flex justify-center items-center h-screen p-10 flex-col gap-4 min-w-[1280]">
                {children}
                {modal}
            </body>
        </html>
    );
}
