"use client";

import React from "react";

export default function CVTitlePage() {
  return (
    <main className="min-h-screen flex items-center justify-center grid-background">
      <div className="w-full max-w-4xl px-6 py-24">
        <section className="text-[#2C2C2C]">
          <hgroup className="mb-8">
            <h1 className="cv-title">
              <span className="handwrite">
                Ruby Liu
                <span className="pen" aria-hidden />
              </span>
            </h1>

          </hgroup>

          <p className="lead mb-8">
            Welcome — hit the button below to view my CV.
          </p>

          <div>
            <a
              href="/cv-resume"
              className="inline-block rounded-full bg-[#2C2C2C] text-white px-5 py-2.5 text-sm font-medium hover:opacity-90 transition"
            >
              View full CV
            </a>
          </div>
        </section>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nothing+You+Could+Do&display=swap');

        :root {
          --cv-color: #2C2C2C;
          --page-bg: #ffffff;
        }

        /* ensure the title has enough vertical space so large glyphs aren't clipped */
        .cv-title {
          margin: 0 0 0.5rem 0;
          line-height: 1.02;
          font-weight: 400;
          overflow: visible; /* allow large glyphs to render outside the line box */
          padding-bottom: 0.25rem;
        }

        .handwrite {
          font-family: 'Nothing You Could Do', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial;
          font-size: clamp(2.5rem, 10vw, 6rem);
          color: var(--cv-color);
          display: inline-block;
          position: relative;
          white-space: nowrap;
          overflow: visible; /* important: let oversized glyph metrics show */
          will-change: transform;
          /* slide-in from left */
          transform: translateX(-110%);
          animation: slide-in 1200ms cubic-bezier(.22,.98,.38,.99) forwards;
        }

        /* small "pen" element that travels along with the slide */
        .pen {
          position: absolute;
          top: 55%;
          left: 0%;
          transform: translate(-50%, -50%) rotate(-8deg);
          width: 18px;
          height: 4px;
          background: var(--cv-color);
          border-radius: 4px;
          box-shadow: 0 2px 6px rgba(0,0,0,0.12);
          opacity: 0;
          z-index: 3;
          animation: pen-slide 1200ms cubic-bezier(.22,.98,.38,.99) forwards;
        }

        .cv-subtitle {
          margin: 0;
          color: var(--cv-color);
          font-size: 1rem;
          opacity: 0.9;
        }

        .lead {
          color: var(--cv-color);
          opacity: 0.85;
          max-width: 60ch;
        }

        /* slide keyframes */
        @keyframes slide-in {
          0%   { transform: translateX(-110%); }
          80%  { transform: translateX(4%); }  /* slight overshoot for natural feel */
          100% { transform: translateX(0%); }
        }

        @keyframes pen-slide {
          0% {
            left: -6%;
            opacity: 1;
            transform: translate(-50%, -50%) rotate(-8deg) scaleX(1);
          }
          70% {
            left: 98%;
            opacity: 1;
            transform: translate(-50%, -50%) rotate(-4deg) scaleX(0.98);
          }
          100% {
            left: 105%;
            opacity: 0;
            transform: translate(-50%, -50%) rotate(-3deg) scaleX(0.95);
          }
        }

        /* accessibility: prefer reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .handwrite,
          .pen {
            animation: none;
          }
          .handwrite { transform: none; }
          .pen { display: none; }
        }

        /* responsive spacing tweaks */
        @media (max-width: 640px) {
          .lead { font-size: 0.95rem; }
          .cv-subtitle { font-size: 0.95rem; }
          .pen { width: 14px; height: 3px; top: 58%; }
        }
      `}</style>
    </main>
  );
}
