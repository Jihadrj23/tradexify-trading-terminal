import { createFileRoute, Link } from "@tanstack/react-router";
import { PageTitle } from "@/components/app-shell";
import { SignalCard } from "@/components/signal-card";
import { activeSignal, otherSignals } from "@/lib/mock-data";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/signals")({
  head: () => seo("Active Signals", "AI multi-strategy consensus signals built on an 8-rule multi-trader confluence system."),
  component: Signals,
});

function Signals() {
  return (
    <div className="space-y-4">
      <PageTitle title="Signals" sub="8-rule multi-trader confluence system" />
      <div className="mb-6 flex items-center justify-between border-b border-border pb-4"><span className="font-mono text-[10px] text-muted-foreground">2 ACTIVE / DEMO SIGNALS</span><Link to="/history" className="text-xs text-muted-foreground">History →</Link></div>
      <div className="grid items-start gap-5 lg:grid-cols-2"><SignalCard s={activeSignal} showRules />
      {otherSignals.map((s) => <SignalCard key={s.id} s={s} showRules />)}</div>
    </div>
  );
}
