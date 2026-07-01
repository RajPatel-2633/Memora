import { useState, useEffect } from "react"
import { 
  BarChart3, Calendar, Download, Brain, 
  Bug, Network, FileCode, TrendingUp, 
  AlertTriangle, Flame, ShieldAlert, GitCommit,
  GitBranch, Link2, Sparkles, FolderGit2,
  ChevronRight
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export function AnalyticsPage() {
  const [activeTab, setActiveTab] = useState("Engineering Intelligence")

  return (
    <div className="flex flex-col h-full max-w-[1600px] mx-auto w-full bg-background overflow-hidden">
      
      {/* Header */}
      <div className="shrink-0 bg-background/95 backdrop-blur z-20 sticky top-0 pt-6 px-6 md:px-8 pb-4 border-b border-border/50">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
              Analytics <BarChart3 className="w-5 h-5 text-primary" />
            </h1>
            <p className="text-sm text-muted-foreground mt-1">Measure the health and depth of your engineering knowledge.</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 border border-border bg-card hover:bg-white/5 rounded-md text-sm transition-colors shadow-sm font-medium">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              May 28 - Jun 25, 2024
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border border-border bg-card hover:bg-white/5 rounded-md text-sm transition-colors shadow-sm font-medium">
              <Download className="w-4 h-4 text-muted-foreground" />
              Export Report
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-6 text-sm font-medium overflow-x-auto scrollbar-hide">
          {["Engineering Intelligence", "Repositories", "Knowledge Graph", "Reports"].map(tab => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative pb-3 transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:text-foreground ${
                activeTab === tab 
                  ? "text-primary" 
                  : "text-muted-foreground hover:text-foreground/80"
              }`}
            >
              {tab}
              {activeTab === tab && (
                <motion.div 
                  layoutId="activeTabIndicatorAnalytics3"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 md:p-10">
        <div className="max-w-6xl mx-auto space-y-16 pb-24">
          
          {/* 1. HERO: Engineering Health & AI Confidence */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            
            {/* Health Score - Takes 3 columns */}
            <div className="lg:col-span-3 bg-card border border-border rounded-xl p-8 shadow-sm flex flex-col md:flex-row items-center gap-10 hover:border-border/80 transition-colors">
              
              <div className="relative w-48 h-48 shrink-0 flex items-center justify-center">
                <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                  <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="4" className="text-border" />
                  <motion.circle 
                    initial={{ strokeDasharray: "0, 300" }}
                    animate={{ strokeDasharray: "260, 300" }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" 
                    className="text-primary drop-shadow-[0_0_12px_rgba(46,160,67,0.4)]" 
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-6xl font-bold font-mono tracking-tighter text-foreground/90">92</span>
                  <span className="text-xs uppercase tracking-widest font-bold text-primary mt-1">Excellent</span>
                </div>
              </div>

              <div className="flex-1 flex flex-col justify-center w-full">
                <h2 className="text-xl font-bold text-foreground/90 flex items-center gap-2 mb-2">
                  <ShieldAlert className="w-5 h-5 text-primary" /> Engineering Health Score
                </h2>
                <p className="text-sm text-muted-foreground mb-6">Your knowledge base is highly connected and reliable.</p>
                
                <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                  <SubScore label="Coverage" score="96" />
                  <SubScore label="Confidence" score="94" />
                  <SubScore label="Freshness" score="88" />
                  <SubScore label="Connectivity" score="91" />
                </div>
              </div>
            </div>

            {/* AI Confidence - Takes 2 columns */}
            <div className="lg:col-span-2 bg-card border border-border rounded-xl p-8 shadow-sm flex flex-col justify-center hover:border-border/80 transition-colors">
              <h2 className="text-xl font-bold text-foreground/90 flex items-center gap-2 mb-2">
                <Sparkles className="w-5 h-5 text-purple-500" /> AI Confidence
              </h2>
              <p className="text-sm text-muted-foreground mb-8">Average evidence support per answer</p>
              
              <div className="flex items-end gap-3 mb-8">
                <span className="text-6xl font-bold font-mono text-purple-500 tracking-tighter leading-none">96%</span>
              </div>
              
              <div className="space-y-4">
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Supported By</p>
                <div className="grid grid-cols-2 gap-4">
                  <EvidenceStat icon={FileCode} value="2,412" label="Files" />
                  <EvidenceStat icon={GitCommit} value="421" label="Commits" />
                  <EvidenceStat icon={Network} value="129" label="ADRs" />
                  <EvidenceStat icon={Bug} value="102" label="Bugs" />
                </div>
              </div>
            </div>
          </div>

          {/* 2. Simplified KPI Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <MinimalMetricCard title="Memories Learned" value="14,284" icon={Brain} />
            <MinimalMetricCard title="Bugs Remembered" value="2,412" icon={Bug} />
            <MinimalMetricCard title="ADRs Learned" value="128" icon={Network} />
            <MinimalMetricCard title="Indexed Files" value="8,492" icon={FileCode} />
          </div>

          {/* 3. Knowledge Growth */}
          <div className="bg-card border border-border rounded-xl p-8 shadow-sm flex flex-col group hover:border-border/80 transition-colors">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-lg font-bold text-foreground/90 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-muted-foreground" /> Knowledge Growth
                </h3>
                <p className="text-sm text-muted-foreground mt-1">Accumulation of engineering context over time</p>
              </div>
              <div className="flex flex-wrap justify-end gap-4 text-xs font-medium">
                <LegendBadge color="bg-primary" label="Total Memories" />
                <LegendBadge color="bg-muted-foreground/30" label="Other Sources" />
              </div>
            </div>
            <div className="flex-1 min-h-[300px]">
              <FocusedLineChart />
            </div>
          </div>

          {/* 4. Repository Intelligence Table */}
          <div className="bg-card border border-border rounded-xl shadow-sm flex flex-col hover:border-border/80 transition-colors overflow-hidden">
            <div className="p-8 pb-6 border-b border-border/50">
              <h3 className="text-lg font-bold text-foreground/90 flex items-center gap-2">
                <FolderGit2 className="w-5 h-5 text-muted-foreground" /> Repository Intelligence
              </h3>
              <p className="text-sm text-muted-foreground mt-1">Detailed breakdown of index health per repository.</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs uppercase text-muted-foreground border-b border-border/50 bg-background/30">
                  <tr>
                    <th className="px-8 py-4 font-medium w-12"></th>
                    <th className="py-4 font-medium">Repository</th>
                    <th className="py-4 font-medium text-right">Score</th>
                    <th className="px-8 py-4 font-medium text-right">Risk</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/30">
                  <ExpandableRepoRow name="memora-ai/core" score="98" risk="Low" coverage="99%" docs="A+" lastIndexed="2 hours ago" memories="4,212" />
                  <ExpandableRepoRow name="memora-ai/auth" score="94" risk="Low" coverage="100%" docs="A" lastIndexed="4 hours ago" memories="1,842" />
                  <ExpandableRepoRow name="memora-ai/web" score="86" risk="Medium" coverage="82%" docs="B+" lastIndexed="12 hours ago" memories="3,412" />
                  <ExpandableRepoRow name="memora-ai/infra" score="74" risk="High" coverage="65%" docs="C" lastIndexed="2 days ago" memories="842" />
                </tbody>
              </table>
            </div>
          </div>

          {/* 5. Engineering Insights */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-foreground/90">Engineering Insights</h3>
              <p className="text-sm text-muted-foreground mt-1">Key areas of interest across your codebase.</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Knowledge Gaps */}
              <div className="bg-card border border-border rounded-xl p-6 shadow-sm hover:border-border/80 transition-colors">
                <h4 className="font-semibold text-foreground/80 flex items-center gap-2 mb-6 pb-4 border-b border-border/50">
                  <AlertTriangle className="w-4 h-4 text-muted-foreground" /> Knowledge Gaps
                </h4>
                <div className="space-y-3">
                  <GapItem name="Payment Processing" level="High" />
                  <GapItem name="Rate Limiting" level="Medium" />
                  <GapItem name="Queue Management" level="Medium" />
                </div>
              </div>

              {/* Most Referenced ADRs */}
              <div className="bg-card border border-border rounded-xl p-6 shadow-sm hover:border-border/80 transition-colors">
                <h4 className="font-semibold text-foreground/80 flex items-center gap-2 mb-6 pb-4 border-b border-border/50">
                  <Link2 className="w-4 h-4 text-muted-foreground" /> Top Referenced ADRs
                </h4>
                <div className="space-y-3">
                  <AdrItem id="ADR-003" name="JWT Refresh Strategy" refs={24} />
                  <AdrItem id="ADR-002" name="PostgreSQL Choice" refs={18} />
                  <AdrItem id="ADR-001" name="Microservices" refs={15} />
                </div>
              </div>

              {/* Bug Hotspots */}
              <div className="bg-card border border-border rounded-xl p-6 shadow-sm hover:border-border/80 transition-colors">
                <h4 className="font-semibold text-foreground/80 flex items-center gap-2 mb-6 pb-4 border-b border-border/50">
                  <Flame className="w-4 h-4 text-muted-foreground" /> Bug Hotspots
                </h4>
                <div className="space-y-3">
                  <HotspotItem name="auth/session.ts" bugs={14} />
                  <HotspotItem name="billing/stripe.ts" bugs={9} />
                  <HotspotItem name="api/middleware.ts" bugs={5} />
                </div>
              </div>
            </div>
          </div>

          {/* 6. Engineering Memory Network */}
          <div className="bg-card border border-border rounded-xl p-8 shadow-sm flex flex-col hover:border-border/80 transition-colors h-[280px] relative overflow-hidden group">
            <div className="absolute top-8 left-8 z-10">
              <h3 className="text-lg font-bold text-foreground/90 flex items-center gap-2">
                <GitBranch className="w-5 h-5 text-muted-foreground" /> Memory Network
              </h3>
              <p className="text-sm text-muted-foreground mt-1">Interconnected representation of your codebase.</p>
            </div>
            
            <div className="absolute inset-0 flex items-center justify-center opacity-30 mix-blend-screen pointer-events-none mt-12">
              <NetworkGraphMock />
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

// -----------------------------------------------------
// Subcomponents
// -----------------------------------------------------

function SubScore({ label, score }: { label: string, score: string }) {
  return (
    <div className="flex flex-col border-l-2 border-border/50 pl-4 py-1">
      <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider mb-1">{label}</span>
      <span className="text-xl font-mono font-bold text-foreground/90">{score}</span>
    </div>
  )
}

function MinimalMetricCard({ title, value, icon: Icon }: any) {
  const [val, setVal] = useState(0)
  const numericValue = parseInt(value.replace(/[^0-9]/g, ''))

  useEffect(() => {
    let start = 0
    const duration = 1200
    const incrementTime = Math.max(duration / numericValue, 16)
    
    const timer = setInterval(() => {
      start += Math.ceil(numericValue / (duration / incrementTime))
      if (start >= numericValue) {
        setVal(numericValue)
        clearInterval(timer)
      } else {
        setVal(start)
      }
    }, incrementTime)
    return () => clearInterval(timer)
  }, [numericValue])

  return (
    <div className="bg-card border border-border rounded-xl p-6 shadow-sm hover:border-border/80 transition-colors cursor-default">
      <div className="flex items-center gap-2 text-muted-foreground text-sm font-medium mb-4">
        <Icon className="w-4 h-4" /> {title}
      </div>
      <div className="text-4xl font-bold font-mono tracking-tighter text-foreground/90">
        {val.toLocaleString()}
      </div>
    </div>
  )
}

function EvidenceStat({ icon: Icon, value, label }: any) {
  return (
    <div className="flex items-center gap-3 bg-background/50 border border-border/50 rounded-lg p-3">
      <div className="w-8 h-8 rounded-full bg-card border border-border flex items-center justify-center shrink-0">
        <Icon className="w-4 h-4 text-muted-foreground" />
      </div>
      <div className="flex flex-col">
        <div className="text-lg font-bold font-mono text-foreground/90 leading-none">{value}</div>
        <div className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground mt-1">{label}</div>
      </div>
    </div>
  )
}

function ExpandableRepoRow({ name, score, risk, coverage, docs, lastIndexed, memories }: any) {
  const [isExpanded, setIsExpanded] = useState(false)
  const isHighRisk = risk === 'High'

  return (
    <>
      <tr 
        onClick={() => setIsExpanded(!isExpanded)}
        className="hover:bg-white/5 transition-colors group cursor-pointer"
      >
        <td className="px-8 py-4">
          <ChevronRight className={`w-4 h-4 text-muted-foreground transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
        </td>
        <td className="py-4 text-sm font-bold text-foreground/80 group-hover:text-foreground">
          <div className="flex items-center gap-3">
            <FolderGit2 className="w-4 h-4 text-muted-foreground/60" /> {name}
          </div>
        </td>
        <td className="py-4 text-right font-mono text-sm font-bold text-foreground/90">{score}</td>
        <td className="px-8 py-4 text-right">
          <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-sm ${
            isHighRisk ? 'bg-red-500/10 text-red-500' : 'bg-background border border-border text-muted-foreground'
          }`}>{risk}</span>
        </td>
      </tr>
      <AnimatePresence>
        {isExpanded && (
          <tr className="bg-background/30">
            <td colSpan={4} className="p-0">
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="px-16 py-6 border-t border-border/30 grid grid-cols-2 md:grid-cols-4 gap-8">
                  <div>
                    <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5">Documentation</div>
                    <div className="font-mono text-sm text-foreground/90">{docs} Rating</div>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5">Coverage</div>
                    <div className="font-mono text-sm text-primary">{coverage}</div>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5">Memory Count</div>
                    <div className="font-mono text-sm text-foreground/90">{memories}</div>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5">Last Indexed</div>
                    <div className="text-sm text-foreground/90 font-medium">{lastIndexed}</div>
                  </div>
                </div>
              </motion.div>
            </td>
          </tr>
        )}
      </AnimatePresence>
    </>
  )
}

function GapItem({ name, level }: { name: string, level: string }) {
  return (
    <div className="flex items-center justify-between py-2 cursor-default group">
      <span className="text-sm font-medium text-foreground/80 group-hover:text-foreground transition-colors">{name}</span>
      <span className={`text-[10px] font-bold uppercase tracking-wider ${
        level === 'High' ? 'text-red-500' : 'text-muted-foreground'
      }`}>{level}</span>
    </div>
  )
}

function AdrItem({ id, name, refs }: { id: string, name: string, refs: number }) {
  return (
    <div className="flex items-center justify-between py-2 cursor-pointer group text-sm">
      <div className="flex flex-col">
        <span className="font-medium text-foreground/80 group-hover:text-foreground transition-colors">{name}</span>
        <span className="font-mono text-[10px] text-muted-foreground mt-0.5">{id}</span>
      </div>
      <div className="text-xs font-bold font-mono text-foreground/90 bg-background border border-border px-2 py-1 rounded">
        {refs} <span className="text-[10px] uppercase font-sans text-muted-foreground font-semibold">Refs</span>
      </div>
    </div>
  )
}

function HotspotItem({ name, bugs }: { name: string, bugs: number }) {
  return (
    <div className="flex items-center justify-between py-2 cursor-pointer group">
      <div className="flex items-center gap-2 text-sm font-medium text-foreground/80 group-hover:text-red-400 transition-colors font-mono">
        <FileCode className="w-3.5 h-3.5 text-muted-foreground/60" /> {name}
      </div>
      <div className="font-bold font-mono text-xs text-red-500 bg-red-500/10 px-2 py-1 rounded">
        {bugs} <span className="text-[10px] uppercase font-sans font-semibold">Bugs</span>
      </div>
    </div>
  )
}

function LegendBadge({ color, label }: { color: string, label: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className={`w-2 h-2 rounded-full ${color}`} />
      <span className="text-muted-foreground">{label}</span>
    </div>
  )
}

function FocusedLineChart() {
  const generatePath = (start: number, multiplier: number, smooth: boolean = true) => {
    const pts = []
    for(let i = 0; i <= 10; i++) {
      const x = i * 10
      const val = start + (i * multiplier) + (smooth ? (Math.sin(i) * 3) : (Math.random() * 5 - 2.5))
      const y = 100 - (val % 100)
      pts.push(`${x},${y}`)
    }
    return pts.join(" L ")
  }

  return (
    <div className="relative w-full h-full min-h-[300px] flex flex-col justify-between group">
      <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
        {[0, 1, 2, 3, 4].map(i => (
          <div key={i} className="w-full h-px bg-border/40" />
        ))}
      </div>
      
      <div className="absolute inset-0 bottom-6 left-0 right-0 overflow-visible">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full overflow-visible">
          {/* Subtle Background Lines (Noise) */}
          <motion.path initial={{ opacity: 0 }} animate={{ opacity: 0.2 }} transition={{ duration: 1 }} d={`M 0,80 L ${generatePath(20, 2, false)}`} fill="none" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground" stroke="currentColor" />
          <motion.path initial={{ opacity: 0 }} animate={{ opacity: 0.2 }} transition={{ duration: 1, delay: 0.2 }} d={`M 0,85 L ${generatePath(15, 3, false)}`} fill="none" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground" stroke="currentColor" />
          <motion.path initial={{ opacity: 0 }} animate={{ opacity: 0.2 }} transition={{ duration: 1, delay: 0.4 }} d={`M 0,90 L ${generatePath(10, 4, false)}`} fill="none" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground" stroke="currentColor" />
          
          {/* Hero Line (Total Memories) */}
          <motion.path 
            initial={{ pathLength: 0 }} 
            animate={{ pathLength: 1 }} 
            transition={{ duration: 2, ease: "easeOut" }} 
            d={`M 0,95 L ${generatePath(5, 7, true)}`} 
            fill="none" 
            strokeWidth="3" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="text-primary drop-shadow-[0_0_8px_rgba(46,160,67,0.4)]" 
            stroke="currentColor" 
          />
        </svg>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 flex justify-between text-[10px] text-muted-foreground pt-3 mt-auto font-medium tracking-wider">
        <span>Jan</span>
        <span>Feb</span>
        <span>Mar</span>
        <span>Apr</span>
        <span>May</span>
        <span>Jun</span>
      </div>
    </div>
  )
}

function NetworkGraphMock() {
  const nodes = Array.from({ length: 30 }).map(() => ({
    x: 5 + Math.random() * 90,
    y: 10 + Math.random() * 80,
    r: Math.random() > 0.8 ? 4 : 2,
  }))

  return (
    <svg viewBox="0 0 100 100" className="w-full h-full min-h-[200px] overflow-visible">
      {nodes.map((n, i) => {
        if (i > nodes.length - 8) return null
        const target = nodes[i + 1]
        const target2 = nodes[Math.floor(Math.random() * nodes.length)]
        return (
          <g key={`lines-${i}`}>
            <motion.line 
              initial={{ opacity: 0 }} animate={{ opacity: 0.2 }} transition={{ duration: 2, delay: Math.random() }}
              x1={n.x} y1={n.y} x2={target.x} y2={target.y} 
              stroke="currentColor" strokeWidth="0.2" className="text-muted-foreground" 
            />
            <motion.line 
              initial={{ opacity: 0 }} animate={{ opacity: 0.1 }} transition={{ duration: 2, delay: Math.random() }}
              x1={n.x} y1={n.y} x2={target2.x} y2={target2.y} 
              stroke="currentColor" strokeWidth="0.2" className="text-muted-foreground" 
            />
          </g>
        )
      })}
      {nodes.map((n, i) => (
        <motion.circle 
          key={`node-${i}`}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.5 }}
          transition={{ duration: 0.5, delay: i * 0.05 }}
          cx={n.x} cy={n.y} r={n.r} 
          className="fill-muted-foreground cursor-pointer hover:opacity-100 hover:scale-150 transition-transform origin-center hover:fill-primary"
        />
      ))}
    </svg>
  )
}
