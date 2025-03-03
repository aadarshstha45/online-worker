import { useGetStats } from "@/services/service-admin";
import PageHeader from "@/utils/PageHeader";
import { Card, Center, SimpleGrid, Stack } from "@chakra-ui/react";

const StatsCard = ({ title, value }) => {
  return (
    <Card.Root p={4} shadow="md" borderWidth="1px">
      <Card.Body>
        <Stack gap={4}>
          <Card.Title textAlign={"center"}>{title}</Card.Title>
          <Card.Description textAlign={"center"}>{value}</Card.Description>
        </Stack>
      </Card.Body>
    </Card.Root>
  );
};

const Dashboard = () => {
  const { data } = useGetStats();

  return (
    <Center h="70vh" w={"100%"}>
      <PageHeader heading={"Dashboard"} description={""} />

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={4}>
        <StatsCard title="Total Jobs" value={data?.data?.totalJobs} />
        <StatsCard title="Total Users" value={data?.data?.totalUsers} />
        <StatsCard
          title="Total Applications"
          value={data?.data?.totalApplications}
        />
      </SimpleGrid>
    </Center>
  );
};

export default Dashboard;
