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

  function renderIcon(item: LinkItem) {
    const href = item.href ?? "";
    if (href === "/" || item.label.toLowerCase() === "home") {
      // house icon
      return (
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
          <path d="M3 11.5L12 4l9 7.5" />
          <path d="M5 11.5v7a1 1 0 0 0 1 1h3v-5h6v5h3a1 1 0 0 0 1-1v-7" />
        </svg>
      );
    }

    if (href.includes("cv-contact") || item.label.toLowerCase().includes("contact")) {
      // phone icon
      return (
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
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.07-8.63A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12 1.21.38 2.39.75 3.5a2 2 0 0 1-.45 2.11L8.09 10.91a16 16 0 0 0 6 6l1.58-1.58a2 2 0 0 1 2.11-.45c1.11.37 2.29.63 3.5.75A2 2 0 0 1 22 16.92z" />
        </svg>
      );
    }

    if (href.includes("github.com")) {
      // GitHub mark
      return (
        <svg
          className="block sm:hidden w-5 h-5 text-gray-800"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden
        >
          <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.38 7.86 10.9.57.1.78-.25.78-.55 0-.27-.01-1-.02-1.96-3.2.7-3.88-1.38-3.88-1.38-.52-1.32-1.28-1.67-1.28-1.67-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.74.4-1.26.73-1.55-2.56-.29-5.26-1.28-5.26-5.7 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .98-.31 3.2 1.18a11.1 11.1 0 0 1 5.82 0c2.22-1.49 3.2-1.18 3.2-1.18.63 1.59.23 2.76.11 3.05.74.8 1.19 1.83 1.19 3.09 0 4.43-2.71 5.4-5.29 5.68.41.35.78 1.05.78 2.12 0 1.53-.01 2.76-.01 3.14 0 .3.21.66.79.55A10.51 10.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
        </svg>
      );
    }

    if (href.includes("linkedin.com")) {
      // LinkedIn logo
      return (
        <svg
          className="block sm:hidden w-5 h-5 text-gray-800"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden
        >
          <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM9 9h3.8v1.6h.1c.5-.9 1.8-1.8 3.7-1.8 4 0 4.7 2.6 4.7 6v7.2H19V15.3c0-2.1-.04-4.8-3-4.8-3 0-3.5 2.3-3.5 4.6V21H9z" />
        </svg>
      );
    }

    // default compact dot for other internal links
    return <span className="block sm:hidden w-2 h-2 rounded-full bg-gray-800" />;
  }

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
                  {renderIcon(item)}
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