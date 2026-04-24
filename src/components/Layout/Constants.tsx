import {
  CalendarCheck,
  Camera,
  CheckSquare,
  ClipboardCheck,
  DollarSign,
  Factory,
  FileText,
  FileUp,
  HelpCircle,
  LayoutDashboard,
  Mail,
  Monitor,
  Package,
  Phone,
  Search,
  Send,
  Settings,
  ShoppingCart,
  Truck,
  Upload,
  Users,
} from "lucide-react";

export interface MenuItem {
  title: string;
  items: {
    icon: React.ReactNode;
    label: string;
    href: string;
    visible?: string[];
  }[];
}

export const menuItems: MenuItem[] = [
  {
    title: "Menu",
    items: [
      {
        icon: <LayoutDashboard className="w-5 h-5" />,
        label: "Dashboard",
        href: "/",
        visible: ["employee", "superAdmin", "reportAdmin", "hr", "quality", "manager", "maintenance"],
      },
      {
        icon: <Search className="w-5 h-5" />,
        label: "Search Employee",
        href: "/search-employee",
        visible: ["employee", "superAdmin", "reportAdmin", "hr", "quality", "manager", "maintenance"],
      },
      {
        icon: <Monitor className="w-5 h-5" />,
        label: "Monitoring",
        href: "/monitoring",
        visible: ["superAdmin", "reportAdmin", "manager", "maintenance"],
      },
    ],
  },
  {
    title: "Admin",
    items: [
      {
        icon: <Users className="w-5 h-5" />,
        label: "Employees",
        href: "/admin/employees",
        visible: ["superAdmin", "reportAdmin"],
      },
      {
        icon: <Camera className="w-5 h-5" />,
        label: "Camera Feeds",
        href: "/admin/camera-feed",
        visible: ["superAdmin", "reportAdmin"],
      },
      {
        icon: <CheckSquare className="w-5 h-5" />,
        label: "Approvals",
        href: "/admin/approvals",
        visible: ["superAdmin", "reportAdmin"],
      },
      {
        icon: <Factory className="w-5 h-5" />,
        label: "Companies",
        href: "/admin/companies",
        visible: ["superAdmin", "reportAdmin"],
      },
      {
        icon: <FileText className="w-5 h-5" />,
        label: "Part List",
        href: "/admin/part-list",
        visible: ["superAdmin", "reportAdmin"],
      },
    ],
  },
  {
    title: "Summary",
    items: [
      {
        icon: <Mail className="w-5 h-5" />,
        label: "Uploaded Report",
        href: "/summary/uploaded-report",
        visible: ["superAdmin", "reportAdmin", "hr", "quality", "manager", "maintenance"],
      },
      {
        icon: <Factory className="w-5 h-5" />,
        label: "Production",
        href: "/summary/production",
        visible: ["superAdmin", "reportAdmin", "hr", "quality", "manager", "maintenance"],
      },
      {
        icon: <ClipboardCheck className="w-5 h-5" />,
        label: "Quality Control",
        href: "/summary/quality",
        visible: ["superAdmin", "reportAdmin", "quality", "manager"],
      },
      {
        icon: <ShoppingCart className="w-5 h-5" />,
        label: "Inventory",
        href: "/summary/inventory",
        visible: ["superAdmin", "reportAdmin", "hr", "quality", "manager", "maintenance"],
      },
      {
        icon: <Package className="w-5 h-5" />,
        label: "Raw Material",
        href: "/summary/raw-material",
        visible: ["superAdmin", "reportAdmin", "hr", "quality", "manager", "maintenance"],
      },
      {
        icon: <FileUp className="w-5 h-5" />,
        label: "Company Material",
        href: "/summary/company-material",
        visible: ["superAdmin", "reportAdmin", "hr", "quality", "manager", "maintenance"],
      },
      {
        icon: <Truck className="w-5 h-5" />,
        label: "Material Dispatch",
        href: "/summary/material-dispatch",
        visible: ["superAdmin", "reportAdmin", "hr", "quality", "manager", "maintenance"],
      },
    ],
  },
  {
    title: "Employee",
    items: [
      {
        icon: <FileUp className="w-5 h-5" />,
        label: "Report Upload",
        href: "/employee/report-upload",
      },
      {
        icon: <Send className="w-5 h-5" />,
        label: "Send Email",
        href: "/employee/send-email",
      },
      {
        icon: <DollarSign className="w-5 h-5" />,
        label: "Payslip",
        href: "/employee/payslip",
      },
      {
        icon: <Upload className="w-5 h-5" />,
        label: "Upload PaySlip",
        href: "/employee/upload-payslip",
      },
      {
        icon: <CalendarCheck className="w-5 h-5" />,
        label: "Attendance",
        href: "/employee/attendance",
      },
      {
        icon: <FileText className="w-5 h-5" />,
        label: "SOP",
        href: "/employee/procedure",
      },
    ],
  },
  {
    title: "Others",
    items: [
      {
        icon: <Settings className="w-5 h-5" />,
        label: "Settings",
        href: "/settings",
      },
      {
        icon: <Phone className="w-5 h-5" />,
        label: "Contact Us",
        href: "/contact-us",
      },
      {
        icon: <HelpCircle className="w-5 h-5" />,
        label: "Help",
        href: "/help",
      },
    ],
  },
];
