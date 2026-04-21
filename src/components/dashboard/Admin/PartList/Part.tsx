"use client";

import { useState, useEffect, useCallback } from "react";
import { Search, Plus, Pencil, Trash2 } from "lucide-react";
import Typography from "@/components/UI/Typography";
import Button from "@/components/UI/Button";
import Input from "@/components/UI/Input";
import Table, { TableColumn } from "@/components/UI/Table";
import NoDataState from "@/components/Common/NoDataState";
import DeleteModal from "@/components/Common/DeleteModal";
import PartModal from "./PartModal";
import { usePartStateContext, usePartDispatchContext } from "@/context/admin/PartList/hooks";
import { getPartsApi, deletePartApi } from "@/context/admin/PartList/api";
import { setPage, setModal } from "@/context/admin/PartList/actions";
import { PartItem } from "@/context/admin/PartList/type";
const PartListCompt = () => {
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  
  const [deleteModalState, setDeleteModalState] = useState<{isOpen: boolean; id: string | null; name?: string}>({isOpen: false, id: null});
  const [isDeleting, setIsDeleting] = useState(false);

  const { listData, listLoading, page } = usePartStateContext();
  const dispatch = usePartDispatchContext();

  const fetchData = useCallback(
    async (p = 1, query = "") => {
      await getPartsApi(dispatch, p, 10, query);
    },
    [dispatch],
  );

  useEffect(() => {
    fetchData(page, searchQuery);
  }, [page, searchQuery, fetchData]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery !== searchInput) {
        setSearchQuery(searchInput);
        if (page !== 1) {
          dispatch(setPage(1));
        }
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchInput, searchQuery, page, dispatch]);

  const openAddModal = () => {
    dispatch(setModal({ mode: "add", selectedItem: null }));
  };

  const openEditModal = (item: PartItem) => {
    dispatch(setModal({ mode: "edit", selectedItem: item }));
  };

  const promptDelete = (item: PartItem) => {
    setDeleteModalState({ isOpen: true, id: item._id, name: item.partName });
  };

  const confirmDelete = async () => {
    if (!deleteModalState.id) return;
    setIsDeleting(true);
    try {
      await deletePartApi(dispatch, deleteModalState.id);
      fetchData(page, searchQuery);
      setDeleteModalState({ isOpen: false, id: null });
    } catch (error) {
      // Handle error implicitly
    } finally {
      setIsDeleting(false);
    }
  };

  const columns: TableColumn<PartItem>[] = [
    {
      header: "Company",
      accessor: "companyName",
      className: "font-medium text-slate-800",
    },
    {
      header: "Part Name",
      accessor: "partName",
      className: "font-semibold text-slate-800",
    },
    {
      header: "Part Number",
      accessor: "partNumber",
      className: "text-slate-600",
    },
    {
      header: "Description",
      accessor: "description",
      className: "text-slate-600",
    },
    {
      header: "Added Date",
      accessor: "createdAt",
      className: "text-slate-600",
      render: (item) => new Date(item.createdAt).toLocaleDateString()
    },
    {
      header: "Actions",
      accessor: "actions" as any,
      fixedColumn: "right",
      render: (item: PartItem) => (
        <div className="flex gap-2 justify-center">
          <Button
            variant="outline"
            size="sm"
            leftIcon={<Pencil size={16} className="text-blue-600" />}
            onClick={() => openEditModal(item)}
            className="p-1.5 min-w-0"
          />
          <Button
            variant="outline"
            size="sm"
            leftIcon={<Trash2 size={16} className="text-red-600" />}
            onClick={() => promptDelete(item)}
            className="p-1.5 min-w-0"
          />
        </div>
      ),
    },
  ];

  const safeData = Array.isArray(listData?.data) ? listData.data : [];

  return (
    <div className="space-y-6 w-[95%] mx-auto py-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <Typography variant="h3" className="text-slate-900">
            Part Configuration
          </Typography>
          <Typography variant="p" className="text-slate-500">
            Manage your parts and components inventory
          </Typography>
        </div>
        <div className="flex gap-3">
          <Button
            variant="primary"
            size="sm"
            leftIcon={<Plus size={16} />}
            onClick={openAddModal}
          >
            Add Part
          </Button>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-5">
        <div className="flex flex-col md:flex-row gap-4 mb-6 justify-between items-start md:items-center">
          <div className="w-full md:w-96">
            <Input
              placeholder="Search parts, part numbers..."
              leftIcon={<Search size={18} />}
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              fullWidth
            />
          </div>
        </div>

        {!listLoading && safeData.length === 0 ? (
          <NoDataState 
            title="No Parts Found" 
            message="There are no parts available at the moment. Click 'Add Part' to create one."
          />
        ) : (
          <Table
            columns={columns}
            data={safeData}
            isLoading={listLoading}
            keyExtractor={(item: PartItem) => item._id}
            paginationConfig={{
              currentPage: page,
              totalPages: listData?.totalPages || 1,
              totalCount: listData?.total || 0,
              onPageChange: (newPage) => dispatch(setPage(newPage)),
              itemsPerPage: 10,
            }}
            emptyMessage="No parts found."
          />
        )}
      </div>

      <PartModal onSuccess={() => fetchData(page, searchQuery)} />

      <DeleteModal
        isOpen={deleteModalState.isOpen}
        onClose={() => setDeleteModalState({ isOpen: false, id: null })}
        onConfirm={confirmDelete}
        itemName={deleteModalState.name}
        isLoading={isDeleting}
      />
    </div>
  );
};

export default PartListCompt;
