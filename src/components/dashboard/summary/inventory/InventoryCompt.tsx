"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  Search,
  Package,
  Factory,
  Truck,
  AlertTriangle,
  ArrowUpRight,
  Send,
} from "lucide-react";
import Typography from "@/components/UI/Typography";
import Button from "@/components/UI/Button";
import Input from "@/components/UI/Input";
import Dropdown from "@/components/UI/DropDown";
import Chips from "@/components/UI/Chips";
import Card from "@/components/UI/Card";
import Chart from "@/components/UI/Chart";
import SummaryTableWrapper from "@/components/Common/SummaryTableWrapper";
import { TableColumn } from "@/components/UI/Table";
import debounce from "lodash/debounce";
import {
  useInventoryStateContext,
  useInventoryDispatchContext,
} from "@/context/Summary/Inventory/hooks";
import {
  getInventoryItemsApi,
  getInventoryStatsApi,
  updateMaterialStatusApi,
} from "@/context/Summary/Inventory/api";
import { setInventoryPage } from "@/context/Summary/Inventory/actions";
import { InventoryItem } from "@/context/Summary/Inventory/type";
import ApiClient from "@/lib/apiClient";
import { toast } from "sonner";

const statusColors: Record<string, "success" | "warning" | "danger" | "default" | "primary"> = {
  received: "default",
  in_inventory: "primary",
  in_production: "warning",
  quality_check: "warning",
  ready_for_dispatch: "success",
  dispatched: "success",
  consumed: "danger",
};

const statusLabels: Record<string, string> = {
  received: "Received",
  in_inventory: "In Inventory",
  in_production: "In Production",
  quality_check: "Quality Check",
  ready_for_dispatch: "Ready",
  dispatched: "Dispatched",
  consumed: "Consumed",
};

