"use client";

import Typography from "@/components/UI/Typography";
import Input from "@/components/UI/Input";
import {
  BookOpen,
  Search,
  Shield,
  Users,
  AlertTriangle,
  ChevronRight,
  FileText,
  ToolCase,
} from "lucide-react";
import { useState } from "react";

const EmployeeProcedure = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const categories = [
    {
      id: "safety",
      name: "Safety Protocols",
      icon: <Shield size={20} className="text-emerald-500" />,
    },
    {
      id: "operation",
      name: "Machine Operation",
      icon: <ToolCase size={20} className="text-blue-500" />,
    },
    {
      id: "hr",
      name: "HR Policies",
      icon: <Users size={20} className="text-purple-500" />,
    },
    {
      id: "emergency",
      name: "Emergency Response",
      icon: <AlertTriangle size={20} className="text-red-500" />,
    },
  ];

  const procedures = [
    {
      id: 1,
      category: "safety",
      title: "Personal Protective Equipment (PPE) Guidelines",
      date: "Updated 2 days ago",
      readTime: "5 min read",
    },
    {
      id: 2,
      category: "safety",
      title: "Hazardous Material Handling",
      date: "Updated 1 week ago",
      readTime: "10 min read",
    },
    {
      id: 3,
      category: "operation",
      title: "CNC Machine Startup Sequence",
      date: "Updated 3 days ago",
      readTime: "8 min read",
    },
    {
      id: 4,
      category: "operation",
      title: "Daily Maintenance Checklist",
      date: "Updated 2 weeks ago",
      readTime: "15 min read",
    },
    {
      id: 5,
      category: "hr",
      title: "Leave Application Process",
      date: "Updated 1 month ago",
      readTime: "3 min read",
    },
    {
      id: 6,
      category: "hr",
      title: "Code of Conduct",
      date: "Updated 6 months ago",
      readTime: "12 min read",
    },
    {
      id: 7,
      category: "emergency",
      title: "Fire Evacuation Plan",
      date: "Updated 1 year ago",
      readTime: "5 min read",
    },
    {
      id: 8,
      category: "emergency",
      title: "First Aid Basics",
      date: "Updated 6 months ago",
      readTime: "20 min read",
    },
  ];

  const filteredProcedures = procedures.filter(
    (proc) =>
      proc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      proc.category.includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="p-8 max-w-[1600px] mx-auto">
      <div className="mb-8">
        <Typography variant="h2" className="flex items-center gap-3">
          <BookOpen className="text-slate-800" size={32} /> Standard Operating
          Procedures
        </Typography>
        <Typography variant="p" className="text-slate-500 mt-1">
          Access all company guidelines, safety manuals, and operational
          protocols
        </Typography>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-6 mb-10">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={20} className="text-slate-400" />
          </div>
          <input
            type="text"
            placeholder="Search procedures..."
            className="pl-10 w-full rounded-lg border-slate-200 focus:ring-blue-500 focus:border-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
          {categories.map((cat) => (
            <button
              key={cat.id}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg whitespace-nowrap hover:bg-slate-50 transition-colors"
            >
              {cat.icon}
              <span className="text-sm font-medium text-slate-700">
                {cat.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Procedures */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProcedures.map((proc) => (
          <div
            key={proc.id}
            className="group bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-200 transition-all cursor-pointer"
          >
            <div className="flex justify-between items-start mb-4">
              <div
                className={`p-2 rounded-lg ${
                  proc.category === "safety"
                    ? "bg-emerald-50"
                    : proc.category === "operation"
                      ? "bg-blue-50"
                      : proc.category === "hr"
                        ? "bg-purple-50"
                        : "bg-red-50"
                }`}
              >
                {categories.find((c) => c.id === proc.category)?.icon}
              </div>
              <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                <ChevronRight size={20} className="text-slate-400" />
              </div>
            </div>
            <h3 className="font-semibold text-slate-900 mb-2 line-clamp-2 h-12">
              {proc.title}
            </h3>
            <div className="flex items-center gap-2 mb-4">
              <span className="px-2 py-0.5 bg-slate-100 rounded text-xs text-slate-500 font-medium capitalize">
                {proc.category}
              </span>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-slate-100 text-xs text-slate-400">
              <span className="flex items-center gap-1">
                <FileText size={12} /> {proc.readTime}
              </span>
              <span>{proc.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployeeProcedure;
