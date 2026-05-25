/** Customer-facing copy for quote confirmation (email + on-site success message). */

export const QUOTE_CONFIRMATION_BODY = `Thank you for your quote request!

We've received your information and will review your project shortly. You will receive a formal quote from us via Zoho Invoice within 24 hours. The quote email will come from Zoho Invoice with a link where you can review and pay.

Thank you,
Accu-Fab NM`;

export const QUOTE_SUCCESS_MESSAGE = `${QUOTE_CONFIRMATION_BODY}

A confirmation email has been sent to the address you provided.`;

export function buildQuoteConfirmationEmailHtml() {
  const paragraphs = QUOTE_CONFIRMATION_BODY.split("\n\n").map(
    (block) => `<p style="margin:0 0 16px;">${escapeHtml(block).replace(/\n/g, "<br />")}</p>`
  );

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
</head>
<body style="margin:0; padding:0; font-family:Arial, Helvetica, sans-serif; font-size:16px; line-height:1.6; color:#1f2937;">
  <div style="max-width:640px; padding:24px;">
    ${paragraphs.join("\n    ")}
  </div>
</body>
</html>`;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
