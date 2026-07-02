export function DashboardStatCard({ title, value, trend, positive }: { title: string, value: string, trend: string, positive: boolean }) {
  return (
    <div className="bg-card border border-border rounded-xl p-4 shadow-sm hover:border-border/80 transition-colors">
      <div className="text-xs font-medium text-muted-foreground mb-1">{title}</div>
      <div className="text-2xl font-bold font-mono tracking-tight">{value}</div>
      <div className={`text-xs mt-2 flex items-center gap-1 ${positive ? 'text-primary' : 'text-red-500'}`}>
        {trend}
      </div>
    </div>
  )
}
