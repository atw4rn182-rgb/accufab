import { COMPANY } from "@/lib/constants";

/**
 * Web3Forms delivers notifications to the email address linked to `accessKey`
 * in the Web3Forms dashboard. That address must be ONLY:
 * accufab.weld@gmail.com — not a personal inbox.
 */
export const WEB3FORMS = {
  endpoint: "https://api.web3forms.com/submit",
  accessKey:
    process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ??
    "12dc5a29-8e1b-4821-a069-09a3ada48db0",
  subject: "New Accu-Fab quote request",
  /** Sole notification recipient (configure this on the access key in Web3Forms). */
  recipientEmail: COMPANY.email,
} as const;

export type QuoteFormFields = {
  project_type: string;
  materials: string;
  specifications: string;
  quantity: string;
  timeline: string;
  details: string;
  contact_email: string;
};

export function buildWeb3FormsPayload(fields: QuoteFormFields) {
  const contactEmail = fields.contact_email.trim();
  const body = new FormData();

  body.append("access_key", WEB3FORMS.accessKey);
  body.append("subject", WEB3FORMS.subject);
  body.append("from_name", "Accu-Fab Website Quote Form");
  body.append("replyto", contactEmail);
  body.append("contact_email", contactEmail);
  body.append("notification_recipient", WEB3FORMS.recipientEmail);
  body.append("project_type", fields.project_type);
  body.append("materials", fields.materials);
  body.append("specifications", fields.specifications);
  body.append("quantity", fields.quantity);
  body.append("timeline", fields.timeline);
  body.append("details", fields.details);

  return body;
}
