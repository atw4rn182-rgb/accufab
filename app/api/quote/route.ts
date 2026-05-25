import { NextResponse } from "next/server";
import {
  isQuoteMailConfigured,
  sendQuoteConfirmationEmail,
  sendQuoteNotificationEmail,
} from "@/lib/quote-mailer";
import {
  WEB3FORMS,
  buildWeb3FormsPayload,
  type QuoteFormFields,
} from "@/lib/web3forms";

function clean(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function parseQuoteFields(body: Record<string, unknown>): QuoteFormFields | null {
  const contact_email = clean(body.contact_email);

  if (!contact_email || !isValidEmail(contact_email)) {
    return null;
  }

  return {
    contact_email,
    phone: clean(body.phone),
    contactPref: clean(body.contactPref) || "text",
    project_type: clean(body.project_type),
    materials: clean(body.materials),
    specifications: clean(body.specifications),
    quantity: clean(body.quantity),
    timeline: clean(body.timeline),
    details: clean(body.details),
  };
}

async function submitToWeb3Forms(fields: QuoteFormFields) {
  const response = await fetch(WEB3FORMS.endpoint, {
    method: "POST",
    body: buildWeb3FormsPayload(fields),
  });

  const result = (await response.json()) as { success?: boolean; message?: string };

  if (!response.ok || !result.success) {
    throw new Error(result.message || "Unable to submit the quote request.");
  }
}

async function deliverTeamNotification(fields: QuoteFormFields) {
  if (isQuoteMailConfigured()) {
    try {
      await sendQuoteNotificationEmail(fields);
      return;
    } catch {
      // Fall back to Web3Forms if SMTP delivery fails.
    }
  }

  await submitToWeb3Forms(fields);
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;

  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ message: "Invalid quote request." }, { status: 400 });
  }

  const fields = parseQuoteFields(body);

  if (!fields) {
    return NextResponse.json(
      { message: "Please enter a valid email address." },
      { status: 400 }
    );
  }

  try {
    await deliverTeamNotification(fields);

    if (isQuoteMailConfigured()) {
      try {
        await sendQuoteConfirmationEmail(fields.contact_email);
      } catch {
        // Team notification succeeded; do not block the customer if confirmation fails.
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to submit the quote request.";

    return NextResponse.json({ message }, { status: 500 });
  }
}
