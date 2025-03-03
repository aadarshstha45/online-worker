import {
  PaginationItem,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from "@/components/ui/pagination";
import { useSearchParamsState } from "@/hooks/useSearchParamState";
import { getRole } from "@/services/service-auth";
import { useGetAllJobs } from "@/services/service-jobs";
import {
  Badge,
  Card,
  Flex,
  Heading,
  HStack,
  Image,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { Stack } from "@mui/material";
import moment from "moment";
import ApplicationFrom from "./ApplicationFrom";

const Jobs = () => {
  const { pageIndex, setPageIndex } = useSearchParamsState();

  const { data, isLoading } = useGetAllJobs({
    page: pageIndex,
  });

  const { isWorker } = getRole();

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <Flex
      flexDir={"column"}
      gap={6}
      maxW={{
        base: "90vw",
        md: "80vw",
        xl: "75vw",
      }}
      mx={"auto"}
      my={10}
    >
      <Heading>Jobs</Heading>
      <SimpleGrid
        w={"full"}
        columns={{ base: 1, sm: 2, lg: 3, "2xl": 4 }}
        gap={4}
      >
        {data?.data?.map((job) => (
          <Card.Root key={job.id}>
            <Card.Header>
              <Image aspectRatio={4 / 3} src={job.image[0]} alt={job.title} />
              <Heading size={"md"}>{job.title}</Heading>
            </Card.Header>
            <Card.Body mt={1}>
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
                  <Text fontWeight={"medium"}>Status;</Text>
                  <Badge
                    colorPalette={job.status === "open" ? "green" : "red"}
                    textTransform={"capitalize"}
                  >
                    {job.status}
                  </Badge>
                </HStack>
                <HStack>
                  <Text fontWeight={"medium"}>Poster By:;</Text>
                  <Text>{job.createdBy.fullName}</Text>
                </HStack>
              </Stack>
            </Card.Body>
            {isWorker && (
              <Card.Footer>
                <ApplicationFrom job={job} />
              </Card.Footer>
            )}
          </Card.Root>
        ))}
      </SimpleGrid>
      <PaginationRoot
        count={data?.pagination?.total}
        pageSize={data?.pagination?.size}
        page={pageIndex}
        onPageChange={(e) => setPageIndex(e.page)}
        variant={"solid"}
      >
        <HStack>
          <PaginationPrevTrigger />
          <PaginationItem type={"page"} value={pageIndex} />
          <PaginationNextTrigger />
        </HStack>
      </PaginationRoot>
    </Flex>
  );
};

export default Jobs;
