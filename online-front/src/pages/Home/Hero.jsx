import HomeDash from "@/assets/home-dash.jpg";
import { Box, Button, Flex, Heading, Input } from "@chakra-ui/react";
import { useState } from "react";
import { LuSearch } from "react-icons/lu";

const HeroSection = () => {
  const [search, setSearch] = useState("");

  return (
    <Box
      minH="80vh"
      bgGradient="linear(to-br, cyan.100, pink.200, yellow.200)"
      bgImage={`url(${HomeDash})`}
      bgSize="cover"
      bgPosition="center"
      bgRepeat="no-repeat"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box
        bg="orange.400"
        opacity={0.75}
        p={6}
        borderRadius="lg"
        w={{ base: "90%", md: "40%" }}
      >
        <Heading as="h1" size="lg" textAlign="center" mb={7}>
          Choose a service to get started.
        </Heading>
        <Flex
          align="center"
          maxW="md"
          mx="auto"
          bg="white"
          borderRadius="full"
          p={2}
          mt={4}
        >
          <Input
            type="search"
            placeholder="Search by service category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            flex={1}
            borderRadius="full"
            focusBorderColor="purple.500"
          />
          <Button
            colorScheme={search.length > 0 ? "purple" : "gray"}
            isDisabled={search.length === 0}
            borderRadius="full"
            w={12}
            h={12}
          >
            <LuSearch w={5} h={5} />
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default HeroSection;
