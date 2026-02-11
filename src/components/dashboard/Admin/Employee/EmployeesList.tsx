"use client";

import Button from "@/components/UI/Button";
import Table from "@/components/UI/Table";
import Typography from "@/components/UI/Typography";
import { FunnelIcon, PlusIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { deleteEmployee, getAllEmployees } from "@/ApiClient/Admin/admin";
import {
  setFilterData,
  setLoading,
  setPage,
} from "@/context/admin/EmployeeList/action";
import {
  useEmployeeListDispatchContext,
  useEmployeeListStateContext,
} from "@/context/admin/EmployeeList/hooks";
import NoDataState from "@/components/Common/NoDataState";
import FilterModal from "./FilterModal";
import { getColumns } from "./Constants";
import EmployeeModal from "./EmployeeModal";
import DeleteModal from "./DeleteModal";

const EmployeesList = () => {
  const { loading, filterData, page, filterPayload } =
    useEmployeeListStateContext();
  const dispatch = useEmployeeListDispatchContext();
  const limit = 10;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      dispatch(setLoading(true));
      try {
        const response = await getAllEmployees();
        dispatch(setFilterData(response));
      } catch (error) {
        console.error("Error fetching employees:", error);
      } finally {
        dispatch(setLoading(false));
      }
    };
    fetchEmployees();
  }, []);

  const handlePageChange = async (page: number) => {
    dispatch(setPage(page));
    try {
      const response = await getAllEmployees({ ...filterPayload, page, limit });
      dispatch(setFilterData(response));
    } catch (error) {
      console.error("Error fetching employees:", error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleAdd = () => {
    setSelectedEmployee(null);
    setIsModalOpen(true);
  };

  const handleEdit = (employee: any) => {
    setSelectedEmployee(employee);
    setIsModalOpen(true);
  };

  const handleDelete = (employee: any) => {
    setSelectedEmployee(employee);
    setIsDeleteModalOpen(true);
  };

  const columns = getColumns(handleEdit, handleDelete);

  return (
    <div className="px-4 py-6 md:px-6 md:py-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div className="flex flex-col gap-1">
          <Typography variant="h2">Employees</Typography>
          <Typography variant="p" className="text-slate-500">
            Manage your team members
          </Typography>
        </div>
        <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
          <FilterModal
            trigger={
              <Button variant="secondary" size="sm" leftIcon={<FunnelIcon />}>
                Filters
              </Button>
            }
          />
          <Button
            variant="primary"
            size="sm"
            leftIcon={<PlusIcon />}
            onClick={handleAdd}
          >
            Add Employee
          </Button>
        </div>
      </div>

      {loading ? (
        <Table
          data={[]}
          columns={columns}
          isLoading
          headerAlign="center"
          keyExtractor={(item: any) => item.id}
        />
      ) : (filterData?.data?.length ?? 0) > 0 ? (
        <Table
          data={filterData?.data || []}
          columns={columns}
          headerAlign="center"
          isLoading={loading}
          keyExtractor={(item) => item.id}
          paginationConfig={{
            totalPages: filterData?.pagination?.totalPages || 0,
            currentPage: page,
            totalCount: filterData?.pagination?.total || 0,
            onPageChange: handlePageChange,
          }}
        />
      ) : (
        <NoDataState />
      )}

      <EmployeeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        employee={selectedEmployee}
      />

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        employee={selectedEmployee}
        employeeName={selectedEmployee?.name || ""}
      />
    </div>
  );
};

export default EmployeesList;
