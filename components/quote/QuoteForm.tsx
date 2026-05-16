"use client";

import { useState } from "react";
import { COMPANY } from "@/lib/constants";

const inputClass =
  "mt-2 w-full rounded-sm border border-white/10 bg-charcoal-950/70 px-4 py-3 text-base text-white outline-none transition-colors placeholder:text-steel-500 focus:border-accent focus:ring-2 focus:ring-accent/20";

const labelClass = "block text-sm font-semibold uppercase tracking-[0.12em] text-steel-300";

type SubmitStatus = "idle" | "sending" | "success" | "error";

function getString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

export function QuoteForm() {
  const [showConfirmationOption, setShowConfirmationOption] = useState(false);
  const [sendConfirmation, setSendConfirmation] = useState(true);
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!showConfirmationOption) {
      setShowConfirmationOption(true);
      setStatus("idle");
      setMessage("Choose whether you want a confirmation email, then submit again.");
      return;
    }

    const formData = new FormData(event.currentTarget);
    const payload = {
      projectType: getString(formData, "project-type"),
      materials: getString(formData, "materials"),
      specifications: getString(formData, "specifications"),
      quantity: getString(formData, "quantity"),
      timeline: getString(formData, "timeline"),
      details: getString(formData, "details"),
      email: getString(formData, "email"),
      sendConfirmation,
    };

    setStatus("sending");
    setMessage("");

    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(result.message || "Unable to submit the quote request.");
      }

      event.currentTarget.reset();
      setSendConfirmation(true);
      setShowConfirmationOption(false);
      setStatus("success");
      setMessage(result.message || "Your quote request was sent.");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Unable to submit the quote request.");
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="mt-8 space-y-6 rounded-sm border border-white/10 bg-charcoal-900/45 p-5 shadow-2xl shadow-black/20 sm:p-6"
    >
      <div>
        <label htmlFor="project-type" className={labelClass}>
          What kind of project are you working on?
        </label>
        <textarea
          id="project-type"
          name="project-type"
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
          Email (optional)
        </label>
        <input
          id="email"
          name="email"
          type="email"
          className={inputClass}
          placeholder="name@example.com"
        />
      </div>

      {showConfirmationOption ? (
        <label className="flex items-start gap-3 rounded-sm border border-white/10 bg-white/[0.04] p-4 text-base leading-relaxed text-steel-300">
          <input
            type="checkbox"
            checked={sendConfirmation}
            onChange={(event) => setSendConfirmation(event.currentTarget.checked)}
            className="mt-1 h-4 w-4 rounded border-white/20 bg-charcoal-950 text-accent accent-[#f97316]"
          />
          <span>Also send me a confirmation email</span>
        </label>
      ) : null}

      <p className="rounded-sm border border-white/10 bg-white/[0.04] p-4 text-base leading-relaxed text-steel-300">
        Please fill out this questionnaire as completely as possible. The more details you give us,
        the better we can help you.
      </p>

      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex w-full items-center justify-center rounded-sm bg-accent px-6 py-4 text-sm font-black uppercase tracking-[0.18em] text-charcoal-950 shadow-lg shadow-accent/25 transition-all hover:-translate-y-0.5 hover:bg-accent-light disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
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

      <div className="rounded-sm border border-accent/30 bg-accent/10 p-5 text-center shadow-lg shadow-accent/10">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
          Texting is preferred
        </p>
        <p className="mt-4 text-base text-steel-300">
          Phone:{" "}
          <a
            href={COMPANY.phoneHref}
            className="text-2xl font-black tracking-tight text-white transition-colors hover:text-accent sm:text-3xl"
          >
            {COMPANY.phone}
          </a>
        </p>
        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-steel-300">
          Please fill out the questionnaire above as completely as possible before texting us.
        </p>
      </div>
    </form>
  );
}
