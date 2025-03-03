import { Card, Stack } from "@chakra-ui/react";
import { sidebarItems } from "../data";
import SidebarItem from "./SidebarItem";

const Sidebar = ({ onClick, ...rest }) => {
  return (
    <Card.Root
      borderRadius={0}
      borderBlock={0}
      h={"100dvh"}
      pos={"fixed"}
      overflowY={"auto"}
      zIndex={99}
      w={"250px"}
      shadow={"none"}
      bg={"gray.50"}
      {...rest}
    >
      <Card.Header textAlign={"center"}>
        <Card.Title>Admin Panel</Card.Title>
      </Card.Header>
      <Card.Body>
        <Stack gap={2}>
          {sidebarItems.map((item, index) => (
            <SidebarItem onClick={onClick} key={index} item={item} />
          ))}
        </Stack>
      </Card.Body>
    </Card.Root>
  );
};

export default Sidebar;
