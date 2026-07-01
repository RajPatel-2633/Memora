import { useState, useRef, useEffect } from "react"
import { 
  Sparkles, Paperclip, Code, Image as ImageIcon, FileText, Send, 
  ChevronDown, Copy, RefreshCw, CheckCircle2, GitBranch, 
  GitCommit, FileCode, Bug, Bookmark, Share, 
  MessageSquarePlus, FolderGit2, ShieldCheck, Activity, BookOpen, Hexagon, Clock
} from "lucide-react"

// Mock Data
const MOCK_MESSAGES = [
  {
    role: 'user',
    content: 'Why are refresh tokens stored in Redis?',
    time: '10:24 AM'
  },
  {
    role: 'ai',
    content: `Refresh tokens are stored in Redis to enable fast lookup and invalidation. Since refresh tokens can be revoked at any time (logout, password change, suspicious activity), Redis provides low-latency access and TTL support, ensuring tokens expire automatically.

### Key reasons:
- **Fast read/write operations** for high-throughput authentication checks
- **TTL support** for automatic token expiry without cron jobs
- **Centralized store** for distributed instances (stateless API)
- **Easy invalidation** on logout or security events

This approach improves both security and performance compared to storing in a traditional relational database like PostgreSQL.`,
    time: '10:24 AM',
    sources: [
      { type: 'file', title: 'auth.service.ts', path: 'src/services/auth', desc: 'Handles token generation and Redis caching.', meta: 'Lines 45-67' },
      { type: 'adr', title: 'ADR-003', path: 'docs/architecture', desc: 'JWT Refresh Strategy decision log.', meta: 'Decided 5 days ago' },
      { type: 'bug', title: 'Bug #18', path: 'linear/issues', desc: 'Token not invalidated on logout.', meta: 'High Priority' },
      { type: 'commit', title: '91ab32c', path: 'src/services', desc: 'fix: invalidate refresh token on logout', meta: '2 weeks ago' },
    ]
  }
]

