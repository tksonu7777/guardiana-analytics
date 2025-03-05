
import { AppLayout } from "@/components/layout/AppLayout";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ExtractedDataTable } from "@/components/permissions/ExtractedDataTable";
import { Shield, Database } from "lucide-react";

const Permissions = () => {
  return (
    <AppLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Permissions Management</h1>
        <p className="text-muted-foreground">
          Manage application permissions and data access controls.
        </p>
        
        <Tabs defaultValue="apps">
          <TabsList className="grid w-full grid-cols-3 md:w-[400px]">
            <TabsTrigger value="apps">Apps</TabsTrigger>
            <TabsTrigger value="extracted">Extracted Data</TabsTrigger>
            <TabsTrigger value="controls">Controls</TabsTrigger>
          </TabsList>
          
          <TabsContent value="apps" className="mt-6 space-y-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Permission Controls
                </CardTitle>
                <CardDescription>
                  Manage application permissions and access controls.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">This page is under construction. Check back soon for permission management features.</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="extracted" className="mt-6 space-y-6">
            <ExtractedDataTable />
          </TabsContent>
          
          <TabsContent value="controls" className="mt-6 space-y-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium flex items-center gap-2">
                  <Database className="h-5 w-5 text-primary" />
                  Data Access Controls
                </CardTitle>
                <CardDescription>
                  Configure data access permissions across applications.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">This page is under construction. Check back soon for data access control features.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default Permissions;
