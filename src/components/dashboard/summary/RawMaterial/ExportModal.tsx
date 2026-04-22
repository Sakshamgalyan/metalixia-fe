"use client";

import React, { useState } from "react";
import Modal from "@/components/UI/Modal";
import Button from "@/components/UI/Button";
import Typography from "@/components/UI/Typography";
import { FileDown, FileSpreadsheet, AlertCircle } from "lucide-react";
import {
    useRawMaterialStateContext,
    useRawMaterialDispatchContext,
} from "@/context/Summary/RawMaterial/hooks";
import { setModal } from "@/context/Summary/RawMaterial/actions";
import { useAppSelector } from "@/store/hooks";

const ExportModal = () => {
    const { modalState, listData } = useRawMaterialStateContext();
    const dispatch = useRawMaterialDispatchContext();
    const [exporting, setExporting] = useState(false);
    const { user } = useAppSelector((state) => state.auth);
    const isSuperAdmin = user?.role === "superAdmin";

    const isOpen = modalState.isOpen && modalState.type === "export";

    const handleClose = () => {
        dispatch(setModal({ isOpen: false, type: null }));
    };

    const handleExportCSV = () => {
        if (!listData?.data || listData.data.length === 0) return;

        setExporting(true);
        try {
            const data = listData.data;
            const headers = [
                "Material Name", 
                "Source", 
                "Quantity", 
                "Unit", 
                ...(isSuperAdmin ? ["Price (₹)"] : []),
                "Received At", 
                "Expected On", 
                "Received By"
            ];
            
            const csvRows = [
                headers.join(","),
                ...data.map(item => [
                    `"${item.materialName}"`,
                    `"${item.source}"`,
                    item.quantity,
                    `"${item.unit}"`,
                    ...(isSuperAdmin ? [item.price] : []),
                    `"${new Date(item.receivedAt).toLocaleString()}"`,
                    `"${new Date(item.expectedOn).toLocaleString()}"`,
                    `"${item.receivedBy}"`
                ].join(","))
            ];

            const csvContent = "data:text/csv;charset=utf-8," + csvRows.join("\n");
            const encodedUri = encodeURI(csvContent);
            const link = document.createElement("a");
            link.setAttribute("href", encodedUri);
            link.setAttribute("download", `RawMaterials_Export_${new Date().toLocaleDateString()}.csv`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            handleClose();
        } catch (error) {
            console.error("Export failed", error);
        } finally {
            setExporting(false);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={handleClose}
            title="Export Data"
            width="md"
        >
            <div className="space-y-6 py-2">
                <div className="flex items-start gap-4 p-4 bg-blue-50 border border-blue-100 rounded-lg text-blue-800">
                    <AlertCircle className="w-5 h-5 mt-0.5" />
                    <div>
                        <Typography variant="p" className="text-sm font-medium">
                            Export Configuration
                        </Typography>
                        <Typography variant="p" className="text-xs text-blue-600 mt-1">
                            This will export the currently loaded {listData?.data.length || 0} entries into your selected format.
                        </Typography>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-3">
                    <button
                        onClick={handleExportCSV}
                        disabled={!listData?.data.length || exporting}
                        className="group flex items-center justify-between p-4 bg-white border border-slate-200 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-all text-left"
                    >
                        <div className="flex items-center gap-4">
                            <div className="p-2 bg-green-100 text-green-600 rounded-lg group-hover:bg-green-200">
                                <FileSpreadsheet className="w-6 h-6" />
                            </div>
                            <div>
                                <Typography variant="p" className="font-semibold text-slate-800">
                                    CSV Document
                                </Typography>
                                <Typography variant="p" className="text-xs text-slate-500">
                                    Export as comma separated values (.csv)
                                </Typography>
                            </div>
                        </div>
                        <FileDown className="w-5 h-5 text-slate-400 group-hover:text-blue-500" />
                    </button>
                    
                    <button
                        disabled
                        className="group flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-xl opacity-60 cursor-not-allowed text-left"
                    >
                        <div className="flex items-center gap-4">
                            <div className="p-2 bg-slate-200 text-slate-500 rounded-lg">
                                <FileDown className="w-6 h-6" />
                            </div>
                            <div>
                                <Typography variant="p" className="font-semibold text-slate-400">
                                    PDF Document
                                </Typography>
                                <Typography variant="p" className="text-xs text-slate-300">
                                    Coming Soon...
                                </Typography>
                            </div>
                        </div>
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default ExportModal;
