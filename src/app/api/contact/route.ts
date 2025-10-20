import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const host = process.env.SMTP_HOST;
    const port = Number(process.env.SMTP_PORT || 587);
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const to = process.env.TO_EMAIL;
    const fromEnv = process.env.FROM_EMAIL; // use verified sender

    if (!host || !user || !pass || !to || !fromEnv) {
      return NextResponse.json({ error: "Mail configuration missing (including FROM_EMAIL)" }, { status: 500 });
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });

    const html = `
      <h2>Contact form submission</h2>
      <p><strong>Name:</strong> ${String(name)}</p>
      <p><strong>Email:</strong> ${String(email)}</p>
      <p><strong>Message:</strong><br/>${String(message).replace(/\n/g, "<br/>")}</p>
    `;

    await transporter.sendMail({
      from: `"Art Contact" <${fromEnv}>`, // verified sender
      to,
      replyTo: email,                           // user's address for replies
      subject: `New message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      html,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }
}