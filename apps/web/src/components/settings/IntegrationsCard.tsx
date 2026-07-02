import { motion } from "framer-motion";
import { Plug2, CheckCircle2, XCircle } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../ui/Card";
import { Button } from "../ui/Button";
import { integrations } from "./settingsData";

export function IntegrationsCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="flex flex-col mb-4">
        <h2 className="text-xl font-bold tracking-tight">Connected Apps</h2>
        <p className="text-sm text-muted-foreground mt-1">Connect Memora with your favorite tools and services.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {integrations.map((integration, index) => {
          const isConnected = integration.status === "Connected";
          return (
            <motion.div
              key={integration.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              whileHover={{ y: -2 }}
              className="bg-card border border-border rounded-xl p-5 shadow-sm transition-all hover:border-[#30363D]"
            >
              <div className="flex items-start justify-between mb-4">
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-lg border border-border/50"
                  style={{ backgroundColor: `${integration.logoColor}15`, color: integration.logoColor }}
                >
                  {integration.name.charAt(0)}
                </div>
                {isConnected ? (
                  <span className="flex items-center gap-1.5 text-xs font-medium text-[#2EA043] bg-[#2EA043]/10 px-2.5 py-1 rounded-full">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Connected
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground bg-muted px-2.5 py-1 rounded-full">
                    <XCircle className="w-3.5 h-3.5" />
                    Disconnected
                  </span>
                )}
              </div>
              
              <h3 className="font-semibold text-foreground mb-1">{integration.name}</h3>
              <p className="text-xs text-muted-foreground mb-4 h-8">
                {isConnected 
                  ? `Last synced: ${integration.lastSync} • ${integration.version}`
                  : "Connect to sync your data automatically."
                }
              </p>

              <div className="pt-4 border-t border-border/50">
                {isConnected ? (
                  <Button variant="outline" size="sm" className="w-full text-muted-foreground hover:text-red-400 hover:bg-red-400/10 hover:border-red-400/20">
                    Disconnect
                  </Button>
                ) : (
                  <Button size="sm" className="w-full bg-foreground text-background hover:bg-foreground/90">
                    Connect
                  </Button>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
