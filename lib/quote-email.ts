/** HTML intro for quote notification emails (greeting + Zoho CTA). Form fields follow below via Web3Forms. */

/** Direct link to new quote in the Accu-Fab Zoho Invoice account. */
export const ZOHO_CREATE_QUOTE_URL = "https://invoice.zoho.com/app#/quotes/new";

export const ZOHO_CREATE_QUOTE_BUTTON_HTML = `<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin:20px 0 28px;">
  <tr>
    <td align="center" style="padding:8px 0;">
      <a href="${ZOHO_CREATE_QUOTE_URL}"
         target="_blank"
         rel="noopener noreferrer"
         style="background-color:#1e40af; color:#ffffff; padding:20px 40px; text-decoration:none; border-radius:8px; font-weight:700; font-size:20px; display:inline-block; line-height:1.25; font-family:Arial, Helvetica, sans-serif; box-shadow:0 4px 14px rgba(30,64,175,0.45);">
        Create Quote in Zoho
      </a>
    </td>
  </tr>
</table>`;

export function buildQuoteEmailIntroHtml() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
</head>
<body style="margin:0; padding:0; font-family:Arial, Helvetica, sans-serif; font-size:16px; line-height:1.5; color:#1f2937;">
  <div style="max-width:640px; padding:24px;">
    <p style="margin:0 0 8px;">Hello,</p>
    <p style="margin:0 0 4px; font-size:15px; color:#4b5563;">New quote request from the Accu-Fab NM website — open Zoho to create the quote:</p>
    ${ZOHO_CREATE_QUOTE_BUTTON_HTML}
  </div>
</body>
</html>`;
}
