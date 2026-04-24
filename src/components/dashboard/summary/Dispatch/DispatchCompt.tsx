"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  Search,
  Truck,
  Package,
  Clock,
  CheckCircle,
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

interface DispatchStats {
  readyForDispatch: number;
  dispatched: number;
  dailyCounts: { date: string; count: number; totalQuantity: number }[];
}

const statusLabels: Record<string, string> = {
  ready_for_dispatch: "Ready for Dispatch",
  dispatched: "Dispatched",
};

const statusColors: Record<string, "success" | "warning" | "danger" | "default" | "primary"> = {
  ready_for_dispatch: "warning",
  dispatched: "success",
};

const DispatchCompt = () => {
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dispatchStats, setDispatchStats] = useState<DispatchStats | null>(null);
  const [page, setPage] = useState(1);
  const [listData, setListData] = useState<{ data: any[]; totalPages: number; totalCount: number } | null>(null);
  const [listLoading, setListLoading] = useState(false);

  const fetchData = useCallback(async (p = 1, query = "", status = "all") => {
    setListLoading(true);
    try {
      const params: Record<string, any> = { page: p, limit: 10 };
      if (query) params.search = query;
      if (status !== "all") params.status = status;
      const response = await ApiClient.get<any>("/material/dispatch", { params });
      setListData(response);
    } catch {
      toast.error("Failed to fetch dispatch items");
    } finally {
      setListLoading(false);
    }
  }, []);

  const fetchStats = useCallback(async () => {
    try {
      const resp = await ApiClient.get<DispatchStats>("/material/dispatch/stats");
      setDispatchStats(resp);
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    fetchData(page, searchQuery, statusFilter);
  }, [page, searchQuery, statusFilter, fetchData]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  const debouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        setSearchQuery(value);
        setPage(1);
      }, 500),
    [],
  );

  useEffect(() => () => debouncedSearch.cancel(), [debouncedSearch]);

  const handleMarkDispatched = async (id: string) => {
    try {
      await updateMaterialStatusApi("company", id, "dispatched");
      fetchData(page, searchQuery, statusFilter);
      fetchStats();
    } catch { /* handled */ }
  };

  const formatDate = (date: string | null) => {
    if (!date) return "—";
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const columns: TableColumn<any>[] = [
    {
      header: "Part",
      accessor: "partName",
      headerClassName: "text-left",
      className: "text-left",
      render: (row: any) => (
        <div className="flex flex-col">
          <span className="font-semibold text-slate-900">
            {row.partNumber} — {row.partName}
          </span>
          <span className="text-xs text-slate-500">{row.companyName}</span>
        </div>
      ),
    },
    {
      header: "Quantity",
      accessor: "quantity",
      render: (row: any) => (
        <span className="font-medium text-slate-700">
          {row.quantity} {row.unit}
        </span>
      ),
    },
    {
      header: "Location",
      accessor: "inventoryLocation",
      className: "text-slate-600",
    },
    {
      header: "Status",
      accessor: "status",
      render: (row: any) => (
        <Chips
          colorScheme={statusColors[row.status] || "default"}
          variant="soft"
          label={statusLabels[row.status] || row.status}
          size="sm"
        />
      ),
    },
    {
      header: "Updated",
      accessor: "updatedAt",
      render: (row: any) => (
        <span className="text-sm text-slate-600">{formatDate(row.updatedAt)}</span>
      ),
    },
    {
      header: "Actions",
      accessor: "_id",
      fixedColumn: "right",
      render: (row: any) =>
        row.status === "ready_for_dispatch" ? (
          <Button
            size="sm"
            bgColor="#059669"
            textColor="#fff"
            leftIcon={<Truck size={14} />}
            onClick={() => handleMarkDispatched(row._id)}
          >
            Mark Dispatched
          </Button>
        ) : (
          <span className="flex items-center gap-1 text-xs text-emerald-600 font-semibold">
            <CheckCircle size={14} /> Delivered
          </span>
        ),
    },
  ];

  const stats = [
    {
      label: "Ready for Dispatch",
      value: dispatchStats?.readyForDispatch ?? 0,
      icon: <Package size={20} className="text-amber-500" />,
      color: "bg-amber-50",
    },
    {
      label: "Dispatched",
      value: dispatchStats?.dispatched ?? 0,
      icon: <Truck size={20} className="text-emerald-500" />,
      color: "bg-emerald-50",
    },
    {
      label: "Today Dispatched",
      value: dispatchStats?.dailyCounts?.[6]?.count ?? 0,
      icon: <Send size={20} className="text-blue-500" />,
      color: "bg-blue-50",
    },
  ];

  const chartData = dispatchStats?.dailyCounts?.map((d) => d.count) || [];
  const chartLabels = dispatchStats?.dailyCounts?.map((d) => {
    const date = new Date(d.date);
    return date.toLocaleDateString("en-IN", { weekday: "short" });
  }) || [];

  return (
    <div className="space-y-6 w-[95%] mx-auto py-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <Typography variant="h3" className="text-slate-900 flex items-center gap-3">
            <Truck size={28} className="text-slate-700" /> Material Dispatch
          </Typography>
          <Typography variant="p" className="text-slate-500">
            Manage outgoing shipments and track delivery status
          </Typography>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat, i) => (
          <Card key={i} padding="md" className="border-slate-200">
            <div className="flex items-start justify-between">
              <div>
                <Typography variant="small" className="font-medium text-slate-500">
                  {stat.label}
                </Typography>
                <Typography variant="h4" className="text-slate-900 mt-2">
                  {stat.value}
                </Typography>
              </div>
              <div className={`p-2.5 rounded-lg ${stat.color}`}>{stat.icon}</div>
            </div>
          </Card>
        ))}
      </div>

      {/* Chart */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <Typography variant="h5">Dispatch Volume (Last 7 Days)</Typography>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-600 to-blue-400" />
            <span className="text-xs text-slate-500">Items Dispatched</span>
          </div>
        </div>
        <Chart
          data={chartData.length ? chartData : [0, 0, 0, 0, 0, 0, 0]}
          height={220}
          gradientFrom="from-blue-600"
          gradientTo="to-blue-400"
          labelColor="text-blue-400"
          labels={chartLabels.length ? chartLabels : ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]}
          showXAxis
        />
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-5">
        <div className="flex flex-col md:flex-row gap-4 mb-6 justify-between items-start md:items-center">
          <div className="w-full md:w-96">
            <Input
              placeholder="Search dispatch items..."
              leftIcon={<Search size={18} />}
              value={searchInput}
              onChange={(e) => {
                setSearchInput(e.target.value);
                debouncedSearch(e.target.value);
              }}
              fullWidth
            />
          </div>
          <div className="w-44">
            <Dropdown
              options={[
                { label: "All Status", value: "all" },
                { label: "Ready", value: "ready_for_dispatch" },
                { label: "Dispatched", value: "dispatched" },
              ]}
              value={statusFilter}
              onChange={(val) => {
                setStatusFilter(val as string);
                setPage(1);
              }}
            />
          </div>
        </div>

        <SummaryTableWrapper
          data={listData?.data || []}
          columns={columns}
          isLoading={listLoading}
          keyExtractor={(item: any) => item._id}
          searchQuery={searchQuery}
          paginationConfig={{
            currentPage: page,
            totalPages: listData?.totalPages || 1,
            totalCount: listData?.totalCount || 0,
            onPageChange: (newPage) => setPage(newPage),
            itemsPerPage: 10,
          }}
          emptyTitle="No Dispatch Items"
          emptyMessage="Materials will appear here after passing quality check."
        />
      </div>
    </div>
  );
};

export default DispatchCompt;
