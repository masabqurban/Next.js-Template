"use server";

import { headers } from "next/headers";
import { z } from "zod";

import { createMemoryRateLimiter } from "@/lib/security/rate-limit";
import { getClientIp } from "@/lib/security/request";

import {
  contactSchema,
  type ContactField,
  type ContactFormState,
} from "../schemas/contact.schema";
import { deliverContactMessage } from "./deliver.server";

/** 5 messages per IP every 10 minutes. Swap for a shared store when scaling out. */
const limiter = createMemoryRateLimiter({ limit: 5, windowMs: 10 * 60_000 });

const fields: ContactField[] = ["name", "email", "topic", "message"];

function readValues(formData: FormData) {
  return Object.fromEntries(
    fields.map((field) => {
      const value = formData.get(field);
      return [field, typeof value === "string" ? value : ""];
    }),
  ) as Record<ContactField, string>;
}

/**
 * Server Action behind the contact form. Works without JavaScript (the form
 * posts natively) and with it (`useActionState` keeps the page in place).
 * Server Actions already reject cross-origin requests, so no extra CSRF token.
 */
export async function submitContact(
  _previous: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const success: ContactFormState = {
    status: "success",
    message:
      "Thanks for reaching out! We'll get back to you within two business days.",
  };

  // 1. Honeypot: hidden from people, filled in by naive bots. Pretend it
  //    worked so the bot gets no signal to adapt to.
  if (formData.get("website")) return success;

  // 2. Rate limit before doing any real work.
  const ip = getClientIp(await headers());
  const { success: allowed } = await limiter.limit(`contact:${ip}`);
  if (!allowed) {
    return {
      status: "error",
      message: "Too many messages. Please wait a few minutes and try again.",
      values: readValues(formData),
    };
  }

  // 3. Validate on the server. Client-side checks are a convenience only.
  const values = readValues(formData);
  const parsed = contactSchema.safeParse(values);
  if (!parsed.success) {
    return {
      status: "error",
      message: "Please fix the highlighted fields.",
      fieldErrors: z.flattenError(parsed.error).fieldErrors,
      values,
    };
  }

  try {
    await deliverContactMessage(parsed.data);
  } catch (error) {
    // Log the detail on the server; show the visitor a generic message.
    console.error("[contact] delivery failed", error);
    return {
      status: "error",
      message:
        "We couldn't send your message right now. Please try again later.",
      values,
    };
  }

  return success;
}
