export interface PartItem {
  _id: string;
  companyId?: string;
  companyName?: string;
  partName: string;
  partNumber: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PartListResponse {
  data: PartItem[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface PartState {
  listData: PartListResponse | null;
  listLoading: boolean;
  page: number;
  modal: {
    mode: "add" | "edit" | null;
    selectedItem: PartItem | null;
  };
  actionLoading: boolean;
}

export type PartAction =
  | { type: "FETCH_PART_LIST_LOADING"; payload: boolean }
  | { type: "FETCH_PART_LIST_SUCCESS"; payload: PartListResponse }
  | { type: "SET_PAGE"; payload: number }
  | { type: "SET_MODAL"; payload: PartState["modal"] }
  | { type: "ACTION_LOADING"; payload: boolean }
  | { type: "ACTION_SUCCESS" };
