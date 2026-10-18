import { createFileRoute } from "@tanstack/react-router";
import { Zap, Target, ShieldAlert, Cpu } from "lucide-react";
import { PageTitle } from "@/components/app-shell";
import { alerts } from "@/lib/mock-data";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/alerts")({
  head: () => seo("Alerts & Messages", "Notifications and bot updates for TradeXify trading signals."),
  component: Alerts,
});

const icons = { signal: [Zap, "text-primary"], tp: [Target, "text-bull"], sl: [ShieldAlert, "text-bear"], system: [Cpu, "text-gold"] } as const;

function Alerts() {
  return (
    <div>
      <PageTitle title="Alerts" sub="Notifications & bot updates" />
      <div className="space-y-2">
        {alerts.map((a) => {
          const [Icon, cls] = icons[a.type];
          return (
            <div key={a.id} className="card-premium flex gap-3 p-4">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-surface"><Icon className={`h-5 w-5 ${cls}`} /></div>
              <div className="flex-1">
                <div className="flex justify-between gap-2"><p className="font-semibold">{a.title}</p><span className="shrink-0 text-[11px] text-muted-foreground">{a.time}</span></div>
                <p className="text-sm text-muted-foreground">{a.body}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
