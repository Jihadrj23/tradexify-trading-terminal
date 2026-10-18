import { createFileRoute } from "@tanstack/react-router";
import { PageTitle } from "@/components/app-shell";
import { history } from "@/lib/mock-data";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/history")({
  head: () => seo("Signal History", "Transparent performance log of past TradeXify gold and crypto signals."),
  component: HistoryPage,
});

function HistoryPage() {
  const wins = history.filter((h) => h.result === "WIN").length;
  const net = history.reduce((a, h) => a + h.pips, 0);
  return (
    <div>
      <PageTitle title="History" sub="Past signal performance" />
      <div className="mb-4 grid grid-cols-3 gap-2">
        <Kpi l="Win rate" v={`${Math.round((wins / history.length) * 100)}%`} cls="text-bull" />
        <Kpi l="Net pips" v={`${net > 0 ? "+" : ""}${net}`} cls="text-gold" />
        <Kpi l="Signals" v={String(history.length)} />
      </div>
      <div className="card-premium divide-y divide-border">
        {history.map((h) => (
          <div key={h.id} className="flex items-center justify-between px-4 py-3">
            <div>
              <p className="font-semibold">{h.symbol} <span className={`ml-1 font-mono text-xs ${h.side === "BUY" ? "text-bull" : "text-bear"}`}>{h.side}</span></p>
              <p className="font-mono text-[11px] text-muted-foreground">{h.entry} → {h.exit} · {h.date}</p>
            </div>
            <div className="text-right">
              <p className={`font-mono font-semibold ${h.pips > 0 ? "text-bull" : h.pips < 0 ? "text-bear" : "text-muted-foreground"}`}>{h.pips > 0 ? "+" : ""}{h.pips}</p>
              <p className="text-[11px] text-muted-foreground">{h.result}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Kpi({ l, v, cls = "" }: { l: string; v: string; cls?: string }) {
  return (
    <div className="card-premium p-3">
      <p className="text-[11px] text-muted-foreground">{l}</p>
      <p className={`font-mono text-xl font-bold ${cls}`}>{v}</p>
    </div>
  );
}
