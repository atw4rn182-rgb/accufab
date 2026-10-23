"use client";

import { useRef, useState } from "react";
import { COMPANY } from "@/lib/constants";
import { QUOTE_SUCCESS_MESSAGE } from "@/lib/quote-confirmation";
import { WEB3FORMS } from "@/lib/web3forms";

const inputClass = "field-input";

const labelClass = "block text-sm font-black uppercase tracking-[0.12em] text-steel-200";

type SubmitStatus = "idle" | "sending" | "success" | "error";

function getString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function QuoteForm() {
  const submitLock = useRef(false);
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [message, setMessage] = useState("");

  const formLocked = status === "sending" || status === "success";

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (submitLock.current || status === "sending" || status === "success") {
      return;
    }

    const form = event.currentTarget;
    const raw = new FormData(form);
    const name = getString(raw, "name");
    const contactEmail = getString(raw, "contact_email");

    if (!name) {
      setStatus("error");
      setMessage("Please enter your name.");
      return;
    }

    if (!contactEmail) {
      setStatus("error");
      setMessage("Please enter your email address.");
      return;
    }

    if (!isValidEmail(contactEmail)) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }

    submitLock.current = true;
    setStatus("sending");
    setMessage("");

    try {
      const fields = {
        name,
        contact_email: contactEmail,
        phone: getString(raw, "phone"),
        contactPref: getString(raw, "contactPref") || "text",
        project_description: getString(raw, "project_description"),
      };

      const response = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
      });

      const responseText = await response.text();
      let result: { success?: boolean; message?: string };

      try {
        result = JSON.parse(responseText) as { success?: boolean; message?: string };
      } catch {
        throw new Error("Unable to submit the quote request. Please try again.");
      }

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Unable to submit the quote request.");
      }

      form.reset();
      setStatus("success");
      setMessage(QUOTE_SUCCESS_MESSAGE);
    } catch (error) {
      submitLock.current = false;
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Unable to submit the quote request.");
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="mt-10 space-y-6 rounded-xl border border-white/10 bg-black/25 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.07),inset_0_12px_24px_rgba(0,0,0,0.28)] sm:p-8"
      aria-busy={status === "sending"}
    >
      <fieldset disabled={formLocked} className="space-y-6 disabled:opacity-80">
        <div>
          <label htmlFor="name" className={labelClass}>
            Name <span className="text-accent">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            className={inputClass}
            placeholder="Your name"
          />
        </div>

        <div>
          <label htmlFor="contact_email" className={labelClass}>
            Email <span className="text-accent">*</span>
          </label>
          <input
            id="contact_email"
            name="contact_email"
            type="email"
            required
            autoComplete="email"
            className={inputClass}
            placeholder="name@example.com"
          />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label htmlFor="phone" className={labelClass}>
              Phone Number{" "}
              <span className="text-xs font-medium normal-case tracking-normal text-steel-400">
                (optional)
              </span>
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              className={inputClass}
              placeholder="(575) 555-1234"
            />
          </div>

          <div>
            <span className={labelClass}>Preferred Contact Method</span>
            <div className="mt-2 space-y-2 rounded-lg border border-brand-blue-light/20 bg-charcoal-950/70 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
              <label className="flex cursor-pointer items-center gap-2 text-sm font-medium text-steel-200">
                <input
                  type="radio"
                  name="contactPref"
                  value="call"
                  className="h-4 w-4 accent-[#ffc247]"
                />
                Phone Call
              </label>
              <label className="flex cursor-pointer items-center gap-2 text-sm font-medium text-steel-200">
                <input
                  type="radio"
                  name="contactPref"
                  value="text"
                  defaultChecked
                  className="h-4 w-4 accent-[#ffc247]"
                />
                Text Message{" "}
                <span className="font-black text-brand-blue-light">(preferred)</span>
              </label>
              <label className="flex cursor-pointer items-center gap-2 text-sm font-medium text-steel-200">
                <input
                  type="radio"
                  name="contactPref"
                  value="either"
                  className="h-4 w-4 accent-[#ffc247]"
                />
                Either Call or Text
              </label>
              <label className="flex cursor-pointer items-center gap-2 text-sm font-medium text-steel-200">
                <input
                  type="radio"
                  name="contactPref"
                  value="email"
                  className="h-4 w-4 accent-[#ffc247]"
                />
                Email Only
              </label>
            </div>
          </div>
        </div>

        <p className="text-xs font-medium text-steel-400">
          We respect your preference and will only call or text if you choose it.
        </p>

        <div>
          <label htmlFor="project_description" className={labelClass}>
            Project Description
          </label>
          <textarea
            id="project_description"
            name="project_description"
            rows={6}
            className={inputClass}
            placeholder="Describe your project, materials, timeline, and any other details we should know."
          />
        </div>

        <p className="rounded-sm border border-brand-blue-light/15 bg-white/[0.04] p-4 text-base font-medium leading-relaxed text-steel-200">
          Submissions are delivered only to{" "}
          <a href={COMPANY.emailHref} className="text-accent hover:underline">
            {WEB3FORMS.recipientEmail}
          </a>
          .
        </p>

        <button
          type="submit"
          disabled={formLocked}
          className="btn-metal inline-flex w-full items-center justify-center rounded-sm px-6 py-4 text-sm font-black uppercase tracking-[0.18em] text-charcoal-950 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          {status === "sending"
            ? "Submitting..."
            : status === "success"
              ? "Submitted"
              : "Submit"}
        </button>
      </fieldset>

      {message ? (
        <p
          className={
            status === "error"
              ? "rounded-sm border border-red-400/30 bg-red-500/10 p-4 text-base leading-relaxed text-red-100"
              : "rounded-sm border border-accent/30 bg-accent/10 p-4 text-base leading-relaxed text-steel-200 whitespace-pre-line"
          }
          role="status"
          aria-live="polite"
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
          Please fill out the form above as completely as possible before texting us.
        </p>
      </div>
    </form>
  );
}
