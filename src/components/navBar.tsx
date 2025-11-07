"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavClient() {
  const pathname = usePathname() ?? "/";
  const [open, setOpen] = useState(false);

  // hide nav on the landing page (root)
  if (pathname === "/") return null;

  const cvLinks = [
    { href: "/cv-resume", label: "Resume" },
    { href: "/cv-contact", label: "Contact" },
    { href: "/cv-new-outfit", label: "New Outfit" },
  ];

  const artLinks = [
    { href: "/art-gallery", label: "Gallery" },
    { href: "/art-contact", label: "Contact" },
    { href: "/art-about", label: "About" },
    { href: "/art-new-outfit", label: "New Outfit" },
  ];

  const defaultLinks = [
    { href: "/home", label: "Home" },
    { href: "/gallery", label: "Gallery" },
    { href: "/contact", label: "Contact" },
    { href: "/about", label: "About" },
  ];

  const mode =
    pathname.startsWith("/cv") ? "cv" : pathname.startsWith("/art") ? "art" : "default";

  const links = mode === "cv" ? cvLinks : mode === "art" ? artLinks : defaultLinks;

  // mobile menu: remove "new outfit" entries and add cross-link to the other section
  const mobileLinks = (() => {
    // remove outfit-change links from mobile menu
    const base = links.filter((l) => !l.href.includes("new-outfit"));
    if (mode === "cv") {
      // when viewing CV pages, include a quick link to the Art home (placed last)
      return [...base, { href: "/art-home", label: "Art Home" }];
    }
    if (mode === "art") {
      // when viewing Art pages, include a quick link to the CV home (placed last)
      return [...base, { href: "/cv-home", label: "CV Home" }];
    }
    return base;
  })();

  const headerClass =
    mode === "cv"
      ? "text-slate-900"
      : mode === "art"
      ? "bg-[#2C2C2C] text-white"
      : "bg-transparent";

  const linkClass = (isActive: boolean) => {
    if (mode === "cv") {
      return isActive
        ? "bg-blue-100 ring-1 ring-blue-200 px-4 py-2 rounded-full text-sm font-medium"
        : "text-gray-700 hover:bg-blue-50 px-4 py-2 rounded-full text-sm font-medium";
    }
    if (mode === "art") {
      return isActive
        ? "text-[#2C2C2C] bg-[#C3B1A4] px-4 py-2 rounded-full text-sm font-medium"
        : "text-[#C3B1A4] hover:bg-[#827870] px-4 py-2 rounded-full text-sm font-medium";
    }
    return isActive
      ? "text-blue-800 bg-blue-100 ring-1 ring-blue-200 px-4 py-2 rounded-full text-sm font-medium"
      : "text-gray-700 hover:bg-blue-50 px-4 py-2 rounded-full text-sm font-medium";
  };

  const mobileLinkClass = (isActive: boolean) => {
    // mobile: make pill full-width-ish with touch-friendly padding
    const base = "block w-full text-left px-4 py-3 rounded-lg transition";
    if (mode === "cv") {
      return isActive
        ? `${base} bg-blue-100 text-blue-800`
        : `${base} text-gray-700 hover:bg-blue-50`;
    }
    if (mode === "art") {
      return isActive
        ? `${base} bg-[#C3B1A4] text-[#2C2C2C]`
        : `${base} text-[#C3B1A4] hover:bg-[#827870]`;
    }
    return isActive ? `${base} bg-blue-100 text-blue-800` : `${base} text-gray-700 hover:bg-blue-50`;
  };

  const logoSrc = mode === "cv" ? "/Dev-Ruby.png" : mode === "art" ? "/Art-Ruby.png" : "/ruby.png";
  const logoHref = mode === "cv" ? "/cv-home" : mode === "art" ? "/art-home" : "/home";

  return (
    <header className={`${headerClass} w-full relative z-30`}>
      <nav className="mx-auto flex items-center justify-between gap-3 p-3 px-5">
        {/* left: logo */}
        <div className="flex items-center">
          <Link href={logoHref} className="flex items-center" onClick={() => setOpen(false)}>
            <img
              src={logoSrc}
              alt="logo"
              className="w-16 h-16 md:w-20 md:h-20 object-contain"
              style={{ minWidth: 48 }}
            />
          </Link>
        </div>

        {/* desktop links */}
        <div className="hidden md:flex items-center justify-end gap-3">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link key={link.href} href={link.href} className={linkClass(isActive)}>
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* mobile hamburger */}
        <div className="md:hidden flex items-center">
          <button
            aria-label="Toggle menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((s) => !s)}
            className="p-2 rounded-md inline-flex items-center justify-center hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-offset-2"
          >
            <svg className="w-6 h-6 text-current" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              {open ? (
                <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* mobile panel */}
      <div
        id="mobile-menu"
        className={`md:hidden absolute left-0 right-0 top-full shadow-lg transition-transform duration-200 origin-top ${
          open ? "transform scale-y-100 opacity-100" : "transform scale-y-0 opacity-0 pointer-events-none"
        }`}
        style={{ transformOrigin: "top center" }}
      >
        <div className={`max-w-6xl mx-auto px-4 py-3 ${mode === "art" ? "bg-[#2C2C2C]" : "bg-white/95"}`}>
          <div className="flex flex-col gap-2">
            {mobileLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={mobileLinkClass(isActive)}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
}