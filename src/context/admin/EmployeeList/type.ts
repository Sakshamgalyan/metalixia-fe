import { EmployeeListPayload, EmployeeListResponse } from "@/ApiClient/Admin/type";
export const SET_FILTER_ROLE = "SET_FILTER_ROLE";
export const SET_FILTER_POST = "SET_FILTER_POST";
export const SET_LOADING = "SET_LOADING";
export const SET_PAGE = "SET_PAGE";
export const SET_FILTER_DATA = "SET_FILTER_DATA";
export const SET_FILTER_PAYLOAD = "SET_FILTER_PAYLOAD";

export interface SETFILTERROLEACTION {
  type: typeof SET_FILTER_ROLE;
  payload: string[];
}

export interface SETFILTERPOSTACTION {
  type: typeof SET_FILTER_POST;
  payload: string[];
}

export interface SETLOADINGACTION {
  type: typeof SET_LOADING;
  payload: boolean;
}

export interface SETPAGEACTION {
  type: typeof SET_PAGE;
  payload: number;
}

export interface SETFILTERDATACTION {
  type: typeof SET_FILTER_DATA;
  payload: EmployeeListResponse;
}

export interface SETFILTERPAYLOADACTION {
  type: typeof SET_FILTER_PAYLOAD;
  payload: EmployeeListPayload;
}

export type EmployeeListState = {
  filterRole: string[] | null;
  filterPost: string[] | null;
  loading: boolean;
  page: number;
  filterData: EmployeeListResponse | null;
  filterPayload: EmployeeListPayload | null;
};

export type EmployeeListAction =
  | SETFILTERROLEACTION
  | SETFILTERPOSTACTION
  | SETLOADINGACTION
  | SETPAGEACTION
  | SETFILTERDATACTION
  | SETFILTERPAYLOADACTION
