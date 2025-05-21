import { useEffect, useState } from "react";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { ClientApiResult, MultipleData, Params } from "../types";

/**
 * Query With Pagination
 */

type UseQueryWithPaginationOptions<T> = {
  queryKey: any[];
  queryFn: (...params: any[]) => Promise<T>;
  queryFnParams?: Params
  staleTime?: number;
  defaultPage?: number;
  defaultLimit?: number;
  avoidPrefetch?: boolean;
  enabled?: boolean
}

export const useQueryWithPagination = <T>(
  options: UseQueryWithPaginationOptions<ClientApiResult<MultipleData<T>>>
) => {
  const [page, setPage] = useState(options.defaultPage ?? 1);
  const [records_per_page, set_record_per_page] = useState(options.defaultLimit ?? 10);
  const [total, setTotal] = useState(0);

  const isEnabled = options.enabled !== undefined ? options.enabled : true;
  const hasMore = Math.ceil(total / records_per_page) > page;

  const { status, data, error, isPlaceholderData, refetch } = useQuery({
    queryKey: [...options.queryKey, records_per_page, page],
    queryFn: () => options.queryFn({
      ...options.queryFnParams,
      pagination: {
        page, records_per_page
      }
    }),
    /* placeholderData: keepPreviousData, */
    staleTime: options.staleTime,
    retry: false,
    enabled: isEnabled
  });

  const totalCount = data?.response?.totalCount ?? 0;
  const totalPages = data?.response?.totalPages ?? 1;

  const queryClient = useQueryClient();
  useEffect(() => {
    if (!options.avoidPrefetch && !isPlaceholderData && hasMore && isEnabled) {
      queryClient.prefetchQuery({
        queryKey: [...options.queryKey, records_per_page, page + 1],
        queryFn: () => options.queryFn({
          ...options.queryFnParams,
          pagination: {
            page: page + 1, records_per_page
          }
        }),
        staleTime: options.staleTime,
        retry: false,
      });
    }
  }, [options, isEnabled, hasMore, isPlaceholderData, records_per_page, page, queryClient]);

  // To avoid "reference" comparison
  const queryFnParamsValues = JSON.stringify(options.queryFnParams ?? {});
  useEffect(() => {
    setPage(1);
  }, [queryFnParamsValues])

  useEffect(() => {
    if (total != 0) return;
    setTotal(totalCount);
  }, [totalCount, total]);

  return {
    status,
    statusCode: data?.status,
    error,
    data: data?.response?.data ?? [],
    pagination: {
      totalCount,
      totalPages,
      currentPage: page,
      setPage,
      currentLimit: records_per_page,
      setLimit: set_record_per_page,
      hasMore,
    },
    refetch
  }
}

export const formatPagination = (pagination: UseQueryWithPagination["pagination"]) => {
  return {
    total: pagination.totalCount,
    pageSize: pagination.currentLimit,
    current: pagination.currentPage,
    showSizeChanger: true,
    onShowSizeChange: (current: number, size: number) => {
      pagination.setLimit(size);
    },
    onChange: (page: number, pageSize: number) => {
      pagination.setPage(page);
      pagination.setLimit(pageSize);
    },
  }
}

export type UseQueryWithPagination = ReturnType<typeof useQueryWithPagination>;