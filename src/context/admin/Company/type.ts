export interface CompanyItem {
  _id: string;
  companyName: string;
  email?: string;
  phone?: string;
  address?: string;
  contactPerson?: string;
  createdAt: string;
  updatedAt: string;
}

import { PaginatedResponse } from "@/types/common";

export interface CompanyListResponse extends PaginatedResponse<CompanyItem> {}

export interface CompanyState {
  listData: CompanyListResponse | null;
  listLoading: boolean;
  page: number;
  modal: {
    mode: "add" | "edit" | null;
    selectedItem: CompanyItem | null;
  };
  actionLoading: boolean;
}

export type CompanyAction =
  | { type: "FETCH_COMPANY_LIST_LOADING"; payload: boolean }
  | { type: "FETCH_COMPANY_LIST_SUCCESS"; payload: CompanyListResponse }
  | { type: "SET_PAGE"; payload: number }
  | { type: "SET_MODAL"; payload: CompanyState["modal"] }
  | { type: "ACTION_LOADING"; payload: boolean }
  | { type: "ACTION_SUCCESS" };
