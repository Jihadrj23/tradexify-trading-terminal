import { createFileRoute, Link } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { Search, ChevronDown, Plus, X, Check } from 'lucide-react';
import { useLiveQuotes } from '@/components/app-shell';
import { type Quote } from '@/lib/mock-data';
import { seo } from '@/lib/seo';
export const Route = createFileRoute('/')({ head: () => seo('Watchlist · Trading Terminal', 'TradeXify gold, crypto and forex watchlist with market quotes and multi-strategy signals.'), component: Quotes });

const tvSymbol: Record<string, string> = { XAUUSD: 'OANDA:XAUUSD', BTCUSD: 'BITSTAMP:BTCUSD', ETHUSD: 'BITSTAMP:ETHUSD', XAGUSD: 'OANDA:XAGUSD', EURUSD: 'OANDA:EURUSD' };
const categories = [
  { id: 'metals', label: 'Metals / XAU', symbols: ['XAUUSD', 'XAGUSD'] },
  { id: 'crypto', label: 'Crypto', symbols: ['BTCUSD', 'ETHUSD'] },
  { id: 'forex', label: 'Forex', symbols: ['EURUSD'] },
] as const;

const icons: Record<string, { a: string; b?: string; cls: string }> = {
  XAUUSD: { a: 'Au', cls: 'icon-gold' },
  XAGUSD: { a: 'Ag', cls: 'icon-silver' },
  BTCUSD: { a: '₿', cls: 'icon-btc' },
  ETHUSD: { a: 'Ξ', cls: 'icon-eth' },
  EURUSD: { a: '€', b: '$', cls: 'icon-eur' },
};

function AssetIcon({ symbol }: { symbol: string }) {
  const i = icons[symbol] ?? { a: symbol[0] ?? '?', cls: 'icon-silver' };
  return <span className="relative h-9 w-9 shrink-0">
    <span className={`grid h-9 w-9 place-items-center rounded-full text-[13px] font-bold ${i.cls}`}>{i.a}</span>
    {i.b && <span className="icon-usd absolute -bottom-0.5 -right-0.5 grid h-4 w-4 place-items-center rounded-full border-2 border-background text-[8px] font-bold">{i.b}</span>}
  </span>;
}

function QuoteRow({ q }: { q: Quote }) {
  const up = q.change >= 0;
  const abs = (q.bid * q.change) / 100;
  return <Link to="/charts" search={{ symbol: tvSymbol[q.symbol] }} className="flex items-center gap-3 border-b border-border px-1 py-3.5 transition-colors hover:bg-card">
    <AssetIcon symbol={q.symbol} />
    <div className="min-w-0 flex-1"><p className="text-[15px] font-bold">{q.symbol}</p><p className="truncate text-[11px] text-muted-foreground">{q.name}</p></div>
    <div className="text-right">
      <p className={`font-mono text-[15px] font-bold ${up ? 'text-bull' : 'text-bear'}`}>{q.bid.toFixed(q.digits)}</p>
      <div className="mt-1 flex items-center justify-end gap-1.5">
        <span className={`font-mono text-[11px] font-semibold ${up ? 'text-bull' : 'text-bear'}`}>{up ? '+' : ''}{abs.toFixed(q.digits)}</span>
        <span className={`rounded px-1.5 py-0.5 font-mono text-[11px] font-bold ${up ? 'bg-bull text-background' : 'bg-bear text-background'}`}>{up ? '+' : ''}{q.change.toFixed(2)}%</span>
      </div>
    </div>
  </Link>;
}

