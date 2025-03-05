
import { AppLayout } from "@/components/layout/AppLayout";

const Alerts = () => {
  return (
    <AppLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Security Alerts</h1>
        <p className="text-muted-foreground">
          View and manage security alerts and notifications.
        </p>
        
        <div className="bg-card rounded-lg border shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">Alert Center</h2>
          <p className="mb-4">This page is under construction. Check back soon for security alert management features.</p>
        </div>
      </div>
    </AppLayout>
  );
};

export default Alerts;
