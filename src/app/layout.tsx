import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SessionWrapper from "@/components/SessionWrapper";
import { Flowbite } from "flowbite-react";
import { AppWrapper } from "@/context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kanban board",
  description: "Kanban board next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark bg-slate-900">
      <SessionWrapper>
        <AppWrapper>
          <Flowbite>
            <body className={inter.className}>{children}</body>
          </Flowbite>
        </AppWrapper>
      </SessionWrapper>
    </html>
  );
}
