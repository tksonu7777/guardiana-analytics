
import { AppLayout } from "@/components/layout/AppLayout";

const Settings = () => {
  return (
    <AppLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">
          Configure system preferences and account settings.
        </p>
        
        <div className="bg-card rounded-lg border shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">System Configuration</h2>
          <p className="mb-4">This page is under construction. Check back soon for system settings features.</p>
        </div>
      </div>
    </AppLayout>
  );
};

export default Settings;
