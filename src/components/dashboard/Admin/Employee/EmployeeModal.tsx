import { useEffect, useState } from "react";
import Modal from "@/components/UI/Modal";
import Button from "@/components/UI/Button";
import Input from "@/components/UI/Input";
import { AllPosts, AllRoles } from "@/lib/constants";
import Dropdown from "@/components/UI/DropDown";
import { toast } from "sonner";
import {
  addEmployee,
  getAllEmployees,
  updateEmployee,
} from "@/ApiClient/Admin/admin";
import {
  useEmployeeListDispatchContext,
  useEmployeeListStateContext,
} from "@/context/admin/EmployeeList/hooks";
import { setFilterData } from "@/context/admin/EmployeeList/action";
import { limit } from "./Constants";

interface EmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  employee: any | null;
}

const EmployeeModal = ({ isOpen, onClose, employee }: EmployeeModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobileNo: "",
    role: "",
    post: "",
    password: "",
    confirmPassword: "",
  });

  const dispatch = useEmployeeListDispatchContext();
  const { filterPayload, page } = useEmployeeListStateContext();

  useEffect(() => {
    if (isOpen) {
      if (employee) {
        setFormData({
          name: employee.name || "",
          email: employee.email || "",
          mobileNo: employee.mobileNo || "",
          role: employee.role || "",
          post: employee.post || "",
          password: "",
          confirmPassword: "",
        });
      } else {
        setFormData({
          name: "",
          email: "",
          mobileNo: "",
          role: "",
          post: "",
          password: "",
          confirmPassword: "",
        });
      }
    }
  }, [isOpen, employee]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDropdownChange = (name: string, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveEmployee = async (data: any) => {
    try {
      if (isEditMode) {
        const { password, confirmPassword, ...updatedData } = data;
        await updateEmployee(updatedData);
      } else {
        await addEmployee(data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      const payload = {
        ...filterPayload,
        page,
        limit,
      };
      const response = await getAllEmployees(payload);
      dispatch(setFilterData(response));
      onClose();
    }
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.email || !formData.role) {
      toast.error("Please fill in all required fields (Name, Email, Role)");
      return;
    }

    if (!employee && (!formData.password || !formData.confirmPassword)) {
      toast.error("Password is required for new employees");
      return;
    }

    if (!employee && formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    const data = {
      ...formData,
      id: employee?.id,
      employeeId: employee?.employeeId,
    };
    handleSaveEmployee(data);
  };

  const isEditMode = !!employee;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditMode ? "Edit Employee" : "Add New Employee"}
      width="lg"
      footer={
        <>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            {isEditMode ? "Update Employee" : "Create Employee"}
          </Button>
        </>
      }
    >
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Employee Name"
            isDisabled={isEditMode}
          />
          <Input
            label="Email Address"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="mail@metlixia.com"
            required
            isDisabled={!!employee?.email}
          />
          <Input
            label="Mobile Number"
            name="mobileNo"
            value={formData.mobileNo}
            onChange={handleChange}
            placeholder="1234567890"
            isDisabled={!!employee?.mobileNo}
          />

          <div className="space-y-1">
            <Dropdown
              label="Role"
              placeholder="Select Role"
              options={Object.values(AllRoles).map((r) => ({
                label: r,
                value: r,
              }))}
              value={formData.role ? [formData.role] : []}
              onChange={(val) => handleDropdownChange("role", val)}
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-700">Post</label>
          <Dropdown
            placeholder="Select Post"
            options={Object.values(AllPosts).map((p) => ({
              label: p,
              value: p,
            }))}
            value={formData.post ? [formData.post] : []}
            onChange={(val) => handleDropdownChange("post", val)}
          />
        </div>

        {!isEditMode && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
            <Input
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              required
            />
            <Input
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm password"
              required
            />
          </div>
        )}
      </div>
    </Modal>
  );
};

export default EmployeeModal;
