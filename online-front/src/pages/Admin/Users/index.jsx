import { DataTable } from "@/components/DataTable";
import { useSearchParamsState } from "@/hooks/useSearchParamState";
import { useGetAllUsers } from "@/services/service-admin";
import PageHeader from "@/utils/PageHeader";
import { Badge, Flex, Text } from "@chakra-ui/react";

const Users = () => {
  const { pageIndex } = useSearchParamsState();
  const { data, isLoading } = useGetAllUsers({
    page: pageIndex,
  });

  const columns = [
    {
      accessorKey: "s.n.",
      header: "S.N.",
      cell: ({ row }) => (pageIndex - 1) * 10 + row.index + 1,
    },
    {
      accessorKey: "fullName",
      header: "Name",
      cell: ({ row }) => (
        <Text fontWeight={"medium"}>{row.original.fullName}</Text>
      ),
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => <Text>{row.original.email}</Text>,
    },
    {
      accessorKey: "phone",
      header: "Phone",
      cell: ({ row }) => <Text>{row.original.phone}</Text>,
    },
    {
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) => {
        const { role } = row.original;
        return (
          <Badge
            size={"lg"}
            colorPalette={role === "customer" ? "blue" : "green"}
            textTransform={"capitalize"}
          >
            {role}
          </Badge>
        );
      },
    },
  ];

  return (
    <Flex flexDir={"column"}>
      <PageHeader heading={"Users"} description={"All users"} />

      <DataTable
        columns={columns}
        data={data?.data ?? []}
        isLoading={isLoading}
        pagination={data?.pagination ?? {}}
      />
    </Flex>
  );
};

export default Users;
