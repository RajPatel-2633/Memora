import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";

export function DangerZoneCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
      className="mt-8 border border-red-900/50 rounded-xl bg-red-950/10 overflow-hidden"
    >
      <div className="p-6">
        <div className="flex items-center gap-2 mb-4 text-red-500">
          <AlertTriangle className="w-5 h-5" />
          <h2 className="text-lg font-bold">Danger Zone</h2>
        </div>
        
        <p className="text-sm text-muted-foreground mb-6">
          Irreversible and destructive actions. Please be certain before proceeding, as these actions cannot be undone.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <button className="flex-1 px-4 py-2.5 rounded-lg border border-red-900/50 bg-background/50 text-red-400 text-sm font-semibold hover:bg-red-950/30 hover:border-red-800 transition-colors">
            Delete Workspace
          </button>
          
          <button className="flex-1 px-4 py-2.5 rounded-lg border border-red-900/50 bg-background/50 text-red-400 text-sm font-semibold hover:bg-red-950/30 hover:border-red-800 transition-colors">
            Delete Account
          </button>
        </div>
      </div>
    </motion.div>
  );
}
