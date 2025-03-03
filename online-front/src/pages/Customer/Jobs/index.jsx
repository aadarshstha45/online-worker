import { DataTable } from "@/components/DataTable";
import { DeleteAlert } from "@/components/Form/Modal";
import { useSearchParamsState } from "@/hooks/useSearchParamState";
import { useDeleteJob, useGetCustomerJobs } from "@/services/service-jobs";
import {
  Badge,
  Link as CLink,
  Flex,
  Heading,
  HStack,
  IconButton,
} from "@chakra-ui/react";
import moment from "moment";
import { LuPencil } from "react-icons/lu";
import { Link } from "react-router-dom";

const PostedJobs = () => {
  const { pageIndex } = useSearchParamsState();

  const columns = [
    {
      accessorKey: "s.n",
      header: "S.n",
      cell: ({ row }) => (pageIndex - 1) * 10 + row.index + 1,
    },

    {
      accessorKey: "title",
      header: "Job Title",
      cell: ({ row }) => {
        const { title } = row.original;
        return (
          <CLink fontSize={"md"} asChild>
            <Link to={`/jobs/${row.original._id}`}>{title}</Link>
          </CLink>
        );
      },
    },
    {
      accessorKey: "date",
      header: "Date",
      cell: ({ row }) => moment(row.original.date).format("ll"),
    },
    {
      accessorKey: "time",
      header: "Time",
      cell: ({ row }) =>
        `${row.original.startTime || ""} - ${row.original.endTime || ""}`,
    },
    {
      accessorKey: "proposedFees",
      header: "Proposed Fees",
      cell: ({ row }) => `Rs. ${row.original.proposedFees || ""}`,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const { status } = row.original;
        return (
          <Badge
            textTransform={"capitalize"}
            colorPalette={status === "open" ? "green" : "red"}
            size={"lg"}
          >
            {status}
          </Badge>
        );
      },
    },
    {
      accessorKey: "action",
      header: "Action",
      cell: ({ row }) => {
        const { _id } = row.original;
        const { mutateAsync, isPending } = useDeleteJob(_id);
        return (
          <HStack>
            <IconButton colorPalette={"blue"} fontSize={"md"}>
              <Link to={`/edit-job/${_id}`}>
                <LuPencil />
              </Link>
            </IconButton>
            <DeleteAlert
              heading={"Delete Job"}
              description={"Are you sure you want to delete this job?"}
              isDeleteLoading={isPending}
              onConfirm={async () => {
                await mutateAsync();
              }}
            />
          </HStack>
        );
      },
    },
  ];

  const { data, isLoading } = useGetCustomerJobs({
    page: pageIndex,
  });

  return (
    <Flex
      flexDir={"column"}
      maxW={{
        base: "95dvw",
        md: "80vw",
        xl: "70vw",
      }}
      w={"full"}
      mx={"auto"}
      mt={10}
    >
      <DataTable
        isLoading={isLoading}
        columns={columns}
        data={data?.data || []}
        pagination={data?.pagination ?? {}}
      >
        <Flex justify={"space-between"}>
          <Heading mb={4}>My Posted Jobs</Heading>
        </Flex>
      </DataTable>
    </Flex>
  );
};

export default PostedJobs;
