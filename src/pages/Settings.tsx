
import { AppLayout } from "@/components/layout/AppLayout";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { EnhancedFileScanner } from "@/components/settings/EnhancedFileScanner";
import { Settings as SettingsIcon, Shield, Bell, Lock } from "lucide-react";

const Settings = () => {
  return (
    <AppLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">
          Configure system preferences and security settings.
        </p>
        
        <Tabs defaultValue="general">
          <TabsList className="grid w-full grid-cols-4 md:w-[600px]">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="privacy">Privacy</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general" className="mt-6 space-y-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium flex items-center gap-2">
                  <SettingsIcon className="h-5 w-5 text-primary" />
                  System Configuration
                </CardTitle>
                <CardDescription>
                  General settings and application preferences.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">This page is under construction. Check back soon for general settings features.</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="security" className="mt-6 space-y-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Security Settings
                </CardTitle>
                <CardDescription>
                  Configure security features and protections.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">This page is under construction. Check back soon for security settings features.</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="privacy" className="mt-6 space-y-6">
            <EnhancedFileScanner />
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium flex items-center gap-2">
                  <Lock className="h-5 w-5 text-primary" />
                  Additional Privacy Settings
                </CardTitle>
                <CardDescription>
                  Additional privacy controls for your information.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">This page is under construction. Check back soon for additional privacy features.</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications" className="mt-6 space-y-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium flex items-center gap-2">
                  <Bell className="h-5 w-5 text-primary" />
                  Notification Settings
                </CardTitle>
                <CardDescription>
                  Configure what notifications you receive and how.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">This page is under construction. Check back soon for notification settings features.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}

export default Settings;
