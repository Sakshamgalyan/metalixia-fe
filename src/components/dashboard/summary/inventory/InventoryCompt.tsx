"use client";

import React, { useState } from "react";
import {
  Search,
  Plus,
  Filter,
  MoreVertical,
  Package,
  AlertTriangle,
  DollarSign,
  Archive,
  Edit,
  Trash2,
  Eye,
} from "lucide-react";
import Typography from "@/components/UI/Typography";
import Button from "@/components/UI/Button";
import Input from "@/components/UI/Input";
import Dropdown from "@/components/UI/DropDown";
import Table, { TableColumn } from "@/components/UI/Table";
import Card from "@/components/UI/Card";
import Chips from "@/components/UI/Chips";

// Mock Data Interface
interface InventoryItem {
  id: string;
  name: string;
  sku: string;
  category: string;
  stock: number;
  minStock: number;
  price: number;
  status: "In Stock" | "Low Stock" | "Out of Stock";
  lastUpdated: string;
}

// Mock Data
const MOCK_INVENTORY: InventoryItem[] = [
  {
    id: "1",
    name: "Steel Sheet 10mm",
    sku: "MTL-ST-001",
    category: "Raw Materials",
    stock: 1250,
    minStock: 200,
    price: 45.0,
    status: "In Stock",
    lastUpdated: "2024-02-15",
  },
  {
    id: "2",
    name: "Aluminum Rod 5mm",
    sku: "MTL-AL-045",
    category: "Raw Materials",
    stock: 85,
    minStock: 100,
    price: 12.5,
    status: "Low Stock",
    lastUpdated: "2024-02-14",
  },
  {
    id: "3",
    name: "Industrial Bearing X200",
    sku: "PRT-BR-200",
    category: "Components",
    stock: 0,
    minStock: 50,
    price: 89.99,
    status: "Out of Stock",
    lastUpdated: "2024-02-10",
  },
  {
    id: "4",
    name: "Copper Wire Spool",
    sku: "MTL-CU-099",
    category: "Raw Materials",
    stock: 500,
    minStock: 150,
    price: 210.0,
    status: "In Stock",
    lastUpdated: "2024-02-16",
  },
  {
    id: "5",
    name: "Safety Gloves (L)",
    sku: "SFT-GL-003",
    category: "Safety Gear",
    stock: 320,
    minStock: 100,
    price: 5.5,
    status: "In Stock",
    lastUpdated: "2024-02-01",
  },
  {
    id: "6",
    name: "Welding Rods Pack",
    sku: "CNS-WL-012",
    category: "Consumables",
    stock: 45,
    minStock: 60,
    price: 34.0,
    status: "Low Stock",
    lastUpdated: "2024-02-12",
  },
  {
    id: "7",
    name: "Hydraulic Pump M4",
    sku: "MCH-HP-004",
    category: "Machinery",
    stock: 12,
    minStock: 5,
    price: 1250.0,
    status: "In Stock",
    lastUpdated: "2024-01-28",
  },
];

