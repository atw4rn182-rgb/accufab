"use client";

import { useState } from "react";
import { COMPANY } from "@/lib/constants";
import { WEB3FORMS } from "@/lib/web3forms";

const inputClass =
  "mt-2 w-full rounded-sm border border-brand-blue-light/25 bg-charcoal-950/82 px-4 py-3 text-base font-medium text-steel-100 outline-none transition-colors placeholder:text-steel-500 focus:border-brand-blue-light focus:ring-2 focus:ring-brand-blue-light/25";

const labelClass = "block text-sm font-black uppercase tracking-[0.12em] text-steel-200";

type SubmitStatus = "idle" | "sending" | "success" | "error";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function QuoteForm() {
  const [sendConfirmation, setSendConfirmation] = useState(true);
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const email = String(formData.get("email") ?? "").trim();

    if (!email) {
      setStatus("error");
      setMessage("Please enter your email address.");
      return;
    }

    if (!isValidEmail(email)) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }

    setStatus("sending");
    setMessage("");

    try {
      const response = await fetch(WEB3FORMS.endpoint, {
        method: "POST",
        body: formData,
      });
      const result = (await response.json()) as { success?: boolean; message?: string };

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Unable to submit the quote request.");
      }

      form.reset();
      setSendConfirmation(true);
      setStatus("success");
      setMessage(
        sendConfirmation
          ? "Your quote request was sent. We will follow up using the email you provided."
          : "Your quote request was sent."
      );
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Unable to submit the quote request.");
    }
  }

  return (
    <form
      action={WEB3FORMS.endpoint}
      method="POST"
      onSubmit={onSubmit}
      className="mt-8 space-y-6 rounded-sm border border-brand-blue-light/15 bg-charcoal-900/45 p-5 shadow-2xl shadow-black/20 sm:p-6"
    >
      <input type="hidden" name="access_key" value={WEB3FORMS.accessKey} />
      <input type="hidden" name="subject" value={WEB3FORMS.subject} />
      <input type="hidden" name="from_name" value="Accu-Fab Website Quote Form" />
      <input type="hidden" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />

      <div>
        <label htmlFor="project_type" className={labelClass}>
          What kind of project are you working on?
        </label>
        <textarea
          id="project_type"
          name="project_type"
          rows={4}
          className={inputClass}
          placeholder="Briefly describe the job, repair, part, assembly, or fabrication need."
        />
      </div>

      <div>
        <label htmlFor="materials" className={labelClass}>
          What materials will be needed?
        </label>
        <textarea
          id="materials"
          name="materials"
          rows={3}
          className={inputClass}
          placeholder="Steel, aluminum, stainless, drill pipe, customer-supplied material, etc."
        />
      </div>

      <div>
        <label htmlFor="specifications" className={labelClass}>
          Project dimensions or specifications
        </label>
        <textarea
          id="specifications"
          name="specifications"
          rows={3}
          className={inputClass}
          placeholder="Measurements, drawings, tolerances, weld details, machining notes, or fit-up requirements."
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="quantity" className={labelClass}>
            Quantity needed
          </label>
          <input
            id="quantity"
            name="quantity"
            type="text"
            className={inputClass}
            placeholder="Example: 1 repair, 12 parts, 50 assemblies"
          />
        </div>

        <div>
          <label htmlFor="timeline" className={labelClass}>
            Desired timeline / deadline
          </label>
          <input
            id="timeline"
            name="timeline"
            type="text"
            className={inputClass}
            placeholder="Example: ASAP, two weeks, by a specific date"
          />
        </div>
      </div>

      <div>
        <label htmlFor="details" className={labelClass}>
          Any special requirements or additional details?
        </label>
        <textarea
          id="details"
          name="details"
          rows={4}
          className={inputClass}
          placeholder="Finishing, pickup/delivery, field use, installation constraints, photos available, or anything else we should know."
        />
      </div>

      <div>
        <label htmlFor="email" className={labelClass}>
          Email <span className="text-accent">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className={inputClass}
          placeholder="name@example.com"
        />
      </div>

      <label className="flex items-start gap-3 rounded-sm border border-brand-blue-light/15 bg-white/[0.04] p-4 text-base font-medium leading-relaxed text-steel-200">
        <input
          type="checkbox"
          name="confirmation_requested"
          value="yes"
          checked={sendConfirmation}
          onChange={(event) => setSendConfirmation(event.currentTarget.checked)}
          className="mt-1 h-4 w-4 rounded border-brand-blue-light/25 bg-charcoal-950 text-accent accent-[#ffc247]"
        />
        <span>Also send me a confirmation email (if available)</span>
      </label>

      <p className="rounded-sm border border-brand-blue-light/15 bg-white/[0.04] p-4 text-base font-medium leading-relaxed text-steel-200">
        Please fill out this questionnaire as completely as possible. The more details you give us,
        the better we can help you. Submissions are delivered to{" "}
        <a href={COMPANY.emailHref} className="text-accent hover:underline">
          {COMPANY.email}
        </a>
        .
      </p>

      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex w-full items-center justify-center rounded-sm border border-accent-light/70 bg-gradient-to-br from-accent-light via-accent to-accent-hover px-6 py-4 text-sm font-black uppercase tracking-[0.18em] text-charcoal-950 shadow-xl shadow-accent/40 ring-1 ring-accent-light/35 transition-all hover:-translate-y-0.5 hover:scale-[1.03] hover:from-white hover:via-accent-light hover:to-accent hover:shadow-2xl hover:shadow-accent/60 hover:ring-2 hover:ring-accent-light/70 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {status === "sending" ? "Submitting..." : "Submit"}
      </button>

      {message ? (
        <p
          className={
            status === "error"
              ? "rounded-sm border border-red-400/30 bg-red-500/10 p-4 text-base leading-relaxed text-red-100"
              : "rounded-sm border border-accent/30 bg-accent/10 p-4 text-base leading-relaxed text-steel-200"
          }
        >
          {message}
        </p>
      ) : null}

      <div className="rounded-sm border border-brand-blue-light/30 bg-brand-blue-dark/20 p-5 text-center shadow-lg shadow-brand-blue-light/10">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-blue-light">
          Texting is preferred
        </p>
        <p className="mt-4 text-base font-medium text-steel-200">
          Phone:{" "}
          <a
            href={COMPANY.phoneHref}
            className="text-2xl font-black tracking-tight text-steel-100 transition-colors hover:text-accent sm:text-3xl"
          >
            {COMPANY.phone}
          </a>
        </p>
        <p className="mx-auto mt-4 max-w-xl text-base font-medium leading-relaxed text-steel-200">
          Please fill out the questionnaire above as completely as possible before texting us.
        </p>
      </div>
    </form>
  );
}
