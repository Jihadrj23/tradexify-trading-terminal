import { createFileRoute, Link } from '@tanstack/react-router';
import { useState } from 'react';
import { Search, ArrowUpRight, ArrowDownRight, ChartCandlestick, ChevronRight, ChevronDown } from 'lucide-react';
import { useLiveQuotes } from '@/components/app-shell';
import { activeSignal, type Quote } from '@/lib/mock-data';
import { seo } from '@/lib/seo';
export const Route = createFileRoute('/')({ head: () => seo('Watchlist · Trading Terminal', 'TradeXify gold, crypto and forex watchlist with market quotes and multi-strategy signals.'), component: Quotes });

const tvSymbol: Record<string, string> = { XAUUSD: 'OANDA:XAUUSD', BTCUSD: 'BITSTAMP:BTCUSD', ETHUSD: 'BITSTAMP:ETHUSD', XAGUSD: 'OANDA:XAGUSD', EURUSD: 'OANDA:EURUSD' };
const categories = [
  { id: 'metals', label: 'Metals / XAU', symbols: ['XAUUSD', 'XAGUSD'] },
  { id: 'crypto', label: 'Crypto', symbols: ['BTCUSD', 'ETHUSD'] },
  { id: 'forex', label: 'Forex', symbols: ['EURUSD'] },
] as const;

function ChangeBadge({ change }: { change: number }) {
  const up = change >= 0;
  return <span className={`inline-flex items-center gap-0.5 rounded px-1.5 py-0.5 font-mono text-[11px] font-semibold ${up ? 'bg-bull/15 text-bull' : 'bg-bear/15 text-bear'}`}>{up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}{change > 0 ? '+' : ''}{change}%</span>;
}

function QuoteRow({ q }: { q: Quote }) {
  return <Link to="/charts" search={{ symbol: tvSymbol[q.symbol] }} className="quote-row grid items-center border-b border-border py-4 transition-colors hover:bg-card">
    <div><p className="text-sm font-bold tracking-tight">{q.symbol}</p><p className="mt-1 text-[11px] text-muted-foreground">{q.name}</p><span className="mt-1.5 md:hidden"><ChangeBadge change={q.change} /></span></div>
    <span className="hidden justify-self-end md:block"><ChangeBadge change={q.change} /></span>
    <span className="text-right font-mono text-sm font-semibold">{q.bid.toFixed(q.digits)}</span>
    <span className="text-right font-mono text-sm text-muted-foreground">{q.ask.toFixed(q.digits)}</span>
    <ChartCandlestick className="ml-auto hidden h-4 w-4 text-muted-foreground md:block" />
  </Link>;
}

