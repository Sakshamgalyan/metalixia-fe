export interface EmployeeListPayload {
  page?: number;
  limit?: number;
  role?: string[];
  post?: string[];
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