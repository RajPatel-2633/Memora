import { motion } from "framer-motion"

export function AdrModuleBar({ label, count, percentage, color }: { label: string, count: number, percentage: number, color: string }) {
  return (
    <div className="flex items-center gap-3 group cursor-pointer">
      <div className="w-24 text-xs font-medium text-muted-foreground truncate group-hover:text-foreground transition-colors">{label}</div>
      <div className="flex-1 h-1.5 bg-background border border-border/50 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={`h-full ${color} rounded-full`} 
        />
      </div>
      <div className="w-4 text-xs font-mono text-foreground text-right">{count}</div>
    </div>
  )
}
