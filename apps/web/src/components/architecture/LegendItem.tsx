export function LegendItem({ color, label, count, percent }: { color: string, label: string, count: string, percent: string }) {
  return (
    <div className="flex items-center justify-between text-xs w-full">
      <div className="flex items-center gap-2">
        <span className={`w-2 h-2 rounded-full ${color}`} />
        <span className="text-foreground/80">{label}</span>
      </div>
      <div className="flex items-center gap-1.5 font-mono">
        <span className="text-foreground">{count}</span>
        <span className="text-muted-foreground/60">{percent}</span>
      </div>
    </div>
  )
}
