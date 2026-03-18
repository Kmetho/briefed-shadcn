export default function Footer() {
  return (
    <footer className="border-t border-border px-6 py-8">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <span className="font-semibold text-foreground">briefed</span>
        <span>Built for creatives. © {new Date().getFullYear()}</span>
      </div>
    </footer>
  );
}
