// hooks/use-table.tsx
import {
  ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  SortingState,
  ColumnFiltersState,
  VisibilityState,
  RowSelectionState,
  PaginationState,
} from "@tanstack/react-table";
import { useState } from "react";

interface UseTableOptions<TData> {
  columns: ColumnDef<TData>[];
  data: TData[];
  defaultPageSize?: number;
}

export function useTable<TData>({
  columns,
  data,
  defaultPageSize = 10,
}: UseTableOptions<TData>) {

   const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
    const [pagination, setPagination] = useState<PaginationState>({
      pageIndex: 0,
      pageSize: defaultPageSize,
    });
  
  const table = useReactTable({
    data,
    columns,
    manualPagination: true,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onPaginationChange: setPagination, 
  });

  return {
    table,
  };
}