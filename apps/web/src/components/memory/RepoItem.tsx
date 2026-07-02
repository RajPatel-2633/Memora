import { GitBranch, Activity } from "lucide-react"

export function RepoItem({ name, count, indexed, status }: { name: string, count: string, indexed: string, status: string }) {
  return (
    <button className="w-full flex flex-col p-2.5 rounded-lg text-muted-foreground hover:bg-white/5 hover:text-foreground transition-all duration-250 group hover:-translate-y-[1px]">
      <div className="flex items-center justify-between w-full mb-1">
        <div className="flex items-center gap-2">
          <GitBranch className="w-4 h-4 text-primary opacity-80 group-hover:opacity-100 transition-opacity" />
          <span className="font-medium text-sm group-hover:text-foreground transition-colors">{name}</span>
        </div>
        <span className="text-[11px] font-mono opacity-60 group-hover:opacity-100 transition-opacity">{count} mems</span>
      </div>
      <div className="flex items-center justify-between w-full text-[10px] pl-6">
        <span className="opacity-60 flex items-center gap-1">
          <Activity className="w-3 h-3" /> {indexed}
        </span>
        <span className={`font-medium ${status === 'Healthy' ? 'text-green-500/80' : 'text-yellow-500/80'}`}>
          {status}
        </span>
      </div>
    </button>
  )
}
