"use client";

import Button from "@/components/UI/Button";
import Table from "@/components/UI/Table";
import Typography from "@/components/UI/Typography";
import { FunnelIcon, PlusIcon } from "lucide-react";
import { useEffect } from "react";
import FilterModal from "./FilterModal";
import { getAllEmployees } from "@/ApiClient/Admin/admin";
import { setFilterData, setLoading, setPage } from "@/context/admin/EmployeeList/action";
import { useEmployeeListDispatchContext, useEmployeeListStateContext } from "@/context/admin/EmployeeList/hooks";
import { columns } from "./Constants";
import NoDataState from "@/components/Common/NoDataState";

const EmployeesList = () => {
    const { loading, filterData } = useEmployeeListStateContext();
    const dispatch = useEmployeeListDispatchContext();

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

    const handlePageChange = (page: number) => {
        dispatch(setPage(page));
    };

    return (
        <div className="px-6 py-10">
            <div className="flex justify-between items-center mb-6">
                <div className="flex flex-col gap-1">
                    <Typography variant="h2">Employees</Typography>
                    <Typography variant="p" className="text-slate-500">Manage your team members</Typography>
                </div>
                <div className="flex gap-4">
                    <FilterModal
                        trigger={
                            <Button
                                variant="secondary"
                                size="sm"
                                leftIcon={<FunnelIcon />}
                            >
                                Filters
                            </Button>
                        }
                    />
                    <Button variant="primary" size="sm" leftIcon={<PlusIcon />}>
                        Add Employee
                    </Button>
                </div>
            </div>

            {loading ? (
                <Table
                    data={[]}
                    columns={columns}
                    isLoading
                    keyExtractor={(item: any) => item.id}
                />
            ) : (
                (filterData?.data?.length ?? 0) > 0 ? (
                    <Table
                        data={filterData?.data || []}
                        columns={columns}
                        isLoading={loading}
                        keyExtractor={(item) => item.id}
                        paginationConfig={{
                            totalPages: filterData?.pagination?.totalPages || 0,
                            currentPage: filterData?.pagination?.page || 1,
                            totalCount: filterData?.pagination?.total || 0,
                            onPageChange: handlePageChange
                        }}
                    />
                ) : (
                    <NoDataState />
                ))}
        </div>
    );
};

export default EmployeesList;