/**
 * Web3Forms delivers notifications to the email address linked to `accessKey`
 * in the Web3Forms dashboard. That address must be ONLY:
 * accufab.weld@gmail.com only — not a personal inbox.
 */
export const ACCUFAB_NOTIFICATION_EMAIL = "accufab.weld@gmail.com" as const;

export const WEB3FORMS = {
  endpoint: "https://api.web3forms.com/submit",
  accessKey:
    process.env.WEB3FORMS_ACCESS_KEY ??
    process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ??
    "6ef57f89-35aa-4ac1-a0d7-e13bcaffd077",
  subject: "New Accu-Fab quote request",
  /** Sole notification recipient (must match the email on this access key in Web3Forms). */
  recipientEmail: ACCUFAB_NOTIFICATION_EMAIL,
} as const;

export type QuoteFormFields = {
  name: string;
  contact_email: string;
  phone: string;
  contactPref: string;
  project_description: string;
};

export const QUICKBOOKS_CREATE_QUOTE_URL = "https://qbo.intuit.com/app/invoices";

export const GOOGLE_CALENDAR_SCHEDULE_URL =
  "https://calendar.google.com/calendar/u/0/r/eventedit";

const CONTACT_PREF_LABELS: Record<string, string> = {
  call: "Phone Call",
  text: "Text Message",
  either: "Either Call or Text",
  email: "Email Only",
};

function displayValue(value: string, fallback = "Not provided") {
  const trimmed = value.trim();
  return trimmed || fallback;
}

function formatContactPref(value: string) {
  return CONTACT_PREF_LABELS[value] ?? displayValue(value);
}

export function buildQuoteNotificationMessage(fields: QuoteFormFields) {
  return [
    "Hello,",
    "",
    "New Quote Request",
    "",
    "Create Quote in QuickBooks:",
    QUICKBOOKS_CREATE_QUOTE_URL,
    "",
    "Schedule Job in Google Calendar:",
    GOOGLE_CALENDAR_SCHEDULE_URL,
    "",
    "---",
    "",
    `Name: ${displayValue(fields.name)}`,
    `Email: ${displayValue(fields.contact_email)}`,
    `Phone: ${displayValue(fields.phone, "Not provided")}`,
    `Preferred Contact: ${formatContactPref(fields.contactPref)}`,
    "",
    "Project Description:",
    displayValue(fields.project_description),
  ].join("\n");
}

export function buildWeb3FormsPayload(fields: QuoteFormFields) {
  const contactEmail = fields.contact_email.trim();
  const body = new FormData();

  body.append("access_key", WEB3FORMS.accessKey);
  body.append("subject", WEB3FORMS.subject);
  body.append("from_name", "Accu-Fab Website Quote Form");
  body.append("message", buildQuoteNotificationMessage(fields));
  body.append("replyto", contactEmail);

  return body;
}
