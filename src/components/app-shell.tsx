import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { LineChart, ListOrdered, Zap, History, Bell } from "lucide-react";
import { quotes, type Quote } from "@/lib/mock-data";

export function Logo({ size = 36 }: { size?: number }) {
  return (
    <div className="flex items-center gap-2">
      <div style={{ width: size, height: size }} className="grid place-items-center rounded-xl border border-border bg-surface shadow-glow">
        <span className="font-mono text-sm font-bold tracking-tighter"><span className="text-primary">T</span><span className="text-gold">X</span></span>
      </div>
      <span className="text-lg font-bold tracking-tight">Trade<span className="text-brand-gradient">Xify</span></span>
    </div>
  );
}

const nav = [
  { to: "/", label: "Quotes", icon: ListOrdered },
  { to: "/charts", label: "Charts", icon: LineChart },
  { to: "/signals", label: "Signals", icon: Zap },
  { to: "/history", label: "History", icon: History },
  { to: "/alerts", label: "Alerts", icon: Bell },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto min-h-screen max-w-3xl pb-24">
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-border bg-background/85 px-4 py-3 backdrop-blur">
        <Link to="/"><Logo /></Link>
        <span className="flex items-center gap-1.5 rounded-full border border-border px-2.5 py-1 text-[11px] text-muted-foreground">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-bull" /> Live
        </span>
      </header>
      <main className="px-4 pt-4">{children}</main>
      <Footer />
      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-surface/95 backdrop-blur">
        <div className="mx-auto grid max-w-3xl grid-cols-5">
          {nav.map(({ to, label, icon: Icon }) => (
            <Link key={to} to={to} activeOptions={{ exact: true }}
              className="flex flex-col items-center gap-1 py-2.5 text-[11px] text-muted-foreground transition-colors data-[status=active]:text-primary">
              <Icon className="h-5 w-5" />{label}
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}

function Footer() {
  return (
    <footer className="mt-10 border-t border-border px-4 py-6 text-xs text-muted-foreground">
      <p className="card-premium p-3 leading-relaxed">
        <strong className="text-gold">Risk Disclaimer:</strong> Trading carries high risk and may not be suitable for all investors. Leveraged products like Forex, Gold and Crypto can result in losses exceeding your deposit. Signals are for educational purposes only and are not financial advice.
      </p>
      <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
        <Link to="/about" className="hover:text-foreground">About Us</Link>
        <Link to="/contact" className="hover:text-foreground">Contact Us</Link>
        <Link to="/privacy" className="hover:text-foreground">Privacy Policy</Link>
        <Link to="/terms" className="hover:text-foreground">Terms & Conditions</Link>
      </div>
      <p className="mt-4">© 2026 tradexify.online · All rights reserved.</p>
    </footer>
  );
}

/** Simulated tick stream — swap for a WebSocket from the Python backend. */
export function useLiveQuotes(): Quote[] {
  const [data, setData] = useState(quotes);
  const ref = useRef(data);
  useEffect(() => {
    const id = setInterval(() => {
      ref.current = ref.current.map((q) => {
        const step = q.bid * (Math.random() - 0.5) * 0.0006;
        const bid = q.bid + step;
        const spread = q.ask - q.bid;
        return { ...q, bid, ask: bid + spread, high: Math.max(q.high, bid), low: Math.min(q.low, bid) };
      });
      setData(ref.current);
    }, 1500);
    return () => clearInterval(id);
  }, []);
  return data;
}

export function PageTitle({ title, sub }: { title: string; sub?: string }) {
  return (
    <div className="mb-4">
      <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
      {sub && <p className="text-sm text-muted-foreground">{sub}</p>}
    </div>
  );
}

export function TradingViewChart({ symbol = "OANDA:XAUUSD", height = 460 }: { symbol?: string; height?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.innerHTML = '<div class="tradingview-widget-container__widget" style="height:100%;width:100%"></div>';
    const s = document.createElement("script");
    s.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    s.async = true;
    s.innerHTML = JSON.stringify({
      autosize: true, symbol, interval: "15", timezone: "Etc/UTC", theme: "dark", style: "1",
      locale: "en", backgroundColor: "rgba(18,20,28,1)", gridColor: "rgba(255,255,255,0.04)",
      hide_side_toolbar: false, allow_symbol_change: true, support_host: "https://www.tradingview.com",
    });
    el.appendChild(s);
  }, [symbol]);
  return <div ref={ref} className="tradingview-widget-container card-premium overflow-hidden" style={{ height }} />;
}
