import { Flex, HStack, Text } from "@chakra-ui/react";
import { NavLink, useLocation } from "react-router-dom";

const SidebarItem = ({ item, subItems, onClick, activeBg }) => {
  const attributes = {
    borderRadius: 5,
    align: "center",
    _hover: {
      bg: activeBg ?? "primary.500",
      color: "white",
    },
  };

  const active = {
    bg: activeBg ?? "primary.500",
    fontWeight: 500,
    color: "white",
  };
  const { pathname } = useLocation();

  return (
    <HStack h={"max-content"} gap={1} align={"center"}>
      <Flex
        px={2}
        py={3}
        h={"full"}
        _currentPage={
          pathname.split("/")[2] === item.to.split("/")[2] ? active : {}
        }
        w={"100%"}
        {...attributes}
        whiteSpace={"nowrap"}
        onClick={onClick}
        asChild
      >
        <NavLink to={item.to}>
          <HStack align={"center"} justify={"start"}>
            <Text fontSize={{ base: "16px", md: "18px" }} whiteSpace={"nowrap"}>
              {item.title}
            </Text>
          </HStack>
        </NavLink>
      </Flex>
    </HStack>
  );
};

export default SidebarItem;
