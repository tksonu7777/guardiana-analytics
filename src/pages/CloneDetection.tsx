
import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CloneAppAlert } from "@/components/cloneDetection/CloneAppAlert";
import { Copy, AlertTriangle, Check, XCircle, PlusCircle, Info, Search } from "lucide-react";

interface AppInfoType {
  id: string;
  name: string;
  developer: string;
  installDate: string;
  status: "verified" | "suspected" | "blocked";
  appType: "official" | "clone" | "malicious";
  riskLevel?: "critical" | "high" | "medium" | "low";
}

const appsInfo: AppInfoType[] = [
  {
    id: "1",
    name: "Banking App",
    developer: "Major Bank Inc.",
    installDate: "Jan 15, 2023",
    status: "verified",
    appType: "official"
  },
  {
    id: "2",
    name: "SecureBank Pro",
    developer: "Finance Solutions Ltd",
    installDate: "Mar 3, 2023",
    status: "blocked",
    appType: "clone",
    riskLevel: "critical"
  },
  {
    id: "3",
    name: "Social Media Official",
    developer: "Social Media Inc.",
    installDate: "Feb 10, 2023",
    status: "verified",
    appType: "official"
  },
  {
    id: "4",
    name: "Weather Tracker Plus",
    developer: "Unknown Developer",
    installDate: "Feb 28, 2023",
    status: "suspected",
    appType: "malicious",
    riskLevel: "high"
  },
  {
    id: "5",
    name: "File Manager Pro",
    developer: "Essential Apps Inc.",
    installDate: "Mar 5, 2023",
    status: "verified",
    appType: "official"
  }
];

const CloneDetection = () => {
  const [showAlert, setShowAlert] = useState(true);
  const [apps, setApps] = useState(appsInfo);

  const handleBlockApp = (id: string) => {
    setApps(apps.map(app => 
      app.id === id ? { ...app, status: "blocked" as const } : app
    ));
  };

  const handleDismissAlert = () => {
    setShowAlert(false);
  };

  const getStatusBadge = (status: AppInfoType["status"]) => {
    switch (status) {
      case "verified":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
            <Check className="h-3 w-3 mr-1" />
            Verified
          </Badge>
        );
      case "suspected":
        return (
          <Badge variant="outline" className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400">
            <AlertTriangle className="h-3 w-3 mr-1" />
            Suspected
          </Badge>
        );
      case "blocked":
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">
            <XCircle className="h-3 w-3 mr-1" />
            Blocked
          </Badge>
        );
    }
  };

  const getRiskBadge = (risk?: AppInfoType["riskLevel"]) => {
    if (!risk) return null;
    
    const classes = {
      critical: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
      high: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400",
      medium: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
      low: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
    };
    
    return (
      <Badge variant="outline" className={classes[risk]}>
        {risk.charAt(0).toUpperCase() + risk.slice(1)} Risk
      </Badge>
    );
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Clone Detection</h1>
            <p className="text-muted-foreground">
              Identify and manage potential clone applications.
            </p>
          </div>
          <Button className="flex items-center gap-2">
            <Search className="h-4 w-4" />
            Scan for Clones
          </Button>
        </div>

        {showAlert && (
          <CloneAppAlert
            appName="SecureBank Pro"
            developerName="Finance Solutions Ltd"
            installSource="Third-party app store"
            riskLevel="critical"
            originalAppName="Banking App"
            reasons={[
              "App signature does not match the official app",
              "Uses nearly identical icon and name to official app",
              "Requests excessive permissions including SMS and contacts",
              "Developer has no verified history",
              "Contains potentially malicious code patterns"
            ]}
            onDismiss={handleDismissAlert}
            onBlock={() => {
              handleDismissAlert();
              handleBlockApp("2");
            }}
          />
        )}
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center gap-2">
              <Copy className="h-5 w-5 text-primary" />
              Installed Applications
            </CardTitle>
            <CardDescription>
              Review installed apps and detect potential clones
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>App Name</TableHead>
                  <TableHead>Developer</TableHead>
                  <TableHead>Install Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Risk Level</TableHead>
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {apps.map((app) => (
                  <TableRow key={app.id}>
                    <TableCell className="font-medium">{app.name}</TableCell>
                    <TableCell>{app.developer}</TableCell>
                    <TableCell className="text-muted-foreground">{app.installDate}</TableCell>
                    <TableCell>{getStatusBadge(app.status)}</TableCell>
                    <TableCell>{getRiskBadge(app.riskLevel)}</TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Info className="h-4 w-4" />
                        </Button>
                        {app.status !== "blocked" && app.appType !== "official" && (
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-destructive" 
                            onClick={() => handleBlockApp(app.id)}
                          >
                            <XCircle className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default CloneDetection;
