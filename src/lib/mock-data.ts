// Mock data. Replace each getter with a fetch to the Python backend
// (e.g. `${API_BASE}/api/quotes`) — shapes mirror the expected JSON.
export const API_BASE = "https://api.tradexify.online";

export type Quote = { symbol: string; name: string; bid: number; ask: number; high: number; low: number; change: number; digits: number };
export type Rule = { name: string; vote: "BUY" | "SELL" | "NEUTRAL" };
export type Signal = {
  id: string; symbol: string; side: "BUY" | "SELL"; entry: number; sl: number; tp1: number; tp2: number;
  confidence: number; rules: Rule[]; createdAt: string;
};
export type HistoryItem = { id: string; symbol: string; side: "BUY" | "SELL"; entry: number; exit: number; pips: number; result: "WIN" | "LOSS" | "BE"; date: string };
export type Alert = { id: string; title: string; body: string; time: string; type: "signal" | "tp" | "sl" | "system" };

export const quotes: Quote[] = [
  { symbol: "XAUUSD", name: "Gold vs US Dollar", bid: 2648.35, ask: 2648.65, high: 2661.2, low: 2631.8, change: 0.84, digits: 2 },
  { symbol: "BTCUSD", name: "Bitcoin", bid: 67420.5, ask: 67445.5, high: 68210, low: 66105, change: 1.92, digits: 1 },
  { symbol: "ETHUSD", name: "Ethereum", bid: 2612.4, ask: 2613.6, high: 2655.1, low: 2570.2, change: -0.65, digits: 2 },
  { symbol: "XAGUSD", name: "Silver vs US Dollar", bid: 31.42, ask: 31.45, high: 31.88, low: 31.05, change: 0.37, digits: 3 },
  { symbol: "EURUSD", name: "Euro vs US Dollar", bid: 1.08642, ask: 1.08651, high: 1.0891, low: 1.0842, change: -0.12, digits: 5 },
];

export const activeSignal: Signal = {
  id: "SIG-2041", symbol: "XAUUSD", side: "BUY", entry: 2646.5, sl: 2638.0, tp1: 2655.0, tp2: 2668.0,
  confidence: 7 / 8, createdAt: "2026-10-18T14:05:00Z",
  rules: [
    { name: "EMA 50/200 Trend", vote: "BUY" },
    { name: "RSI Momentum", vote: "BUY" },
    { name: "MACD Cross", vote: "BUY" },
    { name: "Support / Resistance", vote: "BUY" },
    { name: "Fibonacci Retracement", vote: "BUY" },
    { name: "Smart Money (Order Blocks)", vote: "BUY" },
    { name: "Volume Profile", vote: "NEUTRAL" },
    { name: "Session Breakout", vote: "BUY" },
  ],
};

export const otherSignals: Signal[] = [
  { ...activeSignal, id: "SIG-2040", symbol: "BTCUSD", side: "SELL", entry: 67800, sl: 68600, tp1: 66500, tp2: 65200, confidence: 6 / 8, createdAt: "2026-10-18T11:20:00Z" },
];

export const history: HistoryItem[] = [
  { id: "SIG-2039", symbol: "XAUUSD", side: "SELL", entry: 2659.2, exit: 2647.1, pips: 121, result: "WIN", date: "Oct 18, 09:12" },
  { id: "SIG-2038", symbol: "XAUUSD", side: "BUY", entry: 2634.0, exit: 2649.5, pips: 155, result: "WIN", date: "Oct 17, 15:40" },
  { id: "SIG-2037", symbol: "BTCUSD", side: "BUY", entry: 66210, exit: 65700, pips: -510, result: "LOSS", date: "Oct 17, 08:05" },
  { id: "SIG-2036", symbol: "XAUUSD", side: "BUY", entry: 2621.4, exit: 2621.4, pips: 0, result: "BE", date: "Oct 16, 13:22" },
  { id: "SIG-2035", symbol: "ETHUSD", side: "SELL", entry: 2680.0, exit: 2630.5, pips: 495, result: "WIN", date: "Oct 16, 06:50" },
  { id: "SIG-2034", symbol: "XAUUSD", side: "SELL", entry: 2642.8, exit: 2651.0, pips: -82, result: "LOSS", date: "Oct 15, 17:10" },
  { id: "SIG-2033", symbol: "XAUUSD", side: "BUY", entry: 2610.3, exit: 2628.9, pips: 186, result: "WIN", date: "Oct 15, 10:02" },
];

export const alerts: Alert[] = [
  { id: "a1", title: "New BUY signal · XAUUSD", body: "Entry 2646.50 · 7/8 rules agree.", time: "2h ago", type: "signal" },
  { id: "a2", title: "TP1 hit · SIG-2039", body: "XAUUSD SELL closed +121 pips.", time: "7h ago", type: "tp" },
  { id: "a3", title: "Stop loss · SIG-2037", body: "BTCUSD BUY closed −510 pips.", time: "1d ago", type: "sl" },
  { id: "a4", title: "Bot update v2.4", body: "Session breakout rule tuned for London open.", time: "2d ago", type: "system" },
];
