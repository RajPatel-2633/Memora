import { motion } from "framer-motion";
import { ChevronDown, Save } from "lucide-react";
import { Button } from "../ui/Button";

interface SettingsHeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const TABS = [
  "Profile",
  "Workspace",
  "Integrations",
  "AI Settings",
  "Notifications",
  "Security",
  "Billing"
];

export function SettingsHeader({ activeTab, setActiveTab }: SettingsHeaderProps) {
  return (
    <div className="flex flex-col gap-6 mb-8">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground mt-1">
            Manage your preferences, integrations and account settings.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2 bg-card border-[#30363D] hover:border-[#2EA043]/50 transition-colors">
            <div className="w-5 h-5 rounded bg-[#8B5CF6] flex items-center justify-center text-xs text-white font-medium mr-1">
              A
            </div>
            Acme Engineering
            <ChevronDown className="w-4 h-4 ml-1 opacity-50" />
          </Button>

          <Button className="bg-[#2EA043] hover:bg-[#2EA043]/90 text-white font-semibold gap-2 transition-transform hover:scale-[1.02]">
            <Save className="w-4 h-4" />
            Save All Changes
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-6 border-b border-border/50 overflow-x-auto hide-scrollbar pb-[-1px]">
        {TABS.map((tab) => {
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative pb-4 text-sm font-medium whitespace-nowrap transition-colors ${
                isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab}
              {isActive && (
                <motion.div
                  layoutId="activeTabIndicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2EA043]"
                  initial={false}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
