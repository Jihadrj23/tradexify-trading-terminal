import { createFileRoute } from '@tanstack/react-router';
import { useRef, useState } from 'react';
import { Maximize, Minimize } from 'lucide-react';
import { TradingViewChart } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { seo } from '@/lib/seo';
export const Route = createFileRoute('/charts')({
  validateSearch: (search: Record<string, unknown>): { symbol?: string } => ({ symbol: typeof search.symbol === 'string' ? search.symbol : undefined }),
  head: () => seo('Interactive Chart', 'Full-screen TradeXify TradingView charts for gold, crypto and forex markets.'), component: Charts,
});
const symbols = [{ l: 'XAUUSD', v: 'OANDA:XAUUSD' }, { l: 'BTCUSD', v: 'BITSTAMP:BTCUSD' }, { l: 'ETHUSD', v: 'BITSTAMP:ETHUSD' }, { l: 'XAGUSD', v: 'OANDA:XAGUSD' }, { l: 'EURUSD', v: 'OANDA:EURUSD' }];
function Charts() {
  const { symbol } = Route.useSearch();
  const [selected, setSelected] = useState(symbol ?? 'OANDA:XAUUSD');
  const [expanded, setExpanded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const fullscreen = async () => {
    if (document.fullscreenElement) { await document.exitFullscreen(); setExpanded(false); }
    else if (ref.current?.requestFullscreen) { try { await ref.current.requestFullscreen(); setExpanded(true); } catch { setExpanded(false); } }
  };
  return <div className="chart-screen" ref={ref}>
    <div className="flex h-12 shrink-0 items-center justify-between border-b border-border px-3"><div className="flex items-center gap-3"><select aria-label="Chart instrument" value={selected} onChange={e => setSelected(e.target.value)} className="bg-background font-mono text-xs outline-none">{symbols.map(s => <option value={s.v} key={s.v}>{s.l}</option>)}</select><span className="border-l border-border pl-3 font-mono text-[10px] text-muted-foreground">TradingView</span></div><Button variant="ghost" size="icon" title={expanded ? 'Exit full screen' : 'Full screen'} aria-label={expanded ? 'Exit full screen' : 'Full screen'} onClick={fullscreen}>{expanded ? <Minimize /> : <Maximize />}</Button></div>
    <TradingViewChart symbol={selected} />
  </div>;
}
