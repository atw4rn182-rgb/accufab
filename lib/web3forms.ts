/** Web3Forms — recipient is configured on the access key (Accufab.weld@gmail.com). */
export const WEB3FORMS = {
  endpoint: "https://api.web3forms.com/submit",
  accessKey:
    process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ??
    "12dc5a29-8e1b-4821-a069-09a3ada48db0",
  subject: "New Accu-Fab quote request",
} as const;
