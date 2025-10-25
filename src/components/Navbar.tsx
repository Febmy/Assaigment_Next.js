"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-20 backdrop-blur bg-slate-950/40 border-b border-white/10">
      <div className="container flex items-center justify-between py-3">
        <Link href="/foods" className="flex items-center gap-2">
          <div className="size-8 rounded-xl bg-teal-400/20 border border-teal-300/20" />
          <span className="font-semibold tracking-wide">Foodies</span>
        </Link>
        <nav className="flex items-center gap-2">
          <Link
            href="/foods/new"
            className={"btn btn-primary " + (pathname === "/foods/new" ? "ring-2 ring-teal-400" : "")}
          >
            Buat Makanan
          </Link>
          <Link
            href="/login"
            className={"btn " + (pathname === "/login" ? "ring-2 ring-teal-400" : "")}
          >
            Login
          </Link>
        </nav>
      </div>
    </header>
  );
}
