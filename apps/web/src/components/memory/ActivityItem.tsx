export function ActivityItem({ text, time }: { text: string, time: string }) {
  return (
    <div className="flex items-center justify-between gap-4 text-sm">
      <div className="flex items-center gap-2 text-foreground/80 truncate">
        <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
        <span className="truncate">{text}</span>
      </div>
      <span className="text-[10px] text-muted-foreground shrink-0 font-medium">{time}</span>
    </div>
  )
}
