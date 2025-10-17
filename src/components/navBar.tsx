"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavClient() {
  const pathname = usePathname() ?? "/";

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

const headerClass =
    mode === "cv"
        ? "text-slate-900"
        : mode === "art"
        ? "bg-[#2C2C2C] border-b border-slate-800 text-white"
        : "bg-transparent";

  const linkClass = (isActive: boolean) => {
    // CV: light blue pill (current behavior)
    if (mode === "cv") {
      return isActive
        ? "bg-blue-100 ring-1 ring-blue-200 px-4 py-2 rounded-full text-sm font-medium"
        : "text-gray-700 hover:bg-blue-50 px-4 py-2 rounded-full text-sm font-medium";
    }

    // ART: dark mode pills
    if (mode === "art") {
      return isActive
        ? "text-[#2C2C2C] bg-[#C3B1A4] px-4 py-2 rounded-full text-sm font-medium"
        : "text-[#C3B1A4] hover:bg-[#827870] px-4 py-2 rounded-full text-sm font-medium";
    }

    // default
    return isActive
      ? "text-blue-800 bg-blue-100 ring-1 ring-blue-200 px-4 py-2 rounded-full text-sm font-medium"
      : "text-gray-700 hover:bg-blue-50 px-4 py-2 rounded-full text-sm font-medium";
  };

  // choose logo and link target per mode
  const logoSrc = mode === "cv" ? "/Dev-Ruby.png" : mode === "art" ? "/Art-Ruby.png" : "/ruby.png";
  const logoHref = mode === "cv" ? "/cv-home" : mode === "art" ? "/art-home" : "/home";

  return (
    <header className={`${headerClass} w-full`}>
      <nav className="mx-auto flex items-center justify-between gap-3 p-1 px-5">
        {/* left: logo */}
        <div className="flex items-center">
          <Link href={logoHref} className="flex items-center">
            <img
              src={logoSrc}
              alt="logo"
              className="w-20 h-20 object-contain"
              // hide the image on very small screens
              style={{ minWidth: 48 }}
            />
          </Link>
        </div>

        {/* right: links */}
        <div className="flex items-center justify-end gap-3">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link key={link.href} href={link.href} className={linkClass(isActive)}>
                {link.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}