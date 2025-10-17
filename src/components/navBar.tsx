"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavClient() {
  const pathname = usePathname() ?? "/";

  // hide nav on the landing page (root)
  if (pathname === "/") return null;

  return (
    <header style={{ padding: 16 }}>
      <nav style={{ display: "flex", gap: 12 }}>
        <Link href="/home">Portfolio</Link>
        <Link href="/gallery">Gallery</Link>
        <Link href="/contact">Contact</Link>
        <Link href="/about">About</Link>
        <Link href="/new-outfit">New Outfit</Link>
      </nav>
    </header>
  );
}