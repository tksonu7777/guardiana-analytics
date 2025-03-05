import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Camera, Mic, MapPin, Database, Power, Lock, Bell } from "lucide-react";

interface WebsitePermission {
  id: string;
  domain: string;
  permissions: {
    type: "camera" | "microphone" | "location" | "notifications" | "storage";
    status: "allowed" | "blocked" | "ask";
  }[];
  lastUsed: string;
}

const mockPermissions: WebsitePermission[] = [
  {
    id: "1",
    domain: "video-conference.app",
    permissions: [
      { type: "camera", status: "allowed" },
      { type: "microphone", status: "allowed" },
      { type: "notifications", status: "allowed" }
    ],
    lastUsed: "Today"
  },
  {
    id: "2",
    domain: "maps-service.com",
    permissions: [
      { type: "location", status: "allowed" }
    ],
    lastUsed: "Yesterday"
  },
  {
    id: "3",
    domain: "news-platform.com",
    permissions: [
      { type: "notifications", status: "allowed" }
    ],
    lastUsed: "Last week"
  },
  {
    id: "4",
    domain: "suspicious-site.net",
    permissions: [
      { type: "camera", status: "blocked" },
      { type: "location", status: "blocked" },
      { type: "storage", status: "blocked" }
    ],
    lastUsed: "1 month ago"
  },
  {
    id: "5",
    domain: "shopping-platform.com",
    permissions: [
      { type: "notifications", status: "allowed" },
      { type: "location", status: "ask" }
    ],
    lastUsed: "2 weeks ago"
  }
];

const getPermissionIcon = (type: WebsitePermission["permissions"][0]["type"]) => {
  switch (type) {
    case "camera":
      return <Camera className="h-4 w-4" />;
    case "microphone":
      return <Mic className="h-4 w-4" />;
    case "location":
      return <MapPin className="h-4 w-4" />;
    case "notifications":
      return <Bell className="h-4 w-4" />;
    case "storage":
      return <Database className="h-4 w-4" />;
  }
};

const getPermissionText = (type: WebsitePermission["permissions"][0]["type"]) => {
  switch (type) {
    case "camera":
      return "Camera";
    case "microphone":
      return "Microphone";
    case "location":
      return "Location";
    case "notifications":
      return "Notifications";
    case "storage":
      return "Storage Access";
  }
};

const getStatusBadge = (status: WebsitePermission["permissions"][0]["status"]) => {
  switch (status) {
    case "allowed":
      return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">Allowed</Badge>;
    case "blocked":
      return <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">Blocked</Badge>;
    case "ask":
      return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">Ask</Badge>;
  }
};

export function WebsitePermissions() {
  return (
    <Card>
      <CardContent className="p-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Website</TableHead>
              <TableHead>Permissions</TableHead>
              <TableHead>Last Used</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockPermissions.map((site) => (
              <TableRow key={site.id}>
                <TableCell className="font-medium">{site.domain}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-2">
                    {site.permissions.map((permission, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 border rounded-full px-2 py-0.5 text-xs">
                        {getPermissionIcon(permission.type)}
                        <span>{getPermissionText(permission.type)}</span>
                        <span className="mx-1">•</span>
                        {getStatusBadge(permission.status)}
                      </div>
                    ))}
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground text-sm">
                  {site.lastUsed}
                </TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8" title="Block All">
                      <Lock className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" title="Revoke All">
                      <Power className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
