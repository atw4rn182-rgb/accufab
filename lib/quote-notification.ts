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

/** Plain-text team notification — no HTML. */
export function buildQuoteNotificationMessage(fields: QuoteFormFields) {
  return [
    "New Quote Request from Website",
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
