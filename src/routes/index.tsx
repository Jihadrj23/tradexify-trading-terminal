import { createFileRoute, Link } from '@tanstack/react-router';
import { useState } from 'react';
import { Search, ArrowUpRight, ChartCandlestick, ChevronRight } from 'lucide-react';
import { useLiveQuotes } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { activeSignal } from '@/lib/mock-data';
import { seo } from '@/lib/seo';
export const Route = createFileRoute('/')({ head: () => seo('Watchlist · Trading Terminal', 'TradeXify gold, crypto and forex watchlist with market quotes and multi-strategy signals.'), component: Quotes });
const groups = ['All markets', 'Metals', 'Crypto', 'Forex'] as const;
function Quotes() {
  const qs = useLiveQuotes();
  const [group, setGroup] = useState<string>('All markets');
  const [search, setSearch] = useState('');
  const gold = qs.find(q => q.symbol === 'XAUUSD');
  if (!gold) return null;
  const filtered = qs.filter(q => (group === 'All markets' || (group === 'Metals' && ['XAUUSD', 'XAGUSD'].includes(q.symbol)) || (group === 'Crypto' && ['BTCUSD', 'ETHUSD'].includes(q.symbol)) || (group === 'Forex' && q.symbol === 'EURUSD')) && `${q.symbol} ${q.name}`.toLowerCase().includes(search.toLowerCase()));
  return <div>
    <div className="mb-7 flex items-start justify-between"><div><p className="mb-2 font-mono text-[10px] text-muted-foreground">MARKETS / OVERVIEW</p><h1 className="text-2xl font-semibold md:text-3xl">Watchlist</h1></div><span className="mt-2 font-mono text-[10px] text-muted-foreground">USD</span></div>
    <section className="mb-8 grid gap-7 border-y border-border py-6 md:grid-cols-[1.2fr_1fr] md:gap-10 md:py-8">
      <div><div className="mb-3 flex items-center gap-2"><span className="grid h-7 w-7 place-items-center rounded border border-border font-mono text-[10px]">Au</span><h2 className="text-sm font-semibold">XAU / USD</h2><span className="text-xs text-muted-foreground">Gold Spot</span></div>
        <div className="flex flex-wrap items-baseline gap-4"><span className="font-mono text-4xl font-medium md:text-5xl">{gold.bid.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span><span className="flex items-center font-mono text-xs text-bull"><ArrowUpRight className="h-3.5 w-3.5" />+{gold.change}%</span></div>
        <p className="mt-3 font-mono text-[10px] text-muted-foreground">GOLD SPOT / US DOLLAR</p>
      </div>
      <div className="flex flex-col justify-between gap-5"><div className="grid grid-cols-3 gap-3">{[['Ask', gold.ask], ['Session high', gold.high], ['Session low', gold.low]].map(([label, value]) => <div key={label}><p className="mb-2 text-[10px] text-muted-foreground">{label}</p><p className="font-mono text-sm">{Number(value).toFixed(2)}</p></div>)}</div>
        <Link to="/charts" search={{ symbol: 'OANDA:XAUUSD' }} className="flex items-center justify-between border-t border-border pt-3 text-xs"><span className="flex items-center gap-2"><ChartCandlestick className="h-4 w-4" />Open chart</span><ArrowUpRight className="h-4 w-4" /></Link>
      </div>
    </section>
    <div className="mb-4 flex flex-wrap items-center justify-between gap-4"><div role="tablist" aria-label="Market category" className="flex gap-1">{groups.map(g => <Button key={g} role="tab" aria-selected={group === g} variant="ghost" size="sm" onClick={() => setGroup(g)} className={group === g ? 'bg-secondary text-foreground' : 'text-muted-foreground'}>{g}</Button>)}</div>
      <label className="flex h-8 items-center gap-2 border-b border-border text-muted-foreground"><Search className="h-3.5 w-3.5" /><input aria-label="Search markets" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search symbol" className="w-32 bg-transparent text-xs text-foreground outline-none" /></label></div>
    <div className="quote-row grid border-b border-border py-3 text-[10px] text-muted-foreground"><span>Instrument</span><span className="hidden text-right md:block">Change</span><span className="text-right">Bid</span><span className="text-right">Ask</span><span className="hidden text-right md:block">Chart</span></div>
    {filtered.map(q => <Link key={q.symbol} to="/charts" search={{ symbol: ({ XAUUSD: 'OANDA:XAUUSD', BTCUSD: 'BITSTAMP:BTCUSD', ETHUSD: 'BITSTAMP:ETHUSD', XAGUSD: 'OANDA:XAGUSD', EURUSD: 'OANDA:EURUSD' } as Record<string, string>)[q.symbol] }} className="quote-row grid items-center border-b border-border py-5 transition-colors hover:bg-card">
      <div><p className="text-sm font-semibold">{q.symbol}</p><p className="mt-1.5 text-[10px] text-muted-foreground">{q.name}</p><p className={`mt-1 font-mono text-[10px] md:hidden ${q.change >= 0 ? 'text-bull' : 'text-bear'}`}>{q.change > 0 ? '+' : ''}{q.change}%</p></div>
      <span className={`hidden text-right font-mono text-xs md:block ${q.change >= 0 ? 'text-bull' : 'text-bear'}`}>{q.change > 0 ? '+' : ''}{q.change}%</span><span className="text-right font-mono text-xs md:text-sm">{q.bid.toFixed(q.digits)}</span><span className="text-right font-mono text-xs md:text-sm">{q.ask.toFixed(q.digits)}</span><ChartCandlestick className="ml-auto hidden h-4 w-4 text-muted-foreground md:block" />
    </Link>)}
    {filtered.length === 0 && <p className="py-10 text-center text-sm text-muted-foreground">No matching instruments</p>}
    <section className="mt-8"><div className="mb-4 flex items-center justify-between"><h2 className="text-xs font-medium text-muted-foreground">LATEST SIGNAL</h2><Link to="/signals" className="flex items-center gap-1 text-xs text-muted-foreground">All signals<ChevronRight className="h-3 w-3" /></Link></div>
      <Link to="/signals" className="flex items-center justify-between gap-3 rounded-md border border-border p-4"><div className="flex items-center gap-3"><ArrowUpRight className="h-5 w-5 text-bull" /><div><p className="text-sm font-semibold">{activeSignal.symbol}<span className="ml-2 font-mono text-[10px] text-bull">BUY</span></p><p className="mt-1 text-[10px] text-muted-foreground">Multi-strategy consensus</p></div></div><div className="text-right"><p className="font-mono text-sm">87.5%</p><p className="mt-1 text-[10px] text-muted-foreground">7 / 8 strategies</p></div></Link>
    </section>
    <p className="mt-6 font-mono text-[9px] text-muted-foreground">SIMULATED QUOTES · NOT FOR EXECUTION</p>
  </div>;
}
