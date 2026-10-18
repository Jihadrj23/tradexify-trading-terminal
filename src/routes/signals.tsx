import { createFileRoute } from "@tanstack/react-router";
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
      <SignalCard s={activeSignal} showRules />
      {otherSignals.map((s) => <SignalCard key={s.id} s={s} />)}
    </div>
  );
}
