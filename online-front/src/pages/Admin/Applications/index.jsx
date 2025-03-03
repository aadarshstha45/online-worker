import { DataTable } from "@/components/DataTable";
import { useSearchParamsState } from "@/hooks/useSearchParamState";
import JobDetails from "@/pages/Workers/Applications/JobDetails";
import { useGetAllApplications } from "@/services/service-admin";
import PageHeader from "@/utils/PageHeader";
import { Badge, Flex, Text } from "@chakra-ui/react";
import moment from "moment";

const Applications = () => {
  const { pageIndex } = useSearchParamsState();
  const { data, isLoading } = useGetAllApplications({
    page: pageIndex,
  });

  const columns = [
    {
      accessorKey: "s.n.",
      header: "S.N.",
      cell: ({ row }) => (pageIndex - 1) * 10 + row.index + 1,
    },
    {
      accessorKey: "job.title",
      header: "Job Title",
      cell: ({ row }) => (
        <JobDetails
          job={row.original.job}
          trigger={
            <Text
              _hover={{ textDecor: "underline" }}
              color={"primary.500"}
              fontWeight={"medium"}
              cursor={"pointer"}
            >
              {row.original.job.title}
            </Text>
          }
        />
      ),
    },

    {
      accessorKey: "createdAt",
      header: "Applied On",
      cell: ({ row }) => (
        <Text>{moment(row.original.createdAt).format("DD-MM-YYYY")}</Text>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const { status } = row.original;
        return (
          <Badge
            size={"lg"}
            colorPalette={
              status === "pending"
                ? "yellow"
                : status === "rejected"
                  ? "red"
                  : "green"
            }
            textTransform={"capitalize"}
          >
            {status}
          </Badge>
        );
      },
    },
  ];

  return (
    <Flex flexDir={"column"}>
      <PageHeader heading={"Applications"} description={"All applications"} />
      <DataTable
        columns={columns}
        data={data?.data ?? []}
        isLoading={isLoading}
        pagination={data?.pagination}
      />
    </Flex>
  );
};

export default Applications;
