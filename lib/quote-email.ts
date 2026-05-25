import type { QuoteFormFields } from "./web3forms";

/** Direct link to create an invoice/quote in QuickBooks Online. */
export const QUICKBOOKS_CREATE_QUOTE_URL = "https://qbo.intuit.com/app/invoices";

export const QUICKBOOKS_CREATE_QUOTE_BUTTON_HTML = `<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin:20px 0 28px;">
  <tr>
    <td align="center" style="padding:8px 0;">
      <a href="${QUICKBOOKS_CREATE_QUOTE_URL}"
         target="_blank"
         rel="noopener noreferrer"
         style="background-color:#1e40af; color:#ffffff; padding:20px 40px; text-decoration:none; border-radius:8px; font-weight:700; font-size:20px; display:inline-block; line-height:1.25; font-family:Arial, Helvetica, sans-serif; box-shadow:0 4px 14px rgba(30,64,175,0.45);">
        Create Quote in QuickBooks
      </a>
    </td>
  </tr>
</table>`;

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

function fieldRow(label: string, value: string) {
  return `<tr>
    <td style="padding:10px 12px; border-bottom:1px solid #e5e7eb; font-weight:700; color:#374151; width:38%; vertical-align:top;">${escapeHtml(label)}</td>
    <td style="padding:10px 12px; border-bottom:1px solid #e5e7eb; color:#111827; vertical-align:top; white-space:pre-wrap;">${escapeHtml(value)}</td>
  </tr>`;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function buildQuoteNotificationEmailHtml(fields: QuoteFormFields) {
  const rows = [
    fieldRow("Email", displayValue(fields.contact_email)),
    fieldRow("Phone", displayValue(fields.phone, "Not provided")),
    fieldRow("Preferred Contact", formatContactPref(fields.contactPref)),
    fieldRow("Project Description", displayValue(fields.project_type)),
    fieldRow("Materials", displayValue(fields.materials, "Not provided")),
    fieldRow("Specifications", displayValue(fields.specifications, "Not provided")),
    fieldRow("Quantity", displayValue(fields.quantity, "Not provided")),
    fieldRow("Timeline", displayValue(fields.timeline, "Not provided")),
    fieldRow("Additional Details", displayValue(fields.details, "Not provided")),
  ].join("\n    ");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
</head>
<body style="margin:0; padding:0; font-family:Arial, Helvetica, sans-serif; font-size:16px; line-height:1.5; color:#1f2937; background-color:#f9fafb;">
  <div style="max-width:680px; margin:0 auto; padding:24px;">
    <div style="background:#ffffff; border:1px solid #e5e7eb; border-radius:8px; padding:24px;">
      <p style="margin:0 0 8px; font-size:18px; font-weight:700; color:#111827;">Hello,</p>
      <p style="margin:0 0 4px; font-size:15px; color:#4b5563;">You have a new quote request from the Accu-Fab NM website.</p>
      ${QUICKBOOKS_CREATE_QUOTE_BUTTON_HTML}
      <h2 style="margin:0 0 12px; font-size:16px; font-weight:700; color:#111827;">Customer Information</h2>
      <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse; border:1px solid #e5e7eb; border-radius:6px; overflow:hidden; font-size:15px;">
        ${rows}
      </table>
    </div>
  </div>
</body>
</html>`;
}

/** Plain-text fallback for the team notification email. */
export function buildQuoteNotificationEmailText(fields: QuoteFormFields) {
  return [
    "New quote request from the Accu-Fab NM website",
    "",
    `Create quote in QuickBooks: ${QUICKBOOKS_CREATE_QUOTE_URL}`,
    "",
    `Email: ${displayValue(fields.contact_email)}`,
    `Phone: ${displayValue(fields.phone, "Not provided")}`,
    `Preferred Contact: ${formatContactPref(fields.contactPref)}`,
    "",
    "Project Description:",
    displayValue(fields.project_type),
    "",
    "Materials:",
    displayValue(fields.materials, "Not provided"),
    "",
    "Specifications:",
    displayValue(fields.specifications, "Not provided"),
    "",
    "Quantity:",
    displayValue(fields.quantity, "Not provided"),
    "",
    "Timeline:",
    displayValue(fields.timeline, "Not provided"),
    "",
    "Additional Details:",
    displayValue(fields.details, "Not provided"),
  ].join("\n");
}
