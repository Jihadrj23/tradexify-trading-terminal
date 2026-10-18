import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import type { Signal } from '@/lib/mock-data';
export function SignalCard({ s, showRules = false }: { s: Signal; showRules?: boolean }) {
  const buy = s.side === 'BUY';
  const agree = s.rules.filter(r => r.vote === s.side).length;
  return <article className="card-premium p-5 md:p-6">
    <div className="flex items-center justify-between gap-2"><div><p className="mb-2 font-mono text-[9px] text-muted-foreground">{s.id} / CONSENSUS</p><h2 className="text-lg font-semibold">{s.symbol}</h2></div><span className={`flex items-center gap-1 font-mono text-xs ${buy ? 'text-bull' : 'text-bear'}`}>{buy ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}{s.side}</span></div>
    <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-5 sm:grid-cols-4"><Cell label="Entry price" v={s.entry} /><Cell label="Stop loss" v={s.sl} /><Cell label="Take profit 1" v={s.tp1} /><Cell label="Take profit 2" v={s.tp2} /></div>
    <div className="mt-6 border-t border-border pt-4"><div className="mb-3 flex justify-between text-xs"><span className="text-muted-foreground">Confidence</span><span className="font-mono">{(s.confidence * 100).toFixed(1)}%</span></div><progress aria-label={`${s.symbol} confidence`} value={s.confidence} max={1} className="h-1 w-full appearance-none overflow-hidden rounded-full bg-secondary [&::-webkit-progress-bar]:bg-secondary [&::-webkit-progress-value]:bg-foreground [&::-moz-progress-bar]:bg-foreground" /><p className="mt-2 font-mono text-[10px] text-muted-foreground">{agree} / {s.rules.length} strategies in agreement</p></div>
    {showRules && <details className="mt-5 border-t border-border pt-4" open><summary className="cursor-pointer text-xs font-medium">Strategy breakdown</summary><ul className="mt-3 divide-y divide-border">{s.rules.map((r, i) => <li key={r.name} className="flex items-center justify-between gap-4 py-3 text-xs"><span className="flex items-center gap-3"><span className="font-mono text-[9px] text-muted-foreground">0{i + 1}</span>{r.name}</span><span className={`font-mono text-[10px] ${r.vote === 'BUY' ? 'text-bull' : r.vote === 'SELL' ? 'text-bear' : 'text-muted-foreground'}`}>{r.vote}</span></li>)}</ul></details>}
  </article>;
}
function Cell({ label, v }: { label: string; v: number }) { return <div><p className="mb-2 text-[10px] text-muted-foreground">{label}</p><p className="font-mono text-sm">{v.toFixed(2)}</p></div>; }