const InventoryCompt = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  // Filter Data
  const filteredData = MOCK_INVENTORY.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      categoryFilter === "All" || item.category === categoryFilter;
    const matchesStatus =
      statusFilter === "All" || item.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Table Columns
  const columns: TableColumn<InventoryItem>[] = [
    {
      header: "Product Name",
      accessor: "name",
      className: "text-left font-medium text-slate-800",
      render: (row) => (
        <div className="flex flex-col text-left">
          <span className="font-semibold text-slate-900">{row.name}</span>
          <span className="text-xs text-slate-500">{row.sku}</span>
        </div>
      ),
    },
    {
      header: "Category",
      accessor: "category",
      className: "text-slate-600",
    },
    {
      header: "Stock Level",
      accessor: "stock",
      render: (row) => (
        <div className="flex flex-col items-center">
          <span
            className={`font-bold ${row.stock <= row.minStock ? "text-red-600" : "text-slate-700"}`}
          >
            {row.stock}
          </span>
          <span className="text-[10px] text-slate-400">
            Min: {row.minStock}
          </span>
        </div>
      ),
    },
    {
      header: "Price",
      accessor: "price",
      render: (row) => (
        <span className="font-medium text-slate-700">
          ${row.price.toLocaleString("en-US")}
        </span>
      ),
    },
    {
      header: "Status",
      accessor: "status",
      render: (row) => {
        let colorScheme: "success" | "warning" | "danger" | "default" =
          "default";
        if (row.status === "In Stock") colorScheme = "success";
        if (row.status === "Low Stock") colorScheme = "warning";
        if (row.status === "Out of Stock") colorScheme = "danger";

        return (
          <Chips
            colorScheme={colorScheme}
            variant="soft"
            label={row.status}
            size="sm"
          />
        );
      },
    },
    {
      header: "Actions",
      accessor: "id",
      render: (row) => (
        <div className="flex items-center justify-center gap-2">
          <Button variant="ghost" size="xs" className="hover:text-blue-600">
            <Eye size={16} />
          </Button>
          <Button variant="ghost" size="xs" className="hover:text-slate-900">
            <Edit size={16} />
          </Button>
          <Button variant="ghost" size="xs" className="hover:text-red-600">
            <Trash2 size={16} />
          </Button>
        </div>
      ),
    },
  ];

  // Stats Data
  const stats = [
    {
      label: "Total Products",
      value: MOCK_INVENTORY.length,
      icon: <Package className="text-blue-500" />,
      change: "+12%",
      color: "bg-blue-50",
    },
    {
      label: "Low Stock",
      value: MOCK_INVENTORY.filter((i) => i.status === "Low Stock").length,
      icon: <AlertTriangle className="text-orange-500" />,
      change: "-2",
      color: "bg-orange-50",
    },
    {
      label: "Out of Stock",
      value: MOCK_INVENTORY.filter((i) => i.status === "Out of Stock").length,
      icon: <Archive className="text-red-500" />,
      change: "+1",
      color: "bg-red-50",
    },
    {
      label: "Total Value",
      value: `$${MOCK_INVENTORY.reduce(
        (acc, item) => acc + item.stock * item.price,
        0,
      ).toLocaleString("en-US", { maximumFractionDigits: 2 })}`,
      icon: <DollarSign className="text-emerald-500" />,
      change: "+8.5%",
      color: "bg-emerald-50",
    },
  ];

  return (
    <div className="space-y-6 w-[95%] mx-auto py-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <Typography variant="h3" className="text-slate-900">
            Inventory Management
          </Typography>
          <Typography variant="p" className="text-slate-500">
            Track and manage your products and stock levels
          </Typography>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm" leftIcon={<Archive size={16} />}>
            Export
          </Button>
          <Button variant="primary" size="sm" leftIcon={<Plus size={16} />}>
            Add Product
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} padding="md" className="border-slate-200">
            <div className="flex items-start justify-between">
              <div>
                <Typography
                  variant="small"
                  className="font-medium text-slate-500"
                >
                  {stat.label}
                </Typography>
                <div className="mt-2 flex items-baseline gap-2">
                  <Typography variant="h4" className="text-slate-900">
                    {stat.value}
                  </Typography>
                </div>
              </div>
              <div className={`p-2 rounded-lg ${stat.color}`}>{stat.icon}</div>
            </div>
          </Card>
        ))}
      </div>

      {/* Controls & Table Component */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-5">
        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6 justify-between items-start md:items-center">
          <div className="w-full md:w-96">
            <Input
              placeholder="Search products by name or SKU..."
              leftIcon={<Search size={18} />}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              fullWidth
            />
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <div className="w-40">
              <Dropdown
                options={[
                  { label: "All Categories", value: "All" },
                  { label: "Raw Materials", value: "Raw Materials" },
                  { label: "Components", value: "Components" },
                  { label: "Safety Gear", value: "Safety Gear" },
                  { label: "Consumables", value: "Consumables" },
                  { label: "Machinery", value: "Machinery" },
                ]}
                value={categoryFilter}
                onChange={(val) => setCategoryFilter(val as string)}
              />
            </div>
            <div className="w-40">
              <Dropdown
                options={[
                  { label: "All Status", value: "All" },
                  { label: "In Stock", value: "In Stock" },
                  { label: "Low Stock", value: "Low Stock" },
                  { label: "Out of Stock", value: "Out of Stock" },
                ]}
                value={statusFilter}
                onChange={(val) => setStatusFilter(val as string)}
              />
            </div>
          </div>
        </div>

        {/* Table */}
        <Table
          data={filteredData}
          columns={columns}
          headerAlign="left"
          keyExtractor={(item) => item.id}
          paginationConfig={{
            currentPage: 1,
            totalPages: 1,
            totalCount: filteredData.length,
            onPageChange: () => {},
            itemsPerPage: 10,
          }}
          emptyMessage="No inventory items found."
        />
      </div>
    </div>
  );
};

export default InventoryCompt;
