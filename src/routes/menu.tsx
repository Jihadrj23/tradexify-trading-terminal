import { createFileRoute, Link } from '@tanstack/react-router';
import { UserRound, Moon, Sun, ChevronRight, History, Bell, Mail, ShieldCheck, FileText, Info, TriangleAlert } from 'lucide-react';
import { PageTitle } from '@/components/app-shell';
import { useTheme } from '@/components/theme-provider';
import { Button } from '@/components/ui/button';
import { seo } from '@/lib/seo';
export const Route = createFileRoute('/menu')({ head: () => seo('Profile & Settings', 'TradeXify profile, appearance settings, signal history and legal information.'), component: MenuPage });
function MenuPage() {
  const { theme, setTheme } = useTheme();
  return <div className="mx-auto max-w-2xl"><PageTitle title="Menu" />
    <div className="mb-8 flex items-center gap-4 border-y border-border py-6"><div className="grid h-12 w-12 place-items-center rounded-full border border-border bg-card"><UserRound className="h-5 w-5" strokeWidth={1.5} /></div><div><h2 className="text-sm font-semibold">Guest trader</h2><p className="mt-1.5 text-xs text-muted-foreground">TradeXify Terminal · Demo</p></div></div>
    <h2 className="mb-3 text-[10px] text-muted-foreground">APPEARANCE</h2>
    <div className="mb-8 flex items-center justify-between border-b border-border pb-5"><span className="text-sm">Theme</span><div role="group" aria-label="Appearance" className="flex gap-1 rounded-md border border-border p-1"><Button variant="ghost" size="sm" aria-pressed={theme === 'dark'} onClick={() => setTheme('dark')} className={theme === 'dark' ? 'bg-secondary' : 'text-muted-foreground'}><Moon />Dark</Button><Button variant="ghost" size="sm" aria-pressed={theme === 'light'} onClick={() => setTheme('light')} className={theme === 'light' ? 'bg-secondary' : 'text-muted-foreground'}><Sun />Light</Button></div></div>
    <h2 className="mb-2 text-[10px] text-muted-foreground">ACTIVITY</h2>
    {[{ to: '/history', label: 'Signal history', icon: History }, { to: '/alerts', label: 'Notifications', icon: Bell }, { to: '/contact', label: 'Contact us', icon: Mail }].map(({ to, label, icon: Icon }) => <Link key={to} to={to} className="flex items-center justify-between border-b border-border py-5 text-sm"><span className="flex items-center gap-3"><Icon className="h-4 w-4 text-muted-foreground" />{label}</span><ChevronRight className="h-4 w-4 text-muted-foreground" /></Link>)}
    <details className="mt-7"><summary className="cursor-pointer py-3 text-sm font-medium">About & Legal</summary><div className="mt-1">{[{ to: '/about', label: 'About Us', icon: Info }, { to: '/privacy', label: 'Privacy Policy', icon: ShieldCheck }, { to: '/terms', label: 'Terms of Use', icon: FileText }, { to: '/risk', label: 'Risk Disclaimer', icon: TriangleAlert }].map(({ to, label, icon: Icon }) => <Link key={to} to={to} className="flex items-center justify-between border-b border-border py-4 text-xs"><span className="flex items-center gap-3"><Icon className="h-4 w-4 text-muted-foreground" />{label}</span><ChevronRight className="h-3 w-3 text-muted-foreground" /></Link>)}</div></details>
    <p className="mt-10 font-mono text-[9px] text-muted-foreground">© 2026 TRADEXIFY.ONLINE</p>
  </div>;
}
