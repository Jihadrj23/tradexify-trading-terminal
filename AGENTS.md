<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Application conventions
- Shared terminal navigation belongs in AppShell; the chart route omits the header and fills the available viewport to keep charting distraction-free.
- ThemeProvider owns client-side appearance preference; semantic CSS tokens theme the entire terminal and external chart consistently.
- Legal content remains in dedicated metadata-bearing routes, discoverable through the Menu legal disclosure rather than a global footer.
- Embed TradingView directly in a theme-aware iframe instead of injecting its script, avoiding duplicate script execution during React lifecycle changes.
