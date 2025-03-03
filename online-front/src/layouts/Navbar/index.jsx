import { Button } from "@/components/ui/button";
import { getRole } from "@/services/service-auth";
import TokenService from "@/services/service-token";
import { Box, Flex, HStack, Heading, Link, Stack } from "@chakra-ui/react";
import { NavLink, useNavigate } from "react-router-dom";
import UserMenu from "./UserMenu";
import { navLinks } from "./data";

const Navbar = () => {
  const navigate = useNavigate();

  const isAuthenticated = TokenService.isAuthenticated();
  const { isCustomer } = getRole();

  return (
    <Box
      as="nav"
      bg={"purple.600"}
      color={"gray.900"}
      px={10}
      py={4}
      position="sticky"
      top={0}
      zIndex={10}
      shadow="md"
    >
      <Flex justify="space-between" align="center">
        <Heading
          as="h1"
          fontSize={{ base: "md", sm: "lg", lg: "xl", "2xl": "3xl" }}
          fontWeight="semibold"
          fontStyle="italic"
          textDecor="underline"
          cursor="pointer"
          _hover={{ color: "fuchsia.300" }}
        >
          NAT-Services
        </Heading>

        <HStack spacing={8} align="center">
          <HStack spacing={6}>
            {navLinks.map((link, index) => (
              <Link
                as={NavLink}
                to={link.to}
                key={index}
                px={2}
                py={1}
                outline={"none"}
                fontSize={"18px"}
                fontWeight="semibold"
                _hover={{ bg: "gray.700", color: "gray.200" }}
                _currentPage={{ bg: "gray.700", color: "gray.200" }}
              >
                {link.label}
              </Link>
            ))}
          </HStack>

          {isAuthenticated ? (
            <HStack>
              {isCustomer && (
                <Button
                  bg="orange.500"
                  _hover={{ bg: "orange.700" }}
                  color="white"
                  fontWeight="bold"
                  onClick={() => navigate("/post-job")}
                >
                  Post a Job
                </Button>
              )}
              <UserMenu />
            </HStack>
          ) : (
            <Stack direction="row" spacing={2}>
              <Button
                variant="outline"
                bg="gray.200"
                _hover={{ bg: "orange.700", color: "white" }}
                fontWeight="bold"
                onClick={() => navigate("/signup")}
              >
                Sign Up
              </Button>
              <Button
                bg="orange.500"
                _hover={{ bg: "orange.700" }}
                color="white"
                fontWeight="bold"
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
            </Stack>
          )}
        </HStack>
      </Flex>
    </Box>
  );
};

export default Navbar;
