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

/**
 * Simple, accessible footer component.
 * - Shows current year and owner name
 * - Renders a small set of nav links (use `links` prop to customize)
 *
 * Usage:
 * <Footer owner="Your Name" />
 */
const Footer: React.FC<FooterProps> = ({
    className = "",
    owner = "Ruby",
    links,
}) => {
    const year = new Date().getFullYear();

    const defaultLinks: LinkItem[] = [
        { label: "Home", href: "/home" },
        { label: "Contact", href: "/contact" },
        { label: "GitHub", href: "https://github.com/rubyy-liu", external: true },
        { label: "LinkedIn", href: "https://www.linkedin.com/in/rubyyliu", external: true },
    ];

    const items = links && links.length ? links : defaultLinks;

    return (
        <footer
            aria-label="Site footer"
            className={className}
            style={{
                borderTop: "1px solid rgba(0,0,0,0.08)",
                padding: "1rem 1.25rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "1rem",
                fontSize: "0.9rem",
                background: "transparent",
            }}
        >
            <div style={{ color: "inherit" }}>
                <span>© {year} {owner}.</span>
                <span style={{ marginLeft: 8, color: "rgba(0,0,0,0.6)" }}>All rights reserved.</span>
            </div>

            <nav aria-label="Footer navigation">
                <ul
                    style={{
                        listStyle: "none",
                        margin: 0,
                        padding: 0,
                        display: "flex",
                        gap: "0.75rem",
                        alignItems: "center",
                    }}
                >
                    {items.map((item) => (
                        <li key={item.href}>
                            <a
                                href={item.href}
                                target={item.external ? "_blank" : undefined}
                                rel={item.external ? "noopener noreferrer" : undefined}
                                style={{
                                    textDecoration: "none",
                                    color: "inherit",
                                    opacity: 0.85,
                                }}
                            >
                                {item.label}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </footer>
    );
};

export default Footer;