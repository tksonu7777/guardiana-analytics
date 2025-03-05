
import { AppLayout } from "@/components/layout/AppLayout";

const Activity = () => {
  return (
    <AppLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">App Activity</h1>
        <p className="text-muted-foreground">
          Track and review application activity and usage patterns.
        </p>
        
        <div className="bg-card rounded-lg border shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">Activity Tracker</h2>
          <p className="mb-4">This page is under construction. Check back soon for app activity tracking features.</p>
        </div>
      </div>
    </AppLayout>
  );
};

export default Activity;
