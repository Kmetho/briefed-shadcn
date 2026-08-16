export default function Footer() {
  return (
    <footer className="border-t border-border px-6 py-5">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
        <span className="font-bold text-foreground tracking-tight text-sm font-display">
          briefed
        </span>
        <span>Built for creatives &middot; {new Date().getFullYear()}</span>
      </div>
    </footer>
  );
}
