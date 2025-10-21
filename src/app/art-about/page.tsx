export default function About() {
  return (
    <main className="bg-[#2C2C2C] min-h-screen py-12 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        {/* left: portrait / featured image */}
        <div className="flex items-center justify-center">
          <div className="w-full max-w-md">
            <img
              src="/comRuby.png"
              alt="Ruby"
              className="w-full h-auto object-cover filter saturate-50 contrast-130"
              draggable={false}
            />
          </div>
        </div>

        {/* right: bio, skills, contact */}
        <div className="text-white">
          <h1 className="text-4xl font-semibold mb-4 text-[#FAE9DD]">Hi, it&apos;s Ruby - again</h1>
          <h2 className="text-2xl font-medium mb-4 text-[#FAE9DD]">A little bit more about me</h2>
          <p className="text-lg text-slate-300 mb-6">
            Im a multidisciplinary artist and software developer with a passion for both traditional art and digital design.
            I work across many mediums as I love experimenting with texture, layering, and mark-making.
          </p>

          <section className="mb-6">
            <h2 className="text-xl font-medium mb-3 text-[#FAE9DD]">What I do</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-300">
              <li>Original prints & editions</li>
              <li>Resin and mixed-media works</li>
              <li>Illustration & drawing</li>
              <li>Commissions</li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-medium mb-3 text-[#FAE9DD]">Exhibitions & selected shows</h2>
            <p className="text-slate-300 text-sm">
              Exhibited in ARTEXPRESS at the Newington Armory Gallery. Commission work and
              collaborations available on request.
            </p>
          </section>

          <div className="flex flex-wrap gap-3 mt-6">
            <a
              href="/art-contact"
              className="inline-block bg-[#C3B1A4] hover:bg-[#FFFFFF] text-[#2C2C2C] px-5 py-2 rounded-full text-sm transition"
            >
              Contact me
            </a>

            <a
              href="https://github.com/rubyy-liu"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-white/6 text-slate-300 px-4 py-2 rounded-full text-sm hover:bg-white/10 transition"
            >
              GitHub
            </a>

            <a
              href="https://www.linkedin.com/in/rubyyliu"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-white/6 text-slate-300 px-4 py-2 rounded-full text-sm hover:bg-white/10 transition"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}