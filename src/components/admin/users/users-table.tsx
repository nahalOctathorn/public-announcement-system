import {  useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { columns } from "./user-columns";
import { TableDateFilter } from "@/components/table/table-date-filter";
import { User } from "@/@types/user.type";

import { useNavigate } from "react-router-dom";
import {
  Filter,
  Plus,
  XIcon,
} from "lucide-react";
import { CardTable } from "@/components/table/card-table";
import { TableBaseProps } from "@/components/layout/app-table";
import { ItemActionProps } from "@/@types/general.type";

interface UsersTableProps extends TableBaseProps<User> {
  data: User[];
  loading: boolean;
  error: string | null;
  onFilterChange: (filters: Record<string, any>) => void;
  setItemAction: ({ itemName, action, id }: ItemActionProps) => void;
  creatorId: number;
}


export function UsersTable({
  data,
  loading,
  error,
  pagination,
  onPageChange,
  onLimitChange,
  onFilterChange,
  setItemAction,
}: UsersTableProps) {
  const [filters, setFilters] = useState<Record<string, any>>({});

  const hasActiveFilters = Object.keys(filters).length > 0;
  const navigate = useNavigate();

  const handleFilterChange = (key: string, value: any) => {
    const newFilters = { ...filters };
    if (value) {
      newFilters[key] = value;
    } else {
      delete newFilters[key];
    }
    setFilters(newFilters);
  };

  useEffect(() => {
    let timer = null;

    timer = setTimeout(() => {
      onFilterChange(filters);
    }, 500);

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [filters]);

  const handleClearFilters = () => {
    setFilters({});
  };

  const handleDelete = (userId: number) => {
    setItemAction({ itemName: "user", id: userId, action: "delete" });
  };

  const handleView = (user: User) => {
  };

  const handleEdit = (userId: number) => {
    setItemAction({ itemName: "user", id: userId, action: "edit" });
  };


  const renderFilters = (
    <>
      <TableDateFilter
        placeholder="Start Date"
        value={
          filters.createdAfter ? new Date(filters.createdAfter) : undefined
        }
        onSelect={(date) =>
          handleFilterChange("createdAfter", date?.toISOString())
        }
      />
      <TableDateFilter
        placeholder="End Date"
        value={
          filters.createdBefore ? new Date(filters.createdBefore) : undefined
        }
        onSelect={(date) =>
          handleFilterChange("createdBefore", date?.toISOString())
        }
      />
    </>
  );

  const extraActions = (user: User) => {
    return null;
  };

  return (
    <CardTable<User>
      loading={loading}
      error={error}
      columns={columns(handleDelete, handleEdit, handleView, extraActions)}
      data={data}
      renderToolbar={(table) => (
        <div className="flex flex-col xl:flex-row xl:items-center gap-2">
          <h3 className="text-bold">Users</h3>

          <div className="flex flex-1 justify-between items-center gap-2">
            <div className="flex-1 flex items-center gap-2">
              <Input
                placeholder="Filter name, emails..."
                value={filters.search || ""}
                onChange={(e) => handleFilterChange("search", e.target.value)}
                className="max-w-sm"
              />
              <div className="xl:hidden flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-2" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    collisionPadding={20}
                    align="start"
                    className="w-64 p-2"
                  >
                    <div className="flex flex-col gap-2">{renderFilters}</div>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="hidden xl:flex items-center gap-2">
                {renderFilters}
              </div>

              {hasActiveFilters && (
                <Button variant="outline" onClick={handleClearFilters}>
                  <XIcon />{" "}
                  <span className="hidden lg:inline">Clear Filters</span>
                </Button>
              )}
            </div>
            <Button
              onClick={() =>
                setItemAction({ itemName: "user", id: 0, action: "create" })
              }
            >
              <Plus />
              <span className="hidden lg:inline">{`Add ${USER_LEVEL_TITLES[level]}`}</span>
            </Button>
          </div>
        </div>
      )}
      emptyMessage="No users found."
      pagination={pagination}
      onPageChange={onPageChange}
      onLimitChange={onLimitChange}
    />
  );
}
