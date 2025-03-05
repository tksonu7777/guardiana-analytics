
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Eye, EyeOff, Database, FileText, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ExtractedDataItem {
  id: string;
  appName: string;
  dataType: string;
  sensitiveItems: string[];
  timestamp: string;
  status: "redacted" | "pending" | "secure";
}

const extractedData: ExtractedDataItem[] = [
  {
    id: "1",
    appName: "Social Media Pro",
    dataType: "Image Upload",
    sensitiveItems: ["Geolocation", "Facial Recognition"],
    timestamp: "Today, 10:35 AM",
    status: "redacted"
  },
  {
    id: "2",
    appName: "File Storage App",
    dataType: "PDF Document",
    sensitiveItems: ["Credit Card Number", "Phone Number"],
    timestamp: "Today, 9:22 AM",
    status: "pending"
  },
  {
    id: "3",
    appName: "Work Documents",
    dataType: "Word Document",
    sensitiveItems: ["Email Address", "SSN"],
    timestamp: "Yesterday, 4:15 PM",
    status: "pending"
  },
  {
    id: "4",
    appName: "Gallery App",
    dataType: "Photo",
    sensitiveItems: ["Geolocation"],
    timestamp: "Yesterday, 2:30 PM",
    status: "redacted"
  },
  {
    id: "5",
    appName: "Messaging App",
    dataType: "Video",
    sensitiveItems: [],
    timestamp: "Mar 4, 8:45 AM",
    status: "secure"
  }
];

export function ExtractedDataTable() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium flex items-center gap-2">
          <Database className="h-5 w-5 text-primary" />
          Extracted Data Analysis
        </CardTitle>
        <CardDescription>
          Data extracted from user files with sensitive information detection
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>App</TableHead>
              <TableHead>Data Type</TableHead>
              <TableHead>Sensitive Information</TableHead>
              <TableHead>Timestamp</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {extractedData.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.appName}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    {item.dataType}
                  </div>
                </TableCell>
                <TableCell>
                  {item.sensitiveItems.length > 0 ? (
                    <div className="flex flex-wrap gap-1">
                      {item.sensitiveItems.map((item, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {item}
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    <span className="text-muted-foreground text-sm">None detected</span>
                  )}
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {item.timestamp}
                </TableCell>
                <TableCell>
                  {item.status === "redacted" && (
                    <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                      Redacted
                    </Badge>
                  )}
                  {item.status === "pending" && (
                    <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">
                      Pending
                    </Badge>
                  )}
                  {item.status === "secure" && (
                    <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
                      Secure
                    </Badge>
                  )}
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    {item.status === "redacted" ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                    <span className="sr-only">
                      {item.status === "redacted" ? "View Original" : "Redact"}
                    </span>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
