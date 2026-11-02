import { Mail, MapPin, Phone } from "lucide-react";

import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { siteConfig } from "@/config/site";
import { ContactForm } from "@/features/contact";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata = createMetadata({
  title: "Contact",
  description: `Get in touch with the ${siteConfig.name} team. We usually reply within two business days.`,
  path: "/contact",
});

export default function ContactPage() {
  const { email, phone, address } = siteConfig.contact;

  return (
    <Container className="flex flex-col gap-12 pt-10 pb-20 sm:pb-28">
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ]}
      />
      <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
        <div className="flex flex-col gap-8">
          <SectionHeading
            as="h1"
            align="left"
            eyebrow="Contact"
            title="Let's talk"
            description="Questions, feedback or a project in mind? Send us a message and we'll get back to you."
          />
          <address className="flex flex-col gap-4 not-italic">
            <a
              href={`mailto:${email}`}
              className="flex items-center gap-3 hover:text-link"
            >
              <Mail aria-hidden className="size-5 text-link" />
              {email}
            </a>
            <a
              href={`tel:${phone.replace(/\s/g, "")}`}
              className="flex items-center gap-3 hover:text-link"
            >
              <Phone aria-hidden className="size-5 text-link" />
              {phone}
            </a>
            <p className="flex items-start gap-3">
              <MapPin aria-hidden className="mt-0.5 size-5 text-link" />
              <span>
                {address.street}
                <br />
                {address.city}, {address.region} {address.postalCode}
              </span>
            </p>
          </address>
        </div>
        <div className="rounded-2xl border border-border bg-surface-raised p-6 shadow-card sm:p-8">
          <ContactForm />
        </div>
      </div>
    </Container>
  );
}
