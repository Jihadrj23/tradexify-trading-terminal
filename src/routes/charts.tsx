import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageTitle, TradingViewChart } from "@/components/app-shell";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/charts")({
  head: () => seo("Live Charts", "Interactive TradingView charts for Gold, Bitcoin and Forex technical analysis."),
  component: Charts,
});

const symbols = [
  { l: "XAUUSD", v: "OANDA:XAUUSD" },
  { l: "BTCUSD", v: "BITSTAMP:BTCUSD" },
  { l: "ETHUSD", v: "BITSTAMP:ETHUSD" },
  { l: "EURUSD", v: "OANDA:EURUSD" },
];

function Charts() {
  const [sym, setSym] = useState(symbols[0]!.v);
  return (
    <div>
      <PageTitle title="Charts" sub="Live technical analysis" />
      <div className="mb-3 flex gap-2 overflow-x-auto">
        {symbols.map((s) => (
          <button key={s.v} onClick={() => setSym(s.v)}
            className={`rounded-full border px-3 py-1.5 font-mono text-xs ${sym === s.v ? "border-primary bg-primary/15 text-primary" : "border-border text-muted-foreground"}`}>
            {s.l}
          </button>
        ))}
      </div>
      <TradingViewChart symbol={sym} height={560} />
    </div>
  );
}
