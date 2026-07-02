import { motion } from "framer-motion";
import { Building2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../ui/Card";
import { Button } from "../ui/Button";
import { workspaceData } from "./settingsData";

export function WorkspaceCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
    >
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-[#2EA043]/10 flex items-center justify-center text-[#2EA043]">
              <Building2 className="w-4 h-4" />
            </div>
            <div>
              <CardTitle>Workspace Settings</CardTitle>
              <CardDescription>Manage your workspace preferences and defaults.</CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Workspace Name</label>
            <input 
              type="text" 
              defaultValue={workspaceData.name} 
              className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#2EA043] transition-shadow"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Default Repository</label>
              <select className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#2EA043] transition-shadow appearance-none">
                <option>{workspaceData.defaultRepo}</option>
                <option>acme/web</option>
                <option>acme/api</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Default AI Model</label>
              <select className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#2EA043] transition-shadow appearance-none">
                <option>{workspaceData.defaultModel}</option>
                <option>Claude 3.5 Sonnet</option>
                <option>GPT-4 Turbo</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Index Frequency</label>
              <select className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#2EA043] transition-shadow appearance-none">
                <option>{workspaceData.indexFrequency}</option>
                <option>Daily</option>
                <option>Weekly</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Date Format</label>
              <select className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#2EA043] transition-shadow appearance-none">
                <option>{workspaceData.dateFormat}</option>
                <option>MM/DD/YYYY</option>
                <option>YYYY-MM-DD</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Workspace Visibility</label>
            <div className="flex items-center gap-4 pt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="visibility" className="accent-[#2EA043] w-4 h-4" defaultChecked />
                <span className="text-sm">Private</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="visibility" className="accent-[#2EA043] w-4 h-4" />
                <span className="text-sm">Internal (All Company)</span>
              </label>
            </div>
          </div>

          <div className="pt-2">
            <Button className="bg-[#2EA043]/10 text-[#2EA043] hover:bg-[#2EA043]/20 border border-[#2EA043]/20 transition-all">
              Save Workspace Settings
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
