import { useState, useEffect } from "react"
import { 
  Search, Filter, Plus, Network, Database, Layers, 
  Zap, HardDrive, CheckCircle2, Clock, AlertCircle, 
  ChevronDown, FileText, Command, LayoutGrid, List,
  FileCode, Sparkles, FolderGit2, MoreVertical
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

// Mock Data
const MOCK_ADRS = [
  {
    id: "ADR-003",
    title: "JWT Refresh Strategy",
    summary: "Decided to implement rotating refresh tokens with Redis for session management.",
    status: "Accepted",
    date: "Jun 20, 2024",
    author: "Raj Patel",
    category: "Authentication",
    tags: ["Authentication", "Security", "Redis"],
    iconColor: "purple",
    icon: Network,
    context: "We needed a scalable way to handle user sessions across multiple stateless API instances without hitting the Postgres database on every request.",
    decision: "We will use short-lived JWT access tokens (15m) and long-lived refresh tokens (7d) stored in Redis. When a refresh token is used, it is rotated.",
    consequences: "Positive: High scalability, fast auth checks. Negative: Increased complexity in client-side token management. Requires Redis high availability.",
    impact: "High",
    relatedFiles: ["src/auth/jwt.service.ts", "docs/architecture/ADR-003-jwt-redis.md"],
    aiSummary: "The separation of short-lived access and Redis-backed refresh tokens perfectly balances horizontal scalability with rapid revocation capabilities. Given the expected traffic growth, this remains the most optimal state-management approach."
  },
  {
    id: "ADR-002",
    title: "Database Choice - PostgreSQL",
    summary: "Selected PostgreSQL as the primary database for its reliability and advanced features.",
    status: "Accepted",
    date: "Jun 18, 2024",
    author: "Amit Verma",
    category: "Database",
    tags: ["Database", "PostgreSQL", "Backend"],
    iconColor: "green",
    icon: Database,
    context: "We evaluated MySQL and PostgreSQL for relational data storage.",
    decision: "PostgreSQL chosen for robust JSONB support and advanced indexing, anticipating mixed schema requirements.",
    consequences: "Positive: Strong data integrity and JSON flexibility. Negative: Steeper learning curve for advanced features compared to MySQL.",
    impact: "Critical",
    relatedFiles: ["schema.prisma", "docs/architecture/ADR-002-postgres.md"],
    aiSummary: "PostgreSQL's JSONB support has proven invaluable as our data models evolved without requiring strict schema migrations early on. The choice continues to pay dividends in query performance and transactional safety."
  },
  {
    id: "ADR-001",
    title: "Microservices over Monolith",
    summary: "Chose microservices architecture for better scalability and team autonomy.",
    status: "Accepted",
    date: "Jun 15, 2024",
    author: "Neha Singh",
    category: "Architecture",
    tags: ["Architecture", "Microservices", "Scalability"],
    iconColor: "blue",
    icon: Layers,
    context: "To support rapid scaling and independent deployment cycles across 3 engineering teams.",
    decision: "Adopt a microservices architecture communicating via gRPC/REST.",
    consequences: "Positive: Independent scaling. Negative: Operational overhead for deployment and monitoring.",
    impact: "Critical",
    relatedFiles: ["docker-compose.yml", "docs/architecture/ADR-001-microservices.md"],
    aiSummary: "With multiple distinct engineering squads actively deploying, the bounded contexts established here prevent deployment bottlenecks. The overhead is mitigated by our CI/CD investments."
  },
  {
    id: "ADR-004",
    title: "WebSocket for Real-time Updates",
    summary: "Using WebSocket for real-time notifications and live collaboration features.",
    status: "Proposed",
    date: "Jun 22, 2024",
    author: "Raj Patel",
    category: "Real-time",
    tags: ["Real-time", "WebSocket", "Notifications"],
    iconColor: "orange",
    icon: Zap,
    context: "Need a low-latency mechanism to push updates to clients instead of polling.",
    decision: "Implement native WebSockets (ws library) over socket.io for reduced overhead.",
    consequences: "Requires stateful load balancing and careful memory management.",
    impact: "High",
    relatedFiles: ["src/websocket/server.ts"],
    aiSummary: "Transitioning to raw WebSockets eliminates the Socket.io overhead, which aligns well with our infrastructure's capabilities for maintaining persistent connections efficiently."
  },
  {
    id: "ADR-005",
    title: "File Storage with S3",
    summary: "Storing user files and backups in AWS S3 for durability and cost efficiency.",
    status: "Deprecated",
    date: "Jun 10, 2024",
    author: "Amit Verma",
    category: "Storage",
    tags: ["Storage", "AWS S3", "Files"],
    iconColor: "yellow",
    icon: HardDrive,
    context: "Storing files on the local filesystem prevents horizontal scaling.",
    decision: "Use AWS S3 for all object storage.",
    consequences: "This ADR is now deprecated in favor of Cloudflare R2 for zero egress fees.",
    impact: "Medium",
    relatedFiles: ["src/storage/s3.service.ts"],
    aiSummary: "While S3 was initially standard, deprecating it for R2 drastically reduces our egress costs given the heavy read volume of our architecture."
  }
]

export function ArchitectureDecisionsPage() {
  const [activeTab, setActiveTab] = useState("All Decisions")
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  
  const toggleExpand = (id: string) => {
    setExpandedId(prev => prev === id ? null : id)
  }

  return (
    <div className="flex flex-col lg:flex-row h-full max-w-[1600px] mx-auto w-full bg-background overflow-hidden">
      
      {/* Main Column */}
      <div className="flex-1 flex flex-col min-w-0 border-r border-border/50 h-full overflow-hidden">
        
        {/* Header */}
        <div className="shrink-0 bg-background/95 backdrop-blur z-20 sticky top-0 pt-6 px-6 md:px-8">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
                Architecture Decisions <Network className="w-5 h-5 text-purple-500" />
              </h1>
              <p className="text-sm text-muted-foreground mt-1">Track, document, and learn from important architectural decisions.</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/80 group-focus-within:text-purple-500 transition-colors" />
                <input 
                  type="text" 
                  placeholder="Search ADRs, technologies or architectural topics..." 
                  className="w-full md:w-[320px] bg-card border border-border rounded-md pl-9 pr-12 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 transition-all placeholder:text-muted-foreground hover:border-border/80"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 opacity-50 pointer-events-none">
                  <Command className="w-3 h-3" />
                  <span className="text-[10px] font-mono font-medium">K</span>
                </div>
              </div>
              
              <div className="relative">
                <button 
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="flex items-center gap-2 px-4 py-2.5 border border-border bg-card hover:bg-white/5 rounded-md text-sm transition-colors shadow-sm font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-purple-500"
                >
                  <Filter className="w-4 h-4" /> Filters
                </button>
                <AnimatePresence>
                  {isFilterOpen && (
                    <motion.div 
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-full mt-2 w-48 bg-card border border-border rounded-lg shadow-lg z-50 overflow-hidden"
                    >
                      <div className="p-1">
                        <FilterOption icon={Layers} label="Category" />
                        <FilterOption icon={CheckCircle2} label="Status" />
                        <FilterOption icon={FolderGit2} label="Repository" />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <button className="flex items-center gap-2 px-4 py-2.5 border border-purple-500/40 bg-background text-purple-500 hover:bg-purple-500/10 hover:border-purple-500 hover:shadow-[0_0_12px_rgba(139,92,246,0.15)] rounded-md text-sm font-semibold transition-all duration-250 shrink-0">
                <Plus className="w-4 h-4" /> New ADR
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-6 text-sm font-medium overflow-x-auto scrollbar-hide border-b border-border/50 pb-0">
            {["All Decisions", "Accepted", "Proposed", "Deprecated", "Superseded"].map(tab => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative pb-4 transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:text-foreground ${
                  activeTab === tab 
                    ? "text-purple-500" 
                    : "text-muted-foreground hover:text-foreground/80"
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <motion.div 
                    layoutId="activeTabIndicatorADR"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-purple-500"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Stats Row */}
        <div className="px-6 md:px-8 py-6 grid grid-cols-2 md:grid-cols-4 gap-4 bg-background">
          <StatCard title="Total ADRs" targetCount={32} subtitle="+4 this month" icon={FileText} color="text-purple-500" />
          <StatCard title="Accepted" targetCount={24} subtitle="75% of total" icon={CheckCircle2} color="text-green-500" />
          <StatCard title="Proposed" targetCount={5} subtitle="16% of total" icon={Clock} color="text-blue-500" />
          <StatCard title="Deprecated" targetCount={3} subtitle="9% of total" icon={AlertCircle} color="text-red-500" />
        </div>

        {/* Toolbar */}
        <div className="px-6 md:px-8 py-3 flex flex-wrap items-center justify-between gap-4 border-y border-border/50 bg-background/80 backdrop-blur sticky top-[223px] z-10">
          <span className="text-sm text-muted-foreground font-medium">Showing 32 decisions</span>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground font-medium bg-card border border-border px-3 py-1.5 rounded-md transition-colors">
              Sort by: Most Recent <ChevronDown className="w-4 h-4" />
            </button>
            <div className="flex items-center bg-card border border-border rounded-md overflow-hidden">
              <button className="p-1.5 text-muted-foreground hover:bg-white/10 hover:text-foreground transition-colors"><LayoutGrid className="w-4 h-4" /></button>
              <div className="w-px h-4 bg-border" />
              <button className="p-1.5 text-foreground bg-white/10 transition-colors"><List className="w-4 h-4" /></button>
            </div>
          </div>
        </div>

        {/* ADR List */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8">
          <div className="max-w-5xl mx-auto space-y-4 pb-8">
            {MOCK_ADRS.map((adr) => {
              const isExpanded = expandedId === adr.id
              const colors = getColorStyles(adr.iconColor)
              const statusColors = getStatusColor(adr.status)
              const Icon = adr.icon

              return (
                <div 
                  key={adr.id}
                  onClick={() => toggleExpand(adr.id)}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      toggleExpand(adr.id)
                    }
                  }}
                  className={`relative bg-card border rounded-xl transition-all duration-250 cursor-pointer overflow-hidden group/card focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-purple-500 ${
                    isExpanded 
                      ? `border-${colors.rawColor}/60 shadow-lg ring-1 ring-${colors.rawColor}/10` 
                      : `border-border hover:border-${colors.rawColor}/40 hover:shadow-md hover:-translate-y-[2px]`
                  }`}
                >
                  <div className="p-5 flex flex-col md:flex-row gap-5">
                    
                    {/* Left Icon */}
                    <div className={`w-12 h-12 rounded-2xl ${colors.bgOpacity} border ${colors.border} flex items-center justify-center shrink-0`}>
                      <Icon className={`w-6 h-6 ${colors.text}`} />
                    </div>

                    {/* Main Content */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-3 mb-1.5">
                          <span className="text-sm font-mono font-medium text-muted-foreground group-hover/card:text-foreground/70 transition-colors">{adr.id}:</span>
                          <h3 className="font-semibold text-foreground/90 text-base truncate group-hover/card:text-foreground transition-colors">{adr.title}</h3>
                        </div>
                        <p className="text-sm text-foreground/70 mb-4 leading-relaxed">
                          {adr.summary}
                        </p>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap items-center gap-2">
                        {adr.tags.map(tag => (
                          <span key={tag} className={`px-2.5 py-1 rounded-full text-[11px] font-medium transition-colors border ${colors.bgOpacity} ${colors.text} ${colors.border} group-hover/card:bg-transparent`}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Right Meta */}
                    <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:min-w-[140px] shrink-0 pt-3 md:pt-0 border-t md:border-t-0 border-border/50 mt-4 md:mt-0">
                      <div className="flex items-center justify-between w-full md:justify-end gap-3 mb-0 md:mb-2">
                        <span className={`px-2.5 py-1.5 rounded-full text-[10px] font-bold tracking-wide border ${statusColors.bgOpacity} ${statusColors.text} ${statusColors.border}`}>
                          {adr.status}
                        </span>
                        <MoreVertical className="w-3.5 h-3.5 text-muted-foreground/50 opacity-0 md:opacity-100 md:group-hover/card:opacity-100 transition-opacity" />
                      </div>
                      
                      <div className="flex items-center justify-between w-full md:justify-end gap-3 my-auto md:my-0 md:mb-2">
                        <span className="text-[11px] font-medium text-muted-foreground">{adr.date}</span>
                      </div>

                      <div className="hidden md:flex items-center justify-end w-full gap-2 mt-auto">
                        <div className="w-5 h-5 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-[9px] font-bold text-primary">
                          {adr.author.charAt(0)}
                        </div>
                        <span className="text-[11px] font-medium text-foreground/80">{adr.author}</span>
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
                        <div className="px-6 md:px-8 py-6 space-y-6 text-sm flex flex-col gap-6">
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                            {/* Context */}
                            <div className="space-y-3 pb-6 md:pb-0 border-b md:border-b-0 border-border/40">
                              <h5 className="font-semibold text-foreground/80 text-[11px] uppercase tracking-wider text-purple-400">Context</h5>
                              <p className="text-foreground/80 leading-relaxed bg-card border border-border/50 p-4 rounded-lg shadow-sm">
                                {adr.context}
                              </p>
                            </div>
                            
                            {/* Decision */}
                            <div className="space-y-3 pb-6 md:pb-0 border-b md:border-b-0 border-border/40">
                              <h5 className="font-semibold text-foreground/80 text-[11px] uppercase tracking-wider text-green-400">Decision</h5>
                              <p className="text-foreground/80 leading-relaxed font-medium bg-card border border-border/50 p-4 rounded-lg shadow-sm">
                                {adr.decision}
                              </p>
                            </div>
                          </div>

                          <div className="w-full h-px bg-border/40 hidden md:block" />

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                            {/* Consequences */}
                            <div className="space-y-3 pb-6 md:pb-0 border-b md:border-b-0 border-border/40">
                              <h5 className="font-semibold text-foreground/80 text-[11px] uppercase tracking-wider text-orange-400">Consequences</h5>
                              <p className="text-foreground/80 leading-relaxed bg-card border border-border/50 p-4 rounded-lg shadow-sm">
                                {adr.consequences}
                              </p>
                            </div>

                            <div className="grid grid-cols-2 gap-4 pb-6 md:pb-0 border-b md:border-b-0 border-border/40">
                              <div className="space-y-3">
                                <h5 className="font-semibold text-foreground/80 text-[11px] uppercase tracking-wider">Impact</h5>
                                <span className="px-3 py-1.5 bg-card border border-border rounded-md text-xs font-semibold text-foreground/90 shadow-sm inline-block">
                                  {adr.impact}
                                </span>
                              </div>
                              <div className="space-y-3">
                                <h5 className="font-semibold text-foreground/80 text-[11px] uppercase tracking-wider">Related Files</h5>
                                <ul className="flex flex-wrap gap-2">
                                  {adr.relatedFiles.map(file => (
                                    <li key={file} onClick={(e) => e.stopPropagation()} className="px-2.5 py-1.5 bg-card border border-border/60 hover:border-blue-500/40 hover:bg-blue-500/5 rounded-md text-[11px] font-mono flex items-center gap-1.5 cursor-pointer transition-colors shadow-sm text-muted-foreground hover:text-blue-400 group/file">
                                      <FileCode className="w-3 h-3 shrink-0 text-muted-foreground/60 group-hover/file:text-blue-400" /> 
                                      {file.split('/').pop()}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                          
                          <div className="w-full h-px bg-border/40 hidden md:block" />

                          {/* AI Insight */}
                          <div className="mt-2 bg-green-500/5 border border-green-500/30 rounded-xl p-5 shadow-sm">
                            <h5 className="font-bold text-green-500/90 mb-2.5 text-xs uppercase tracking-wider flex items-center gap-2">
                              <Sparkles className="w-4 h-4" /> Memora AI Insight
                            </h5>
                            <p className="text-foreground/80 leading-relaxed text-sm">
                              {adr.aiSummary}
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
                Load More ADRs <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="w-full lg:w-[340px] xl:w-[380px] flex flex-col bg-background shrink-0 h-full border-l border-border/50 overflow-y-auto">
        <div className="p-6 md:p-8 space-y-8">
          
          {/* ADR Overview */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-sm">ADR Overview</h3>
              <button className="text-[10px] text-purple-500 hover:underline uppercase tracking-wider font-semibold">View All</button>
            </div>
            <div className="bg-card border border-border rounded-xl p-5 shadow-sm flex items-center gap-6 hover:border-border/80 transition-colors">
              
              {/* Donut Chart Mock */}
              <div className="relative w-24 h-24 shrink-0 flex items-center justify-center">
                <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                  <path className="text-border" strokeWidth="4" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  {/* Accepted (75%) */}
                  <motion.path 
                    initial={{ strokeDasharray: "0, 100" }}
                    animate={{ strokeDasharray: "75, 100" }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="text-green-500" strokeWidth="4" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
                  />
                  {/* Proposed (16%) */}
                  <motion.path 
                    initial={{ strokeDasharray: "0, 100" }}
                    animate={{ strokeDasharray: "16, 100" }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                    className="text-blue-500" strokeDashoffset="-75" strokeWidth="4" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
                  />
                  {/* Deprecated (9%) */}
                  <motion.path 
                    initial={{ strokeDasharray: "0, 100" }}
                    animate={{ strokeDasharray: "9, 100" }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
                    className="text-red-500" strokeDashoffset="-91" strokeWidth="4" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
                  />
                </svg>
                <div className="absolute flex flex-col items-center justify-center text-center">
                  <span className="text-xl font-bold font-mono">32</span>
                  <span className="text-[9px] text-muted-foreground uppercase font-bold tracking-widest">Total</span>
                </div>
              </div>

              {/* Legend */}
              <div className="flex-1 space-y-2.5">
                <LegendItem color="bg-green-500" label="Accepted" count="24" percent="(75%)" />
                <LegendItem color="bg-blue-500" label="Proposed" count="5" percent="(16%)" />
                <LegendItem color="bg-red-500" label="Deprecated" count="3" percent="(9%)" />
                <LegendItem color="bg-muted-foreground" label="Superseded" count="0" percent="(0%)" />
              </div>
            </div>
          </div>

          {/* Decisions by Category */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-sm">Decisions by Category</h3>
              <button className="text-[10px] text-purple-500 hover:underline uppercase tracking-wider font-semibold">View All</button>
            </div>
            <div className="bg-card border border-border rounded-xl p-5 shadow-sm space-y-4 hover:border-border/80 transition-colors">
              <ModuleBar label="Architecture" count={8} percentage={80} color="bg-blue-500" />
              <ModuleBar label="Database" count={6} percentage={60} color="bg-green-500" />
              <ModuleBar label="Authentication" count={5} percentage={50} color="bg-purple-500" />
              <ModuleBar label="Infrastructure" count={4} percentage={40} color="bg-orange-500" />
              <ModuleBar label="Security" count={4} percentage={40} color="bg-red-500" />
              <ModuleBar label="Storage" count={3} percentage={30} color="bg-yellow-500" />
              <ModuleBar label="Real-time" count={2} percentage={20} color="bg-cyan-500" />
            </div>
          </div>

          {/* Recent ADRs */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-sm">Recent ADRs</h3>
              <button className="text-[10px] text-purple-500 hover:underline uppercase tracking-wider font-semibold">View All</button>
            </div>
            <div className="bg-card border border-border rounded-xl p-2 shadow-sm space-y-0.5 hover:border-border/80 transition-colors">
              <RecentAdrItem id="ADR-003" title="JWT Refresh Strategy" status="Accepted" date="Jun 20, 2024" iconColor="text-purple-500" />
              <RecentAdrItem id="ADR-002" title="Database Choice - PostgreSQL" status="Accepted" date="Jun 18, 2024" iconColor="text-green-500" />
              <RecentAdrItem id="ADR-001" title="Microservices over Monolith" status="Accepted" date="Jun 15, 2024" iconColor="text-blue-500" />
              <RecentAdrItem id="ADR-004" title="WebSocket for Real-time Updates" status="Proposed" date="Jun 22, 2024" iconColor="text-orange-500" />
            </div>
          </div>

          {/* ADR Health Chart */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-sm">ADR Health</h3>
              <button className="text-[10px] text-purple-500 hover:underline uppercase tracking-wider font-semibold">View All</button>
            </div>
            <div className="bg-card border border-border rounded-xl p-5 shadow-sm h-48 flex flex-col justify-between relative group hover:border-border/80 transition-colors">
              <div className="flex items-center justify-between text-xs text-muted-foreground absolute top-5 left-5 bottom-8 flex-col-reverse items-end pr-2">
                <span>0</span>
                <span>10</span>
                <span>20</span>
                <span>30</span>
                <span>40</span>
              </div>
              <div className="ml-6 flex-1 relative overflow-hidden">
                <svg className="w-full h-full absolute inset-0 text-green-500 opacity-80" preserveAspectRatio="none" viewBox="0 0 100 100">
                  <path d="M0,100 L0,90 L20,80 L40,75 L60,60 L80,50 L100,40 L100,100 Z" fill="currentColor" fillOpacity="0.1" />
                  <motion.polyline 
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    points="0,90 20,80 40,75 60,60 80,50 100,40" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
                  />
                  <circle cx="0" cy="90" r="2.5" fill="currentColor" className="hover:r-[4px] transition-all cursor-pointer hover:fill-white" />
                  <circle cx="20" cy="80" r="2.5" fill="currentColor" className="hover:r-[4px] transition-all cursor-pointer hover:fill-white" />
                  <circle cx="40" cy="75" r="2.5" fill="currentColor" className="hover:r-[4px] transition-all cursor-pointer hover:fill-white" />
                  <circle cx="60" cy="60" r="2.5" fill="currentColor" className="hover:r-[4px] transition-all cursor-pointer hover:fill-white" />
                  <circle cx="80" cy="50" r="2.5" fill="currentColor" className="hover:r-[4px] transition-all cursor-pointer hover:fill-white" />
                  <circle cx="100" cy="40" r="2.5" fill="currentColor" className="hover:r-[4px] transition-all cursor-pointer hover:fill-white" />
                </svg>
              </div>
              
              <div className="relative z-10 flex justify-between w-full text-[10px] text-muted-foreground ml-6 mt-2 pt-2 border-t border-border/30">
                <span>May 28</span>
                <span>Jun 4</span>
                <span>Jun 11</span>
                <span>Jun 18</span>
                <span>Jun 25</span>
              </div>
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

function StatCard({ title, targetCount, subtitle, icon: Icon, color }: { title: string, targetCount: number, subtitle: string, icon: any, color: string }) {
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

function FilterOption({ icon: Icon, label }: { icon: any, label: string }) {
  return (
    <button className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-foreground/80 hover:text-foreground hover:bg-white/5 rounded-md transition-colors text-left">
      <Icon className="w-4 h-4 text-muted-foreground" />
      {label}
    </button>
  )
}

function LegendItem({ color, label, count, percent }: { color: string, label: string, count: string, percent: string }) {
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

function RecentAdrItem({ id, title, status, date, iconColor }: { id: string, title: string, status: string, date: string, iconColor: string }) {
  const statusColors = getStatusColor(status)
  return (
    <button className="w-full flex flex-col p-2.5 rounded-lg text-muted-foreground hover:bg-white/5 hover:text-foreground transition-all duration-250 group text-left hover:-translate-y-[1px]">
      <div className="flex items-center gap-2 mb-1">
        <FileText className={`w-3.5 h-3.5 ${iconColor}`} />
        <span className="text-xs font-medium text-foreground/80 group-hover:text-foreground truncate w-full">{id}: {title}</span>
      </div>
      <div className="flex items-center gap-2 text-[10px] pl-5.5">
        <span className={`${statusColors.text} font-medium`}>{status}</span>
        <span className="text-muted-foreground/60">•</span>
        <span className="opacity-60">{date}</span>
      </div>
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

function getColorStyles(color: string) {
  switch(color) {
    case 'purple': return { bgOpacity: 'bg-purple-500/10', text: 'text-purple-500', border: 'border-purple-500/20', rawColor: 'purple-500' }
    case 'green': return { bgOpacity: 'bg-green-500/10', text: 'text-green-500', border: 'border-green-500/20', rawColor: 'green-500' }
    case 'blue': return { bgOpacity: 'bg-blue-500/10', text: 'text-blue-500', border: 'border-blue-500/20', rawColor: 'blue-500' }
    case 'orange': return { bgOpacity: 'bg-orange-500/10', text: 'text-orange-500', border: 'border-orange-500/20', rawColor: 'orange-500' }
    case 'yellow': return { bgOpacity: 'bg-yellow-500/10', text: 'text-yellow-500', border: 'border-yellow-500/20', rawColor: 'yellow-500' }
    default: return { bgOpacity: 'bg-border', text: 'text-foreground', border: 'border-border', rawColor: 'border' }
  }
}

function getStatusColor(status: string) {
  switch(status.toLowerCase()) {
    case 'accepted': return { bgOpacity: 'bg-green-500/10', text: 'text-green-500', border: 'border-green-500/20' }
    case 'proposed': return { bgOpacity: 'bg-blue-500/10', text: 'text-blue-500', border: 'border-blue-500/20' }
    case 'deprecated': return { bgOpacity: 'bg-red-500/10', text: 'text-red-500', border: 'border-red-500/20' }
    default: return { bgOpacity: 'bg-border/50', text: 'text-muted-foreground', border: 'border-border' }
  }
}
