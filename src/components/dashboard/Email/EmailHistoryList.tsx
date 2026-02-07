import { format } from "date-fns";
import { EmailHistoryItem } from "@/context/Email/types";
import Typography from "@/components/UI/Typography";
import Table from "@/components/UI/Table";
import Chips from "@/components/UI/Chips";
import { Loader2 } from "lucide-react";

interface EmailHistoryListProps {
  history: EmailHistoryItem[];
  isLoading: boolean;
}

const EmailHistoryList = ({ history, isLoading }: EmailHistoryListProps) => {
  const columns = [
    {
      header: "To",
      accessor: "to" as keyof EmailHistoryItem,
      render: (item: EmailHistoryItem) => (
        <span className="text-sm font-medium text-slate-700">{item.to}</span>
      ),
    },
    {
      header: "Subject",
      accessor: "subject" as keyof EmailHistoryItem,
      render: (item: EmailHistoryItem) => (
        <span className="text-sm text-slate-500 truncate max-w-[150px] inline-block">
          {item.subject}
        </span>
      ),
    },
    {
      header: "Date",
      accessor: "createdAt" as keyof EmailHistoryItem,
      render: (item: EmailHistoryItem) => (
        <span className="text-xs text-slate-400">
          {format(new Date(item.createdAt), "dd MMM yyyy, HH:mm")}
        </span>
      ),
    },
    {
      header: "Status",
      accessor: "status" as keyof EmailHistoryItem,
      render: (item: EmailHistoryItem) => (
        <Chips
          label={item.status}
          colorScheme={item.status === "sent" ? "success" : "default"}
          size="sm"
          className="capitalize"
        />
      ),
    },
  ];

  if (isLoading && history.length === 0) {
    return (
      <div className="flex justify-center p-8">
        <Loader2 className="animate-spin text-slate-400" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Typography variant="h4">Sent History</Typography>
      </div>
      <Table
        data={history}
        columns={columns}
        isLoading={isLoading}
        emptyMessage="No emails sent yet"
        keyExtractor={(item) => item._id}
      />
    </div>
  );
};

export default EmailHistoryList;
