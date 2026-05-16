import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { COMPANY } from "@/lib/constants";

type QuoteRequest = {
  projectType?: string;
  materials?: string;
  specifications?: string;
  quantity?: string;
  timeline?: string;
  details?: string;
  email?: string;
  sendConfirmation?: boolean;
};

const quoteRecipient = "Accufab.weld@gmail.com";

function clean(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function buildTransporter() {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    throw new Error("Quote email delivery is not configured yet.");
  }

  return nodemailer.createTransport({
    host,
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === "true",
    auth: { user, pass },
  });
}

function formatQuoteEmail(data: Required<Omit<QuoteRequest, "sendConfirmation">>) {
  return [
    "New quote request from the Accu-Fab website",
    "",
    `Email: ${data.email || "Not provided"}`,
    "",
    "Project type:",
    data.projectType || "Not provided",
    "",
    "Materials:",
    data.materials || "Not provided",
    "",
    "Dimensions / specifications:",
    data.specifications || "Not provided",
    "",
    "Quantity:",
    data.quantity || "Not provided",
    "",
    "Timeline:",
    data.timeline || "Not provided",
    "",
    "Additional details:",
    data.details || "Not provided",
  ].join("\n");
}

export async function POST(request: Request) {
  let body: QuoteRequest;

  try {
    body = (await request.json()) as QuoteRequest;
  } catch {
    return NextResponse.json({ message: "Invalid quote request." }, { status: 400 });
  }

  const quoteData = {
    projectType: clean(body.projectType),
    materials: clean(body.materials),
    specifications: clean(body.specifications),
    quantity: clean(body.quantity),
    timeline: clean(body.timeline),
    details: clean(body.details),
    email: clean(body.email),
  };

  if (quoteData.email && !isValidEmail(quoteData.email)) {
    return NextResponse.json({ message: "Please enter a valid email address." }, { status: 400 });
  }

  try {
    const transporter = buildTransporter();
    const from = process.env.QUOTE_EMAIL_FROM || process.env.SMTP_USER || quoteRecipient;
    const replyTo = quoteData.email || quoteRecipient;

    await transporter.sendMail({
      from,
      to: quoteRecipient,
      replyTo,
      subject: "New Accu-Fab quote request",
      text: formatQuoteEmail(quoteData),
    });

    if (body.sendConfirmation && quoteData.email) {
      await transporter.sendMail({
        from,
        to: quoteData.email,
        replyTo: quoteRecipient,
        subject: "Accu-Fab received your quote request",
        text: [
          "Thank you for contacting Accu-Fab.",
          "",
          "We received your quote request and will review the project details before reaching out.",
          "",
          "For fastest follow-up, texting is preferred:",
          COMPANY.phone,
          "",
          "Accu-Fab",
          COMPANY.address,
        ].join("\n"),
      });
    }

    return NextResponse.json({
      message:
        body.sendConfirmation && quoteData.email
          ? "Your quote request was sent. A confirmation email was also sent to you."
          : "Your quote request was sent.",
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to send the quote request right now.";

    return NextResponse.json({ message }, { status: 500 });
  }
}
