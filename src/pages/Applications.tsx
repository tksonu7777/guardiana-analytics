
import { AppLayout } from "@/components/layout/AppLayout";

const Applications = () => {
  return (
    <AppLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Applications</h1>
        <p className="text-muted-foreground">
          Manage and monitor installed applications.
        </p>
        
        <div className="bg-card rounded-lg border shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">Application Management</h2>
          <p className="mb-4">This page is under construction. Check back soon for application management features.</p>
        </div>
      </div>
    </AppLayout>
  );
};

export default Applications;
