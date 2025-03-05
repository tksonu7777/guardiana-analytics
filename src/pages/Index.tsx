
import { AppLayout } from "@/components/layout/AppLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { ActivityChart } from "@/components/dashboard/ActivityChart";
import { PermissionSummary } from "@/components/dashboard/PermissionSummary";
import { RecentAlerts } from "@/components/dashboard/RecentAlerts";
import {
  Shield,
  Wifi,
  Activity,
  Copy,
} from "lucide-react";

const Index = () => {
  return (
    <AppLayout>
      <div className="space-y-8">
        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            variant="glass"
            icon={<Shield className="h-5 w-5" />}
            title="Permission Requests"
            value="148"
            trend={{ value: 12, isPositive: true }}
          />
          <StatCard
            variant="glass"
            icon={<Wifi className="h-5 w-5" />}
            title="Network Events"
            value="2,584"
            trend={{ value: 8, isPositive: false }}
          />
          <StatCard
            variant="glass"
            icon={<Activity className="h-5 w-5" />}
            title="Active Apps"
            value="32"
            trend={{ value: 4, isPositive: true }}
          />
          <StatCard
            variant="glass"
            icon={<Copy className="h-5 w-5" />}
            title="Suspicious Apps"
            value="3"
            trend={{ value: 2, isPositive: false }}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <ActivityChart
            title="Activity Overview"
            description="App events in the last 24 hours"
            className="md:col-span-2 lg:col-span-4"
          />
          <PermissionSummary
            title="Permission Analysis"
            className="md:col-span-2 lg:col-span-3"
          />
        </div>

        {/* Recent Alerts */}
        <RecentAlerts className="md:col-span-2" />
      </div>
    </AppLayout>
  );
};

export default Index;
