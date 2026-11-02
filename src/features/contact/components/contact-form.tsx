"use client";

import { useActionState, useId } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";

import { submitContact } from "../api/contact.actions";
import {
  contactLimits,
  contactTopicLabels,
  contactTopics,
  initialContactState,
  type ContactField,
} from "../schemas/contact.schema";

const inputStyles =
  "w-full rounded-lg border border-border bg-surface-raised px-3.5 py-2.5 text-base text-foreground placeholder:text-muted/70 aria-invalid:border-red-500";

function FieldError({ id, messages }: { id: string; messages?: string[] }) {
  if (!messages?.length) return null;
  return (
    <p id={id} className="text-sm text-red-600 dark:text-red-400">
      {messages[0]}
    </p>
  );
}

export function ContactForm() {
  const [state, formAction, pending] = useActionState(
    submitContact,
    initialContactState,
  );
  const formId = useId();

  if (state.status === "success") {
    return (
      <div
        role="status"
        className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-surface p-10 text-center"
      >
        <CheckCircle2 aria-hidden className="size-10 text-emerald-500" />
        <p className="text-lg font-semibold">Message sent</p>
        <p className="text-muted">{state.message}</p>
      </div>
    );
  }

  const errors = state.status === "error" ? state.fieldErrors : undefined;
  const values = state.status === "error" ? state.values : undefined;

  const fieldProps = (field: ContactField, fallback = "") => {
    const errorId = `${formId}-${field}-error`;
    const hasError = Boolean(errors?.[field]?.length);
    return {
      id: `${formId}-${field}`,
      name: field,
      defaultValue: values?.[field] || fallback,
      "aria-invalid": hasError || undefined,
      "aria-describedby": hasError ? errorId : undefined,
    };
  };

  return (
    <form action={formAction} noValidate className="flex flex-col gap-5">
      {state.status === "error" ? (
        <p
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-300"
        >
          {state.message}
        </p>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor={`${formId}-name`} className="text-sm font-medium">
            Name
          </label>
          <input
            {...fieldProps("name")}
            type="text"
            autoComplete="name"
            required
            maxLength={contactLimits.name}
            className={inputStyles}
          />
          <FieldError id={`${formId}-name-error`} messages={errors?.name} />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor={`${formId}-email`} className="text-sm font-medium">
            Email
          </label>
          <input
            {...fieldProps("email")}
            type="email"
            autoComplete="email"
            required
            maxLength={contactLimits.email}
            className={inputStyles}
          />
          <FieldError id={`${formId}-email-error`} messages={errors?.email} />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor={`${formId}-topic`} className="text-sm font-medium">
          Topic
        </label>
        <select {...fieldProps("topic", "general")} className={inputStyles}>
          {contactTopics.map((topic) => (
            <option key={topic} value={topic}>
              {contactTopicLabels[topic]}
            </option>
          ))}
        </select>
        <FieldError id={`${formId}-topic-error`} messages={errors?.topic} />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor={`${formId}-message`} className="text-sm font-medium">
          Message
        </label>
        <textarea
          {...fieldProps("message")}
          rows={6}
          required
          maxLength={contactLimits.message}
          className={cn(inputStyles, "resize-y")}
        />
        <FieldError id={`${formId}-message-error`} messages={errors?.message} />
      </div>

      {/* Honeypot: off-screen and skipped by keyboard and assistive tech. */}
      <div
        aria-hidden
        className="absolute -left-[9999px] h-px w-px overflow-hidden"
      >
        <label htmlFor={`${formId}-website`}>Website</label>
        <input
          id={`${formId}-website`}
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <Button type="submit" size="lg" disabled={pending} className="self-start">
        {pending ? (
          <Loader2 aria-hidden className="size-4 animate-spin" />
        ) : null}
        {pending ? "Sending…" : "Send message"}
      </Button>
    </form>
  );
}
