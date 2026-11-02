import { z } from "zod";

export const contactTopics = [
  "general",
  "sales",
  "support",
  "partnership",
] as const;

export const contactTopicLabels: Record<
  (typeof contactTopics)[number],
  string
> = {
  general: "General question",
  sales: "Sales",
  support: "Support",
  partnership: "Partnership",
};

export const contactLimits = { name: 100, email: 254, message: 5000 } as const;

/** Single source of truth for the contact form: server validation and field types. */
export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name.")
    .max(
      contactLimits.name,
      `Keep your name under ${contactLimits.name} characters.`,
    ),
  email: z
    .email("Please enter a valid email address.")
    .trim()
    .max(contactLimits.email),
  topic: z.enum(contactTopics, "Please choose a topic."),
  message: z
    .string()
    .trim()
    .min(20, "Please write at least 20 characters so we can help.")
    .max(
      contactLimits.message,
      `Keep your message under ${contactLimits.message} characters.`,
    ),
});

export type ContactInput = z.infer<typeof contactSchema>;
export type ContactField = keyof ContactInput;

export type ContactFormState =
  | { status: "idle" }
  | { status: "success"; message: string }
  | {
      status: "error";
      message: string;
      fieldErrors?: Partial<Record<ContactField, string[]>>;
      /** Echoed back so a failed submission doesn't wipe what the visitor typed. */
      values?: Partial<Record<ContactField, string>>;
    };

export const initialContactState: ContactFormState = { status: "idle" };
