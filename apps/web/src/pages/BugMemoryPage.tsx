import { useState } from "react"
import { 
  Search, Filter, Bug, AlertOctagon, AlertTriangle, 
  CheckCircle2, Clock, Activity, MoreVertical, 
  ChevronDown, GitCommit, FileCode, Sparkles, Command
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

// Mock Data
const MOCK_BUGS = [
  {
    id: "BUG-0018",
    title: "Memory leak in WebSocket connection",
    description: "WebSocket connections are not being properly closed, causing memory usage to increase over time and server crashes.",
    severity: "Critical",
    status: "Resolved",
    tags: ["Backend", "WebSocket", "Memory"],
    repo: "memora-ai/memora",
    updatedAt: "Updated 2h ago",
    author: "Raj Patel",
    commits: 2,
    rootCause: "The ping-pong heartbeat interval was retaining closures that captured the connection object, preventing garbage collection even after the socket disconnected.",
    resolution: "Refactored the WebSocket manager to explicitly clear the interval timer and nullify the connection object reference on the 'close' event.",
    relatedFiles: ["src/websocket/manager.ts", "src/websocket/connection.ts"],
    relatedCommit: "fix: prevent memory leak in ws connections (a1b2c3d)",
    aiSummary: "A classic closure memory leak in Node.js. The fix was applied correctly in the core socket manager. Post-deployment memory profiling confirms the heap stabilizes. No further action needed."
  },
  {
    id: "BUG-0017",
    title: "JWT refresh token not rotating",
    description: "Refresh tokens are not being rotated after use, allowing reuse of old tokens and potential security vulnerabilities.",
    severity: "High",
    status: "Resolved",
    tags: ["Auth", "Security", "JWT"],
    repo: "memora-ai/auth-service",
    updatedAt: "Updated 5h ago",
    author: "Raj Patel",
    commits: 3,
    rootCause: "The token rotation middleware was issuing a new token but failing to invalidate the previous token family in Redis due to a typo in the cache key prefix.",
    resolution: "Corrected the cache key prefix and added an integration test specifically asserting that old tokens are rejected during rotation.",
    relatedFiles: ["src/auth/jwt.service.ts", "src/auth/auth.controller.ts"],
    relatedCommit: "fix: rotate refresh tokens and invalidate old family (c4d5e6f)",
    aiSummary: "Critical security fix. Token family invalidation is now properly enforced. Recommend auditing any other places where Redis cache keys are hardcoded instead of using the constants file."
  },
  {
    id: "BUG-0016",
    title: "API rate limiting not working as expected",
    description: "Rate limiting middleware is not blocking requests correctly under high concurrency load.",
    severity: "Medium",
    status: "In Progress",
    tags: ["Backend", "Rate Limiting", "API"],
    repo: "memora-ai/memora",
    updatedAt: "Updated 1d ago",
    author: "Neha Singh",
    commits: 1,
    rootCause: "The memory-based rate limiter store was losing consistency during race conditions under high concurrent requests across multiple Node.js instances.",
    resolution: "Migrating the rate limit store to Redis to ensure atomic operations and cross-instance consistency.",
    relatedFiles: ["src/middleware/rateLimiter.ts"],
    relatedCommit: "wip: migrate rate limiter to redis store (8f9g0h)",
    aiSummary: "Moving to a distributed Redis store is the correct approach for horizontal scaling. The current WIP commit lacks fallback mechanisms if Redis is temporarily unreachable."
  },
  {
    id: "BUG-0015",
    title: "UI flicker on theme switch",
    description: "Page flickers when switching between light and dark theme due to improper hydration.",
    severity: "Low",
    status: "Resolved",
    tags: ["Frontend", "UI", "Theme"],
    repo: "memora-ai/web",
    updatedAt: "Updated 2d ago",
    author: "Amit Verma",
    commits: 1,
    rootCause: "The theme provider was checking local storage inside a useEffect, causing a flash of incorrect theme before the React hydration completed.",
    resolution: "Moved the theme check into a synchronous inline script in the document head before React initializes.",
    relatedFiles: ["src/providers/ThemeProvider.tsx", "index.html"],
    relatedCommit: "fix: prevent theme flicker on load (p1q2r3s)",
    aiSummary: "Standard SSR/Hydration fix. The inline script approach perfectly resolves the flash of unstyled content (FOUC). Good execution."
  },
  {
    id: "BUG-0014",
    title: "Database connection timeout errors",
    description: "Intermittent database connection timeouts under heavy load causing request failures.",
    severity: "Medium",
    status: "Resolved",
    tags: ["Database", "PostgreSQL", "Performance"],
    repo: "memora-ai/memora",
    updatedAt: "Updated 3d ago",
    author: "Raj Patel",
    commits: 2,
    rootCause: "Prisma connection pool was saturated because the default pool size was too small for the container's allocated memory and CPU limits.",
    resolution: "Increased the connection_limit in the DATABASE_URL and adjusted Prisma's pgbouncer configuration for serverless deployment.",
    relatedFiles: ["schema.prisma", "src/db/client.ts"],
    relatedCommit: "perf: optimize prisma connection pool (x9y8z7)",
    aiSummary: "Solid infrastructure configuration fix. Keep an eye on the Postgres metrics; if connection spikes continue, consider a dedicated PgBouncer instance."
  }
]

export function BugMemoryPage() {
  const [activeTab, setActiveTab] = useState("All Bugs")
  const [expandedId, setExpandedId] = useState<string | null>(null)
  
  const toggleExpand = (id: string) => {
    setExpandedId(prev => prev === id ? null : id)
  }

  return (
    <div className="flex flex-col lg:flex-row h-full max-w-[1600px] mx-auto w-full bg-background overflow-hidden">
      
      {/* Main Column */}
      <div className="flex-1 flex flex-col min-w-0 border-r border-border/50 h-full overflow-hidden">
        
        {/* Header (Title & Tabs) */}
        <div className="shrink-0 bg-background/95 backdrop-blur z-20 sticky top-0 pt-6 px-6 md:px-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
              Bug Memory <Bug className="w-5 h-5 text-red-500" />
            </h1>
            <p className="text-sm text-muted-foreground mt-1">All bugs, issues, and errors your team has encountered and resolved.</p>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-6 text-sm font-medium overflow-x-auto scrollbar-hide border-b border-border/50 pb-0">
            {["All Bugs", "Open", "Resolved", "Critical", "High", "Medium", "Low"].map(tab => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative pb-4 transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:text-foreground ${
                  activeTab === tab 
                    ? tab === 'All Bugs' ? "text-red-500" : "text-foreground" 
                    : "text-muted-foreground hover:text-foreground/80"
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <motion.div 
                    layoutId="activeTabIndicatorBug"
                    className={`absolute bottom-0 left-0 right-0 h-[2px] ${tab === 'All Bugs' ? 'bg-red-500' : 'bg-primary'}`}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Toolbar */}
        <div className="px-6 md:px-8 py-3 flex flex-wrap items-center justify-between gap-4 border-b border-border/50 bg-background/80 backdrop-blur sticky top-[138px] z-10">
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative group w-full md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground/80 group-focus-within:text-primary transition-colors" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="w-full bg-card border border-border rounded-md pl-9 pr-10 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all placeholder:text-muted-foreground hover:border-border/80"
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1 opacity-50 pointer-events-none">
                <Command className="w-2.5 h-2.5" />
                <span className="text-[9px] font-mono font-medium">K</span>
              </div>
            </div>
            
            <button className="flex items-center gap-1.5 px-3 py-1.5 border border-border bg-card hover:bg-white/5 rounded-md text-xs transition-colors shadow-sm font-medium shrink-0">
              <Filter className="w-3.5 h-3.5" /> Filters
            </button>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground hidden lg:block mr-2">24 bugs</span>
              <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground font-medium bg-card border border-border px-2.5 py-1.5 rounded-md transition-colors">
                Sort: Updated <ChevronDown className="w-3.5 h-3.5" />
              </button>
            </div>
            
            <button className="flex items-center gap-2 px-3 py-1.5 bg-background border border-red-500/40 hover:bg-red-500/10 hover:border-red-500/80 text-red-500 rounded-md text-xs font-semibold transition-all duration-250 shadow-sm shrink-0">
              <Bug className="w-3.5 h-3.5" /> Report Bug
            </button>
          </div>
        </div>

        {/* Bugs List */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8">
          <div className="max-w-5xl mx-auto space-y-4 pb-8">
            {MOCK_BUGS.map((bug) => {
              const isExpanded = expandedId === bug.id
              const styles = getSeverityStyles(bug.severity)
              const statusStyles = getStatusStyles(bug.status)
              const Icon = styles.icon

              return (
                <div 
                  key={bug.id}
                  onClick={() => toggleExpand(bug.id)}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      toggleExpand(bug.id)
                    }
                  }}
                  className={`relative bg-card border rounded-xl transition-all duration-250 cursor-pointer overflow-hidden group/card focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary ${
                    isExpanded 
                      ? `border-${styles.rawColor}/40 shadow-lg ring-1 ring-${styles.rawColor}/10` 
                      : `border-border hover:border-${styles.rawColor}/40 hover:shadow-lg hover:-translate-y-[3px]`
                  }`}
                >
                  {/* Left severity border indicator */}
                  <div className={`absolute left-0 top-0 bottom-0 w-1 ${styles.bg}`} />
                  
                  <div className="p-5 pl-7 flex flex-col md:flex-row gap-5">
                    
                    {/* Left Icon */}
                    <div className={`w-10 h-10 rounded-xl ${styles.bgOpacity} border ${styles.border} flex items-center justify-center shrink-0`}>
                      <Icon className={`w-5 h-5 ${styles.text}`} />
                    </div>

                    {/* Main Content */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-3 mb-1.5">
                          <h3 className="font-semibold text-foreground/90 text-base truncate group-hover/card:text-foreground transition-colors">{bug.title}</h3>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${styles.bgOpacity} ${styles.text} ${styles.border}`}>
                            {bug.severity}
                          </span>
                        </div>
                        <p className="text-sm text-foreground/70 mb-4 leading-relaxed line-clamp-2 md:line-clamp-1">
                          {bug.description}
                        </p>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap items-center gap-2">
                        {bug.tags.map(tag => (
                          <span key={tag} className="px-2.5 py-1 bg-background border border-border rounded-full text-[11px] font-medium text-muted-foreground/80 transition-colors group-hover/card:border-border/80 group-hover/card:text-muted-foreground">
                            {tag}
                          </span>
                        ))}
                        <span className="px-2.5 py-1 bg-background border border-border rounded-full text-[11px] font-medium text-muted-foreground flex items-center gap-1.5 transition-colors group-hover/card:border-border/80">
                          {bug.repo}
                        </span>
                      </div>
                    </div>

                    {/* Right Meta */}
                    <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:min-w-[160px] shrink-0 pt-3 md:pt-0 border-t md:border-t-0 border-border/50 mt-4 md:mt-0">
                      <div className="flex items-center justify-between w-full md:justify-end gap-3 mb-0 md:mb-2">
                        <span className="text-[11px] font-mono font-medium text-muted-foreground">{bug.id}</span>
                        <span className="text-[11px] text-muted-foreground/70">{bug.updatedAt}</span>
                        <MoreVertical className="w-3.5 h-3.5 text-muted-foreground/50 opacity-0 md:opacity-100 md:group-hover/card:opacity-100 transition-opacity" />
                      </div>
                      
                      <div className="flex items-center justify-between w-full md:justify-end gap-3 my-auto md:my-0 md:mb-2">
                        <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide border ${statusStyles.bg} ${statusStyles.text} ${statusStyles.border}`}>
                          <statusStyles.icon className="w-3 h-3" />
                          {bug.status}
                        </span>
                      </div>

                      <div className="hidden md:flex items-center justify-end w-full gap-2 mt-auto">
                        <div className="w-5 h-5 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-[9px] font-bold text-primary">
                          {bug.author.charAt(0)}
                        </div>
                        <span className="text-[11px] font-medium text-foreground/80">{bug.author}</span>
                        <span className="text-[11px] text-muted-foreground mx-0.5">•</span>
                        <span className="text-[11px] text-muted-foreground">{bug.commits} commit{bug.commits > 1 ? 's' : ''}</span>
                      </div>
                    </div>

                  </div>

                  {/* Expanded Detail View */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="border-t border-border/50 bg-background/50 overflow-hidden"
                      >
                        <div className="px-6 md:pl-[76px] md:pr-10 py-6 text-sm flex flex-col gap-6">
                          
                          {/* Root Cause */}
                          <div>
                            <h5 className="font-semibold text-foreground/80 mb-2.5 text-[11px] uppercase tracking-wider flex items-center gap-2">
                              <Search className="w-3.5 h-3.5 text-orange-400" /> Root Cause
                            </h5>
                            <p className="text-foreground/80 leading-relaxed bg-card/80 border border-border/50 p-4 rounded-lg">
                              {bug.rootCause}
                            </p>
                          </div>

                          <div className="w-full h-px bg-border/40" />

                          {/* Resolution */}
                          <div>
                            <h5 className="font-semibold text-foreground/80 mb-2.5 text-[11px] uppercase tracking-wider flex items-center gap-2">
                              <CheckCircle2 className="w-3.5 h-3.5 text-green-400" /> Resolution
                            </h5>
                            <p className="text-foreground/80 leading-relaxed bg-card/80 border border-border/50 p-4 rounded-lg">
                              {bug.resolution}
                            </p>
                          </div>
                          
                          <div className="w-full h-px bg-border/40" />

                          {/* Meta grid */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <h5 className="font-semibold text-foreground/80 mb-3 text-[11px] uppercase tracking-wider">Related Files</h5>
                              <ul className="space-y-2.5">
                                {bug.relatedFiles.map(file => (
                                  <li key={file} className="flex items-center gap-2.5 text-muted-foreground hover:text-blue-400 transition-colors cursor-pointer text-xs font-mono group/file">
                                    <FileCode className="w-3.5 h-3.5 shrink-0 text-muted-foreground/60 group-hover/file:text-blue-400" /> {file}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            
                            <div>
                              <h5 className="font-semibold text-foreground/80 mb-3 text-[11px] uppercase tracking-wider">Related Commit</h5>
                              <div className="flex items-center gap-2.5 text-muted-foreground hover:text-green-400 transition-colors cursor-pointer text-xs font-mono group/commit">
                                <GitCommit className="w-3.5 h-3.5 shrink-0 text-muted-foreground/60 group-hover/commit:text-green-400" /> {bug.relatedCommit}
                              </div>
                            </div>
                          </div>

                          {/* AI Summary */}
                          <div className="mt-2 bg-green-500/5 border border-green-500/30 rounded-xl p-5 shadow-sm">
                            <h5 className="font-bold text-green-500/90 mb-2.5 text-xs uppercase tracking-wider flex items-center gap-2">
                              <Sparkles className="w-4 h-4" /> Memora AI Insight
                            </h5>
                            <p className="text-foreground/80 leading-relaxed text-sm">
                              {bug.aiSummary}
                            </p>
                          </div>

                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}

            <div className="mt-8 pt-4 flex justify-center">
              <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground font-medium px-4 py-2 border border-border rounded-md hover:bg-card hover:-translate-y-[1px] shadow-sm transition-all duration-250">
                Load More Bugs <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="w-full lg:w-[340px] xl:w-[380px] flex flex-col bg-background shrink-0 h-full border-l border-border/50 overflow-y-auto">
        <div className="p-6 md:p-8 space-y-8">
          
          {/* Bug Overview */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-sm">Bug Overview</h3>
              <button className="text-[10px] text-primary hover:underline uppercase tracking-wider font-semibold">View All</button>
            </div>
            <div className="bg-card border border-border rounded-xl p-4 shadow-sm grid grid-cols-2 gap-y-6 gap-x-4 hover:border-border/80 transition-colors cursor-default">
              <div>
                <div className="flex items-center gap-1.5 text-muted-foreground text-xs font-medium mb-1.5">
                  <Bug className="w-3.5 h-3.5 text-red-500" /> Total Bugs
                </div>
                <div className="text-2xl font-bold font-mono tracking-tight text-foreground/90">24</div>
                <div className="text-[10px] text-red-500 mt-1 flex items-center gap-1 font-medium font-sans">
                  +5 <span className="text-muted-foreground font-normal">this week</span>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-1.5 text-muted-foreground text-xs font-medium mb-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-green-500" /> Resolved
                </div>
                <div className="text-2xl font-bold font-mono tracking-tight text-foreground/90">18</div>
                <div className="text-[10px] text-muted-foreground mt-1 font-medium font-sans">
                  75% resolved
                </div>
              </div>
              <div>
                <div className="flex items-center gap-1.5 text-muted-foreground text-xs font-medium mb-1.5">
                  <Clock className="w-3.5 h-3.5 text-blue-500" /> Open
                </div>
                <div className="text-2xl font-bold font-mono tracking-tight text-foreground/90">6</div>
                <div className="text-[10px] text-green-500 mt-1 flex items-center gap-1 font-medium font-sans">
                  -2 <span className="text-muted-foreground font-normal">this week</span>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-1.5 text-muted-foreground text-xs font-medium mb-1.5">
                  <AlertOctagon className="w-3.5 h-3.5 text-red-500" /> Critical
                </div>
                <div className="text-2xl font-bold font-mono tracking-tight text-foreground/90">3</div>
                <div className="text-[10px] text-red-500 mt-1 flex items-center gap-1 font-medium font-sans">
                  +1 <span className="text-muted-foreground font-normal">this week</span>
                </div>
              </div>
            </div>
          </div>

          {/* Filter by */}
          <div>
            <h3 className="font-semibold text-sm mb-4">Filter by</h3>
            <div className="bg-card border border-border rounded-xl p-2 shadow-sm space-y-0.5 hover:border-border/80 transition-colors">
              <FilterItem icon={Bug} label="All Bugs" count="24" color="text-red-500" />
              <FilterItem icon={Clock} label="Open" count="6" color="text-blue-500" />
              <FilterItem icon={CheckCircle2} label="Resolved" count="18" color="text-green-500" />
              <div className="h-px bg-border my-2 mx-2" />
              <FilterItem icon={AlertOctagon} label="Critical" count="3" color="text-red-500" />
              <FilterItem icon={AlertTriangle} label="High" count="7" color="text-orange-500" />
              <FilterItem icon={AlertTriangle} label="Medium" count="8" color="text-yellow-500" />
              <FilterItem icon={Activity} label="Low" count="6" color="text-green-500" />
            </div>
          </div>

          {/* Recent Bugs */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-sm">Recent Bugs</h3>
              <button className="text-[10px] text-primary hover:underline uppercase tracking-wider font-semibold">View All</button>
            </div>
            <div className="bg-card border border-border rounded-xl p-2 shadow-sm space-y-0.5 hover:border-border/80 transition-colors">
              <RecentBugItem id="BUG-0018" severity="CRITICAL" title="Memory leak in WebSocket connection" time="2h ago" iconColor="text-red-500" />
              <RecentBugItem id="BUG-0017" severity="HIGH" title="JWT refresh token not rotating" time="5h ago" iconColor="text-orange-500" />
              <RecentBugItem id="BUG-0016" severity="MEDIUM" title="API rate limiting not working" time="1d ago" iconColor="text-yellow-500" />
              <RecentBugItem id="BUG-0015" severity="LOW" title="UI flicker on theme switch" time="2d ago" iconColor="text-green-500" />
            </div>
          </div>

          {/* Top Affected Modules */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-sm">Top Affected Modules</h3>
              <button className="text-[10px] text-primary hover:underline uppercase tracking-wider font-semibold">View All</button>
            </div>
            <div className="bg-card border border-border rounded-xl p-5 shadow-sm space-y-4 hover:border-border/80 transition-colors">
              <ModuleBar label="Authentication" count={8} percentage={80} color="bg-red-500" />
              <ModuleBar label="WebSocket" count={5} percentage={50} color="bg-orange-500" />
              <ModuleBar label="Database" count={4} percentage={40} color="bg-yellow-500" />
              <ModuleBar label="API" count={3} percentage={30} color="bg-blue-500" />
              <ModuleBar label="Frontend" count={2} percentage={20} color="bg-green-500" />
            </div>
          </div>

        </div>
      </div>

    </div>
  )
}

// -----------------------------------------------------
// Subcomponents & Helpers
// -----------------------------------------------------

function getSeverityStyles(severity: string) {
  switch(severity.toLowerCase()) {
    case 'critical': return { bg: 'bg-red-500', text: 'text-red-500', bgOpacity: 'bg-red-500/10', border: 'border-red-500/20', rawColor: 'red-500', icon: AlertOctagon }
    case 'high': return { bg: 'bg-orange-500', text: 'text-orange-500', bgOpacity: 'bg-orange-500/10', border: 'border-orange-500/20', rawColor: 'orange-500', icon: AlertTriangle }
    case 'medium': return { bg: 'bg-yellow-500', text: 'text-yellow-500', bgOpacity: 'bg-yellow-500/10', border: 'border-yellow-500/20', rawColor: 'yellow-500', icon: AlertTriangle }
    case 'low': return { bg: 'bg-green-500', text: 'text-green-500', bgOpacity: 'bg-green-500/10', border: 'border-green-500/20', rawColor: 'green-500', icon: Activity }
    default: return { bg: 'bg-border', text: 'text-foreground', bgOpacity: 'bg-background', border: 'border-border', rawColor: 'border', icon: Bug }
  }
}

function getStatusStyles(status: string) {
  switch(status.toLowerCase()) {
    case 'resolved': return { bg: 'bg-green-500/10', text: 'text-green-500', border: 'border-green-500/20', icon: CheckCircle2 }
    case 'open': return { bg: 'bg-blue-500/10', text: 'text-blue-500', border: 'border-blue-500/20', icon: AlertOctagon }
    case 'in progress': return { bg: 'bg-yellow-500/10', text: 'text-yellow-500', border: 'border-yellow-500/20', icon: Clock }
    default: return { bg: 'bg-border/50', text: 'text-foreground', border: 'border-border', icon: Bug }
  }
}

function FilterItem({ icon: Icon, label, count, color }: { icon: any, label: string, count: string, color: string }) {
  return (
    <button className="w-full flex items-center justify-between p-2 rounded-lg text-sm transition-all duration-250 text-muted-foreground hover:bg-white/5 hover:text-foreground hover:-translate-y-[1px]">
      <div className="flex items-center gap-2.5">
        <Icon className={`w-4 h-4 ${color}`} />
        {label}
      </div>
      <span className="text-[11px] font-mono opacity-60">{count}</span>
    </button>
  )
}

function RecentBugItem({ id, severity, title, time, iconColor }: { id: string, severity: string, title: string, time: string, iconColor: string }) {
  return (
    <button className="w-full flex flex-col p-2.5 rounded-lg text-muted-foreground hover:bg-white/5 hover:text-foreground transition-all duration-250 group text-left hover:-translate-y-[1px]">
      <div className="flex items-center justify-between w-full mb-1">
        <div className="flex items-center gap-2">
          <Bug className={`w-3.5 h-3.5 ${iconColor}`} />
          <span className="text-[11px] font-mono font-medium">{id}</span>
          <span className={`text-[9px] font-bold tracking-wider px-1.5 py-0.5 rounded border ${iconColor.replace('text-', 'bg-').replace('500', '500/10')} ${iconColor} ${iconColor.replace('text-', 'border-').replace('500', '500/20')}`}>
            {severity}
          </span>
        </div>
        <span className="text-[10px] opacity-60 group-hover:opacity-100 transition-opacity">{time}</span>
      </div>
      <span className="text-xs font-medium text-foreground/80 group-hover:text-foreground truncate w-full pl-5.5">
        {title}
      </span>
    </button>
  )
}

function ModuleBar({ label, count, percentage, color }: { label: string, count: number, percentage: number, color: string }) {
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
