import "server-only";

import type { ContactInput } from "../schemas/contact.schema";

/**
 * PLACEHOLDER delivery. Replace the body with your provider of choice
 * (Resend, Postmark, SES, a CRM webhook…) and read its API key from
 * `src/config/env.server.ts`. Keep the signature so the action stays unchanged.
 */
export async function deliverContactMessage(
  message: ContactInput,
): Promise<void> {
  if (process.env.NODE_ENV !== "production") {
    console.info(
      "[contact] message received (not delivered: no provider configured)",
      {
        topic: message.topic,
        length: message.message.length,
      },
    );
  }
}
