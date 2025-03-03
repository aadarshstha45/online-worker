import ServiceImage from "@/assets/our-services.jpg";
import ServiceCategories from "@/dummy/ServiceCategories";
import { getRole } from "@/services/service-auth";
import {
  Box,
  Button,
  Flex,
  GridItem,
  Heading,
  HStack,
  Image,
  Link,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Stack } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Services = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const categoriesPerPage = 9;
  const totalPages = Math.ceil(ServiceCategories.length / categoriesPerPage);
  const navigate = useNavigate();
  const { isCustomer } = getRole();
  const getCurrentPageCategories = () => {
    const startIndex = (currentPage - 1) * categoriesPerPage;
    const endIndex = startIndex + categoriesPerPage;
    return ServiceCategories.slice(startIndex, endIndex);
  };

  const handleCategoryClick = (topic) => {
    navigate(`/category/${topic}`);
  };

  return (
    <Box w="full">
      {/* Hero Section */}
      <Box
        position="relative"
        h={{ base: "40vh", md: "50vh" }}
        overflow="hidden"
      >
        <Image
          src={ServiceImage}
          alt="About NAT-Services"
          w="full"
          h="full"
          objectFit="cover"
          position="absolute"
        />
        <Box
          position="absolute"
          inset={0}
          display="flex"
          alignItems="center"
          justifyContent="center"
          bg="blackAlpha.600"
        >
          <Heading
            size="2xl"
            color="blue.900"
            bg="gray.200"
            p={4}
            rounded="md"
            textAlign="center"
          >
            Our Services
          </Heading>
        </Box>
      </Box>

      <Flex maxW="90dvw" mx={"auto"} py={12}>
        <SimpleGrid columns={{ base: 1, sm: 4 }} align="start" gap={8}>
          {/* Sidebar */}
          <GridItem colSpan={{ base: 4, sm: 1 }}>
            <Box>
              <Heading as="h3" size="md" mb={4} textDecoration="underline">
                All Categories
              </Heading>
              <VStack align="start" spacing={2}>
                {ServiceCategories.map((category, index) => (
                  <Link
                    key={index}
                    onClick={() => handleCategoryClick(category.topic)}
                    lineClamp={1}
                  >
                    {category.topic}
                  </Link>
                ))}
              </VStack>
            </Box>
          </GridItem>
          <GridItem colSpan={{ base: 4, sm: 3 }}>
            <Stack>
              {/* Categories Grid */}
              <SimpleGrid
                columns={{
                  base: 1,
                  md: 2,
                  "2xl": 3,
                }}
                gap={6}
              >
                {getCurrentPageCategories().map((category, index) => (
                  <Box
                    key={index}
                    bg="white"
                    shadow="md"
                    rounded="lg"
                    overflow="hidden"
                    cursor="pointer"
                    textAlign="center"
                  >
                    <Image
                      src={category.img}
                      alt={category.topic}
                      aspectRatio={4 / 3}
                      objectFit="cover"
                    />
                    <VStack p={4} spacing={2}>
                      <Heading as="h4" size="md" color="gray.800">
                        {category.topic}
                      </Heading>
                      <Text color="gray.600">{category.description}</Text>
                      {isCustomer && (
                        <Button onClick={() => navigate("/post-job")}>
                          Book Your Service
                        </Button>
                      )}
                    </VStack>
                  </Box>
                ))}
              </SimpleGrid>

              {/* Pagination */}
              <HStack justify="center" mt={8}>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <Button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      colorScheme={page === currentPage ? "blue" : "gray"}
                    >
                      {page}
                    </Button>
                  )
                )}
              </HStack>
            </Stack>
          </GridItem>
        </SimpleGrid>
      </Flex>
    </Box>
  );
};

export default Services;
