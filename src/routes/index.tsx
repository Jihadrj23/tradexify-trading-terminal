import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowDown, ArrowUp } from "lucide-react";
import { useLiveQuotes } from "@/components/app-shell";
import { SignalCard } from "@/components/signal-card";
import { activeSignal } from "@/lib/mock-data";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () => seo("Live Gold & Crypto Quotes", "Real-time XAU/USD and crypto quotes with AI multi-strategy trading signals."),
  component: Quotes,
});

function Quotes() {
  const qs = useLiveQuotes();
  const gold = qs[0];
  const up = gold.change >= 0;
  return (
    <div className="space-y-4">
      <section className="card-premium relative overflow-hidden p-5 shadow-glow">
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gold/10 blur-3xl" />
        <p className="text-xs text-muted-foreground">XAU/USD · Gold Spot</p>
        <div className="mt-1 flex items-end gap-3">
          <span className="font-mono text-4xl font-bold text-gold">{gold.bid.toFixed(2)}</span>
          <span className={`mb-1 flex items-center font-mono text-sm ${up ? "text-bull" : "text-bear"}`}>
            {up ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}{gold.change}%
          </span>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2 font-mono text-sm">
          <Stat l="Ask" v={gold.ask.toFixed(2)} />
          <Stat l="High" v={gold.high.toFixed(2)} cls="text-bull" />
          <Stat l="Low" v={gold.low.toFixed(2)} cls="text-bear" />
        </div>
      </section>

      <div className="flex items-center justify-between">
        <h2 className="font-semibold">Current Signal</h2>
        <Link to="/signals" className="text-xs text-primary">View all</Link>
      </div>
      <SignalCard s={activeSignal} />

      <h2 className="pt-2 font-semibold">Market Watch</h2>
      <div className="card-premium divide-y divide-border">
        <div className="grid grid-cols-[1fr_auto_auto] gap-4 px-4 py-2 text-[11px] text-muted-foreground">
          <span>Symbol</span><span className="w-20 text-right">Bid</span><span className="w-20 text-right">Ask</span>
        </div>
        {qs.map((q) => (
          <div key={q.symbol} className="grid grid-cols-[1fr_auto_auto] items-center gap-4 px-4 py-3">
            <div>
              <p className="font-semibold">{q.symbol}</p>
              <p className={`font-mono text-[11px] ${q.change >= 0 ? "text-bull" : "text-bear"}`}>{q.change >= 0 ? "+" : ""}{q.change}%</p>
            </div>
            <span className="w-20 text-right font-mono text-sm text-primary">{q.bid.toFixed(q.digits)}</span>
            <span className="w-20 text-right font-mono text-sm text-gold">{q.ask.toFixed(q.digits)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Stat({ l, v, cls = "" }: { l: string; v: string; cls?: string }) {
  return (
    <div className="rounded-lg bg-surface px-3 py-2">
      <p className="font-sans text-[11px] text-muted-foreground">{l}</p>
      <p className={cls}>{v}</p>
    </div>
  );
}