export function AIWorkspacePage() {
  const [messages, setMessages] = useState<any[]>(MOCK_MESSAGES)
  const [inputValue, setInputValue] = useState("")
  const endOfMessagesRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = () => {
    if (!inputValue.trim()) return
    
    // Add user message
    const newMsg = { role: 'user', content: inputValue.trim(), time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
    setMessages(prev => [...prev, newMsg])
    setInputValue("")
    
    // Simulate AI thinking then responding
    setTimeout(() => {
      setMessages(prev => [...prev, {
        role: 'ai',
        content: `I'm currently running in a mocked environment, but if I were connected to your engineering memory, I would analyze your codebase to answer that perfectly.`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sources: []
      }])
    }, 600)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="flex flex-col lg:flex-row h-full max-w-[1600px] mx-auto w-full bg-background">
      
      {/* Main Chat Column */}
      <div className="flex-1 flex flex-col min-w-0 border-r border-border/50">
        
        {/* Chat Header */}
        <div className="h-16 border-b border-border/50 flex flex-col justify-center px-6 shrink-0 bg-background/95 backdrop-blur z-10 sticky top-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h1 className="text-lg font-bold tracking-tight">AI Workspace</h1>
              <span className="w-1 h-1 rounded-full bg-border"></span>
              <p className="text-sm text-muted-foreground hidden sm:block">Ask anything about your codebase.</p>
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setMessages([])}
                className="p-2 text-muted-foreground hover:text-foreground hover:bg-card rounded-md transition-colors border border-transparent hover:border-border"
                title="New Chat"
              >
                <MessageSquarePlus className="w-4 h-4" />
              </button>
              <button className="flex items-center gap-2 px-3 py-1.5 border border-border bg-card hover:bg-white/5 rounded-md text-sm transition-colors shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-primary" />
                <span className="font-medium text-foreground/90">GPT-4o Mini</span>
                <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
              </button>
            </div>
          </div>
        </div>

        {/* Scrollable Conversation */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center max-w-2xl mx-auto space-y-6 animate-fade-in">
              <div className="w-20 h-20 bg-card border border-border rounded-2xl shadow-sm flex items-center justify-center mb-2">
                 <Hexagon className="w-10 h-10 text-primary fill-primary/10" />
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-foreground/90">What would you like Memora to help you understand?</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full mt-8">
                 <SuggestedPromptCard text="Explain the authentication flow in the API" onClick={() => setInputValue("Explain the authentication flow in the API")} />
                 <SuggestedPromptCard text="Why did we choose Redis for caching?" onClick={() => setInputValue("Why did we choose Redis for caching?")} />
                 <SuggestedPromptCard text="Show me recent architecture decisions" onClick={() => setInputValue("Show me recent architecture decisions")} />
                 <SuggestedPromptCard text="What was the solution for bug #28?" onClick={() => setInputValue("What was the solution for bug #28?")} />
              </div>
              
              <button className="flex items-center gap-2 text-sm text-primary hover:underline hover:text-primary/80 mt-8 transition-colors">
                <FolderGit2 className="w-4 h-4" /> Connect another repository
              </button>
            </div>
          ) : (
            <div className="space-y-8 max-w-4xl mx-auto pb-4">
              {messages.map((msg, idx) => (
                <div key={idx} className="animate-slide-up" style={{ animationDelay: `${idx * 50}ms` }}>
                  {msg.role === 'user' ? (
                    <div className="flex gap-4 items-start">
                      <div className="w-8 h-8 rounded-full bg-card border border-border flex items-center justify-center shrink-0 mt-1 shadow-sm">
                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">You</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className="font-semibold text-sm text-foreground/90">You</span>
                          <span className="text-xs text-muted-foreground">{msg.time}</span>
                        </div>
                        <div className="text-foreground/90 text-sm leading-relaxed whitespace-pre-wrap">
                          {msg.content}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex gap-4 items-start">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0 border border-primary/30 mt-1 shadow-sm">
                        <Sparkles className="w-4 h-4 text-primary" />
                      </div>
                      <div className="flex-1 bg-card border border-border shadow-sm rounded-xl p-5 hover:border-border/80 transition-colors">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="font-semibold text-sm text-foreground/90">Memora AI</span>
                          <span className="text-xs text-muted-foreground">{msg.time}</span>
                        </div>
                        
                        <div className="text-foreground/90 text-sm leading-relaxed space-y-4 font-sans prose-p:my-2 prose-ul:my-2 prose-li:my-1">
                          {/* Very basic markdown renderer simulation for the mockup */}
                          {msg.content.split('\n\n').map((paragraph: string, i: number) => {
                            if (paragraph.startsWith('### ')) {
                              return <h3 key={i} className="font-semibold text-foreground mt-4 mb-2">{paragraph.replace('### ', '')}</h3>
                            }
                            if (paragraph.includes('- **')) {
                              const listItems = paragraph.split('\n').map((line: string) => line.replace('- ', ''))
                              return (
                                <ul key={i} className="list-none space-y-2 text-foreground/80 my-3">
                                  {listItems.map((item: string, j: number) => {
                                    const match = item.match(/\*\*(.*?)\*\*(.*)/)
                                    if (match) {
                                      return (
                                        <li key={j} className="flex items-start gap-2">
                                          <span className="w-1.5 h-1.5 rounded-full bg-primary/50 mt-1.5 shrink-0" />
                                          <span><strong className="text-foreground font-semibold">{match[1]}</strong>{match[2]}</span>
                                        </li>
                                      )
                                    }
                                    return <li key={j}>{item}</li>
                                  })}
                                </ul>
                              )
                            }
                            return <p key={i}>{paragraph}</p>
                          })}
                        </div>

                        {/* Sources Used */}
                        {msg.sources && msg.sources.length > 0 && (
                          <div className="mt-6 border-t border-border/50 pt-4">
                            <h4 className="text-xs font-semibold text-foreground/70 mb-3 flex items-center gap-1.5">
                              <CheckCircle2 className="w-3.5 h-3.5 text-primary" /> Sources Used
                            </h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                              {msg.sources.map((src: any, i: number) => (
                                <PremiumSourceCard key={i} source={src} />
                              ))}
                            </div>
                          </div>
                        )}

                        {/* AI Footer Actions & Meta */}
                        <div className="flex flex-wrap items-center justify-between gap-4 mt-5 pt-4 border-t border-border/50">
                          <div className="flex items-center gap-1">
                            <ActionBtn icon={Copy} title="Copy" />
                            <ActionBtn icon={Bookmark} title="Bookmark" />
                            <ActionBtn icon={Share} title="Share" />
                            <button className="flex items-center gap-1.5 px-2.5 py-1.5 border border-transparent hover:border-border rounded-md text-xs font-medium text-muted-foreground hover:bg-card hover:text-foreground hover:shadow-sm transition-all duration-250 ml-1">
                              <RefreshCw className="w-3.5 h-3.5" />
                              Regenerate
                            </button>
                          </div>
                          
                          <div className="flex items-center gap-4 text-[11px] text-muted-foreground font-mono">
                            <span className="flex items-center gap-1.5"><Clock className="w-3 h-3" /> 1.2 sec</span>
                            <span className="flex items-center gap-1.5"><Activity className="w-3 h-3" /> Hits: 17</span>
                            <span className="flex items-center gap-1.5"><FileCode className="w-3 h-3" /> Sources: 8</span>
                            <span className="px-1.5 py-0.5 rounded bg-background border border-border">GPT-4o Mini</span>
                          </div>
                        </div>

                      </div>
                    </div>
                  )}
                </div>
              ))}
              <div ref={endOfMessagesRef} />
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-4 md:px-8 md:pb-8 bg-background shrink-0 sticky bottom-0 border-t border-border/50">
          
          {/* Suggested Follow-ups Mini-Cards */}
          {messages.length > 0 && (
            <div className="mb-4">
              <div className="flex overflow-x-auto pb-2 -mx-2 px-2 gap-2 scrollbar-hide">
                <MiniSuggestionCard icon={BookOpen} text="Explain JWT Refresh" />
                <MiniSuggestionCard icon={Bug} text="Show Related Bugs" />
                <MiniSuggestionCard icon={FileText} text="Architecture Summary" />
                <MiniSuggestionCard icon={Code} text="Why Redis?" />
              </div>
            </div>
          )}

          <div className="bg-card border border-border rounded-xl p-1 relative shadow-sm focus-within:ring-1 focus-within:ring-primary focus-within:border-primary focus-within:shadow-md transition-all duration-250">
            <textarea 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask a follow-up question... (Shift+Enter for new line)"
              className="w-full bg-transparent p-4 min-h-[60px] max-h-[200px] resize-y focus:outline-none text-sm text-foreground placeholder:text-muted-foreground font-sans"
            />
            <div className="flex items-center justify-between p-2 pt-0">
              <div className="flex items-center gap-0.5">
                <InputToolBtn icon={Paperclip} />
                <InputToolBtn icon={Code} />
                <InputToolBtn icon={ImageIcon} />
                <button className="px-2 py-1.5 text-muted-foreground hover:text-foreground hover:bg-white/5 rounded-md transition-colors flex items-center gap-1.5 ml-1 text-xs border border-transparent hover:border-border font-medium">
                  <FileText className="w-3.5 h-3.5" />
                  Context
                  <ChevronDown className="w-3 h-3 opacity-70" />
                </button>
              </div>
              <button 
                onClick={handleSend}
                disabled={!inputValue.trim()}
                className="bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:hover:bg-primary text-primary-foreground p-2 rounded-md transition-all duration-250 flex items-center justify-center hover:shadow-[0_0_15px_rgba(46,160,67,0.4)] hover:-translate-y-[1px]"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Right Context Panel */}
      <div className="w-full lg:w-[340px] flex flex-col bg-background shrink-0 border-l border-border/50 overflow-y-auto">
        <div className="p-6 space-y-8">
          
          {/* Header */}
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-sm">Workspace Context</h3>
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_rgba(46,160,67,0.8)]" />
          </div>

          {/* Memory Confidence */}
          <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
            <h4 className="text-xs font-semibold text-muted-foreground mb-4">Memory Confidence</h4>
            <div className="flex items-start gap-4">
              <div className="relative w-16 h-16 flex items-center justify-center shrink-0">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path className="text-border" strokeWidth="3" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  <path className="text-primary drop-shadow-[0_0_4px_rgba(46,160,67,0.5)]" strokeDasharray="94, 100" strokeWidth="3" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                </svg>
                <div className="absolute flex flex-col items-center justify-center">
                  <span className="text-base font-bold">94%</span>
                </div>
              </div>
              <div>
                <div className="text-sm font-bold text-primary">High Confidence</div>
                <div className="text-xs text-muted-foreground mt-2 leading-relaxed">
                  Based on:<br/>
                  <span className="text-foreground/80">12 Files • 3 ADRs • 5 Commits • 2 Bugs</span>
                </div>
              </div>
            </div>
          </div>

          {/* Repository Info */}
          <div>
            <h4 className="text-xs font-semibold text-muted-foreground mb-3">Repository</h4>
            <div className="bg-card border border-border rounded-xl p-4 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <GitBranch className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm font-medium">memora-ai/memora</span>
                </div>
                <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded border border-primary/30 text-primary bg-primary/10 tracking-wider">Active</span>
              </div>
              
              <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-xs">
                <div>
                  <div className="text-muted-foreground mb-1">Status</div>
                  <div className="flex items-center gap-1.5 font-medium text-foreground">
                    <ShieldCheck className="w-3.5 h-3.5 text-primary" /> Healthy
                  </div>
                </div>
                <div>
                  <div className="text-muted-foreground mb-1">Last Indexed</div>
                  <div className="flex items-center gap-1.5 font-medium text-foreground">
                    <Clock className="w-3.5 h-3.5 text-muted-foreground" /> 2m ago
                  </div>
                </div>
                <div>
                  <div className="text-muted-foreground mb-1">Files</div>
                  <div className="font-medium font-mono text-foreground">284</div>
                </div>
                <div>
                  <div className="text-muted-foreground mb-1">Commits</div>
                  <div className="font-medium font-mono text-foreground">152</div>
                </div>
              </div>
            </div>
          </div>

          {/* Context Lists */}
          <div className="space-y-6">
            
            {/* Related Files */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-xs font-semibold text-muted-foreground">Related Files</h4>
                <button className="text-[10px] text-primary hover:underline uppercase tracking-wider font-semibold">View all</button>
              </div>
              <ul className="space-y-1">
                <ContextListItem icon={FileCode} title="auth.service.ts" meta="src/services" color="text-blue-400" />
                <ContextListItem icon={FileCode} title="token.util.ts" meta="src/utils" color="text-blue-400" />
                <ContextListItem icon={FileCode} title="redis.config.ts" meta="src/config" color="text-blue-400" />
              </ul>
            </div>

            {/* Architecture Decisions */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-xs font-semibold text-muted-foreground">Architecture Decisions</h4>
                <button className="text-[10px] text-primary hover:underline uppercase tracking-wider font-semibold">View all</button>
              </div>
              <ul className="space-y-1">
                <ContextListItem icon={FileText} title="ADR-003: JWT Strategy" meta="Decided 5 days ago" color="text-purple-400" />
              </ul>
            </div>

            {/* Previous Bugs */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-xs font-semibold text-muted-foreground">Previous Bugs</h4>
                <button className="text-[10px] text-primary hover:underline uppercase tracking-wider font-semibold">View all</button>
              </div>
              <ul className="space-y-1">
                <ContextListItem icon={Bug} title="Token not invalidated" meta="High Priority" color="text-red-400" />
                <ContextListItem icon={Bug} title="Race condition in refresh" meta="Medium Priority" color="text-yellow-400" />
              </ul>
            </div>

          </div>

        </div>
      </div>
      
    </div>
  )
}

// ---------------------------------------------------------
// Subcomponents
// ---------------------------------------------------------

function ActionBtn({ icon: Icon, title }: { icon: any, title?: string }) {
  return (
    <button 
      title={title}
      className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-white/5 rounded-md border border-transparent hover:border-border transition-all duration-250 hover:-translate-y-[1px]"
    >
      <Icon className="w-4 h-4" />
    </button>
  )
}

function InputToolBtn({ icon: Icon }: { icon: any }) {
  return (
    <button className="p-2 text-muted-foreground hover:text-foreground hover:bg-white/5 rounded-md transition-colors border border-transparent hover:border-border">
      <Icon className="w-4 h-4" />
    </button>
  )
}

function MiniSuggestionCard({ icon: Icon, text }: { icon: any, text: string }) {
  return (
    <button className="flex items-center gap-2 px-3 py-2 bg-card border border-border rounded-lg text-xs font-medium text-foreground/80 hover:text-foreground hover:-translate-y-[2px] hover:scale-[1.02] hover:border-primary/50 transition-all duration-250 shrink-0 shadow-sm hover:shadow-md cursor-pointer group">
      <Icon className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
      {text}
    </button>
  )
}

function SuggestedPromptCard({ text, onClick }: { text: string, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className="p-4 bg-card border border-border rounded-xl text-sm font-medium text-left text-foreground/80 hover:text-foreground hover:-translate-y-[2px] hover:border-primary/50 transition-all duration-250 shadow-sm hover:shadow-md cursor-pointer"
    >
      {text}
    </button>
  )
}

function PremiumSourceCard({ source }: { source: any }) {
  const getColors = (type: string) => {
    switch (type) {
      case 'file': return { border: 'border-blue-500/50', bg: 'bg-blue-500', icon: FileCode }
      case 'bug': return { border: 'border-red-500/50', bg: 'bg-red-500', icon: Bug }
      case 'adr': return { border: 'border-purple-500/50', bg: 'bg-purple-500', icon: FileText }
      case 'commit': return { border: 'border-green-500/50', bg: 'bg-green-500', icon: GitCommit }
      default: return { border: 'border-border', bg: 'bg-border', icon: FileText }
    }
  }

  const styles = getColors(source.type)
  const Icon = styles.icon

  return (
    <div className={`group relative bg-background border border-border hover:${styles.border} rounded-lg p-3 shadow-sm hover:shadow-md transition-all duration-250 hover:-translate-y-[2px] hover:scale-[1.01] cursor-pointer overflow-hidden`}>
      <div className={`absolute top-0 left-0 w-1 h-full ${styles.bg} opacity-50 group-hover:opacity-100 transition-opacity`} />
      <div className="pl-1">
        <div className="flex items-start gap-2 mb-1.5">
          <Icon className="w-3.5 h-3.5 mt-0.5 text-muted-foreground group-hover:text-foreground transition-colors" />
          <div className="flex-1 min-w-0">
            <div className="text-xs font-semibold text-foreground/90 truncate group-hover:text-foreground">{source.title}</div>
          </div>
        </div>
        <div className="text-[10px] text-muted-foreground leading-snug line-clamp-2 mb-1.5 h-7">
          {source.desc}
        </div>
        <div className="flex items-center justify-between text-[9px] text-muted-foreground/80">
          <span className="truncate max-w-[80%]">{source.path}</span>
          <span className="shrink-0">{source.meta}</span>
        </div>
      </div>
    </div>
  )
}

function ContextListItem({ icon: Icon, title, meta, color }: { icon: any, title: string, meta: string, color: string }) {
  return (
    <li className="flex items-center gap-3 p-2 rounded-md hover:bg-card border border-transparent hover:border-border transition-colors cursor-pointer group">
      <div className={`w-6 h-6 rounded flex items-center justify-center shrink-0 bg-background border border-border group-hover:border-border/80`}>
        <Icon className={`w-3.5 h-3.5 ${color}`} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium text-foreground/90 truncate group-hover:text-foreground">{title}</div>
        <div className="text-[10px] text-muted-foreground truncate">{meta}</div>
      </div>
    </li>
  )
}
