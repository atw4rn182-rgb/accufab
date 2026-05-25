import nodemailer from "nodemailer";
import {
  buildQuoteNotificationEmailHtml,
  buildQuoteNotificationEmailText,
} from "@/lib/quote-email";
import {
  QUOTE_CONFIRMATION_BODY,
  buildQuoteConfirmationEmailHtml,
} from "@/lib/quote-confirmation";
import { ACCUFAB_NOTIFICATION_EMAIL, WEB3FORMS, type QuoteFormFields } from "@/lib/web3forms";

function buildTransporter() {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    host,
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === "true",
    auth: { user, pass },
  });
}

export function isQuoteMailConfigured() {
  return buildTransporter() !== null;
}

function getFromAddress() {
  return process.env.QUOTE_EMAIL_FROM || process.env.SMTP_USER || ACCUFAB_NOTIFICATION_EMAIL;
}

/** Team notification with HTML buttons (QuickBooks + Google Calendar). */
export async function sendQuoteNotificationEmail(fields: QuoteFormFields) {
  const transporter = buildTransporter();

  if (!transporter) {
    throw new Error(
      "Team notification email is not configured. Set SMTP_HOST, SMTP_USER, and SMTP_PASS."
    );
  }

  const from = getFromAddress();

  await transporter.sendMail({
    from: `"Accu-Fab NM Quote Form" <${from}>`,
    to: ACCUFAB_NOTIFICATION_EMAIL,
    replyTo: fields.contact_email,
    subject: WEB3FORMS.subject,
    text: buildQuoteNotificationEmailText(fields),
    html: buildQuoteNotificationEmailHtml(fields),
  });
}

export async function sendQuoteConfirmationEmail(to: string) {
  const transporter = buildTransporter();

  if (!transporter) {
    throw new Error(
      "Confirmation email is not configured. Set SMTP_HOST, SMTP_USER, and SMTP_PASS."
    );
  }

  const from = getFromAddress();

  await transporter.sendMail({
    from: `"Accu-Fab NM" <${from}>`,
    to,
    replyTo: ACCUFAB_NOTIFICATION_EMAIL,
    subject: "We received your quote request — Accu-Fab NM",
    text: QUOTE_CONFIRMATION_BODY,
    html: buildQuoteConfirmationEmailHtml(),
  });
}
