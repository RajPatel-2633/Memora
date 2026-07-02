import { motion } from "framer-motion";
import { Camera } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../ui/Card";
import { Button } from "../ui/Button";
import { userProfile } from "./settingsData";

export function ProfileCard() {
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
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            </div>
            <div>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your personal information and profile details.</CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="flex items-start gap-6">
            <div className="relative group cursor-pointer shrink-0">
              <div className="w-20 h-20 rounded-full bg-[#2EA043] text-white flex items-center justify-center text-3xl font-medium">
                {userProfile.avatar}
              </div>
              <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-card border border-border rounded-full flex items-center justify-center">
                <Camera className="w-3.5 h-3.5 text-muted-foreground" />
              </div>
            </div>

            <div className="flex-1 space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Full Name</label>
                <input 
                  type="text" 
                  defaultValue={userProfile.name} 
                  className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#2EA043] transition-shadow"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Email Address</label>
                <input 
                  type="email" 
                  defaultValue={userProfile.email} 
                  className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#2EA043] transition-shadow"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Role</label>
                  <select className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#2EA043] transition-shadow appearance-none">
                    <option>{userProfile.role}</option>
                    <option>Admin</option>
                    <option>Member</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Company</label>
                  <input 
                    type="text" 
                    defaultValue={userProfile.company} 
                    className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#2EA043] transition-shadow"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Time Zone</label>
            <select className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#2EA043] transition-shadow appearance-none">
              <option>{userProfile.timezone}</option>
              <option>(UTC-08:00) Pacific Time (US & Canada)</option>
              <option>(UTC+00:00) London</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Bio</label>
            <textarea 
              defaultValue={userProfile.bio} 
              className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm min-h-[100px] resize-none focus:outline-none focus:ring-1 focus:ring-[#2EA043] transition-shadow"
            />
          </div>

          <div className="pt-2">
            <Button className="bg-[#2EA043]/10 text-[#2EA043] hover:bg-[#2EA043]/20 border border-[#2EA043]/20 transition-all">
              Save Changes
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
