import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { PageTitle } from "@/components/app-shell";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/contact")({
  head: () => seo("Contact Us", "Get in touch with the TradeXify team."),
  component: Contact,
});

const field = "w-full rounded-lg border border-input bg-surface px-3 py-2.5 text-sm outline-none focus:border-primary";

function Contact() {
  const [sent, setSent] = useState(false);
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: POST to `${API_BASE}/api/contact` on the Python backend
    setSent(true);
  };
  return (
    <div className="card-premium p-5">
      <PageTitle title="Contact Us" sub="support@tradexify.online" />
      {sent ? (
        <p className="rounded-lg bg-bull/15 p-4 text-sm text-bull">Thanks! Your message has been received — we'll reply within 24 hours.</p>
      ) : (
        <form onSubmit={submit} className="space-y-3">
          <input required name="name" placeholder="Full name" maxLength={100} className={field} />
          <input required type="email" name="email" placeholder="Email address" maxLength={255} className={field} />
          <input name="subject" placeholder="Subject" maxLength={150} className={field} />
          <textarea required name="message" placeholder="Your message" rows={5} maxLength={2000} className={field} />
          <button className="w-full rounded-lg bg-brand-gradient py-3 font-semibold text-primary-foreground shadow-glow">Send Message</button>
        </form>
      )}
    </div>
  );
}