function CategoryGroup({ label, rows }: { label: string; rows: Quote[] }) {
  const [open, setOpen] = useState(true);
  if (rows.length === 0) return null;
  return <section className="mb-2">
    <button onClick={() => setOpen(o => !o)} aria-expanded={open} className="flex w-full items-center justify-between py-3 text-left">
      <span className="flex items-center gap-2 text-[11px] font-semibold uppercase text-muted-foreground">{label}<span className="rounded bg-secondary px-1.5 py-0.5 font-mono text-[9px] text-muted-foreground">{rows.length}</span></span>
      <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${open ? '' : '-rotate-90'}`} />
    </button>
    {open && <div className="border-t border-border">{rows.map(q => <QuoteRow key={q.symbol} q={q} />)}</div>}
  </section>;
}

function Quotes() {
  const qs = useLiveQuotes();
  const [search, setSearch] = useState('');
  const gold = qs.find(q => q.symbol === 'XAUUSD');
  if (!gold) return null;
  const match = (q: Quote) => `${q.symbol} ${q.name}`.toLowerCase().includes(search.toLowerCase());
  return <div>
    <div className="mb-5 flex items-start justify-between"><div><p className="mb-2 font-mono text-[10px] text-muted-foreground">MARKETS / OVERVIEW</p><h1 className="text-2xl font-bold tracking-tight md:text-3xl">Watchlist</h1></div><span className="mt-2 font-mono text-[10px] text-muted-foreground">USD</span></div>
    <section className="market-overview mb-8 grid gap-7 border-y border-border py-6 md:grid-cols-[1.2fr_1fr] md:gap-10 md:py-8">
      <div><div className="mb-3 flex items-center gap-2"><span className="grid h-7 w-7 place-items-center rounded border border-border font-mono text-[10px] font-bold">Au</span><h2 className="text-sm font-semibold">XAU / USD</h2><span className="text-xs text-muted-foreground">Gold Spot</span></div>
        <div className="flex flex-wrap items-baseline gap-4"><span className="font-mono text-4xl font-semibold md:text-5xl">{gold.bid.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span><ChangeBadge change={gold.change} /></div>
        <p className="mt-3 font-mono text-[10px] text-muted-foreground">GOLD SPOT / US DOLLAR</p>
      </div>
      <div className="flex flex-col justify-between gap-5"><div className="grid grid-cols-3 gap-3">{[['Ask', gold.ask], ['Session high', gold.high], ['Session low', gold.low]].map(([label, value]) => <div key={label}><p className="mb-2 text-[10px] text-muted-foreground">{label}</p><p className="font-mono text-sm font-semibold">{Number(value).toFixed(2)}</p></div>)}</div>
        <Link to="/charts" search={{ symbol: 'OANDA:XAUUSD' }} className="flex items-center justify-between border-t border-border pt-3 text-xs font-medium"><span className="flex items-center gap-2"><ChartCandlestick className="h-4 w-4" />Open chart</span><ArrowUpRight className="h-4 w-4" /></Link>
      </div>
    </section>
    <div className="mb-2 flex items-center justify-between gap-4">
      <p className="text-[11px] font-semibold uppercase text-muted-foreground">All markets</p>
      <label className="flex h-8 items-center gap-2 border-b border-border text-muted-foreground"><Search className="h-3.5 w-3.5" /><input aria-label="Search markets" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search symbol" className="w-32 bg-transparent text-xs text-foreground outline-none" /></label>
    </div>
    <div className="quote-row hidden border-b border-border py-2 text-[10px] text-muted-foreground md:grid"><span>Instrument</span><span className="text-right">Change</span><span className="text-right">Bid</span><span className="text-right">Ask</span><span className="text-right">Chart</span></div>
    {categories.map(c => <CategoryGroup key={c.id} label={c.label} rows={qs.filter(q => (c.symbols as readonly string[]).includes(q.symbol) && match(q))} />)}
    {qs.filter(match).length === 0 && <p className="py-10 text-center text-sm text-muted-foreground">No matching instruments</p>}
    <section className="mt-8"><div className="mb-4 flex items-center justify-between"><h2 className="text-[11px] font-semibold uppercase text-muted-foreground">Latest signal</h2><Link to="/signals" className="flex items-center gap-1 text-xs text-muted-foreground">All signals<ChevronRight className="h-3 w-3" /></Link></div>
      <Link to="/signals" className="flex items-center justify-between gap-3 rounded-md border border-border bg-card p-4"><div className="flex items-center gap-3"><ArrowUpRight className="h-5 w-5 text-bull" /><div><p className="text-sm font-bold">{activeSignal.symbol}<span className="ml-2 font-mono text-[10px] font-semibold text-bull">BUY</span></p><p className="mt-1 text-[10px] text-muted-foreground">Multi-strategy consensus</p></div></div><div className="text-right"><p className="font-mono text-sm font-semibold">87.5%</p><p className="mt-1 text-[10px] text-muted-foreground">7 / 8 strategies</p></div></Link>
    </section>
    <p className="mt-6 font-mono text-[9px] text-muted-foreground">SIMULATED QUOTES · NOT FOR EXECUTION</p>
  </div>;
}
