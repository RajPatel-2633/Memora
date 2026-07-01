import { Sparkles, Paperclip, Code, Maximize2, Send, Activity } from "lucide-react"

export function DashboardOverview() {
  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
      
      {/* Main Column */}
      <div className="flex-1 flex flex-col gap-8 min-w-0">
        
        {/* Welcome */}
        <section>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            Good morning, Raj <span role="img" aria-label="wave">👋</span>
          </h1>
          <p className="text-muted-foreground mt-1">Here's what's happening with your engineering memory today.</p>
        </section>

        {/* Analytics Summary Cards Inline */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard title="Repositories" value="12" trend="+2 this week" positive />
          <StatCard title="Memory Entries" value="2,814" trend="+320 this week" positive />
          <StatCard title="Hit Rate" value="96%" trend="+4% this week" positive />
          <StatCard title="Active Bugs" value="28" trend="-6 fixed this week" positive />
        </section>

        {/* Prompt Input Area */}
        <section className="bg-card border border-border rounded-xl p-1 relative shadow-sm">
          <div className="flex items-center gap-2 p-3 text-sm text-muted-foreground border-b border-border/50 bg-background/50 rounded-t-lg">
            <Sparkles className="w-4 h-4 text-primary" />
            AI Workspace
          </div>
          <textarea 
            placeholder="Ask anything about your codebase, architecture, bugs, or decisions..."
            className="w-full bg-transparent p-4 min-h-[120px] resize-none focus:outline-none text-sm placeholder:text-muted-foreground font-mono"
          />
          <div className="flex items-center justify-between p-3">
            <div className="flex items-center gap-2">
              <IconButton icon={Paperclip} />
              <IconButton icon={Code} />
              <IconButton icon={Maximize2} />
            </div>
            <button className="bg-primary hover:bg-primary/90 text-primary-foreground p-2 rounded-md transition-colors flex items-center justify-center">
              <Send className="w-4 h-4" />
            </button>
          </div>
        </section>

        {/* Suggested Questions */}
        <section>
          <h2 className="text-sm font-medium text-muted-foreground mb-3">Suggested questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <SuggestionCard text="Why did we choose Redis for caching?" />
            <SuggestionCard text="Explain the authentication flow in the API" />
            <SuggestionCard text="What was the solution for bug #28?" />
          </div>
        </section>
        
        {/* Quick Actions (as requested) & Recent */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Recent Conversations */}
          <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-sm">Recent Conversations</h3>
              <button className="text-xs text-primary hover:underline">View all</button>
            </div>
            <div className="space-y-3">
              <RecentItem icon={MessageSquare} title="Fix for memory leak in auth service" time="2h ago" />
              <RecentItem icon={MessageSquare} title="Database connection pooling issue" time="5h ago" />
              <RecentItem icon={MessageSquare} title="Why we use event driven architecture" time="Yesterday" />
            </div>
          </div>
          
          {/* Recent Repositories */}
          <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-sm">Recent Repositories</h3>
              <button className="text-xs text-primary hover:underline">View all</button>
            </div>
            <div className="space-y-3">
              <RecentItem icon={GitBranch} title="memora-ai/memora" time="Active" highlight />
              <RecentItem icon={GitBranch} title="memora-ai/ai-service" time="2h ago" />
              <RecentItem icon={GitBranch} title="memora-ai/web" time="Yesterday" />
            </div>
          </div>
        </section>

      </div>

      {/* Right Column (Context Panel Replacement) */}
      <div className="w-full lg:w-80 flex flex-col gap-6 shrink-0">
        
        {/* Context For */}
        <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <h3 className="font-semibold text-sm">Context for memora-ai/memora</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-muted-foreground">Relevant Files</span>
                <span className="text-xs text-primary cursor-pointer hover:underline">View all</span>
              </div>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2 text-foreground/80 hover:text-foreground cursor-pointer">
                  <Code className="w-3.5 h-3.5 text-primary" />
                  <span className="truncate">src/server/auth.ts</span>
                </li>
                <li className="flex items-center gap-2 text-foreground/80 hover:text-foreground cursor-pointer">
                  <Code className="w-3.5 h-3.5 text-primary" />
                  <span className="truncate">src/lib/memory/manager.ts</span>
                </li>
              </ul>
            </div>
            
            <div className="pt-3 border-t border-border/50">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-muted-foreground">Architecture Decisions</span>
              </div>
              <ul className="space-y-2 text-sm">
                <li className="text-foreground/80 hover:text-foreground cursor-pointer group">
                  <span className="truncate block group-hover:underline">ADR-003: Use PostgreSQL</span>
                  <span className="text-xs text-muted-foreground">Decided 5 days ago</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bug Memory */}
        <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
           <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-sm">Bug Memory</h3>
              <button className="text-xs text-primary hover:underline">View all</button>
            </div>
            <ul className="space-y-3">
              <li className="text-sm">
                <div className="flex items-start justify-between">
                  <span className="font-medium text-foreground/90">Bug #28: Memory leak in WS</span>
                  <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-red-500/10 text-red-500 border border-red-500/20">High</span>
                </div>
                <span className="text-xs text-muted-foreground">Fixed 2 days ago</span>
              </li>
              <li className="text-sm">
                <div className="flex items-start justify-between">
                  <span className="font-medium text-foreground/90">Bug #21: Race condition</span>
                  <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-yellow-500/10 text-yellow-500 border border-yellow-500/20">Med</span>
                </div>
                <span className="text-xs text-muted-foreground">Fixed 5 days ago</span>
              </li>
            </ul>
        </div>

        {/* Detailed Analytics Summary (Replacing Bottom Bar) */}
        <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
          <h3 className="font-semibold text-sm flex items-center gap-2 mb-4">
            <Activity className="w-4 h-4 text-primary" />
            Session Analytics
          </h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Input Tokens</span>
              <span className="font-mono">2,184 <span className="text-primary text-xs ml-1">↑8%</span></span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Output Tokens</span>
              <span className="font-mono">1,421 <span className="text-primary text-xs ml-1">↑5%</span></span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Latency</span>
              <span className="font-mono">1.2s</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Cost (Est.)</span>
              <span className="font-mono">$0.0024</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Model</span>
              <span className="font-mono bg-background px-1.5 py-0.5 rounded border border-border text-xs">gpt-4o-mini</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  )
}

// Subcomponents for the dashboard to keep the main file clean

function StatCard({ title, value, trend, positive }: { title: string, value: string, trend: string, positive: boolean }) {
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

function IconButton({ icon: Icon }: { icon: any }) {
  return (
    <button className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-white/5 rounded-md transition-colors">
      <Icon className="w-4 h-4" />
    </button>
  )
}

function SuggestionCard({ text }: { text: string }) {
  return (
    <button className="bg-card hover:bg-white/5 border border-border rounded-lg p-3 text-sm text-left transition-colors text-foreground/80 hover:text-foreground shadow-sm">
      {text}
    </button>
  )
}

import { MessageSquare, GitBranch } from "lucide-react"

function RecentItem({ icon: Icon, title, time, highlight }: { icon: any, title: string, time: string, highlight?: boolean }) {
  return (
    <div className="flex items-center gap-3 text-sm cursor-pointer group">
      <Icon className={`w-4 h-4 shrink-0 ${highlight ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'}`} />
      <span className="flex-1 truncate text-foreground/90 group-hover:text-foreground">{title}</span>
      <span className={`text-xs ${highlight ? 'text-primary' : 'text-muted-foreground'}`}>{time}</span>
    </div>
  )
}
