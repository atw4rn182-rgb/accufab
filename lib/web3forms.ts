import { buildQuoteNotificationEmailHtml } from "./quote-email";

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
  contact_email: string;
  phone: string;
  contactPref: string;
  project_type: string;
  materials: string;
  specifications: string;
  quantity: string;
  timeline: string;
  details: string;
};

export function buildWeb3FormsPayload(fields: QuoteFormFields) {
  const contactEmail = fields.contact_email.trim();
  const body = new FormData();

  body.append("access_key", WEB3FORMS.accessKey);
  body.append("subject", WEB3FORMS.subject);
  body.append("from_name", "Accu-Fab Website Quote Form");
  body.append("message", buildQuoteNotificationEmailHtml(fields));
  body.append("replyto", contactEmail);

  return body;
}
