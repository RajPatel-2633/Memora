export function MiniSuggestionCard({ icon: Icon, text }: { icon: any, text: string }) {
  return (
    <button className="flex items-center gap-2 px-3 py-2 bg-card border border-border rounded-lg text-xs font-medium text-foreground/80 hover:text-foreground hover:-translate-y-[2px] hover:scale-[1.02] hover:border-primary/50 transition-all duration-250 shrink-0 shadow-sm hover:shadow-md cursor-pointer group">
      <Icon className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
      {text}
    </button>
  )
}
