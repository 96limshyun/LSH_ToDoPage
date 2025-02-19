import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ToDoPage",
  description: "프론트엔드 사전 과제",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex justify-center items-center h-screen p-10 flex-col">
        <h1 className="m-4 font-bold">LSH TO DO PAGE</h1>
        {children}
      </body>
    </html>
  );
}
