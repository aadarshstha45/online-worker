import { DataTable } from "@/components/DataTable";
import { useSearchParamsState } from "@/hooks/useSearchParamState";
import JobDetails from "@/pages/Workers/Applications/JobDetails";
import { useGetMyApplications } from "@/services/service-application";
import { Badge, Flex, HStack, Link, Text } from "@chakra-ui/react";
import moment from "moment";
import Update from "./Update";

const Applications = () => {
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
      accessorKey: "applicant.fullName",
      header: "Applicant Name",
      cell: ({ row }) => {
        const { applicant } = row.original;
        return <Text>{applicant.fullName}</Text>;
      },
    },
    {
      accessorKey: "applicant.phone",
      header: "Applicant Phone",
      cell: ({ row }) => {
        const { applicant } = row.original;
        return (
          <Link
            color={"primary.500"}
            href={`tel:${applicant.phone}`}
            target="_blank"
            outline={"none"}
          >
            {applicant.phone}
          </Link>
        );
      },
    },
    {
      accessorKey: "applicant.email",
      header: "Applicant Email",
      cell: ({ row }) => {
        const { applicant } = row.original;
        return (
          <Link
            href={`mailto:${applicant.email}`}
            target="_blank"
            outline={"none"}
            color={"primary.500"}
          >
            {applicant.email}
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
    {
      accessorKey: "action",
      header: "Action",
      cell: ({ row }) => {
        const { status } = row.original;
        return (
          status === "pending" && (
            <HStack>
              <Update id={row.original._id} status={"accepted"} />
              <Update id={row.original._id} status={"rejected"} />
            </HStack>
          )
        );
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

export default Applications;
