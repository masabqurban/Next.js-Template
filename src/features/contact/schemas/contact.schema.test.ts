import { describe, expect, it } from "vitest";

import { contactSchema } from "./contact.schema";

const valid = {
  name: "  Jane Doe ",
  email: "jane@example.com",
  topic: "general",
  message: "Hello! I would like to know more about your services.",
};

describe("contactSchema", () => {
  it("accepts a valid message and trims whitespace", () => {
    const result = contactSchema.safeParse(valid);
    expect(result.success).toBe(true);
    expect(result.data?.name).toBe("Jane Doe");
  });

  it("rejects invalid fields with readable messages", () => {
    const result = contactSchema.safeParse({
      name: "J",
      email: "not-an-email",
      topic: "spam",
      message: "Too short",
    });
    expect(result.success).toBe(false);
    const paths = result.error?.issues.map((issue) => issue.path[0]);
    expect(paths).toEqual(
      expect.arrayContaining(["name", "email", "topic", "message"]),
    );
  });

  it("caps the message length", () => {
    const result = contactSchema.safeParse({
      ...valid,
      message: "a".repeat(5001),
    });
    expect(result.success).toBe(false);
  });
});
