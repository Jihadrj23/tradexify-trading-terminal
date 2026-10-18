import { createFileRoute } from "@tanstack/react-router";
import { PageTitle } from "@/components/app-shell";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/about")({
  head: () => seo("About Us", "TradeXify builds AI-powered gold and crypto signal analysis for disciplined traders."),
  component: () => (
    <div className="card-premium space-y-3 p-5 text-sm leading-relaxed text-muted-foreground">
      <PageTitle title="About Us" />
      <p>TradeXify is a trading signal and market analysis platform focused on Gold (XAU/USD) and major crypto assets.</p>
      <p>Our engine combines eight independent strategies — trend, momentum, structure, Fibonacci, smart-money concepts, volume and session behaviour — and only publishes a signal when enough of them agree.</p>
      <p>We believe in transparency: every signal, win or loss, is logged in our public history.</p>
    </div>
  ),
});
