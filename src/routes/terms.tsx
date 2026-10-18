import { createFileRoute } from "@tanstack/react-router";
import { PageTitle } from "@/components/app-shell";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/terms")({
  head: () => seo("Terms of Use", "Terms governing the use of TradeXify signals and analysis."),
  component: () => (
    <div className="mx-auto max-w-2xl space-y-5 text-sm leading-relaxed text-muted-foreground">
      <PageTitle title="Terms of Use" sub="Last updated: October 2026" />
      <p><strong className="text-foreground">1. No financial advice.</strong> All signals and analysis are for educational and informational purposes only.</p>
      <p><strong className="text-foreground">2. Risk.</strong> Trading leveraged products carries high risk. You are solely responsible for your trading decisions and any losses.</p>
      <p><strong className="text-foreground">3. Accuracy.</strong> Past performance does not guarantee future results. Prices and signals may be delayed or inaccurate.</p>
      <p><strong className="text-foreground">4. Use.</strong> You may not resell or redistribute TradeXify content without written permission.</p>
      <p><strong className="text-foreground">5. Changes.</strong> We may update these terms at any time; continued use means acceptance.</p>
    </div>
  ),
});
