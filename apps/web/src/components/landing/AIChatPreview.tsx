import { motion } from "framer-motion"
import { Hexagon, FileCode2, Search } from "lucide-react"

export function AIChatPreview() {
  return (
    <section className="py-24 border-y border-border bg-card/30">
      <div className="container mx-auto px-4 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Ask your codebase. <br />
            <span className="text-primary">Get exact context.</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Stop digging through old PRs. Memora correlates your query against the entire repository history to provide accurate, architecture-aware answers.
          </p>
        </div>

        <div className="max-w-5xl mx-auto rounded-xl border border-border bg-background shadow-xl overflow-hidden flex flex-col md:flex-row h-[600px]">
          
          {/* Left Pane - Code Context */}
          <div className="w-full md:w-1/2 border-r border-border flex flex-col bg-[#0d1117]">
            <div className="h-10 border-b border-border flex items-center px-4 bg-card">
              <FileCode2 className="w-4 h-4 text-muted-foreground mr-2" />
              <span className="text-xs font-mono text-muted-foreground">src/services/auth.ts</span>
            </div>
            <div className="flex-1 p-4 overflow-hidden relative">
              <pre className="text-xs font-mono text-[#e6edf3] leading-relaxed">
                <code>
{`import { sign, verify } from 'jsonwebtoken';
import { redis } from '../lib/redis';

export async function generateTokens(userId: string) {
  const accessToken = sign(
    { userId }, 
    process.env.JWT_SECRET, 
    { expiresIn: '15m' }
  );
  
  const refreshToken = sign(
    { userId }, 
    process.env.JWT_REFRESH_SECRET, 
    { expiresIn: '7d' }
  );

  // Store refresh token in Redis for revocation
  await redis.set(
    \`refresh_token:\${userId}\`, 
    refreshToken, 
    'EX', 
    604800
  );

  return { accessToken, refreshToken };
}`}
                </code>
              </pre>
              
              {/* Highlight Overlay */}
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1.5, duration: 0.5 }}
                className="absolute top-[16.5rem] left-4 right-4 h-[5rem] bg-primary/20 border border-primary/50 rounded pointer-events-none"
              />
            </div>
          </div>
          
          {/* Right Pane - Chat Interface */}
          <div className="w-full md:w-1/2 flex flex-col bg-card">
            <div className="h-10 border-b border-border flex items-center px-4 bg-background">
              <Hexagon className="w-4 h-4 text-primary mr-2" />
              <span className="text-xs font-medium">Memora AI</span>
            </div>
            
            <div className="flex-1 p-6 flex flex-col gap-6 overflow-y-auto">
              {/* User Message */}
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded bg-background border border-border flex items-center justify-center shrink-0">
                  <div className="w-5 h-5 rounded-full bg-blue-500"></div>
                </div>
                <div className="flex-1">
                  <div className="text-sm font-semibold mb-1">You</div>
                  <div className="text-sm text-foreground bg-background border border-border rounded-lg p-3 inline-block">
                    How are we handling token revocation when a user logs out?
                  </div>
                </div>
              </div>
              
              {/* AI Response */}
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded bg-primary/10 border border-primary/30 flex items-center justify-center shrink-0">
                  <Hexagon className="w-5 h-5 text-primary fill-primary" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-semibold mb-1 flex items-center gap-2">
                    Memora 
                    <span className="text-[10px] font-mono text-muted-foreground bg-background px-1.5 py-0.5 rounded border border-border flex items-center gap-1">
                      <Search className="w-3 h-3" /> Indexed 14s ago
                    </span>
                  </div>
                  
                  <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                    className="text-sm text-foreground space-y-3"
                  >
                    <p>
                      Based on <code className="text-xs text-primary bg-primary/10 px-1 py-0.5 rounded">src/services/auth.ts</code>, we use a dual-token approach with JWTs.
                    </p>
                    <p>
                      <motion.span
                        initial={{ backgroundColor: "transparent" }}
                        whileInView={{ backgroundColor: "rgba(46, 160, 67, 0.2)" }}
                        viewport={{ once: true }}
                        transition={{ delay: 1.5, duration: 0.5 }}
                        className="rounded px-0.5"
                      >
                        When generating tokens, the refresh token is stored in Redis with a 7-day expiration (TTL 604800).
                      </motion.span>
                    </p>
                    <p>
                      To revoke a token upon logout, you need to delete the Redis key <code className="text-xs bg-background border border-border px-1 py-0.5 rounded">refresh_token:{"{userId}"}</code>. Because access tokens are stateless and short-lived (15m), they cannot be actively revoked, but they will expire quickly.
                    </p>
                    
                    <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-border">
                      <span className="text-xs text-muted-foreground mr-1">Sources:</span>
                      <a href="#" className="text-xs font-mono text-foreground hover:text-primary transition-colors flex items-center gap-1 bg-background border border-border px-2 py-1 rounded">
                        <FileCode2 className="w-3 h-3" /> auth.service.ts
                      </a>
                      <a href="#" className="text-xs font-mono text-foreground hover:text-primary transition-colors flex items-center gap-1 bg-background border border-border px-2 py-1 rounded">
                        Bug #18
                      </a>
                      <a href="#" className="text-xs font-mono text-foreground hover:text-primary transition-colors flex items-center gap-1 bg-background border border-border px-2 py-1 rounded">
                        Arch Dec #4
                      </a>
                      <a href="#" className="text-xs font-mono text-foreground hover:text-primary transition-colors flex items-center gap-1 bg-background border border-border px-2 py-1 rounded">
                        Commit a81f42
                      </a>
                    </div>
                    
                    <div className="flex items-center gap-4 mt-3 text-[10px] text-muted-foreground font-mono">
                      <div className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary"></span> Memory Hit: 94%
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span> Response Time: 1.2s
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
            
            {/* Input Mock */}
            <div className="p-4 bg-background border-t border-border">
              <div className="h-10 rounded-md border border-border bg-card flex items-center px-3">
                <span className="text-sm text-muted-foreground">Ask a follow-up question...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
