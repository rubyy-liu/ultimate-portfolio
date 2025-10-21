"use client";

import React, { useState } from "react";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      if (!res.ok) throw new Error("Failed to send");

      setSent(true);
      setTimeout(() => setSent(false), 3000);
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      console.error(err);
      // show error to user as needed
      alert("Could not send message. Please try again later.");
    }
  };

  return (
    <main className="bg-[#2C2C2C] flex items-center justify-center py-12">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">

        {/* Contact form */}
        <div className="bg-white/6 p-8 rounded-2xl border border-white/8">
          <h2 className="text-3xl font-semibold text-[#FAE9DD] mb-2">Send me a message</h2>
          <p className="text-sm text-slate-300 mb-6">I&apos;d love to hear from you!</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block">
              <span className="text-sm text-[#FAE9DD]">Your name</span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="mt-2 w-full rounded-md bg-white/5 border border-white/10 text-white px-3 py-2 outline-none focus:ring-2 focus:ring-white"
                placeholder="Name"
              />
            </label>

            <label className="block">
              <span className="text-sm text-[#FAE9DD]">Email</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-2 w-full rounded-md bg-white/5 border border-white/10 text-white px-3 py-2 outline-none focus:ring-2 focus:ring-white"
                placeholder="you@example.com"
              />
            </label>

            <label className="block">
              <span className="text-sm text-[#FAE9DD]">Message</span>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                rows={6}
                className="mt-2 w-full rounded-md bg-white/5 border border-white/10 text-white px-3 py-2 outline-none focus:ring-2 focus:ring-white resize-y"
                placeholder="Write your message..."
              />
            </label>

            <div className="flex items-center gap-4">
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-full bg-[#C3B1A4] hover:bg-[#FFFFFF] text-[#2C2C2C] px-5 py-2.5 text-sm font-medium transition"
              >
                Send message
              </button>

              {sent && (
                <span className="text-sm text-green-400">Message sent — talk soon!</span>
              )}
            </div>
          </form>
        </div>
        
        {/* Large image of Ruby */}
        <div className="overflow-hidden w-full flex justify-center">
          {/* reduced height and zoomed image */}
            <img
              src="/Art-Ruby.png"
              alt="Ruby"
              className="w-auto h-150 object-cover filter saturate-50 contrast-130"
              draggable={false}
            />
        </div>
      </div>
    </main>
  );
}
