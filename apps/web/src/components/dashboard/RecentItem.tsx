export function RecentItem({ icon: Icon, title, time, highlight }: { icon: any, title: string, time: string, highlight?: boolean }) {
  return (
    <div className="flex items-center gap-3 text-sm cursor-pointer group">
      <Icon className={`w-4 h-4 shrink-0 ${highlight ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'}`} />
      <span className="flex-1 truncate text-foreground/90 group-hover:text-foreground">{title}</span>
      <span className={`text-xs ${highlight ? 'text-primary' : 'text-muted-foreground'}`}>{time}</span>
    </div>
  )
}
