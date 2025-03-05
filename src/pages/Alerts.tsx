
import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { CloneAppAlert } from "@/components/cloneDetection/CloneAppAlert";
import { Shield, Bell, Copy, Wifi, Database, EyeOff } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Mock alert data
const mockAlerts = [
  {
    id: "1",
    type: "clone",
    title: "Fake Banking App Detection",
    description: "A clone of SecureBank has been detected and installation blocked",
    time: "Today, 11:32 AM",
    priority: "critical",
    appInfo: {
      appName: "SecureBank Pro",
      developerName: "Finance Solutions Ltd",
      installSource: "Third-party app store",
      riskLevel: "critical" as const,
      originalAppName: "SecureBank",
      reasons: [
        "App signature does not match the official app",
        "Uses nearly identical icon and name to official app",
        "Requests excessive permissions including SMS and contacts",
        "Developer has no verified history",
        "Contains potentially malicious code patterns"
      ]
    }
  },
  {
    id: "2",
    type: "data",
    title: "Sensitive Data Extraction Attempt",
    description: "An app attempted to extract contacts and message data",
    time: "Today, 10:15 AM",
    priority: "high"
  },
  {
    id: "3",
    type: "web",
    title: "Suspicious Website Blocked",
    description: "Access to a phishing website was prevented",
    time: "Yesterday, 3:45 PM",
    priority: "high"
  },
  {
    id: "4",
    type: "permission",
    title: "Unusual Permission Access",
    description: "Social Media app accessed your location in the background",
    time: "Yesterday, 2:30 PM",
    priority: "medium"
  },
  {
    id: "5",
    type: "data",
    title: "Sensitive Information Detected",
    description: "Credit card information found in an unsecured file",
    time: "Mar 4, 5:22 PM",
    priority: "medium"
  }
];

const priorityClassMap = {
  critical: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
  high: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400",
  medium: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
  low: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
};

const typeIconMap = {
  clone: Copy,
  web: Wifi,
  data: Database,
  permission: Shield
};

const Alerts = () => {
  const [alerts, setAlerts] = useState(mockAlerts);
  const [showDetails, setShowDetails] = useState<string | null>("1"); // Show the first alert by default

  const handleDismissAlert = (id: string) => {
    setAlerts(alerts.filter((alert) => alert.id !== id));
    if (showDetails === id) {
      setShowDetails(null);
    }
  };

  const toggleDetails = (id: string) => {
    setShowDetails(showDetails === id ? null : id);
  };

  const getTypeIcon = (type: keyof typeof typeIconMap) => {
    const Icon = typeIconMap[type];
    return <Icon className="h-5 w-5" />;
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Security Alerts</h1>
            <p className="text-muted-foreground">
              View and manage security alerts and notifications.
            </p>
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            <EyeOff className="h-4 w-4" />
            Mark All as Read
          </Button>
        </div>
        
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid grid-cols-4 w-[400px]">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="clone">Clone Apps</TabsTrigger>
            <TabsTrigger value="web">Web</TabsTrigger>
            <TabsTrigger value="data">Data</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-4 space-y-4">
            {showDetails === "1" && (
              <CloneAppAlert 
                {...alerts.find(a => a.id === "1")?.appInfo!}
                onDismiss={() => handleDismissAlert("1")}
                onBlock={() => handleDismissAlert("1")}
              />
            )}
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium flex items-center gap-2">
                  <Bell className="h-5 w-5 text-primary" />
                  Recent Alerts
                </CardTitle>
                <CardDescription>
                  Security notifications and warnings that require your attention
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  {alerts.map((alert) => (
                    <div 
                      key={alert.id}
                      className="flex items-start justify-between py-3 px-1 group cursor-pointer hover:bg-muted/50 rounded-md transition-colors"
                      onClick={() => toggleDetails(alert.id)}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`mt-0.5 p-1.5 rounded-full bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors`}>
                          {getTypeIcon(alert.type as keyof typeof typeIconMap)}
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <p className="font-medium text-sm">{alert.title}</p>
                            <Badge
                              variant="secondary"
                              className={`uppercase text-[10px] font-semibold ${priorityClassMap[alert.priority as keyof typeof priorityClassMap]}`}
                            >
                              {alert.priority}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {alert.description}
                          </p>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className="text-xs text-muted-foreground/60">
                              {alert.time}
                            </span>
                            <Button 
                              variant="link" 
                              size="sm" 
                              className="h-auto p-0 text-xs text-primary"
                            >
                              {showDetails === alert.id ? "Hide Details" : "View Details"}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="clone" className="mt-4 space-y-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center justify-center text-center p-8">
                  <Copy className="h-12 w-12 text-muted-foreground/50 mb-4" />
                  <h3 className="text-lg font-medium mb-2">Clone App Alerts</h3>
                  <p className="text-muted-foreground max-w-md mb-6">
                    View alerts about potential clone or fake applications that have been detected.
                  </p>
                  {alerts.filter(a => a.type === "clone").length === 0 ? (
                    <p>No clone app alerts at this time.</p>
                  ) : (
                    <Button>View Clone App Alerts</Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="web" className="mt-4 space-y-4">
            {/* Web alerts content */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center justify-center text-center p-8">
                  <Wifi className="h-12 w-12 text-muted-foreground/50 mb-4" />
                  <h3 className="text-lg font-medium mb-2">Web Security Alerts</h3>
                  <p className="text-muted-foreground max-w-md mb-6">
                    View alerts about suspicious websites and web-based security threats.
                  </p>
                  {alerts.filter(a => a.type === "web").length === 0 ? (
                    <p>No web security alerts at this time.</p>
                  ) : (
                    <Button>View Web Alerts</Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="data" className="mt-4 space-y-4">
            {/* Data alerts content */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center justify-center text-center p-8">
                  <Database className="h-12 w-12 text-muted-foreground/50 mb-4" />
                  <h3 className="text-lg font-medium mb-2">Data Security Alerts</h3>
                  <p className="text-muted-foreground max-w-md mb-6">
                    View alerts about sensitive data detection and protection.
                  </p>
                  {alerts.filter(a => a.type === "data").length === 0 ? (
                    <p>No data security alerts at this time.</p>
                  ) : (
                    <Button>View Data Alerts</Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default Alerts;
