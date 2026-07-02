import { motion } from "framer-motion";
import { Sparkles, Brain, Code, Network } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../ui/Card";
import { Button } from "../ui/Button";

function ToggleSwitch({ enabled, defaultChecked }: { enabled?: boolean; defaultChecked?: boolean }) {
  return (
    <div className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none ${enabled || defaultChecked ? 'bg-[#2EA043]' : 'bg-muted'}`}>
      <span className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${enabled || defaultChecked ? 'translate-x-2' : '-translate-x-2'}`} />
    </div>
  );
}

export function AISettingsCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-[#2EA043]/10 flex items-center justify-center text-[#2EA043]">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <CardTitle>AI Preferences</CardTitle>
              <CardDescription>Customize how Memora's AI models generate responses and reason about your code.</CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-foreground">Temperature</label>
                <span className="text-xs text-muted-foreground bg-background px-2 py-1 rounded">0.4</span>
              </div>
              <input type="range" min="0" max="100" defaultValue="40" className="w-full accent-[#2EA043] h-1.5 bg-muted rounded-lg appearance-none cursor-pointer" />
              <p className="text-xs text-muted-foreground">Lower values produce more deterministic responses. Higher values produce more creative outputs.</p>
            </div>

            <div className="space-y-4">
              <label className="text-sm font-medium text-foreground block">Maximum Context Size</label>
              <select className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#2EA043] transition-shadow appearance-none">
                <option>128k Tokens (Balanced)</option>
                <option>256k Tokens (Comprehensive)</option>
                <option>64k Tokens (Fast)</option>
              </select>
            </div>
            
            <div className="space-y-4">
              <label className="text-sm font-medium text-foreground block">Response Style</label>
              <select className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#2EA043] transition-shadow appearance-none">
                <option>Balanced</option>
                <option>Concise</option>
                <option>Detailed</option>
              </select>
            </div>

            <div className="space-y-4">
              <label className="text-sm font-medium text-foreground block">Reasoning Mode</label>
              <select className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#2EA043] transition-shadow appearance-none">
                <option>Standard</option>
                <option>Deep Analysis (Slower)</option>
                <option>Quick Answer</option>
              </select>
            </div>
          </div>

          <div className="h-px w-full bg-border/50" />

          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Features & Capabilities</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="flex items-center justify-between p-3 rounded-lg border border-border bg-background/50 hover:border-[#30363D] transition-colors">
                <div className="flex items-center gap-3">
                  <Brain className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Conversation Memory</p>
                    <p className="text-xs text-muted-foreground">Remember context across sessions</p>
                  </div>
                </div>
                <ToggleSwitch defaultChecked />
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg border border-border bg-background/50 hover:border-[#30363D] transition-colors">
                <div className="flex items-center gap-3">
                  <Code className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Enable Citations</p>
                    <p className="text-xs text-muted-foreground">Link answers to source files</p>
                  </div>
                </div>
                <ToggleSwitch defaultChecked />
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg border border-border bg-background/50 hover:border-[#30363D] transition-colors">
                <div className="flex items-center gap-3">
                  <Network className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Architecture Reasoning</p>
                    <p className="text-xs text-muted-foreground">Include architecture context</p>
                  </div>
                </div>
                <ToggleSwitch defaultChecked />
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg border border-border bg-background/50 hover:border-[#30363D] transition-colors">
                <div className="flex items-center gap-3">
                  <Sparkles className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Streaming</p>
                    <p className="text-xs text-muted-foreground">Stream responses in real-time</p>
                  </div>
                </div>
                <ToggleSwitch defaultChecked />
              </div>
            </div>
          </div>

          <div className="pt-2">
            <Button className="bg-[#2EA043]/10 text-[#2EA043] hover:bg-[#2EA043]/20 border border-[#2EA043]/20 transition-all">
              Save AI Preferences
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
