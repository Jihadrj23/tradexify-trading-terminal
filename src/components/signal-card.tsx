import type { Signal } from "@/lib/mock-data";

export function SignalCard({ s, showRules = false }: { s: Signal; showRules?: boolean }) {
  const buy = s.side === "BUY";
  const agree = s.rules.filter((r) => r.vote === s.side).length;
  return (
    <div className="card-premium p-4 shadow-glow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-muted-foreground">AI Multi-Strategy Consensus · {s.id}</p>
          <p className="mt-1 text-lg font-bold">{s.symbol}</p>
        </div>
        <span className={`rounded-lg px-3 py-1.5 font-mono text-sm font-bold ${buy ? "bg-bull/15 text-bull" : "bg-bear/15 text-bear"}`}>{s.side}</span>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2 font-mono text-sm sm:grid-cols-4">
        <Cell label="Entry" v={s.entry} />
        <Cell label="Stop Loss" v={s.sl} cls="text-bear" />
        <Cell label="TP 1" v={s.tp1} cls="text-bull" />
        <Cell label="TP 2" v={s.tp2} cls="text-bull" />
      </div>
      <div className="mt-4">
        <div className="mb-1.5 flex justify-between text-xs">
          <span className="text-muted-foreground">Confidence</span>
          <span className="font-mono text-gold">{agree}/8 rules · {Math.round(s.confidence * 100)}%</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-muted">
          <div className="h-full bg-brand-gradient" style={{ width: `${s.confidence * 100}%` }} />
        </div>
      </div>
      {showRules && (
        <ul className="mt-4 divide-y divide-border rounded-lg border border-border">
          {s.rules.map((r) => (
            <li key={r.name} className="flex items-center justify-between px-3 py-2 text-sm">
              <span>{r.name}</span>
              <span className={`font-mono text-xs ${r.vote === "BUY" ? "text-bull" : r.vote === "SELL" ? "text-bear" : "text-muted-foreground"}`}>{r.vote}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function Cell({ label, v, cls = "" }: { label: string; v: number; cls?: string }) {
  return (
    <div className="rounded-lg bg-surface px-3 py-2">
      <p className="font-sans text-[11px] text-muted-foreground">{label}</p>
      <p className={`font-semibold ${cls}`}>{v.toFixed(2)}</p>
    </div>
  );
}
