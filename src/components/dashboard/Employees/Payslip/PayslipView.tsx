"use client";

import { useState } from "react";
import { Download, FileText, Search, CreditCard } from "lucide-react";
import Typography from "@/components/UI/Typography";
import Button from "@/components/UI/Button";
import Input from "@/components/UI/Input";
import Table, { TableColumn } from "@/components/UI/Table";
import Chips from "@/components/UI/Chips";
import { toast } from "sonner";

// Mock Data
const MOCK_PAYSLIPS = [
  {
    id: "1",
    period: "October 2023",
    date: "2023-11-01",
    amount: "$4,500.00",
    status: "Paid",
    refId: "PAY-2023-10",
  },
  {
    id: "2",
    period: "September 2023",
    date: "2023-10-01",
    amount: "$4,500.00",
    status: "Paid",
    refId: "PAY-2023-09",
  },
  {
    id: "3",
    period: "August 2023",
    date: "2023-09-01",
    amount: "$4,500.00",
    status: "Paid",
    refId: "PAY-2023-08",
  },
  {
    id: "4",
    period: "July 2023",
    date: "2023-08-01",
    amount: "$4,500.00",
    status: "Paid",
    refId: "PAY-2023-07",
  },
  {
    id: "5",
    period: "June 2023",
    date: "2023-07-01",
    amount: "$4,200.00",
    status: "Paid",
    refId: "PAY-2023-06",
  },
];

const PayslipView = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleDownload = (item: any) => {
    toast.info(`Downloading payslip for ${item.period}...`);
    // Mock download logic
    setTimeout(() => toast.success("Download started"), 1000);
  };

  const columns: TableColumn<any>[] = [
    {
      header: "Period",
      accessor: "period",
      render: (item) => (
        <div className="flex items-center gap-3">
          <div className="p-2 bg-slate-100 rounded-lg text-slate-500">
            <FileText size={18} />
          </div>
          <div>
            <Typography variant="p" className="font-medium text-slate-900">
              {item.period}
            </Typography>
            <span className="text-xs text-slate-500">{item.refId}</span>
          </div>
        </div>
      ),
    },
    {
      header: "Payment Date",
      accessor: "date",
    },
    {
      header: "Amount",
      accessor: "amount",
      className: "font-medium text-slate-900",
    },
    {
      header: "Status",
      accessor: "status",
      render: (item) => (
        <Chips
          label={item.status}
          colorScheme="success"
          size="sm"
          variant="soft"
        />
      ),
    },
    {
      header: "Actions",
      accessor: "actions",
      render: (item) => (
        <Button
          variant="secondary"
          size="sm"
          leftIcon={<Download size={14} />}
          onClick={() => handleDownload(item)}
        >
          Download
        </Button>
      ),
    },
  ];

  const filteredData = MOCK_PAYSLIPS.filter(
    (item) =>
      item.period.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.refId.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="px-6 py-10 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div className="flex flex-col gap-1">
          <Typography variant="h2">My Payslips</Typography>
          <Typography variant="p" className="text-slate-500">
            View and download your monthly payslips
          </Typography>
        </div>

        <div className="w-full md:w-auto relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
            <Search size={18} />
          </div>
          <Input
            placeholder="Search period..."
            className="pl-10 w-full md:w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Summary Card - Optional */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-6 text-white mb-8 shadow-lg">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-white/10 rounded-xl">
            <CreditCard size={24} className="text-white" />
          </div>
          <div>
            <p className="text-slate-400 text-sm font-medium">
              Last Salary Credited
            </p>
            <Typography variant="h4" className="text-white">
              {MOCK_PAYSLIPS[0].amount}
            </Typography>
          </div>
        </div>
        <div className="flex gap-8 text-sm text-slate-400">
          <div>
            <span className="block text-slate-500 text-xs uppercase tracking-wider mb-1">
              Period
            </span>
            {MOCK_PAYSLIPS[0].period}
          </div>
          <div>
            <span className="block text-slate-500 text-xs uppercase tracking-wider mb-1">
              Date
            </span>
            {MOCK_PAYSLIPS[0].date}
          </div>
        </div>
      </div>

      {/* Payslip List */}
      <Table
        data={filteredData}
        columns={columns}
        headerAlign="left"
        keyExtractor={(item) => item.id}
      />
    </div>
  );
};

export default PayslipView;
