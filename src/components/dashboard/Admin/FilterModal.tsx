"use client";

import { useState } from "react";
import Button from "@/components/UI/Button";
import Accordion from "@/components/UI/Accordion";
import Dropdown from "@/components/UI/DropDown";
import { AllRoles, AllPosts } from "@/lib/constants";
import { useEmployeeListDispatchContext, useEmployeeListStateContext } from "@/context/admin/EmployeeList/hooks";
import { setFilterPost, setFilterRole } from "@/context/admin/EmployeeList/action";

export interface EmployeeFilters {
    name: string;
    role: string;
    email: string;
    mobileNo: string;
}

const FilterModal = ({ trigger }: { trigger: React.ReactNode }) => {
    const { filterRole, filterPost } = useEmployeeListStateContext();
    const dispatch = useEmployeeListDispatchContext();

    const [isOpen, setIsOpen] = useState(false);
    const handleApply = () => {
        setIsOpen(false);
    };

    const handleClear = () => {
        dispatch(setFilterRole([]));
        dispatch(setFilterPost([]));
        setIsOpen(false);
    };

    return (
        <Accordion
            trigger={trigger}
            open={isOpen}
            showArrow={false}
            onOpenChange={setIsOpen}
            contentClassName="w-120 p-4"
        >
            <div className="space-y-4">
                <Dropdown
                    label="Role"
                    size="sm"
                    multiple
                    options={Object.values(AllRoles).map((role) => ({
                        value: role,
                        label: role,
                    }))}
                    value={filterRole || []}
                    onChange={(val) => dispatch(setFilterRole(typeof val === 'string' ? [val] : (val || [])))}
                    placeholder="Select role"
                    showSelectAll
                />
                <Dropdown
                    label="Post"
                    size="sm"
                    multiple
                    options={Object.values(AllPosts).map((post) => ({
                        value: post,
                        label: post,
                    }))}
                    value={filterPost || []}
                    onChange={(val) => dispatch(setFilterPost(typeof val === 'string' ? [val] : (val || [])))}
                    placeholder="Select Post"
                    showSelectAll
                />

                <div className="flex gap-2 pt-2 border-t border-slate-100">
                    <Button variant="ghost" size="sm" onClick={handleClear} fullWidth>
                        Clear
                    </Button>
                    <Button variant="primary" size="sm" onClick={handleApply} fullWidth>
                        Apply
                    </Button>
                </div>
            </div>
        </Accordion>
    );
};

export default FilterModal;
