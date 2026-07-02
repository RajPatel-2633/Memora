import { useState } from "react"
import { 
  Search, Filter, BookOpen, FileCode, FileText, Bug, 
  Database, Code, MoreVertical, GitBranch, Sparkles, 
  CheckCircle2, GitCommit, Activity, FileJson, Command,
  ChevronDown, FolderGit2, Calendar, LayoutGrid, CheckSquare
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

import { MemoryFilterOption } from "../components/memory/MemoryFilterOption"
import { MemoryFilterItem } from "../components/memory/MemoryFilterItem"
import { RepoItem } from "../components/memory/RepoItem"
import { ActivityItem } from "../components/memory/ActivityItem"
import { MemoryTag } from "../components/memory/MemoryTag"

// Mock Data for Timeline
const MEMORY_TIMELINE = [
  {
    group: "Today",
    items: [
      {
        id: 1,
        title: "Learned Authentication Flow",
        description: "Memora learned the complete authentication flow including login, JWT generation, refresh token rotation, and logout.",
        icon: BookOpen,
        color: "text-green-500",
        bgColor: "bg-green-500/10",
        borderColor: "border-green-500/20",
        type: "Concept",
        confidence: "High",
        repo: "memora-ai/memora",
        meta: "3 related files",
        time: "10:24 AM",
        summary: "The authentication flow is built on Express using JWT for stateless sessions. Access tokens are short-lived (15m), while refresh tokens are persisted in Redis (7d TTL) to allow session revocation on logout or password change.",
        relatedFiles: ["auth.controller.ts", "jwt.service.ts", "redis.service.ts"],
        relatedCommits: ["feat: implement JWT refresh flow (a1b2c3d)"],
        relatedBugs: [],
        architectureDecisions: ["ADR-003: JWT Refresh Strategy"],
        confidenceExplanation: "Analyzed cross-references across controller, service, and infrastructure layers with 100% test coverage mapping.",
        indexedTime: "Today, 10:24:12 AM"
      },
      {
        id: 2,
        title: "Indexed auth.service.ts",
        description: "Indexed and analyzed authentication service implementation with JWT, bcrypt, and Redis integration.",
        icon: FileCode,
        color: "text-blue-500",
        bgColor: "bg-blue-500/10",
        borderColor: "border-blue-500/20",
        type: "File",
        confidence: "High",
        repo: "memora-ai/memora",
        meta: "142 lines of code",
        time: "09:42 AM",
        summary: "Core service file handling user authentication logic. Exposes login, register, refresh, and logout methods. Integrates bcrypt for password hashing and standardizes Redis cache keys for tokens.",
        relatedFiles: ["user.repository.ts", "auth.interface.ts"],
        relatedCommits: ["fix: bcrypt salt rounds performance (9f8e7d)"],
        relatedBugs: ["Bug #22: High memory usage during hashing"],
        architectureDecisions: [],
        confidenceExplanation: "File syntax parsed completely. AST matches standard dependency injection patterns.",
        indexedTime: "Today, 09:42:05 AM"
      }
    ]
  },
  {
    group: "Yesterday",
    items: [
      {
        id: 3,
        title: "Stored Architecture Decision ADR-003",
        description: "Stored architecture decision for using JWT Refresh Tokens with Redis for session management.",
        icon: FileText,
        color: "text-purple-500",
        bgColor: "bg-purple-500/10",
        borderColor: "border-purple-500/20",
        type: "ADR",
        confidence: "High",
        repo: "memora-ai/memora",
        meta: "2 related files",
        time: "Yesterday, 6:15 PM",
        summary: "Decision to move away from stateful express-session to stateless JWTs to support scaling the API across multiple instances. Redis chosen over Postgres for token blacklisting due to high read/write throughput.",
        relatedFiles: ["docs/architecture/ADR-003-jwt-redis.md"],
        relatedCommits: ["docs: add ADR-003 for JWT strategy (5c4b3a)"],
        relatedBugs: [],
        architectureDecisions: [],
        confidenceExplanation: "Explicitly formatted markdown document found in standard /docs/architecture directory.",
        indexedTime: "Yesterday, 6:15:33 PM"
      },
      {
        id: 4,
        title: "Remembered Bug #18",
        description: "Stored bug related to token not being invalidated on logout causing security vulnerability.",
        icon: Bug,
        color: "text-red-500",
        bgColor: "bg-red-500/10",
        borderColor: "border-red-500/20",
        type: "Bug",
        confidence: "Medium",
        repo: "memora-ai/memora",
        meta: "1 related fix",
        time: "Yesterday, 3:30 PM",
        summary: "A critical severity bug where the logout endpoint cleared cookies on the client but failed to delete the refresh token from Redis, allowing intercepted tokens to be reused.",
        relatedFiles: ["auth.controller.ts"],
        relatedCommits: ["fix: properly delete redis token on logout (2a3b4c)"],
        relatedBugs: [],
        architectureDecisions: ["ADR-003: JWT Refresh Strategy"],
        confidenceExplanation: "Linked via PR #42 which referenced Linear issue ID #18.",
        indexedTime: "Yesterday, 3:30:11 PM"
      }
    ]
  },
  {
    group: "2 Days Ago",
    items: [
      {
        id: 5,
        title: "Learned Database Schema",
        description: "Learned the complete PostgreSQL schema including users, sessions, tokens, and audit_logs tables.",
        icon: Database,
        color: "text-emerald-500",
        bgColor: "bg-emerald-500/10",
        borderColor: "border-emerald-500/20",
        type: "Database",
        confidence: "High",
        repo: "memora-ai/memora",
        meta: "8 tables",
        time: "2 days ago, 11:20 AM",
        summary: "Parsed Prisma schema file. Identified 8 models with relational mapping. Primary keys use UUIDv4, and timestamps (createdAt, updatedAt) are consistent across all tables.",
        relatedFiles: ["schema.prisma", "migrations/20260629_init.sql"],
        relatedCommits: ["chore: initialize database schema (7d8e9f)"],
        relatedBugs: [],
        architectureDecisions: [],
        confidenceExplanation: "Prisma schema parsed using official language tools with 0 validation errors.",
        indexedTime: "2 days ago, 11:20:00 AM"
      },
      {
        id: 6,
        title: "Indexed 42 API Endpoints",
        description: "Indexed and analyzed all REST API endpoints with request/response patterns.",
        icon: Code,
        color: "text-blue-400",
        bgColor: "bg-blue-400/10",
        borderColor: "border-blue-400/20",
        type: "API",
        confidence: "High",
        repo: "memora-ai/memora",
        meta: "42 endpoints",
        time: "2 days ago, 10:45 AM",
        summary: "Mapped full express routing tree. Detected RESTful patterns across /users, /auth, /projects, and /analytics namespaces. Most endpoints are secured via JWT middleware.",
        relatedFiles: ["routes.ts", "swagger.yaml"],
        relatedCommits: [],
        relatedBugs: [],
        architectureDecisions: [],
        confidenceExplanation: "Inferred from Express router definitions and matching OpenAPI spec.",
        indexedTime: "2 days ago, 10:45:00 AM"
      }
    ]
  }
]

export function MemoryPage() {
  const [activeTab, setActiveTab] = useState("Timeline")
  const [expandedId, setExpandedId] = useState<number | null>(null)
  const [hoveredGroupId, setHoveredGroupId] = useState<number | null>(null)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [memories] = useState(MEMORY_TIMELINE) // Set to [] to test empty state

  const toggleExpand = (id: number) => {
    setExpandedId(prev => prev === id ? null : id)
  }

  return (
    <div className="flex flex-col lg:flex-row h-full max-w-[1600px] mx-auto w-full bg-background overflow-hidden">
      
      {/* Main Column */}
      <div className="flex-1 flex flex-col min-w-0 border-r border-border/50 h-full overflow-hidden">
        
        {/* Header */}
        <div className="border-b border-border/50 shrink-0 bg-background/95 backdrop-blur z-10 sticky top-0 p-6 md:p-8 pb-0">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
                Memory <Sparkles className="w-5 h-5 text-primary" />
              </h1>
              <p className="text-sm text-muted-foreground mt-1">Everything Memora has learned from your codebase and engineering journey.</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/80 group-focus-within:text-primary transition-colors" />
                <input 
                  type="text" 
                  placeholder="Search memories, files, bugs or architecture..." 
                  className="w-full md:w-80 bg-card border border-border rounded-md pl-9 pr-12 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all placeholder:text-muted-foreground hover:border-border/80"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 opacity-50 pointer-events-none">
                  <Command className="w-3 h-3" />
                  <span className="text-[10px] font-mono font-medium">K</span>
                </div>
              </div>
              
              <div className="relative">
                <button 
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="flex items-center gap-2 px-4 py-2 border border-border bg-card hover:bg-white/5 rounded-md text-sm transition-colors shadow-sm font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
                >
                  <Filter className="w-4 h-4" /> Filters
                </button>

                {/* Filter Dropdown Mock */}
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
                        <MemoryFilterOption icon={FolderGit2} label="Repository" />
                        <MemoryFilterOption icon={Activity} label="Confidence" />
                        <MemoryFilterOption icon={LayoutGrid} label="Memory Type" />
                        <MemoryFilterOption icon={Calendar} label="Date" />
                        <MemoryFilterOption icon={CheckSquare} label="Status" />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-6 text-sm font-medium">
            {["Timeline", "Knowledge Graph", "Entities", "Insights"].map(tab => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative pb-4 transition-colors focus-visible:outline-none focus-visible:text-foreground ${
                  activeTab === tab 
                    ? "text-foreground" 
                    : "text-muted-foreground hover:text-foreground/80"
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <motion.div 
                    layoutId="activeTabIndicator"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Timeline Content */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8">
          <div className="max-w-4xl mx-auto relative">
            
            {memories.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in">
                <div className="w-24 h-24 bg-card border border-border rounded-2xl shadow-sm flex items-center justify-center mb-6">
                   <Sparkles className="w-12 h-12 text-primary opacity-80" />
                </div>
                <h2 className="text-2xl font-bold tracking-tight text-foreground/90 mb-2">No engineering memories yet.</h2>
                <p className="text-muted-foreground text-sm max-w-sm mb-8">
                  Memora learns from your codebase, PRs, and issues over time. Connect a repository to start building your AI knowledge base.
                </p>
                <button className="flex items-center gap-2 bg-primary text-primary-foreground font-medium px-5 py-2.5 rounded-md hover:bg-primary/90 transition-colors shadow-sm hover:shadow-[0_0_15px_rgba(46,160,67,0.3)] hover:-translate-y-[1px]">
                  <FolderGit2 className="w-4 h-4" /> Connect Repository
                </button>
              </div>
            ) : (
              <>
                {/* Timeline Vertical Line */}
                <div className="absolute left-[11px] top-2 bottom-0 w-0.5 bg-border/60" />

                <div className="space-y-12">
                  {memories.map((group, idx) => (
                    <div 
                      key={idx} 
                      className="relative"
                      onMouseEnter={() => setHoveredGroupId(idx)}
                      onMouseLeave={() => setHoveredGroupId(null)}
                    >
                      
                      {/* Group Header */}
                      <div className="flex items-center gap-4 mb-6">
                        <div className={`w-6 h-6 rounded-full bg-background border-2 flex items-center justify-center relative z-10 shrink-0 transition-all duration-250 ${
                          idx === 0 || hoveredGroupId === idx 
                            ? 'border-primary shadow-[0_0_8px_rgba(46,160,67,0.6)]' 
                            : 'border-border'
                        }`}>
                          {(idx === 0 || hoveredGroupId === idx) && <div className="w-2 h-2 rounded-full bg-primary" />}
                        </div>
                        <h3 className={`font-semibold transition-colors duration-250 ${idx === 0 || hoveredGroupId === idx ? 'text-foreground' : 'text-foreground/70'}`}>
                          {group.group}
                        </h3>
                      </div>

                      {/* Group Items */}
                      <div className="pl-10 space-y-4">
                        {group.items.map(item => {
                          const isExpanded = expandedId === item.id

                          return (
                            <div 
                              key={item.id} 
                              onClick={() => toggleExpand(item.id)}
                              className={`bg-card border rounded-xl shadow-sm transition-all duration-250 cursor-pointer overflow-hidden group/card focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary ${
                                isExpanded 
                                  ? 'border-primary/50 shadow-md ring-1 ring-primary/20' 
                                  : 'border-border hover:border-primary/50 hover:shadow-md hover:-translate-y-[3px]'
                              }`}
                              tabIndex={0}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                  e.preventDefault()
                                  toggleExpand(item.id)
                                }
                              }}
                            >
                              
                              <div className="p-5 flex gap-4">
                                {/* Icon */}
                                <div className={`w-10 h-10 rounded-xl ${item.bgColor} border ${item.borderColor} flex items-center justify-center shrink-0`}>
                                  <item.icon className={`w-5 h-5 ${item.color}`} />
                                </div>

                                {/* Content Header */}
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-start justify-between gap-4 mb-1">
                                    <h4 className="font-semibold text-foreground/90 text-base truncate group-hover/card:text-primary transition-colors">{item.title}</h4>
                                    <div className="flex items-center gap-3 shrink-0 mt-0.5">
                                      <span className="text-xs text-muted-foreground">{item.time}</span>
                                      <button className="text-muted-foreground hover:text-foreground opacity-0 group-hover/card:opacity-100 transition-opacity">
                                        <MoreVertical className="w-4 h-4" />
                                      </button>
                                    </div>
                                  </div>
                                  
                                  <p className="text-sm text-foreground/70 mb-4 leading-relaxed">
                                    {item.description}
                                  </p>

                                  {/* Badges */}
                                  <div className="flex flex-wrap items-center gap-2">
                                    <MemoryTag type={item.type} />
                                    
                                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-medium border flex items-center gap-1.5 transition-colors ${
                                      item.confidence === 'High' 
                                        ? 'bg-primary/5 text-primary border-primary/20 group-hover/card:bg-primary/10' 
                                        : 'bg-yellow-500/5 text-yellow-500 border-yellow-500/20 group-hover/card:bg-yellow-500/10'
                                    }`}>
                                      {item.confidence === 'High' ? <CheckCircle2 className="w-3 h-3" /> : <Activity className="w-3 h-3" />}
                                      {item.confidence} Confidence
                                    </span>

                                    <span className="px-2.5 py-1 bg-background border border-border rounded-full text-[11px] font-medium text-muted-foreground flex items-center gap-1.5 transition-colors group-hover/card:border-border/80">
                                      <GitBranch className="w-3 h-3" />
                                      {item.repo}
                                    </span>

                                    <span className="px-2.5 py-1 bg-transparent text-[11px] font-medium text-muted-foreground">
                                      {item.meta}
                                    </span>
                                  </div>
                                </div>
                              </div>

                              {/* Expanded Inline Detail (GitHub commit style) */}
                              <AnimatePresence>
                                {isExpanded && (
                                  <motion.div 
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="border-t border-border/50 bg-background/50 overflow-hidden"
                                  >
                                    <div className="p-5 pl-[76px] space-y-5 text-sm">
                                      
                                      <div>
                                        <h5 className="font-semibold text-foreground/80 mb-1.5 flex items-center gap-2">
                                          <Sparkles className="w-3.5 h-3.5 text-primary" /> AI Summary
                                        </h5>
                                        <p className="text-foreground/70 leading-relaxed">
                                          {item.summary}
                                        </p>
                                      </div>

                                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        
                                        {/* Left Col */}
                                        <div className="space-y-4">
                                          {item.relatedFiles.length > 0 && (
                                            <div>
                                              <h5 className="font-semibold text-foreground/80 mb-2 text-xs uppercase tracking-wider">Related Files</h5>
                                              <ul className="space-y-1.5">
                                                {item.relatedFiles.map(file => (
                                                  <li key={file} className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                                                    <FileCode className="w-3.5 h-3.5" /> {file}
                                                  </li>
                                                ))}
                                              </ul>
                                            </div>
                                          )}
                                          
                                          {item.architectureDecisions.length > 0 && (
                                            <div>
                                              <h5 className="font-semibold text-foreground/80 mb-2 text-xs uppercase tracking-wider">Architecture Decisions</h5>
                                              <ul className="space-y-1.5">
                                                {item.architectureDecisions.map(adr => (
                                                  <li key={adr} className="flex items-center gap-2 text-muted-foreground hover:text-purple-400 transition-colors cursor-pointer">
                                                    <FileText className="w-3.5 h-3.5" /> {adr}
                                                  </li>
                                                ))}
                                              </ul>
                                            </div>
                                          )}
                                        </div>

                                        {/* Right Col */}
                                        <div className="space-y-4">
                                          {item.relatedCommits.length > 0 && (
                                            <div>
                                              <h5 className="font-semibold text-foreground/80 mb-2 text-xs uppercase tracking-wider">Related Commits</h5>
                                              <ul className="space-y-1.5">
                                                {item.relatedCommits.map(commit => (
                                                  <li key={commit} className="flex items-center gap-2 text-muted-foreground hover:text-green-400 transition-colors cursor-pointer">
                                                    <GitCommit className="w-3.5 h-3.5" /> {commit}
                                                  </li>
                                                ))}
                                              </ul>
                                            </div>
                                          )}

                                          {item.relatedBugs.length > 0 && (
                                            <div>
                                              <h5 className="font-semibold text-foreground/80 mb-2 text-xs uppercase tracking-wider">Related Bugs</h5>
                                              <ul className="space-y-1.5">
                                                {item.relatedBugs.map(bug => (
                                                  <li key={bug} className="flex items-center gap-2 text-muted-foreground hover:text-red-400 transition-colors cursor-pointer">
                                                    <Bug className="w-3.5 h-3.5" /> {bug}
                                                  </li>
                                                ))}
                                              </ul>
                                            </div>
                                          )}
                                        </div>

                                      </div>

                                      <div className="pt-4 border-t border-border/50 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                          <h5 className="font-semibold text-foreground/80 mb-1.5 text-xs uppercase tracking-wider">Confidence Detail</h5>
                                          <p className="text-muted-foreground text-xs leading-relaxed">
                                            {item.confidenceExplanation}
                                          </p>
                                        </div>
                                        <div className="sm:text-right">
                                          <h5 className="font-semibold text-foreground/80 mb-1.5 text-xs uppercase tracking-wider">Indexed At</h5>
                                          <p className="text-muted-foreground text-xs font-mono">
                                            {item.indexedTime}
                                          </p>
                                        </div>
                                      </div>

                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>

                            </div>
                          )
                        })}
                      </div>

                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-8 flex justify-center">
                  <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground font-medium px-4 py-2 border border-border rounded-md hover:bg-card hover:-translate-y-[1px] hover:shadow-sm transition-all duration-250">
                    Load More Memories <ChevronDown className="w-4 h-4" />
                  </button>
                </div>
              </>
            )}

          </div>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="w-full lg:w-[340px] xl:w-[380px] flex flex-col bg-background shrink-0 h-full border-l border-border/50 overflow-y-auto">
        <div className="p-6 md:p-8 space-y-8">
          
          {/* Memory Overview */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold tracking-tight">Memory Overview</h3>
              <button className="text-[10px] text-primary hover:underline uppercase tracking-wider font-semibold">View All</button>
            </div>
            <div className="bg-card border border-border rounded-xl p-4 shadow-sm grid grid-cols-2 gap-y-6 gap-x-4 hover:border-border/80 transition-colors">
              <div>
                <div className="flex items-center gap-1.5 text-muted-foreground text-xs font-medium mb-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-blue-400" /> Total Memories
                </div>
                <div className="text-2xl font-bold font-mono tracking-tight text-foreground/90">2,814</div>
                <div className="text-[10px] text-primary mt-1 flex items-center gap-1 font-medium font-sans">
                  ↑ +320 <span className="text-primary/70 font-normal">this week</span>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-1.5 text-muted-foreground text-xs font-medium mb-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-primary" /> High Confidence
                </div>
                <div className="text-2xl font-bold font-mono tracking-tight text-foreground/90">1,924</div>
                <div className="text-[10px] text-primary mt-1 flex items-center gap-1 font-medium font-sans">
                  ↑ 12% <span className="text-primary/70 font-normal">since last month</span>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-1.5 text-muted-foreground text-xs font-medium mb-1.5">
                  <FileCode className="w-3.5 h-3.5 text-yellow-400" /> Files Indexed
                </div>
                <div className="text-2xl font-bold font-mono tracking-tight text-foreground/90">342</div>
                <div className="text-[10px] text-primary mt-1 flex items-center gap-1 font-medium font-sans">
                  ↑ +28 <span className="text-primary/70 font-normal">this week</span>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-1.5 text-muted-foreground text-xs font-medium mb-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-purple-400" /> Concepts Learned
                </div>
                <div className="text-2xl font-bold font-mono tracking-tight text-foreground/90">156</div>
                <div className="text-[10px] text-primary mt-1 flex items-center gap-1 font-medium font-sans">
                  ↑ +12 <span className="text-primary/70 font-normal">this week</span>
                </div>
              </div>
            </div>
          </div>

          {/* Filter by Type */}
          <div>
            <h3 className="text-xl font-semibold tracking-tight mb-4">Filter by Type</h3>
            <div className="bg-card border border-border rounded-xl p-2 shadow-sm space-y-0.5 hover:border-border/80 transition-colors">
              <MemoryFilterItem icon={FileJson} label="All Memory Types" count="2,814" active />
              <MemoryFilterItem icon={FileCode} label="Code Files" count="1,142" />
              <MemoryFilterItem icon={FileText} label="Architecture Decisions" count="156" />
              <MemoryFilterItem icon={Bug} label="Bugs & Issues" count="342" />
              <MemoryFilterItem icon={BookOpen} label="Concepts" count="842" />
              <MemoryFilterItem icon={Code} label="APIs" count="164" />
              <MemoryFilterItem icon={Database} label="Database" count="68" />
              <MemoryFilterItem icon={GitCommit} label="Commits" count="98" />
            </div>
          </div>

          {/* Recent Repositories */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold tracking-tight">Recent Repositories</h3>
              <button className="text-[10px] text-primary hover:underline uppercase tracking-wider font-semibold">View All</button>
            </div>
            <div className="bg-card border border-border rounded-xl p-2 shadow-sm space-y-0.5 hover:border-border/80 transition-colors">
              <RepoItem name="memora-ai/memora" count="1,842" indexed="2m ago" status="Healthy" />
              <RepoItem name="memora-ai/auth-service" count="642" indexed="1h ago" status="Healthy" />
              <RepoItem name="memora-ai/web" count="330" indexed="3h ago" status="Indexing" />
            </div>
          </div>

          {/* Memory Growth */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold tracking-tight">Memory Growth</h3>
              <button className="text-[10px] text-primary hover:underline uppercase tracking-wider font-semibold">View Full Analytics</button>
            </div>
            <div className="bg-card border border-border rounded-xl p-5 shadow-sm h-40 flex flex-col justify-end relative overflow-hidden group hover:border-border/80 transition-colors">
              
              <div className="absolute top-4 left-5 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="bg-background border border-border rounded shadow-lg px-2 py-1 text-[10px] font-mono flex flex-col gap-1">
                  <span className="text-foreground/70">Last 30 Days</span>
                  <span className="text-primary font-bold">+842 Memories</span>
                </div>
              </div>

              <svg className="w-full h-full absolute inset-0 text-primary opacity-50 group-hover:opacity-80 transition-opacity duration-500" preserveAspectRatio="none" viewBox="0 0 100 100">
                <path d="M0,100 L0,80 L20,70 L40,65 L60,40 L80,30 L100,10 L100,100 Z" fill="currentColor" fillOpacity="0.1" />
                <polyline points="0,80 20,70 40,65 60,40 80,30 100,10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="20" cy="70" r="2.5" fill="currentColor" className="group-hover:r-[3.5px] transition-all duration-250 cursor-pointer hover:fill-white" />
                <circle cx="40" cy="65" r="2.5" fill="currentColor" className="group-hover:r-[3.5px] transition-all duration-250 cursor-pointer hover:fill-white" />
                <circle cx="60" cy="40" r="2.5" fill="currentColor" className="group-hover:r-[3.5px] transition-all duration-250 cursor-pointer hover:fill-white" />
                <circle cx="80" cy="30" r="2.5" fill="currentColor" className="group-hover:r-[3.5px] transition-all duration-250 cursor-pointer hover:fill-white" />
                <circle cx="100" cy="10" r="2.5" fill="currentColor" className="group-hover:r-[3.5px] transition-all duration-250 cursor-pointer hover:fill-white" />
              </svg>
              
              <div className="relative z-10 flex justify-between w-full text-[10px] text-muted-foreground mt-auto pt-2 border-t border-border/30">
                <span>May 28</span>
                <span>Jun 4</span>
                <span>Jun 11</span>
                <span>Jun 18</span>
                <span>Jun 25</span>
              </div>
            </div>
          </div>

          {/* Recent Activity Mini Log */}
          <div>
             <h3 className="text-xl font-semibold tracking-tight mb-4">Recent Activity</h3>
             <div className="space-y-3">
               <ActivityItem text="Indexed 14 new commits" time="Just now" />
               <ActivityItem text="Learned ADR-003 context" time="5m ago" />
               <ActivityItem text="Parsed Prisma schema" time="12m ago" />
             </div>
          </div>

        </div>
      </div>

    </div>
  )
}
