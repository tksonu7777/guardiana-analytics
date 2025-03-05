
import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { WebsiteActivity } from "@/components/web/WebsiteActivity";
import { WebsitePermissions } from "@/components/web/WebsitePermissions";
import { Play, Pause, AlertTriangle, Shield, Bell } from "lucide-react";

const WebMonitoring = () => {
  const [isMonitoring, setIsMonitoring] = useState(false);
  const { toast } = useToast();

  const handleToggleMonitoring = () => {
    setIsMonitoring(!isMonitoring);
    
    toast({
      title: isMonitoring ? "Web Monitoring Stopped" : "Web Monitoring Started",
      description: isMonitoring 
        ? "Browser activity monitoring has been disabled" 
        : "Guardiana is now monitoring browser activity for security threats",
      variant: "default",
    });
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Web Monitoring</h1>
            <p className="text-muted-foreground mt-1">
              Monitor and protect browser activity from malicious websites
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button 
              onClick={handleToggleMonitoring}
              variant={isMonitoring ? "destructive" : "default"}
              className="flex gap-2"
            >
              {isMonitoring ? (
                <>
                  <Pause className="h-4 w-4" />
                  Stop Monitoring
                </>
              ) : (
                <>
                  <Play className="h-4 w-4" />
                  Start Monitoring
                </>
              )}
            </Button>
            <Button variant="outline" className="flex gap-2">
              <Bell className="h-4 w-4" />
              Activate Alerts
            </Button>
          </div>
        </div>
        
        <Card className="overflow-hidden border-yellow-200 bg-yellow-50 dark:bg-yellow-950/20">
          <CardContent className="p-4">
            <div className="flex items-start gap-3 text-yellow-800 dark:text-yellow-400">
              <AlertTriangle className="h-5 w-5 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-sm">Web Protection Status</h3>
                <p className="text-sm mt-1">
                  When web monitoring is active, Guardiana will analyze all websites you visit for potential security risks, 
                  including phishing attempts, malware distribution, and suspicious data collection patterns.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Tabs defaultValue="activity" className="w-full">
          <TabsList className="grid grid-cols-2 w-[400px]">
            <TabsTrigger value="activity">Website Activity</TabsTrigger>
            <TabsTrigger value="permissions">Site Permissions</TabsTrigger>
          </TabsList>
          
          <TabsContent value="activity" className="mt-4">
            <WebsiteActivity isMonitoring={isMonitoring} />
          </TabsContent>
          
          <TabsContent value="permissions" className="mt-4">
            <WebsitePermissions />
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default WebMonitoring;
