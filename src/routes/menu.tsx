import { createFileRoute, Link } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { UserRound, Moon, Sun, Settings, ChevronRight, Bell, Mail, ShieldCheck, FileText, Info, TriangleAlert, LogIn, LogOut, Scale, BadgeCheck } from 'lucide-react';
import { useTheme } from '@/components/theme-provider';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '@/components/ui/dialog';
import { seo } from '@/lib/seo';
export const Route = createFileRoute('/menu')({ head: () => seo('Profile & Settings', 'TradeXify profile, appearance settings, notifications and legal information.'), component: MenuPage });

const KEY = 'tx-demo-user';
const row = 'flex w-full items-center justify-between px-4 py-4 text-sm font-semibold';

function AuthDialog({ onDone }: { onDone: (name: string) => void }) {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [pass, setPass] = useState('');
  const submit = (e: React.FormEvent) => { e.preventDefault(); if (!name.trim() || pass.length < 4) return; onDone(name.trim()); setOpen(false); setPass(''); };
  return <Dialog open={open} onOpenChange={setOpen}>
    <DialogTrigger asChild><Button className="flex-1 font-semibold"><LogIn />Login / Sign Up</Button></DialogTrigger>
    <DialogContent className="max-w-[calc(100%-2rem)] rounded-lg bg-card sm:max-w-sm">
      <DialogHeader className="text-left"><DialogTitle>{mode === 'login' ? 'Log in' : 'Create account'}</DialogTitle><DialogDescription>Demo only — accounts are not stored on a server yet.</DialogDescription></DialogHeader>
      <div className="grid grid-cols-2 gap-1 rounded-md border border-border p-1">{(['login', 'signup'] as const).map(m => <button key={m} type="button" onClick={() => setMode(m)} className={`rounded py-1.5 text-xs font-semibold ${mode === m ? 'bg-secondary text-foreground' : 'text-muted-foreground'}`}>{m === 'login' ? 'Log in' : 'Sign up'}</button>)}</div>
      <form onSubmit={submit} className="grid gap-3">
        <input aria-label="Username" value={name} onChange={e => setName(e.target.value)} placeholder="Username" className="rounded-md border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-foreground" />
        <input aria-label="Password" type="password" value={pass} onChange={e => setPass(e.target.value)} placeholder="Password (min 4)" className="rounded-md border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-foreground" />
        <Button type="submit" disabled={!name.trim() || pass.length < 4} className="font-semibold">{mode === 'login' ? 'Log in' : 'Create account'}</Button>
      </form>
    </DialogContent>
  </Dialog>;
}

function MenuPage() {
  const { theme, setTheme } = useTheme();
  const [user, setUser] = useState<string | null>(null);
  useEffect(() => { setUser(localStorage.getItem(KEY)); }, []);
  const login = (n: string) => { localStorage.setItem(KEY, n); setUser(n); };
  const logout = () => { localStorage.removeItem(KEY); setUser(null); };
  return <div className="mx-auto max-w-2xl">
    <section className="card-premium mb-6 p-5">
      <div className="flex items-center gap-4">
        <div className="grid h-14 w-14 shrink-0 place-items-center rounded-full border border-border bg-secondary text-lg font-bold">{user ? user[0]!.toUpperCase() : <UserRound className="h-6 w-6" />}</div>
        <div className="min-w-0 flex-1"><h2 className="truncate text-lg font-bold">{user ?? 'Guest Trader'}</h2>
          <span className={`mt-1.5 inline-flex items-center gap-1 rounded px-2 py-0.5 font-mono text-[10px] font-bold ${user ? 'bg-bull text-background' : 'border border-border text-muted-foreground'}`}><BadgeCheck className="h-3 w-3" />{user ? 'PRO TRADER' : 'DEMO TERMINAL'}</span></div>
      </div>
      <div className="mt-5 flex gap-2">{user ? <Button variant="outline" onClick={logout} className="flex-1 font-semibold"><LogOut />Sign Out</Button> : <AuthDialog onDone={login} />}</div>
    </section>
    <div className="card-premium divide-y divide-border overflow-hidden">
      <Dialog>
        <DialogTrigger asChild><button className={row}><span className="flex items-center gap-3"><Settings className="h-4 w-4 text-muted-foreground" />Settings</span><ChevronRight className="h-4 w-4 text-muted-foreground" /></button></DialogTrigger>
        <DialogContent aria-describedby={undefined} className="max-w-[calc(100%-2rem)] rounded-lg bg-card sm:max-w-md">
          <DialogHeader className="text-left"><DialogTitle>Settings</DialogTitle></DialogHeader>
          <div className="mt-3 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-5"><span className="text-sm font-semibold">Theme</span><div role="group" aria-label="Appearance" className="flex gap-1 rounded-md border border-border p-1"><Button variant="ghost" size="sm" aria-pressed={theme === 'dark'} onClick={() => setTheme('dark')} className={theme === 'dark' ? 'bg-secondary' : 'text-muted-foreground'}><Moon />Dark</Button><Button variant="ghost" size="sm" aria-pressed={theme === 'light'} onClick={() => setTheme('light')} className={theme === 'light' ? 'bg-secondary' : 'text-muted-foreground'}><Sun />Light</Button></div></div>
        </DialogContent>
      </Dialog>
      <Link to="/alerts" className={row}><span className="flex items-center gap-3"><Bell className="h-4 w-4 text-muted-foreground" />Notifications & Alerts</span><ChevronRight className="h-4 w-4 text-muted-foreground" /></Link>
      <details className="group"><summary className={`${row} cursor-pointer list-none`}><span className="flex items-center gap-3"><Scale className="h-4 w-4 text-muted-foreground" />About & Legal</span><ChevronRight className="h-4 w-4 text-muted-foreground transition-transform group-open:rotate-90" /></summary>
        <div className="border-t border-border bg-background/40">{[{ to: '/about', label: 'About Us', icon: Info }, { to: '/contact', label: 'Contact Us', icon: Mail }, { to: '/privacy', label: 'Privacy Policy', icon: ShieldCheck }, { to: '/terms', label: 'Terms of Use', icon: FileText }, { to: '/risk', label: 'Risk Disclaimer', icon: TriangleAlert }].map(({ to, label, icon: Icon }) => <Link key={to} to={to} className="flex items-center justify-between border-b border-border py-3.5 pl-11 pr-4 text-xs font-semibold last:border-b-0"><span className="flex items-center gap-3"><Icon className="h-4 w-4 text-muted-foreground" />{label}</span><ChevronRight className="h-3 w-3 text-muted-foreground" /></Link>)}</div>
      </details>
    </div>
  </div>;
}
