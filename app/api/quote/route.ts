import { NextResponse } from "next/server";
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
  const name = clean(body.name);
  const contact_email = clean(body.contact_email);

  if (!name) {
    return null;
  }

  if (!contact_email || !isValidEmail(contact_email)) {
    return null;
  }

  return {
    name,
    contact_email,
    phone: clean(body.phone),
    contactPref: clean(body.contactPref) || "text",
    project_description: clean(body.project_description),
  };
}

async function submitToWeb3Forms(fields: QuoteFormFields) {
  const response = await fetch(WEB3FORMS.endpoint, {
    method: "POST",
    body: buildWeb3FormsPayload(fields),
  });

  const text = await response.text();

  let result: { success?: boolean; message?: string };

  try {
    result = JSON.parse(text) as { success?: boolean; message?: string };
  } catch {
    throw new Error("Unable to submit the quote request. Please try again.");
  }

  if (!response.ok || !result.success) {
    throw new Error(result.message || "Unable to submit the quote request.");
  }
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
      { message: "Please enter your name and a valid email address." },
      { status: 400 }
    );
  }

  try {
    await submitToWeb3Forms(fields);
    return NextResponse.json({ success: true });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to submit the quote request.";

    return NextResponse.json({ message }, { status: 500 });
  }
}
