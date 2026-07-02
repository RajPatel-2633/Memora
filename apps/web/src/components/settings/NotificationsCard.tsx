import { motion } from "framer-motion";
import { Bell } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../ui/Card";

function ToggleSwitch({ enabled, defaultChecked }: { enabled?: boolean; defaultChecked?: boolean }) {
  return (
    <div className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none ${enabled || defaultChecked ? 'bg-[#2EA043]' : 'bg-muted'}`}>
      <span className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${enabled || defaultChecked ? 'translate-x-2' : '-translate-x-2'}`} />
    </div>
  );
}

export function NotificationsCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-[#2EA043]/10 flex items-center justify-center text-[#2EA043]">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>Manage your email and Slack notification preferences.</CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-8">
          
          <div className="space-y-4">
            <h3 className="text-sm font-semibold border-b border-border/50 pb-2">Email Notifications</h3>
            
            <div className="space-y-4 pt-2">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Weekly Reports</p>
                  <p className="text-xs text-muted-foreground">Receive a weekly digest of your workspace activity.</p>
                </div>
                <ToggleSwitch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Bug Alerts</p>
                  <p className="text-xs text-muted-foreground">Get notified when critical bugs are identified in your codebase.</p>
                </div>
                <ToggleSwitch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Repository Indexed</p>
                  <p className="text-xs text-muted-foreground">Email me when a repository has finished indexing.</p>
                </div>
                <ToggleSwitch defaultChecked />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold border-b border-border/50 pb-2">Slack Notifications</h3>
            
            <div className="space-y-4 pt-2">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">ADR Updates</p>
                  <p className="text-xs text-muted-foreground">Send a Slack message when a new Architecture Decision is detected.</p>
                </div>
                <ToggleSwitch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">AI Failure Alerts</p>
                  <p className="text-xs text-muted-foreground">Alert the team if an automated AI process fails.</p>
                </div>
                <ToggleSwitch />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Memory Complete</p>
                  <p className="text-xs text-muted-foreground">Notify in channel when a complex codebase question is answered.</p>
                </div>
                <ToggleSwitch defaultChecked />
              </div>
            </div>
          </div>

        </CardContent>
      </Card>
    </motion.div>
  );
}
