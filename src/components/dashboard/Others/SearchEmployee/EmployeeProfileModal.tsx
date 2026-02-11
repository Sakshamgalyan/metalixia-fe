"use client";

import {
  User,
  Mail,
  Phone,
  Briefcase,
  MessageSquare,
  FileText,
} from "lucide-react";
import Typography from "@/components/UI/Typography";
import Card from "@/components/UI/Card";
import Modal from "@/components/UI/Modal";

interface Employee {
  _id: string;
  name: string;
  email: string;
  employeeId: string;
  post: string;
  profilePicture?: string;
  message?: string;
  mobileNo?: string;
  description?: string;
  createdOn?: string;
}

interface EmployeeProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  employee: Employee | null;
  loading: boolean;
}

const EmployeeProfileModal = ({
  isOpen,
  onClose,
  employee,
  loading,
}: EmployeeProfileModalProps) => {
  const getPostLabel = (post: string) => {
    const postMap: Record<string, string> = {
      hr: "HR",
      manager: "Manager",
      quality: "Quality",
      production: "Production",
      maintenance: "Maintenance",
      labIncharge: "Lab Incharge",
      superAdmin: "Super Admin",
      employee: "Employee",
    };
    return postMap[post] || post;
  };

  const getPostColor = (post: string) => {
    const colorMap: Record<string, string> = {
      hr: "bg-purple-100 text-purple-700",
      manager: "bg-blue-100 text-blue-700",
      quality: "bg-green-100 text-green-700",
      production: "bg-orange-100 text-orange-700",
      maintenance: "bg-yellow-100 text-yellow-700",
      labIncharge: "bg-pink-100 text-pink-700",
      superAdmin: "bg-red-100 text-red-700",
      employee: "bg-slate-100 text-slate-700",
    };
    return colorMap[post] || "bg-slate-100 text-slate-700";
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      width="xl"
      title="Employee Profile"
    >
      {loading ? (
        <div className="p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#707FDD] mx-auto"></div>
          <Typography variant="p" textColor="#64748b" className="mt-4">
            Loading profile...
          </Typography>
        </div>
      ) : employee ? (
        <div className="space-y-6">
          {/* Header with Profile Picture and Name */}
          <div className="flex items-center gap-6 pb-6 border-b border-slate-200">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-slate-100 border-4 border-slate-200 flex-shrink-0">
              {employee.profilePicture ? (
                <img
                  src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${employee.profilePicture}`}
                  alt={employee.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <User className="w-12 h-12 text-slate-400" />
                </div>
              )}
            </div>
            <div className="flex-1">
              <Typography variant="h4" className="mb-2">
                {employee.name}
              </Typography>
              <div className="flex flex-wrap gap-2">
                <span
                  className={`text-sm font-medium px-4 py-1.5 rounded-full ${getPostColor(employee.post)}`}
                >
                  {getPostLabel(employee.post)}
                </span>
                <span className="text-sm font-medium px-4 py-1.5 rounded-full bg-slate-100 text-slate-700">
                  ID: {employee.employeeId}
                </span>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <Card className="p-5 bg-gradient-to-br from-slate-50 to-white">
            <Typography variant="h6" className="mb-4 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-[#707FDD]" />
              Contact Information
            </Typography>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-slate-600 mt-0.5" />
                <div>
                  <Typography
                    variant="span"
                    textColor="#64748b"
                    className="text-xs block mb-1"
                  >
                    Email Address
                  </Typography>
                  <Typography variant="p" className="text-sm font-medium">
                    {employee.email}
                  </Typography>
                </div>
              </div>

              {employee.mobileNo && (
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-slate-600 mt-0.5" />
                  <div>
                    <Typography
                      variant="span"
                      textColor="#64748b"
                      className="text-xs block mb-1"
                    >
                      Mobile Number
                    </Typography>
                    <Typography variant="p" className="text-sm font-medium">
                      {employee.mobileNo}
                    </Typography>
                  </div>
                </div>
              )}
            </div>
          </Card>

          {/* Message/Tagline */}
          {employee.message && (
            <Card className="p-5 bg-gradient-to-br from-blue-50 to-white border-l-4 border-[#707FDD]">
              <Typography variant="h6" className="mb-3 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-[#707FDD]" />
                Description
              </Typography>
              <Typography variant="p" className="text-sm italic text-slate-700">
                "{employee.message}"
              </Typography>
            </Card>
          )}

          {/* Description/Bio */}
          {employee.description && (
            <Card className="p-5 bg-gradient-to-br from-purple-50 to-white border-l-4 border-purple-500">
              <Typography variant="h6" className="mb-3 flex items-center gap-2">
                <FileText className="w-5 h-5 text-purple-500" />
                About
              </Typography>
              <Typography
                variant="p"
                className="text-sm text-slate-700 leading-relaxed"
              >
                {employee.description}
              </Typography>
            </Card>
          )}
        </div>
      ) : null}
    </Modal>
  );
};

export default EmployeeProfileModal;
