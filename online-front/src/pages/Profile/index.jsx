import { TextInput } from "@/components/Form/Inputs";
import { Avatar } from "@/components/ui/avatar";
import useAuthStore from "@/store/authStore";
import { Badge, Card, HStack, SimpleGrid, Text } from "@chakra-ui/react";

const Profile = () => {
  const { user } = useAuthStore();
  return (
    <Card.Root
      w={"full"}
      maxW={{
        base: "95vw",
        sm: "80vw",
        xl: "70vw",
      }}
      minW={"70vw"}
      mx={"auto"}
      my={10}
    >
      <Card.Header>
        <Card.Title> MY Profile</Card.Title>
      </Card.Header>
      <Card.Body>
        <Avatar
          boxSize="100px"
          src={user?.profile?.profilePhoto ?? ""}
          alt="Avatar"
        />
        <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
          <TextInput
            isControlled={false}
            label=" Name"
            value={user?.fullName}
            readOnly
          />

          <TextInput
            isControlled={false}
            label="Email"
            value={user?.email}
            readOnly
          />
          <TextInput
            isControlled={false}
            label="Phone Number"
            value={user?.phone}
            readOnly
          />
          <TextInput
            isControlled={false}
            label="Address"
            value={user?.address}
            readOnly
          />
          <HStack>
            <Text>Role</Text>
            <Badge
              colorPalette={
                user?.role === "customer"
                  ? "green"
                  : user?.role === "worker"
                    ? "blue"
                    : "red"
              }
              size={"lg"}
              w={"max-content"}
            >
              {user?.role}
            </Badge>
          </HStack>
        </SimpleGrid>
      </Card.Body>
    </Card.Root>
  );
};

export default Profile;