function CategoryGroup({ label, rows }: { label: string; rows: Quote[] }) {
  const [open, setOpen] = useState(true);
  if (rows.length === 0) return null;
  return <section className="mb-1">
    <button onClick={() => setOpen(o => !o)} aria-expanded={open} className="flex w-full items-center gap-2 py-3 text-left">
      <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${open ? '' : '-rotate-90'}`} />
      <span className="text-[12px] font-bold uppercase text-muted-foreground">{label}</span>
      <span className="rounded bg-secondary px-1.5 py-0.5 font-mono text-[9px] text-muted-foreground">{rows.length}</span>
    </button>
    {open && <div className="border-t border-border">{rows.map(q => <QuoteRow key={q.symbol} q={q} />)}</div>}
  </section>;
}

type CustomList = { name: string; symbols: string[] };
const KEY = 'tx-watchlists';

function Quotes() {
  const qs = useLiveQuotes();
  const [search, setSearch] = useState('');
  const [lists, setLists] = useState<CustomList[]>([]);
  const [active, setActive] = useState(-1);
  const [adding, setAdding] = useState(false);
  const [name, setName] = useState('');
  const [picked, setPicked] = useState<string[]>([]);
  useEffect(() => { try { setLists(JSON.parse(localStorage.getItem(KEY) || '[]')); } catch { /* ignore */ } }, []);
  const save = (l: CustomList[]) => { setLists(l); localStorage.setItem(KEY, JSON.stringify(l)); };
  const match = (q: Quote) => `${q.symbol} ${q.name}`.toLowerCase().includes(search.toLowerCase());
  const create = () => {
    if (!picked.length) return;
    const l = [...lists, { name: name.trim() || `List ${lists.length + 1}`, symbols: picked }];
    save(l); setActive(l.length - 1); setAdding(false); setName(''); setPicked([]);
  };
  const remove = (i: number) => { save(lists.filter((_, j) => j !== i)); setActive(-1); };
  const current = active >= 0 ? lists[active] : undefined;

  return <div>
    <div className="mb-4 flex items-center justify-between"><h1 className="text-2xl font-bold md:text-3xl">Watchlist</h1>
      <label className="flex h-8 items-center gap-2 rounded-md bg-secondary px-2.5 text-muted-foreground"><Search className="h-3.5 w-3.5" /><input aria-label="Search markets" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search" className="w-24 bg-transparent text-xs text-foreground outline-none" /></label>
    </div>
    <div className="mb-3 flex items-center gap-2 overflow-x-auto border-b border-border pb-3">
      <button onClick={() => setActive(-1)} className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-semibold ${active === -1 ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground'}`}>Watchlist</button>
      {lists.map((l, i) => <button key={i} onClick={() => setActive(i)} className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-semibold ${active === i ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground'}`}>{l.name}</button>)}
      <button onClick={() => setAdding(true)} className="flex shrink-0 items-center gap-1 rounded-full border border-primary px-3 py-1.5 text-xs font-semibold text-foreground"><Plus className="h-3.5 w-3.5" />Add list</button>
    </div>

    {adding && <div className="mb-4 rounded-lg border border-border bg-card p-4">
      <div className="mb-3 flex items-center justify-between"><p className="text-sm font-bold">New watchlist</p><button aria-label="Close" onClick={() => setAdding(false)}><X className="h-4 w-4 text-muted-foreground" /></button></div>
      <input value={name} onChange={e => setName(e.target.value)} placeholder="List name" className="mb-3 w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none" />
      <div className="mb-3 grid gap-1">{qs.map(q => { const on = picked.includes(q.symbol); return <button key={q.symbol} onClick={() => setPicked(p => on ? p.filter(s => s !== q.symbol) : [...p, q.symbol])} className="flex items-center gap-3 rounded-md px-2 py-2 hover:bg-secondary"><AssetIcon symbol={q.symbol} /><span className="flex-1 text-left text-sm font-bold">{q.symbol}</span><span className={`grid h-5 w-5 place-items-center rounded border ${on ? 'border-primary bg-primary text-primary-foreground' : 'border-border'}`}>{on && <Check className="h-3 w-3" />}</span></button>; })}</div>
      <button onClick={create} disabled={!picked.length} className="w-full rounded-md bg-primary py-2 text-sm font-semibold text-primary-foreground disabled:opacity-40">Create list</button>
    </div>}

    {current ? <>
      <div className="border-t border-border">{qs.filter(q => current.symbols.includes(q.symbol) && match(q)).map(q => <QuoteRow key={q.symbol} q={q} />)}</div>
      <button onClick={() => remove(active)} className="mt-4 text-xs text-bear">Delete this list</button>
    </> : categories.map(c => <CategoryGroup key={c.id} label={c.label} rows={qs.filter(q => (c.symbols as readonly string[]).includes(q.symbol) && match(q))} />)}
    {qs.filter(match).length === 0 && <p className="py-10 text-center text-sm text-muted-foreground">No matching instruments</p>}
  </div>;
}
