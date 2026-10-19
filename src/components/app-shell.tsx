import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { ChartCandlestick, List, ArrowLeftRight, History, Menu, ChevronLeft } from "lucide-react";
import { quotes, type Quote } from "@/lib/mock-data";
import { useTheme } from "@/components/theme-provider";

export function Logo() {
  return <div className="flex items-center gap-3"><div className="grid h-8 w-8 place-items-center rounded border border-foreground/70 font-mono text-sm font-bold">TX</div><span className="text-lg font-semibold">TradeXify<span className="ml-2 hidden text-[10px] font-normal text-muted-foreground sm:inline">TERMINAL</span></span></div>;
}
const nav = [
  { to: '/', label: 'Watchlist', icon: List }, { to: '/charts', label: 'Chart', icon: ChartCandlestick },
  { to: '/signals', label: 'Signals', icon: ArrowLeftRight }, { to: '/history', label: 'History', icon: History }, { to: '/menu', label: 'Menu', icon: Menu },
] as const;
export function AppShell({ children }: { children: ReactNode }) {
  const path = useRouterState({ select: s => s.location.pathname });
  const chart = path === '/charts';
  const secondary = !['/', '/signals', '/history', '/menu', '/charts'].includes(path);
  return <div className="min-h-dvh">
    {!chart && <header className="flex h-16 items-center justify-between border-b border-border px-5 md:px-8"><Link to="/" aria-label="TradeXify watchlist"><Logo /></Link></header>}
    <main className={chart ? '' : 'terminal-content mx-auto max-w-7xl px-5 pt-7 md:px-8 md:pt-9'}>
      {secondary && <Link to="/menu" className="mb-6 inline-flex items-center gap-1 text-xs text-muted-foreground"><ChevronLeft className="h-4 w-4" />Menu</Link>}{children}
    </main>
    <nav aria-label="Main navigation" className="terminal-nav fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background">
      <div className="mx-auto grid h-16 max-w-2xl grid-cols-5">{nav.map(({ to, label, icon: Icon }) => <Link key={to} to={to} activeOptions={{ exact: true }} className="relative flex flex-col items-center justify-center gap-1.5 text-[10px] text-muted-foreground transition-colors data-[status=active]:text-foreground"><Icon className="h-5 w-5" strokeWidth={1.5} />{label}<span className="absolute top-0 hidden h-0.5 w-8 bg-foreground in-data-[status=active]:block" /></Link>)}</div>
    </nav>
  </div>;
}
export function useLiveQuotes(): Quote[] {
  const [data, setData] = useState(quotes);
  const ref = useRef(data);
  useEffect(() => {
    // Simulated ticks: swap for a WebSocket/poll to the Python/MT5 backend (API_BASE).
    const id = setInterval(() => { ref.current = ref.current.map(q => { if (Math.random() < 0.45) return q; const bid = q.bid + q.bid * (Math.random() - 0.5) * 0.0008; return { ...q, bid, ask: bid + q.ask - q.bid, high: Math.max(q.high, bid), low: Math.min(q.low, bid), change: ((bid - q.open) / q.open) * 100 }; }); setData(ref.current); }, 1200);
    return () => clearInterval(id);
  }, []);
  return data;
}
export function PageTitle({ title, sub }: { title: string; sub?: string }) {
  return <div className="mb-6"><h1 className="text-2xl font-semibold">{title}</h1>{sub && <p className="mt-2 text-xs text-muted-foreground">{sub}</p>}</div>;
}
export function TradingViewChart({ symbol = 'OANDA:XAUUSD' }: { symbol?: string }) {
  const { theme } = useTheme();
  const config = { autosize: true, symbol, interval: '15', timezone: 'Etc/UTC', theme, style: '1', locale: 'en', hide_side_toolbar: false, allow_symbol_change: true, calendar: false, support_host: 'https://www.tradingview.com' };
  const src = `https://www.tradingview-widget.com/embed-widget/advanced-chart/?locale=en#${encodeURIComponent(JSON.stringify(config))}`;
  return <iframe key={`${symbol}-${theme}`} src={src} title="Interactive TradingView chart" className="chart-widget border-0" allowFullScreen />;
}
