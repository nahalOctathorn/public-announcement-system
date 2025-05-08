import {
  Table as ShadcnTable,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableFooter,
} from "@/components/ui/table";
import {
  ColumnDef,
  flexRender,
  Table as TanstackTable,
} from "@tanstack/react-table";
import { TablePagination } from "../table/table-pagination";

export interface TableBaseProps<T> {
  pageSizeOptions?: number[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
    lastPage: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
  onPageChange?: (page: number) => void;
  onLimitChange?: (limit: number) => void;
  onRowClick?: (row: T) => void;
  rowClassName?: (row: T, index: number) => string;
  colClassName?: string;
  showPagination?: boolean;
  renderFooter?: (table: TanstackTable<T>) => React.ReactNode;
  emptyMessage?: string;
  className?: string;
  showHeader?: boolean;
}

export interface DataTableProps<T> extends TableBaseProps<T> {
  table: TanstackTable<T>;
  columns: ColumnDef<T>[];
}

export function AppTable<TData>({
  table,
  columns,
  pageSizeOptions,
  pagination,
  onPageChange,
  onLimitChange,
  onRowClick,
  showPagination = true,
  renderFooter,
  emptyMessage = "No results found.",
  className = "",
  rowClassName,
  colClassName = "",
  showHeader = true,
}: DataTableProps<TData>) {
  return (
    <ShadcnTable className={className}>
      {showHeader && (
        <TableHeader className="bg-muted">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
      )}
      <TableBody>
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row, index) => (
            <TableRow
              key={row.id}
              data-state={row.getIsSelected() && "selected"}
              className={rowClassName?.(row.original, index)}
              onClick={() => onRowClick?.(row.original)}
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id} className={colClassName}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={columns.length} className="h-24 text-center">
              {emptyMessage}
            </TableCell>
          </TableRow>
        )}
      </TableBody>

      {(renderFooter ||
        (showPagination && pagination && onPageChange && onLimitChange)) && (
        <TableFooter>
          {renderFooter && (
            <TableRow>
              <TableCell colSpan={columns.length}>
                {renderFooter(table)}
              </TableCell>
            </TableRow>
          )}

          {showPagination && pagination && onPageChange && onLimitChange && (
            <TableRow>
              <TableCell colSpan={columns.length}>
                <TablePagination
                  table={table}
                  pageSizeOptions={pageSizeOptions}
                  pagination={pagination}
                  onPageChange={onPageChange}
                  onLimitChange={onLimitChange}
                />
              </TableCell>
            </TableRow>
          )}
        </TableFooter>
      )}
    </ShadcnTable>
  );
}
