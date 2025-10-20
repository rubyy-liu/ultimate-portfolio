import React from "react";

type Entry = {
  title: string;
  subtitle?: string;
  logo?: string;
  date?: string;
  details?: string[];
};

const education: Entry[] = [
  {
    title: "Bachelor of Computer Science",
    subtitle: "University of New South Wales",
    logo: "/UNSW1.png",
    date: "2021 — 2025",
    details: ["Minor: Marketing"],
  },
];

const work: Entry[] = [
  {
    title: "Lead UX/UI Designer",
    subtitle: "oNex",
    logo: "/oNex.png",
    date: "Apr 2025 — Present",
    details: ["Spearheaded design of a mobile fitness app, including user research, prototyping, and usability testing",
              "Led a cross-functional team of designers and developers to implement responsive UI"],
  },
  {
    title: "Software Engineering Intern",
    subtitle: "CalcTree",
    logo: "/CalcTree.png",
    date: "Jul 2025 — Present",
    details: ["Developed and maintained synthetic browser tests using Datadog to ensure reliability and performance of web-based features",
              "Identified and documented UI regressions and performance issues through automated testing pipelines"],
  },
  {
    title: "AI Work Integreated Placement",
    subtitle: "Gate Gourmet Japan",
    logo: "/GG.png",
    date: "Aug 2024 — Sept 2024",
    details: ["Optimised shift assignments using AI for Gate Gourmet warehousing facility with the goal to reduce overtime and employee morale",
              "Pitched solutions to Narita management team, then invited to re-pitch ideas to Sydney team upon returning to Sydney"],
  },
];

const projects: Entry[] = [
  {
    title: "eReuse Volunteer",
    subtitle: "Arc UNSW",
    logo: "/Arc.png",
    date: "Mar 2025 - Aug 2025",
    details: ["Volunteering in UNSW's eReuse program by refurbishing donated electronics to help divert ewaste from landfill and provide affordable tech to disadvantaged communities"],
  },
  {
    title: "Innovator PRO",
    subtitle: "UNSW",
    logo: "/UNSW1.png",
    date: "Feb 2025",
    details: ["Intrapreneurship competition to pitch solutions for problems faced by industry partners",],
  },
];

const skills = [
  "React / Next.js",
  "TypeScript",
  "Tailwind CSS",
  "Accessibility",
  "Figma",
  "User Research",
  "Prototyping",
  "Usability Testing",
  "Python",
  "Java",
  "C+",
  "SQL",
];

function CVEntry({ e }: { e: Entry }) {
  return (
    <article className="relative bg-white/90 rounded-2xl p-4 md:p-6 border-2 border-[#A6E1FF] hover:shadow-lg transition-shadow">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden bg-[#f3f3f3] flex items-center justify-center">
            {e.logo ? (
              <img src={e.logo} alt={e.title} className="w-full h-full object-cover" draggable={false} />
            ) : (
              <div className="text-sm text-[#2C2C2C] font-medium">{e.title.split(" ").slice(0,2).join(" ")}</div>
            )}
          </div>
        </div>

        <div className="flex-1">
          <h3 className="text-lg md:text-xl font-semibold text-[#2C2C2C]">{e.title}</h3>
          {e.subtitle && <p className="text-sm text-[#2C2C2C] opacity-90 mt-1">{e.subtitle}</p>}

          {e.details && (
            <ul className="mt-3 text-sm text-[#2C2C2C] space-y-1">
              {e.details.map((d, i) => (
                <li key={i} className="list-disc ml-4">
                  {d}
                </li>
              ))}
            </ul>
          )}
        </div>

        {e.date && (
          <div className="absolute right-4 top-4 text-sm text-[#2C2C2C] opacity-90">
            {e.date}
          </div>
        )}
      </div>
    </article>
  );
}

export default function Page() {
  return (
    <>
    <style>{`@import url('https://fonts.googleapis.com/css2?family=Nothing+You+Could+Do&display=swap');`}</style>
    <main className="grid-background min-h-screen py-12 px-6">
      <div className="max-w-5xl mx-auto">
        <header className="mb-8">
          <h1 className="text-9xl md:text-5xl font-bold text-[#2C2C2C] nothing-you-could-do-regular">Curriculum Vitae</h1>
          <p className="mt-2 text-sm text-[#2C2C2C] opacity-90">
            Selected education, work experience, projects and technical skills.
          </p>
        </header>

        <section className="space-y-6 mb-8">
          <h2 className="text-4xl font-semibold text-[#2C2C2C] nothing-you-could-do-regular">Education</h2>
          <div className="grid gap-4">
            {education.map((e, i) => (
              <CVEntry key={i} e={e} />
            ))}
          </div>
        </section>

        <section className="space-y-6 mb-8">
          <h2 className="text-4xl font-semibold text-[#2C2C2C] nothing-you-could-do-regular">Work Experience</h2>
          <div className="grid gap-4">
            {work.map((e, i) => (
              <CVEntry key={i} e={e} />
            ))}
          </div>
        </section>

        <section className="space-y-6 mb-8">
          <h2 className="text-4xl font-semibold text-[#2C2C2C] nothing-you-could-do-regular">Projects</h2>
          <div className="grid gap-4">
            {projects.map((e, i) => (
              <CVEntry key={i} e={e} />
            ))}
          </div>
        </section>

        <section className="space-y-4 mb-8">
          <h2 className="text-4xl font-semibold text-[#2C2C2C] nothing-you-could-do-regular ">Technical skills</h2>
          <div className="flex flex-wrap gap-3 mt-2">
            {skills.map((s) => (
              <span key={s} className="inline-block bg-white/90 text-[#2C2C2C] px-3 py-1 rounded-full text-sm border">
                {s}
              </span>
            ))}
          </div>
        </section>

        <footer className="mt-12 text-sm text-[#2C2C2C] opacity-90">
          <p>References available on request · Last updated {new Date().getFullYear()}</p>

          {/* Download CV button — place a PDF named "Ruby_CV.pdf" (or change href) into /public */}
          <div className="mt-4">
            <a
              href="/RL-Resume.pdf"
              download
              aria-label="Download Ruby's CV"
              className="inline-flex items-center gap-2 rounded-full bg-[#2C2C2C] text-white px-4 py-2 text-sm font-medium hover:opacity-90 transition"
            >
              {/* simple download icon */}
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download CV
            </a>
          </div>
        </footer>
      </div>
    </main>
    </>
  );
}
