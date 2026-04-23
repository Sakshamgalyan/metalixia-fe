export interface EmployeeListPayload {
  page?: number;
  limit?: number;
  role?: string[];
  post?: string[];
}

import { PaginatedResponse } from "@/types/common";

export interface EmployeeData {
  id: string;
  name: string;
  email: string;
  mobileNo: string;
  post: string;
  role: string;
}

export interface EmployeeListResponse extends PaginatedResponse<EmployeeData> {}