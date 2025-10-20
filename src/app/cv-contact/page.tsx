"use client";

import React, { useState } from "react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.error || "Failed to send");
      }

      setSent(true);
      setName("");
      setEmail("");
      setMessage("");
      setTimeout(() => setSent(false), 3000);
    } catch (err: any) {
      setError(err?.message || "Unable to send message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <style>{`@import url('https://fonts.googleapis.com/css2?family=Nothing+You+Could+Do&display=swap');`}</style>
    <main className="grid-background flex items-center justify-center py-12 px-4">
      <div className="max-w-3xl w-full bg-white/5 border border-white/6 rounded-2xl p-8">
        <h1 className="text-5xl font-semibold text-[#2C2C2C] mb-4 nothing-you-could-do-regular">Contact me</h1>
        <p className="text-3xl text-[#2C2C2C] mb-6 nothing-you-could-do-regular">
          Send a message and I will get back to you.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* label on the left, input on the right — stacks on small screens */}
            <div className="grid gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
              <label htmlFor="name" className="w-full sm:w-36 text-3xl text-[#2C2C2C] nothing-you-could-do-regular">
              Name:
              </label>
              <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Your name"
              className="flex-1 h-12 bg-transparent border-b border-[#2C2C2C] placeholder:text-[#2C2C2C] placeholder:opacity-60 text-[#2C2C2C] py-2 focus:outline-none focus:border-[#2C2C2C] transition"
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
              <label htmlFor="email" className="w-full sm:w-36 text-3xl text-[#2C2C2C] nothing-you-could-do-regular">
              Email:
              </label>
              <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
              className="flex-1 h-12 bg-transparent border-b border-[#2C2C2C] placeholder:text-[#2C2C2C] placeholder:opacity-60 text-[#2C2C2C] py-2 focus:outline-none focus:border-[#2C2C2C] transition"
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-start sm:gap-4">
              <label htmlFor="message" className="w-full sm:w-36 text-3xl text-[#2C2C2C] pt-2 sm:pt-0 nothing-you-could-do-regular">
              Message:
              </label>
              <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              rows={1}
              placeholder="Write your message..."
              className="flex-1 h-12 bg-transparent border-b border-[#2C2C2C] placeholder:text-[#2C2C2C] placeholder:opacity-60 text-[#2C2C2C] py-2 focus:outline-none focus:border-[#2C2C2C] transition"
              />
            </div>
            </div>

          <div className="flex items-center gap-4">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center rounded-full border border-[#A6E1FF] bg-white hover:bg-[#F0F0F0] text-slate-600 px-7 py-3 text-xl transition disabled:opacity-60 shadow-md"
            >
              {loading ? "Sending..." : "Send message"}
            </button>

            {sent && <span className="nothing-you-could-do-regular text-lg text-green-800">Message sent — thanks!</span>}
            {error && <span className="nothing-you-could-do-regular text-lg text-red-800">{error}</span>}
          </div>
        </form>
      </div>
    </main>
      </>
  );
}
