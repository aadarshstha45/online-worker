import { DataTable } from "@/components/DataTable";
import { useSearchParamsState } from "@/hooks/useSearchParamState";
import { useGetMyApplications } from "@/services/service-application";
import { Badge, Flex, Link, Text } from "@chakra-ui/react";
import moment from "moment";
import JobDetails from "./JobDetails";

const WorkerApplications = () => {
  const { pageIndex } = useSearchParamsState();
  const { data, isLoading } = useGetMyApplications({
    page: pageIndex,
  });

  const columns = [
    {
      accessorKey: "s.n",
      header: "S.N.",
      cell: ({ row }) => {
        return row.index + 1 + (pageIndex - 1) * 10;
      },
    },
    {
      accessorKey: "job.title",
      header: "Job Title",
      cell: ({ row }) => {
        const { job } = row.original;
        return (
          <JobDetails
            job={job}
            trigger={
              <Text
                _hover={{
                  textDecoration: "underline",
                }}
                color={"primary.500"}
                fontWeight={"medium"}
                cursor={"pointer"}
              >
                {job.title}
              </Text>
            }
          />
        );
      },
    },
    {
      accessorKey: "job.createdBy.fullName",
      header: "Customer Name",
      cell: ({ row }) => {
        const { job } = row.original;
        return <Text>{job.createdBy.fullName}</Text>;
      },
    },
    {
      accessorKey: "job.createdBy.phone",
      header: "Customer Phone",
      cell: ({ row }) => {
        const { job } = row.original;
        return (
          <Link
            color={"primary.500"}
            href={`tel:${job.createdBy.phone}`}
            target="_blank"
            outline={"none"}
          >
            {job.createdBy.phone}
          </Link>
        );
      },
    },
    {
      accessorKey: "job.createdBy.email",
      header: "Customer Email",
      cell: ({ row }) => {
        const { job } = row.original;
        return (
          <Link
            href={`mailto:${job.createdBy.email}`}
            target="_blank"
            outline={"none"}
            color={"primary.500"}
          >
            {job.createdBy.email}
          </Link>
        );
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const { status } = row.original;
        return (
          <Badge
            colorPalette={
              status === "pending"
                ? "yellow"
                : status === "accepted"
                  ? "green"
                  : "red"
            }
            size={"lg"}
            textTransform={"capitalize"}
          >
            {status}
          </Badge>
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: "Date Applied",
      cell: ({ row }) => {
        const { createdAt } = row.original;
        return moment(createdAt).format("MMM DD, YYYY");
      },
    },
  ];

  return (
    <Flex
      flexDir={"column"}
      gap={6}
      maxW={{
        base: "90vw",
        md: "80vw",
        xl: "75vw",
      }}
      minW={"75vw"}
      mx={"auto"}
      my={10}
    >
      <DataTable
        columns={columns}
        data={data?.data ?? []}
        pagination={data?.pagination ?? {}}
        isLoading={isLoading}
      />
    </Flex>
  );
};

export default WorkerApplications;
