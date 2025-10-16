import { Nothing_You_Could_Do } from "next/font/google";

export default function LandingPage() {
  return (
    <main className="grid-background h-[100vh] flex items-center justify-center">
      <div className="p-8 dark:bg-black/50 rounded text-center">
        
        <h2>Welcome to My Portfolio</h2>
        <p>This is the landing page content.</p>
        <img
          src="/ruby.png"
          alt="Ruby"
          className="w-300 h-auto mx-auto mb-4"
        />
      </div>
    </main>
  );
}
