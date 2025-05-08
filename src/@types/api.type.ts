import { Id } from "./general.type";

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  lastPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export type ApiResponse<T> =
  | { status: "success"; data: T }
  | { status: "error"; error: string };

export type QueryParams = Record<string, string | number | boolean | undefined>;

export interface ListParams {
  page?: number;
  limit?: number;
  sort?: string;
  filters?: QueryParams;
}

export type ListParamsWithId = Id & ListParams;
