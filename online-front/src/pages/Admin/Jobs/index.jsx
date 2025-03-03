import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from "@/components/ui/pagination";
import { useSearchParamsState } from "@/hooks/useSearchParamState";
import { useGetAllJobs } from "@/services/service-jobs";
import PageHeader from "@/utils/PageHeader";
import {
  Badge,
  Card,
  Flex,
  Heading,
  HStack,
  Image,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import moment from "moment";

const Jobs = () => {
  const { pageIndex, setPageIndex } = useSearchParamsState();

  const { data, isLoading } = useGetAllJobs({
    page: pageIndex,
  });

  return (
    <Flex flexDir={"column"} gap={6}>
      <PageHeader heading={"Jobs"} description={"Posted Jobs."} />
      <SimpleGrid
        w={"full"}
        columns={{ base: 1, sm: 2, lg: 3, "2xl": 4 }}
        gap={4}
      >
        {data?.data?.map((job) => (
          <Card.Root key={job.id}>
            <Card.Header>
              <Image aspectRatio={4 / 3} src={job.image[0]} alt={job.title} />
              <Heading>{job.title}</Heading>
            </Card.Header>
            <Card.Body mt={2}>
              <Stack gap={1}>
                <Text fontWeight={"medium"}>
                  Problem:&nbsp;
                  <Text as={"span"} fontWeight={"normal"}>
                    {job.problemDesc}
                  </Text>
                </Text>
                <Text fontWeight={"medium"}>
                  Date:&nbsp;
                  <Text as={"span"} fontWeight={"normal"}>
                    {moment(job.createdAt).format("MMM Do YY")}
                  </Text>
                </Text>
                <Text fontWeight={"medium"}>
                  Time:&nbsp;
                  <Text as={"span"} fontWeight={"normal"}>
                    {job.startTime} - {job.endTime}
                  </Text>
                </Text>
                <Text fontWeight={"medium"}>
                  Location:&nbsp;
                  <Text as={"span"} fontWeight={"normal"}>
                    {job.location}
                  </Text>
                </Text>
                <HStack>
                  <Text fontWeight={"medium"}>Status:&nbsp;</Text>
                  <Badge
                    colorPalette={job.status === "open" ? "green" : "red"}
                    textTransform={"capitalize"}
                  >
                    {job.status}
                  </Badge>
                </HStack>
              </Stack>
            </Card.Body>
          </Card.Root>
        ))}
      </SimpleGrid>
      <Stack justify={"center"} w={"full"} align={"center"}>
        <PaginationRoot
          count={data?.pagination?.total}
          pageSize={data?.pagination?.size}
          page={pageIndex}
          onPageChange={(e) => setPageIndex(e.page)}
          variant={"solid"}
        >
          <HStack>
            <PaginationPrevTrigger />
            <PaginationItems />
            <PaginationNextTrigger />
          </HStack>
        </PaginationRoot>
      </Stack>
    </Flex>
  );
};

export default Jobs;
