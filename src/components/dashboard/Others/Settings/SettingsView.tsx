"use client";

import { useState } from "react";
import {
  Settings,
  Shield,
  Bell,
  Database,
  Monitor,
  Save,
  RefreshCw,
  Power,
  Lock,
  User,
} from "lucide-react";
import Typography from "@/components/UI/Typography";
import Button from "@/components/UI/Button";
import Input from "@/components/UI/Input";

const SettingsView = () => {
  const [activeTab, setActiveTab] = useState("general");
  const [saving, setSaving] = useState(false);

  const tabs = [
    { id: "general", label: "General", icon: <Settings size={16} /> },
    { id: "system", label: "System", icon: <Monitor size={16} /> },
    { id: "security", label: "Security", icon: <Shield size={16} /> },
    { id: "notifications", label: "Notifications", icon: <Bell size={16} /> },
  ];

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => setSaving(false), 1500);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <Typography variant="h2" className="flex items-center gap-2">
            System Configuration
          </Typography>
          <p className="text-slate-500 text-sm mt-1">
            Manage industrial control parameters
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" leftIcon={<RefreshCw size={16} />}>
            Reset Defaults
          </Button>
          <Button
            isLoading={saving}
            loadingText="Saving..."
            leftIcon={<Save size={16} />}
            onClick={handleSave}
            className="bg-[#2c3e50] hover:bg-[#34495e]"
          >
            Save Changes
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Sidebar Navigation */}
        <div className="col-span-12 md:col-span-3">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors border-l-4 ${
                  activeTab === tab.id
                    ? "bg-slate-50 border-[#2c3e50] text-[#2c3e50]"
                    : "border-transparent text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>

          <div className="mt-6 bg-red-50 p-4 rounded-xl border border-red-100">
            <h4 className="flex items-center gap-2 text-red-700 font-medium text-sm mb-2">
              <Power size={14} /> Danger Zone
            </h4>
            <p className="text-xs text-red-600 mb-3">
              System restart and factory reset controls.
            </p>
            <Button size="sm" variant="danger" fullWidth>
              System Restart
            </Button>
          </div>
        </div>

        {/* Content Area */}
        <div className="col-span-12 md:col-span-9">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 min-h-[500px]">
            {activeTab === "general" && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div>
                  <Typography
                    variant="h5"
                    className="mb-4 flex items-center gap-2"
                  >
                    <Monitor size={18} className="text-slate-500" /> Interface
                    Settings
                  </Typography>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="Dashboard Name"
                      defaultValue="Metalixia Main Control"
                    />
                    <Input
                      label="Site Location"
                      defaultValue="Noida Sector 62"
                    />
                  </div>
                </div>
                <hr className="border-slate-100" />
                <div>
                  <Typography variant="h5" className="mb-4">
                    Localization
                  </Typography>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-slate-700">
                        Language
                      </label>
                      <select className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-slate-200">
                        <option>English (US)</option>
                        <option>Hindi</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-slate-700">
                        Timezone
                      </label>
                      <select className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-slate-200">
                        <option>IST (UTC+05:30)</option>
                        <option>UTC</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "system" && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <Typography
                  variant="h5"
                  className="mb-4 flex items-center gap-2"
                >
                  <Database size={18} className="text-slate-500" /> Parameters
                </Typography>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Input
                    label="Refresh Rate (ms)"
                    defaultValue="1000"
                    type="number"
                  />
                  <Input
                    label="Data Retention (Days)"
                    defaultValue="90"
                    type="number"
                  />
                  <Input
                    label="Max Concurrent Users"
                    defaultValue="50"
                    type="number"
                  />
                </div>
                <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                  <h4 className="text-sm font-medium text-slate-700 mb-2">
                    System Status
                  </h4>
                  <div className="flex gap-4 text-xs text-slate-500 font-mono">
                    <span>CPU: 12%</span>
                    <span>MEM: 4.2GB / 16GB</span>
                    <span>UPTIME: 14d 2h 12m</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "security" && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <Typography
                  variant="h5"
                  className="mb-4 flex items-center gap-2"
                >
                  <Lock size={18} className="text-slate-500" /> Access Control
                </Typography>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                    <div>
                      <h4 className="text-sm font-medium text-slate-700">
                        Two-Factor Authentication
                      </h4>
                      <p className="text-xs text-slate-500">
                        Require 2FA for all admin actions.
                      </p>
                    </div>
                    <div className="w-12 h-6 bg-green-500 rounded-full relative cursor-pointer">
                      <div className="w-4 h-4 bg-white rounded-full absolute top-1 right-1 shadow-sm"></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                    <div>
                      <h4 className="text-sm font-medium text-slate-700">
                        API Access
                      </h4>
                      <p className="text-xs text-slate-500">
                        Enable external API access keys.
                      </p>
                    </div>
                    <div className="w-12 h-6 bg-slate-200 rounded-full relative cursor-pointer">
                      <div className="w-4 h-4 bg-white rounded-full absolute top-1 left-1 shadow-sm"></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "notifications" && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <Typography
                  variant="h5"
                  className="mb-4 flex items-center gap-2"
                >
                  <Bell size={18} className="text-slate-500" /> Alert
                  Preferences
                </Typography>
                <div className="space-y-3">
                  {[
                    "Critical System Errors",
                    "Shift Change Alerts",
                    "New Report Uploads",
                    "Security Breaches",
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        defaultChecked
                        className="w-4 h-4 text-[#2c3e50] rounded border-slate-300 focus:ring-[#2c3e50]"
                      />
                      <label className="text-sm text-slate-700">{item}</label>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsView;
