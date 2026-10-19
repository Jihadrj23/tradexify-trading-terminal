// Mock data. Replace each getter with a fetch to the Python backend
// (e.g. `${API_BASE}/api/quotes`) — shapes mirror the expected JSON.
export const API_BASE = "https://api.tradexify.online";

export type Category = "metals" | "crypto" | "forex";
export type Quote = { symbol: string; name: string; category: Category; tv: string; bid: number; ask: number; high: number; low: number; open: number; change: number; digits: number };

// [symbol, name, category, tvSymbol, price, spread, change%, digits]
const raw: [string, string, Category, string, number, number, number, number][] = [
  ["XAUUSD", "Gold Spot / US Dollar", "metals", "OANDA:XAUUSD", 2648.35, 0.3, 0.84, 2],
  ["XAGUSD", "Silver / US Dollar", "metals", "OANDA:XAGUSD", 31.42, 0.03, 0.37, 3],
  ["XAUEUR", "Gold / Euro", "metals", "OANDA:XAUEUR", 2437.6, 0.4, 0.96, 2],
  ["XAUJPY", "Gold / Japanese Yen", "metals", "OANDA:XAUJPY", 397850, 45, -0.21, 0],
  ["BTCUSD", "Bitcoin / US Dollar", "crypto", "BITSTAMP:BTCUSD", 67420.5, 25, 1.92, 1],
  ["ETHUSD", "Ethereum / US Dollar", "crypto", "BITSTAMP:ETHUSD", 2612.4, 1.2, -0.65, 2],
  ["SOLUSD", "Solana / US Dollar", "crypto", "COINBASE:SOLUSD", 152.84, 0.08, 3.41, 2],
  ["XRPUSD", "XRP / US Dollar", "crypto", "BITSTAMP:XRPUSD", 0.5432, 0.0004, -1.18, 4],
  ["ADAUSD", "Cardano / US Dollar", "crypto", "COINBASE:ADAUSD", 0.3528, 0.0003, 0.74, 4],
  ["BNBUSD", "BNB / US Dollar", "crypto", "BINANCE:BNBUSDT", 594.2, 0.4, -0.32, 2],
  ["DOGEUSD", "Dogecoin / US Dollar", "crypto", "BINANCE:DOGEUSDT", 0.11842, 0.00008, 2.65, 5],
  ["EURUSD", "Euro / US Dollar", "forex", "OANDA:EURUSD", 1.08642, 0.00009, -0.12, 5],
  ["GBPUSD", "British Pound / US Dollar", "forex", "OANDA:GBPUSD", 1.30514, 0.00012, 0.18, 5],
  ["USDJPY", "US Dollar / Japanese Yen", "forex", "OANDA:USDJPY", 150.218, 0.012, 0.27, 3],
  ["AUDUSD", "Australian Dollar / US Dollar", "forex", "OANDA:AUDUSD", 0.66871, 0.0001, -0.41, 5],
  ["USDCAD", "US Dollar / Canadian Dollar", "forex", "OANDA:USDCAD", 1.38092, 0.00014, 0.09, 5],
  ["NZDUSD", "New Zealand Dollar / US Dollar", "forex", "OANDA:NZDUSD", 0.60518, 0.00013, -0.36, 5],
  ["EURGBP", "Euro / British Pound", "forex", "OANDA:EURGBP", 0.83241, 0.0001, -0.29, 5],
  ["EURJPY", "Euro / Japanese Yen", "forex", "OANDA:EURJPY", 163.198, 0.018, 0.15, 3],
];
export const quotes: Quote[] = raw.map(([symbol, name, category, tv, bid, spread, change, digits]) => {
  const open = bid / (1 + change / 100);
  return { symbol, name, category, tv, bid, ask: bid + spread, open, high: Math.max(bid, open) * 1.004, low: Math.min(bid, open) * 0.996, change, digits };
});

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
