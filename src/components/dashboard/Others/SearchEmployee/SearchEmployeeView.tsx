"use client";

import { useState, useEffect } from "react";
import { Search, Mail } from "lucide-react";
import Typography from "@/components/UI/Typography";
import Input from "@/components/UI/Input";
import Card from "@/components/UI/Card";
import Button from "@/components/UI/Button";
import {
  searchEmployeesApi,
  getEmployeeProfileApi,
} from "@/ApiClient/Profile/profile";
import { toast } from "sonner";
import EmployeeProfileModal from "./EmployeeProfileModal";

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

const SearchEmployeeView = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null,
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loadingProfile, setLoadingProfile] = useState(false);

  const fetchEmployees = async (search: string = "", pageNum: number = 1) => {
    setLoading(true);
    try {
      const result = await searchEmployeesApi(search, pageNum, 15);

      if (Array.isArray(result)) {
        setEmployees(result);
        setTotalPages(1);
      } else if (result && result.data) {
        setEmployees(result.data || []);
        setTotalPages(result.pagination?.totalPages || 1);
      } else {
        setEmployees([]);
        setTotalPages(1);
      }

      setPage(pageNum);
    } catch (error) {
      console.error("Search failed:", error);
      toast.error("Failed to fetch employees");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleSearch = () => {
    fetchEmployees(searchTerm, 1);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleViewProfile = async (employeeId: string) => {
    setLoadingProfile(true);
    setIsModalOpen(true);
    try {
      const result = await getEmployeeProfileApi(employeeId);

      if (result && result.employee) {
        setSelectedEmployee(result.employee);
      } else if (result && result.data) {
        setSelectedEmployee(result.data);
      } else {
        setSelectedEmployee(result);
      }
    } catch (error) {
      console.error("Failed to fetch profile:", error);
      toast.error("Failed to load employee profile");
      setIsModalOpen(false);
    } finally {
      setLoadingProfile(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEmployee(null);
  };

  const getPostLabel = (post: string) => {
    const postMap: Record<string, string> = {
      hr: "HR",
      manager: "Manager",
      quality: "Quality",
      production: "Production",
      maintenance: "Maintenance",
      labIncharge: "Lab Incharge",
      Owner: "Owner", 
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
      Owner: "bg-red-100 text-red-700",
      employee: "bg-slate-100 text-slate-700",
    };
    return colorMap[post] || "bg-slate-100 text-slate-700";
  };

  return (
    <div className="p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Typography variant="h3" className="mb-2">
            Employee Directory
          </Typography>
          <Typography variant="p" textColor="#64748b" className="text-sm">
            Search and view employee profiles across the organization
          </Typography>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="flex gap-2">
            <div className="flex-1">
              <Input
                placeholder="Search by name, email, or employee ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={handleKeyPress}
                leftIcon={<Search className="w-5 h-5 text-slate-400" />}
                size="md"
              />
            </div>
            <Button
              variant="primary"
              size="md"
              onClick={handleSearch}
              isLoading={loading}
            >
              Search
            </Button>
          </div>
        </div>

        {/* Employee Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <Card key={i} className="p-4 animate-pulse">
                <div className="flex flex-col">
                  <div className="h-4 bg-slate-200 w-3/4 mb-3"></div>
                  <div className="h-3 bg-slate-200 w-full mb-2"></div>
                  <div className="h-3 bg-slate-200 w-1/2"></div>
                </div>
              </Card>
            ))}
          </div>
        ) : employees.length === 0 ? (
          <Card className="p-12 text-center">
            <Typography variant="p" textColor="#64748b">
              {searchTerm
                ? "No employees found matching your search"
                : "No employees found"}
            </Typography>
          </Card>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {employees.map((employee) => (
                <Card
                  key={employee._id}
                  className="p-4 hover:shadow-lg transition-all duration-200 cursor-pointer border border-slate-200 hover:border-[#707FDD]"
                  onClick={() => handleViewProfile(employee.employeeId)}
                >
                  <div className="flex flex-col text-left">
                    <Typography variant="h6" className="mb-2 truncate w-full">
                      {employee.name}
                    </Typography>
                    <div className="flex items-center gap-2 mb-2">
                      <Mail className="w-4 h-4 text-slate-400 flex-shrink-0" />
                      <Typography
                        variant="span"
                        textColor="#64748b"
                        className="text-sm truncate"
                      >
                        {employee.email}
                      </Typography>
                    </div>
                    {employee.description && (
                      <Typography
                        variant="p"
                        textColor="#64748b"
                        className="text-xs line-clamp-2 mb-3"
                      >
                        {employee.description}
                      </Typography>
                    )}
                    <div className="flex items-center justify-between mt-auto pt-3 border-t border-slate-100">
                      <Typography
                        variant="span"
                        textColor="#64748b"
                        className="text-xs"
                      >
                        ID: {employee.employeeId}
                      </Typography>
                      <span
                        className={`text-xs font-medium px-3 py-1 rounded-full ${getPostColor(employee.post)}`}
                      >
                        {getPostLabel(employee.post)}
                      </span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-6">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => fetchEmployees(searchTerm, page - 1)}
                  disabled={page === 1}
                >
                  Previous
                </Button>
                <Typography
                  variant="span"
                  textColor="#64748b"
                  className="text-sm"
                >
                  Page {page} of {totalPages}
                </Typography>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => fetchEmployees(searchTerm, page + 1)}
                  disabled={page === totalPages}
                >
                  Next
                </Button>
              </div>
            )}
          </>
        )}

        {/* Employee Profile Modal */}
        <EmployeeProfileModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          employee={selectedEmployee}
          loading={loadingProfile}
        />
      </div>
    </div>
  );
};

export default SearchEmployeeView;
