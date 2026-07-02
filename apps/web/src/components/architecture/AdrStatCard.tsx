import { useState, useEffect } from "react"

export function AdrStatCard({ title, targetCount, subtitle, icon: Icon, color }: { title: string, targetCount: number, subtitle: string, icon: any, color: string }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let start = 0
    const end = targetCount
    if (start === end) return
    const duration = 1000
    const incrementTime = Math.max(duration / end, 20)
    const timer = setInterval(() => {
      start += 1
      setCount(start)
      if (start === end) clearInterval(timer)
    }, incrementTime)
    return () => clearInterval(timer)
  }, [targetCount])

  return (
    <div className="bg-card border border-border rounded-xl p-4 shadow-sm hover:border-border/80 transition-colors">
      <div className="flex items-center gap-2 text-muted-foreground text-xs font-medium mb-3">
        <Icon className={`w-4 h-4 ${color}`} /> {title}
      </div>
      <div className="text-3xl font-bold font-mono tracking-tight text-foreground/90">{count}</div>
      <div className="text-[11px] text-primary mt-1 font-medium">{subtitle}</div>
    </div>
  )
}
