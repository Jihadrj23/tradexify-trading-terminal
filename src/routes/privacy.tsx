import { createFileRoute } from "@tanstack/react-router";
import { PageTitle } from "@/components/app-shell";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/privacy")({
  head: () => seo("Privacy Policy", "How TradeXify collects, uses and protects your data under GDPR."),
  component: () => (
    <div className="card-premium space-y-3 p-5 text-sm leading-relaxed text-muted-foreground">
      <PageTitle title="Privacy Policy" sub="Last updated: October 2026" />
      <h2 className="font-semibold text-foreground">Data we collect</h2>
      <p>Contact details you submit (name, email, message) and basic, anonymised usage analytics.</p>
      <h2 className="font-semibold text-foreground">How we use it</h2>
      <p>To respond to enquiries, deliver signal notifications you opt into and improve the service. We never sell personal data.</p>
      <h2 className="font-semibold text-foreground">Your GDPR rights</h2>
      <p>You may request access, correction, deletion or export of your data, and withdraw consent at any time by contacting us via the Contact page.</p>
      <h2 className="font-semibold text-foreground">Retention & security</h2>
      <p>Data is stored only as long as necessary and protected with industry-standard encryption.</p>
    </div>
  ),
});
