/** HTML intro for quote notification emails (greeting + Zoho CTA). Form fields follow below via Web3Forms. */

export const ZOHO_CREATE_QUOTE_URL = "https://invoice.zoho.com/app#/quotes/new";

export const ZOHO_CREATE_QUOTE_BUTTON_HTML = `<a href="${ZOHO_CREATE_QUOTE_URL}" 
   style="background-color:#1e40af; color:white; padding:16px 28px; text-decoration:none; border-radius:6px; font-weight:600; font-size:16px; display:inline-block; margin:20px 0;">
  Create Quote in Zoho
</a>`;

export function buildQuoteEmailIntroHtml() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
</head>
<body style="margin:0; padding:0; font-family:Arial, Helvetica, sans-serif; font-size:16px; line-height:1.5; color:#1f2937;">
  <div style="max-width:640px; padding:24px;">
    <p style="margin:0 0 12px;">Hello,</p>
    <p style="margin:0 0 8px;">You have a new quote request from the Accu-Fab NM website.</p>
    <p style="margin:0 0 4px;">Click below to create a quote in Zoho:</p>
    ${ZOHO_CREATE_QUOTE_BUTTON_HTML}
  </div>
</body>
</html>`;
}
