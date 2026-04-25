export interface PaginatedResponse<T> {
  data: T[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
}

export interface PaginationConfig {
  totalPages: number;
  currentPage: number;
  totalCount: number;
  onPageChange: (page: number) => void;
  itemsPerPage?: number;
}
