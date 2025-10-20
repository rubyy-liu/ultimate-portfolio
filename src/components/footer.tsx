import React from "react";

type LinkItem = {
  label: string;
  href: string;
  external?: boolean;
};

type FooterProps = {
  className?: string;
  owner?: string;
  links?: LinkItem[];
};

const Footer: React.FC<FooterProps> = ({ className = "", owner = "Ruby", links }) => {
  const year = new Date().getFullYear();
  const defaultLinks: LinkItem[] = [
    { label: "Home", href: "/" },
    { label: "Contact", href: "/cv-contact" },
    { label: "GitHub", href: "https://github.com/rubyy-liu", external: true },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/rubyyliu", external: true },
  ];

  const items = links && links.length ? links : defaultLinks;

  return (
    <footer
      aria-label="Site footer"
      className={`w-full border-t border-white/6 bg-transparent px-4 py-4 ${className}`}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
        {/* left: compact on mobile, full text on tablet+ */}
        <div className="text-sm text-gray-200">
          <span className="block sm:hidden">© {year}</span>
          <span className="hidden sm:inline">
            © {year} {owner}. <span className="text-gray-400 ml-2">All rights reserved.</span>
          </span>
        </div>

        {/* nav: text hidden on mobile, small icons/dots shown instead */}
        <nav aria-label="Footer navigation">
          <ul className="flex items-center gap-3">
            {items.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  aria-label={item.label}
                  className="inline-flex items-center gap-2 text-sm text-gray-800 no-underline hover:opacity-90"
                >
                  {/* mobile: show a compact visual (icon for external links, dot for internal) */}
                  {item.external ? (
                    <svg
                      className="block sm:hidden w-5 h-5 text-gray-800"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden
                    >
                      {/* external link / share icon */}
                      <path d="M18 13v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                  ) : (
                    <span className="block sm:hidden w-2 h-2 rounded-full bg-gray-800" />
                  )}

                  {/* label: hidden on small screens, visible from sm+ */}
                  <span className="hidden sm:inline">{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;