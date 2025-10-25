import "./../styles/globals.css";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "Foods CRUD | Next.js + Prisma (SQLite)",
  description: "Assignment: SSR list/detail + CRUD API with SQLite",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="container py-8">{children}</main>
      </body>
    </html>
  );
}
