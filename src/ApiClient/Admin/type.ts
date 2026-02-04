export interface EmployeeListPayload {
  pageNo?: number;
  limit?: number;
  name?: string[];
  role?: string;
  email?: string[];
  mobileNo?: string[];
  post?: string[];
  from?: number;
  to?: number;
}

export interface EmployeeListResponse {
  pagination: {
    total: number;
    page: number;
    totalPages: number;
  }
  data: {
    id: string;
    name: string;
    email: string;
    mobileNo: string;
    post: string;
    role: string;
  }[];
}