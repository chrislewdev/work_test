// components/dashboard/DashboardContent.tsx

import React from "react";
import { BarChart, Users, Briefcase, TrendingUp } from "lucide-react";

// Stat card component for reusability
interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend?: string;
  trendUp?: boolean;
}

function StatCard({ title, value, icon, trend, trendUp }: StatCardProps) {
  return (
    <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-md p-6">
      <div className="flex justify-between">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
          <h3 className="text-2xl font-bold mt-2 dark:text-white">{value}</h3>
          {trend && (
            <p
              className={`text-sm mt-2 ${
                trendUp ? "text-green-500" : "text-red-500"
              }`}
            >
              {trendUp ? "↑" : "↓"} {trend}
            </p>
          )}
        </div>
        <div className="bg-blue-100 dark:bg-blue-900/20 p-3 rounded-full">
          {icon}
        </div>
      </div>
    </div>
  );
}

export default function DashboardContent() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
          Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Welcome back, Musharof. Here's an overview of your account.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Revenue"
          value="$24,569.00"
          icon={<BarChart className="text-blue-600 dark:text-blue-400" />}
          trend="23.5% from last month"
          trendUp={true}
        />
        <StatCard
          title="Active Users"
          value="3,897"
          icon={<Users className="text-blue-600 dark:text-blue-400" />}
          trend="10.2% from last month"
          trendUp={true}
        />
        <StatCard
          title="Completed Tasks"
          value="248"
          icon={<Briefcase className="text-blue-600 dark:text-blue-400" />}
          trend="12.7% from last month"
          trendUp={true}
        />
        <StatCard
          title="Pending Tasks"
          value="64"
          icon={<TrendingUp className="text-blue-600 dark:text-blue-400" />}
          trend="2.3% from last month"
          trendUp={false}
        />
      </div>

      {/* Recent Activity Panel */}
      <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold mb-4 dark:text-white">
          Recent Activity
        </h2>
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((item) => (
            <div
              key={item}
              className="flex items-start pb-4 border-b dark:border-zinc-700 last:border-0 last:pb-0"
            >
              <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-zinc-700 mr-3 flex-shrink-0"></div>
              <div>
                <p className="text-sm font-medium dark:text-white">
                  Task #{item} was completed
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  About {item} hour{item !== 1 ? "s" : ""} ago
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