const InventoryCompt = () => {
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const { listData, listLoading, statsData, statsLoading, page } =
    useInventoryStateContext();
  const dispatch = useInventoryDispatchContext();

  const fetchData = useCallback(
    async (p = 1, query = "", type = "all", status = "all") => {
      await getInventoryItemsApi(
        dispatch,
        p,
        10,
        query,
        type === "all" ? undefined : type,
        status === "all" ? undefined : status,
      );
    },
    [dispatch],
  );

  useEffect(() => {
    fetchData(page, searchQuery, typeFilter, statusFilter);
  }, [page, searchQuery, typeFilter, statusFilter, fetchData]);

  useEffect(() => {
    getInventoryStatsApi(dispatch);
  }, [dispatch]);

  const debouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        setSearchQuery(value);
        dispatch(setInventoryPage(1));
      }, 500),
    [dispatch],
  );

  useEffect(() => {
    return () => debouncedSearch.cancel();
  }, [debouncedSearch]);

  const handleSearchChange = (value: string) => {
    setSearchInput(value);
    debouncedSearch(value);
  };

  const handleSendToProduction = async (item: InventoryItem) => {
    try {
      // 1. Create a production order
      await ApiClient.post("/production", {
        companyMaterialId: item.type === "company" ? item._id : undefined,
        rawMaterialId: item.type === "raw" ? item._id : undefined,
        companyName: item.companyName,
        partName: item.partName,
        partNumber: item.partNumber,
        quantity: item.quantity,
        unit: item.unit,
        priority: "normal",
        lineNumber: 1,
      });

      // 2. Update the material status to in_production
      await updateMaterialStatusApi(item.type, item._id, "in_production");
      
      toast.success(`Batch for ${item.partName} created and sent to production line 1`);
      
      fetchData(page, searchQuery, typeFilter, statusFilter);
      getInventoryStatsApi(dispatch);
    } catch (error: any) {
      toast.error("Failed to send to production", {
        description: error?.response?.data?.message || "Something went wrong"
      });
    }
  };

  const formatDate = (date: string | null) => {
    if (!date) return "—";
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const columns: TableColumn<InventoryItem>[] = [
    {
      header: "Material",
      accessor: "name",
      headerClassName: "text-left",
      className: "text-left",
      render: (row) => (
        <div className="flex flex-col">
          <span className="font-semibold text-slate-900">{row.name}</span>
          <span className="text-xs text-slate-500">{row.companyName}</span>
        </div>
      ),
    },
    {
      header: "Type",
      accessor: "type",
      render: (row) => (
        <Chips
          colorScheme={row.type === "company" ? "primary" : "default"}
          variant="soft"
          label={row.type === "company" ? "Company" : "Raw"}
          size="sm"
        />
      ),
    },
    {
      header: "Quantity",
      accessor: "quantity",
      render: (row) => (
        <span className="font-medium text-slate-700">
          {row.quantity} {row.unit}
        </span>
      ),
    },
    {
      header: "Location",
      accessor: "location",
      className: "text-slate-600",
    },
    {
      header: "Status",
      accessor: "status",
      render: (row) => (
        <Chips
          colorScheme={statusColors[row.status] || "default"}
          variant="soft"
          label={statusLabels[row.status] || row.status}
          size="sm"
        />
      ),
    },
    {
      header: "Received",
      accessor: "receivedOn",
      render: (row) => (
        <span className="text-slate-600 text-sm">{formatDate(row.receivedOn)}</span>
      ),
    },
    {
      header: "Actions",
      accessor: "_id",
      fixedColumn: "right",
      render: (row) =>
        row.status === "received" || row.status === "in_inventory" ? (
          <Button
            size="sm"
            bgColor="#7c3aed"
            textColor="#ffffff"
            leftIcon={<Send size={14} />}
            onClick={() => handleSendToProduction(row)}
          >
            To Production
          </Button>
        ) : null,
    },
  ];

  const safeData = listData?.data || [];

  // Stats cards
  const stats = [
    {
      label: "Total Items",
      value: statsData?.totalItems ?? 0,
      icon: <Package className="text-blue-500" size={20} />,
      color: "bg-blue-50",
    },
    {
      label: "Company Materials",
      value: statsData?.totalCompany ?? 0,
      icon: <Factory className="text-violet-500" size={20} />,
      color: "bg-violet-50",
    },
    {
      label: "Raw Materials",
      value: statsData?.totalRaw ?? 0,
      icon: <Package className="text-emerald-500" size={20} />,
      color: "bg-emerald-50",
    },
    {
      label: "In Production",
      value: statsData?.statusMap?.in_production ?? 0,
      icon: <AlertTriangle className="text-orange-500" size={20} />,
      color: "bg-orange-50",
    },
  ];

  // Chart data
  const chartData = statsData?.dailyCounts?.map((d) => d.company + d.raw) || [];
  const chartLabels = statsData?.dailyCounts?.map((d) => {
    const date = new Date(d.date);
    return date.toLocaleDateString("en-IN", { weekday: "short" });
  }) || [];

  return (
    <div className="space-y-6 w-[95%] mx-auto py-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <Typography variant="h3" className="text-slate-900">
            Inventory Management
          </Typography>
          <Typography variant="p" className="text-slate-500">
            Real-time view of company & raw materials across the production pipeline
          </Typography>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} padding="md" className="border-slate-200">
            <div className="flex items-start justify-between">
              <div>
                <Typography variant="small" className="font-medium text-slate-500">
                  {stat.label}
                </Typography>
                <div className="mt-2 flex items-baseline gap-2">
                  <Typography variant="h4" className="text-slate-900">
                    {stat.value}
                  </Typography>
                </div>
              </div>
              <div className={`p-2.5 rounded-lg ${stat.color}`}>{stat.icon}</div>
            </div>
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Intake Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <Typography variant="h5">Daily Intake (Last 7 Days)</Typography>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-gradient-to-r from-violet-600 to-violet-400" />
              <span className="text-xs text-slate-500">Materials Received</span>
            </div>
          </div>
          <Chart
            data={chartData.length ? chartData : [0, 0, 0, 0, 0, 0, 0]}
            height={240}
            gradientFrom="from-violet-600"
            gradientTo="to-violet-400"
            labelColor="text-violet-400"
            labels={chartLabels.length ? chartLabels : ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]}
            showXAxis
          />
        </div>

        {/* Status Distribution */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <Typography variant="h5" className="mb-4">Status Distribution</Typography>
          <div className="space-y-3">
            {Object.entries(statsData?.statusMap || {}).map(([status, count]) => {
              const total = statsData?.totalItems || 1;
              const pct = Math.round((count / total) * 100);
              return (
                <div key={status}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-600 capitalize">{statusLabels[status] || status}</span>
                    <span className="font-semibold text-slate-800">{count}</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div
                      className="h-2 rounded-full bg-gradient-to-r from-violet-500 to-blue-500 transition-all"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
            {!statsData?.statusMap || Object.keys(statsData.statusMap).length === 0 ? (
              <p className="text-sm text-slate-400 text-center py-6">No data yet</p>
            ) : null}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-5">
        <div className="flex flex-col md:flex-row gap-4 mb-6 justify-between items-start md:items-center">
          <div className="w-full md:w-96">
            <Input
              placeholder="Search materials, companies..."
              leftIcon={<Search size={18} />}
              value={searchInput}
              onChange={(e) => handleSearchChange(e.target.value)}
              fullWidth
            />
          </div>
          <div className="flex gap-3">
            <div className="w-40">
              <Dropdown
                options={[
                  { label: "All Types", value: "all" },
                  { label: "Company Material", value: "company" },
                  { label: "Raw Material", value: "raw" },
                ]}
                value={typeFilter}
                onChange={(val) => {
                  setTypeFilter(val as string);
                  dispatch(setInventoryPage(1));
                }}
              />
            </div>
            <div className="w-40">
              <Dropdown
                options={[
                  { label: "All Status", value: "all" },
                  { label: "Received", value: "received" },
                  { label: "In Production", value: "in_production" },
                  { label: "Quality Check", value: "quality_check" },
                  { label: "Ready", value: "ready_for_dispatch" },
                ]}
                value={statusFilter}
                onChange={(val) => {
                  setStatusFilter(val as string);
                  dispatch(setInventoryPage(1));
                }}
              />
            </div>
          </div>
        </div>

        <SummaryTableWrapper
          data={safeData}
          columns={columns}
          isLoading={listLoading}
          keyExtractor={(item) => item._id}
          searchQuery={searchQuery}
          paginationConfig={{
            currentPage: page,
            totalPages: listData?.totalPages || 1,
            totalCount: listData?.totalCount || 0,
            onPageChange: (newPage) => dispatch(setInventoryPage(newPage)),
            itemsPerPage: 10,
          }}
          emptyTitle="No Inventory Items Found"
          emptyMessage="Materials will appear here once they are received via Company Material or Raw Material pages."
        />
      </div>
    </div>
  );
};

export default InventoryCompt;
