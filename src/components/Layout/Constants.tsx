import {
    CalendarCheck,
    Camera,
    CheckSquare,
    DollarSign,
    Factory,
    FileText,
    FileUp,
    HelpCircle,
    LayoutDashboard,
    Mail,
    Phone,
    Send,
    Settings,
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
                visible: ["admin", "employee", "superAdmin", "reportAdmin"],
            }
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
        ],
    },
    {
        title: "Summary",
        items: [
            {
                icon: <Mail className="w-5 h-5" />,
                label: "Uploaded Report",
                href: "/summary/uploaded-report",
                visible: ["admin", "employee", "superAdmin", "reportAdmin"],
            },
            {
                icon: <Mail className="w-5 h-5" />,
                label: "Mailed Report",
                href: "/summary/mailed-reports",
                visible: ["admin", "employee", "superAdmin", "reportAdmin"],
            },
            {
                icon: <Factory className="w-5 h-5" />,
                label: "Production",
                href: "/summary/production",
                visible: ["admin", "employee", "superAdmin", "reportAdmin"],
            },
            {
                icon: <FileUp className="w-5 h-5" />,
                label: "Material Incoming",
                href: "/summary/material-incoming",
                visible: ["admin", "employee", "superAdmin", "reportAdmin"],
            },
            {
                icon: <Truck className="w-5 h-5" />,
                label: "Material Dispatch",
                href: "/summary/material-dispatch",
                visible: ["admin", "employee", "superAdmin", "reportAdmin"],
            }
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