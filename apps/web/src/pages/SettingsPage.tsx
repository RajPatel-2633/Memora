import { useState } from "react";
import { SettingsHeader } from "../components/settings/SettingsHeader";
import { ProfileCard } from "../components/settings/ProfileCard";
import { WorkspaceCard } from "../components/settings/WorkspaceCard";
import { AISettingsCard } from "../components/settings/AISettingsCard";
import { IntegrationsCard } from "../components/settings/IntegrationsCard";
import { NotificationsCard } from "../components/settings/NotificationsCard";
import { SecurityCard } from "../components/settings/SecurityCard";
import { BillingCard } from "../components/settings/BillingCard";
import { DangerZoneCard } from "../components/settings/DangerZoneCard";

export function SettingsPage() {
  const [activeTab, setActiveTab] = useState("Profile");

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto min-h-screen">
      <SettingsHeader activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="mt-8">
        {activeTab === "Profile" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            <ProfileCard />
            <DangerZoneCard />
          </div>
        )}

        {activeTab === "Workspace" && (
          <div className="grid grid-cols-1 gap-6 items-start">
            <WorkspaceCard />
          </div>
        )}

        {activeTab === "Integrations" && (
          <IntegrationsCard />
        )}

        {activeTab === "AI Settings" && (
          <div className="grid grid-cols-1 gap-6 items-start">
            <AISettingsCard />
          </div>
        )}

        {activeTab === "Notifications" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            <NotificationsCard />
          </div>
        )}

        {activeTab === "Security" && (
          <div className="grid grid-cols-1 gap-6 items-start">
            <SecurityCard />
          </div>
        )}

        {activeTab === "Billing" && (
          <div className="grid grid-cols-1 gap-6 items-start">
            <BillingCard />
          </div>
        )}
      </div>
    </div>
  );
}
