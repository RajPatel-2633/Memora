import { motion } from "framer-motion"
import { Database, FileCode, CheckCircle2, Bug, BarChart } from "lucide-react"

export function ProductPreview() {
  return (
    <section className="pb-24 border-b border-border bg-background relative z-10">
      <div className="container mx-auto px-4 lg:px-8 -mt-8 relative z-20 perspective-[2000px]">
        
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{ rotateX: 2, rotateY: -1, y: -5 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.4, type: "spring", stiffness: 100 }}
          className="rounded-xl border border-border bg-card shadow-2xl shadow-primary/5 overflow-hidden max-w-5xl mx-auto"
        >
          {/* Mock Browser/OS Header */}
          <div className="h-10 bg-background border-b border-border flex items-center px-4 justify-between">
            <div className="flex gap-1.5 w-24">
              <div className="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e]"></div>
              <div className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123]"></div>
              <div className="w-3 h-3 rounded-full bg-[#27c93f] border border-[#1aab29]"></div>
            </div>
            
            <div className="bg-card rounded-md border border-border px-8 py-1 text-xs text-muted-foreground font-mono flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></div>
              app.memora.ai
            </div>
            
            <div className="w-24 flex justify-end">
              <div className="text-[10px] uppercase font-bold tracking-widest text-primary bg-primary/10 px-2 py-0.5 rounded border border-primary/20 flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-primary animate-pulse"></span> Live
              </div>
            </div>
          </div>
          
          {/* Dashboard UI */}
          <div className="flex flex-col md:flex-row h-[500px]">
            {/* Sidebar */}
            <div className="w-48 border-r border-border bg-background/50 p-4 hidden md:block">
              <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">Memory Space</div>
              <div className="space-y-1">
                {['Overview', 'Repositories', 'AI Chat', 'Decisions', 'Bugs'].map((item, i) => (
                  <div key={item} className={`px-2 py-1.5 text-sm rounded-md cursor-pointer ${i === 0 ? 'bg-primary/10 text-primary font-medium' : 'text-muted-foreground hover:bg-card hover:text-foreground'}`}>
                    {item}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Main Content */}
            <div className="flex-1 p-6 bg-card overflow-hidden flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold">Project Overview</h3>
                <div className="text-xs font-mono text-muted-foreground bg-background border border-border px-2 py-1 rounded">Last indexed: 2 mins ago</div>
              </div>
              
              {/* Stats Row */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: "Sources Indexed", value: "48,231", icon: Database, color: "text-blue-400" },
                  { label: "Memory Hit Rate", value: "94.2%", icon: CheckCircle2, color: "text-primary" },
                  { label: "Arch Decisions", value: "142", icon: FileCode, color: "text-purple-400" },
                  { label: "Token Usage", value: "2.4M", icon: BarChart, color: "text-orange-400" },
                ].map((stat) => (
                  <div key={stat.label} className="bg-background border border-border rounded-lg p-4">
                    <div className="flex items-center gap-2 text-muted-foreground mb-2">
                      <stat.icon className={`w-4 h-4 ${stat.color}`} />
                      <span className="text-xs">{stat.label}</span>
                    </div>
                    <div className="text-2xl font-bold font-mono tracking-tight">{stat.value}</div>
                  </div>
                ))}
              </div>
              
              {/* Recent Memory Hits & Bugs */}
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-border rounded-lg bg-background p-4 flex flex-col">
                  <div className="text-sm font-semibold mb-4 flex items-center gap-2">
                    <FileCode className="w-4 h-4 text-muted-foreground" /> Recent Decisions Recalled
                  </div>
                  <div className="space-y-3 flex-1">
                    {[
                      { title: "Switched to Redis for session store", time: "2h ago" },
                      { title: "Implemented rate limiting on API v2", time: "5h ago" },
                      { title: "Migrated from Webpack to Vite", time: "1d ago" }
                    ].map((item, i) => (
                      <div key={i} className="flex justify-between items-center pb-2 border-b border-border/50 last:border-0">
                        <div className="text-sm text-foreground">{item.title}</div>
                        <div className="text-xs text-muted-foreground">{item.time}</div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="border border-border rounded-lg bg-background p-4 flex flex-col">
                  <div className="text-sm font-semibold mb-4 flex items-center gap-2">
                    <Bug className="w-4 h-4 text-muted-foreground" /> Prevented Regressions
                  </div>
                  <div className="space-y-3 flex-1">
                    {[
                      { title: "Auth token refresh race condition", repo: "api-gateway" },
                      { title: "Memory leak in event listener", repo: "web-client" },
                      { title: "Missing index on users table", repo: "db-schema" }
                    ].map((item, i) => (
                      <div key={i} className="flex justify-between items-center pb-2 border-b border-border/50 last:border-0">
                        <div className="text-sm text-foreground">{item.title}</div>
                        <div className="text-xs font-mono text-muted-foreground bg-card px-1.5 py-0.5 rounded border border-border">{item.repo}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        
      </div>
    </section>
  )
}
