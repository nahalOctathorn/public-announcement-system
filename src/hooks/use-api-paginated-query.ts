import { PaginatedResponse } from "@/@types/api.type";
import {
  useQuery,
  UseQueryOptions,
  useQueryClient,
} from "@tanstack/react-query";
import { useState } from "react";
import { useApiMutation } from "./use-api-mutation";

type QueryParams = {
  page: number;
  limit: number;
  search?: string;
  filters?: Record<string, any>;
};



export function usePaginatedQuery<T = any>(
  queryKey: string | any[],
  queryFn: (params: QueryParams) => Promise<PaginatedResponse<T>>,
  initialParams: QueryParams = {
    page: 1,
    limit: 10,
  },
  options?: Omit<
    UseQueryOptions<PaginatedResponse<T>, Error>,
    "queryKey" | "queryFn"
  >,
) {
  const [params, setParams] = useState(initialParams);

  const query = useQuery<PaginatedResponse<T>, Error>({
    queryKey: [...(Array.isArray(queryKey) ? queryKey : [queryKey]), params],
    queryFn: () => queryFn(params),
    ...options,
  });



  // ---------- Param Updaters ----------
  const setPage = (page: number) => {
    setParams((prev) => ({ ...prev, page }));
  };

  const setLimit = (limit: number) => {
    setParams((prev) => ({ ...prev, limit, page: 1 }));
  };

 
  const setFilters = (filters: Record<string, any>) => {
    setParams((prev) => ({ ...prev, filters, page: 1 }));
  };

  return {
    ...query,
    params,
    pagination: {
      page: params.page,
      limit: params.limit,
      total: query.data?.total || 0,
      lastPage: query.data?.lastPage || 1,
      hasNextPage: query.data?.hasNextPage || false,
      hasPrevPage: query.data?.hasPrevPage || false,
    },
    setPage,
    setLimit,
    setFilters,
   
  };
}
