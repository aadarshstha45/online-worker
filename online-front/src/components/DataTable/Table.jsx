import { EmptyState } from "@/components/ui/empty-state";
import { SkeletonText } from "@/components/ui/skeleton";
import { useSearchParamsState } from "@/hooks/useSearchParamState";
import { Card, Flex, Icon, Table, Text } from "@chakra-ui/react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { LuAArrowDown, LuArrowUp } from "react-icons/lu";
import Pagination from "./Pagination";

const filterFunction = (rows, id, value) => {
  const rowValue = String(rows.original[id]).toLowerCase();
  const filterStatusValue = value.toLowerCase();
  // return rowValue.includes(filterStatusValue);

  // Split the rowValue by spaces to check for individual words
  const words = rowValue.split(" ");

  // Check if any word starts with the filterValue
  const match = words.some((word) => word.startsWith(filterStatusValue));

  return match;
};

const DataTable = ({
  data,
  columns,
  count,
  children,
  isLoading,
  showPagination = true,
  manualPagination = true,
  pagination,
  filter,
  ...rest
  // handlePageSize,
}) => {
  console.log({ pagination });

  const { pageIndex } = useSearchParamsState();
  const [columnFilters, setColumnFilters] = useState([]);
  const [page] = useState(1);
  const [pageSize, _] = useState(10);
  const table = useReactTable({
    columns,
    data,
    manualPagination: manualPagination,
    state: {
      columnFilters,
      globalFilter: filter?.globalFilter?.trim() || "",
      pagination: {
        pageIndex,
        pageSize: pagination?.per_page ?? pageSize,
      },
    },

    enableRowSelection: true,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnFiltersChange: setColumnFilters,
    globalFilterFn: filterFunction,
    onGlobalFilterChange: filter?.setGlobalFilter,
  });

  return (
    <Card.Root {...rest}>
      {children && <Card.Header>{children}</Card.Header>}
      <Card.Body pt={4}>
        <Table.ScrollArea
          borderRadius={5}
          borderWidth={"1px"}
          // border={"1px solid var(--chakra-colors-gray-200)"}
        >
          <Table.Root variant={"outline"} interactive>
            <Table.Header>
              {table.getHeaderGroups().map((headerGroup) => {
                return (
                  <Table.Row key={headerGroup.id} mb={2}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <Table.ColumnHeader
                          colSpan={header.colSpan}
                          key={header.id}
                          textTransform="capitalize"
                          whiteSpace="nowrap"
                          mb={10}
                          style={{
                            width:
                              header.getSize() !== 150
                                ? header.getSize()
                                : "auto",

                            textAlign: "center",
                            padding: "15px",
                            fontWeight: 600,
                          }}
                          // fontFamily={"Inter Variable"}
                          cursor={
                            header.column.getCanSort() ? "pointer" : "default"
                          }
                          onClick={header.column.getToggleSortingHandler()}
                        >
                          <Flex gap={2} justify={"center"} align={"center"}>
                            <Text textAlign={"center"}>
                              {header.isPlaceholder
                                ? null
                                : flexRender(
                                    header.column.columnDef.header,
                                    header.getContext()
                                  )}
                            </Text>
                            {header.column.getCanSort() ? (
                              header.column.getIsSorted().valueOf() ===
                              "desc" ? (
                                <Icon asChild boxSize={4}>
                                  <LuArrowUp weight="bold" />
                                </Icon>
                              ) : header.column.getIsSorted().valueOf() ===
                                "asc" ? (
                                <Icon asChild boxSize={4}>
                                  <LuAArrowDown weight="bold" />
                                </Icon>
                              ) : null
                            ) : null}
                          </Flex>
                        </Table.ColumnHeader>
                      );
                    })}
                  </Table.Row>
                );
              })}
            </Table.Header>
            <Table.Body>
              {isLoading ? (
                <>
                  {[...Array(5)].map((_, rowIndex) => (
                    <Table.Row key={rowIndex}>
                      {columns.map((_, columnIndex) => (
                        <Table.Cell key={columnIndex}>
                          <SkeletonText
                            noOfLines={1}
                            height="20px"
                            w={"full"}
                          />
                        </Table.Cell>
                      ))}
                    </Table.Row>
                  ))}
                </>
              ) : (pagination && pagination?.total === 0) ||
                data.length === 0 ? (
                <Table.Row>
                  <Table.Cell
                    border={0}
                    colSpan={columns.length}
                    textAlign="center"
                  >
                    <EmptyState
                      title="No data found"
                      description="No data available to show"
                    />
                  </Table.Cell>
                </Table.Row>
              ) : (
                table.getRowModel().rows.map((row) => {
                  return (
                    <Table.Row verticalAlign={"middle"} key={row.id}>
                      {row.getVisibleCells()?.map((cell, index) => {
                        return (
                          <Table.Cell
                            style={{
                              width: `${columns[index]?.maxSize}px`,
                              textAlign: "center",
                              overflow: "clip",
                              textOverflow: "ellipsis",
                            }}
                            borderColor={"gray.300"}
                            key={cell.id}
                          >
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </Table.Cell>
                        );
                      })}
                    </Table.Row>
                  );
                })
              )}
            </Table.Body>
          </Table.Root>
        </Table.ScrollArea>
      </Card.Body>
      {pagination && !isLoading && (
        <Card.Footer>
          <Pagination
            pageSize={pagination?.perPage}
            count={pagination?.total}
            pageIndex={pageIndex ?? pagination?.page}
          />
        </Card.Footer>
      )}
    </Card.Root>
  );
};

export default DataTable;
