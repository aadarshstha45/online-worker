import AboutImage from "@/assets/about-section.jpg";
import { popularCategories } from "@/dummy/PopularCategories";
import {
  Box,
  Button,
  Grid,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const ServiceSection = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (topic) => {
    navigate(`/category/${topic}`);
  };

  return (
    <>
      <Stack
        direction={{ base: "column", md: "row" }}
        align="center"
        justify="space-between"
        py={16}
        px={20}
        bg="orange.300"
        spacing={7}
      >
        <Box
          textAlign={{ base: "center", md: "left" }}
          w={{ base: "full", md: "50%" }}
        >
          <Heading size={{ base: "xl", md: "2xl" }} mb={4}>
            Looking for professionals to upgrade your home/offices?
          </Heading>
          <Heading size={{ base: "xl", md: "2xl" }} mb={8}>
            Book an expert from here.
          </Heading>
          <Button
            colorScheme="blue"
            mt={10}
            onClick={() => navigate("/natservices/services")}
          >
            SEE ALL SERVICES
          </Button>
        </Box>
        <Box w={{ base: "full", md: "50%" }} mt={{ base: 6, md: 0 }}>
          <Image
            src={AboutImage}
            alt="about-section"
            w={"500px"}
            h="auto"
            borderRadius="lg"
            shadow="lg"
          />
        </Box>
      </Stack>

      <Box px={20} py={32}>
        <Heading size="2xl" textAlign="center" mb={6}>
          Our Popular Services
        </Heading>
        <Grid
          templateColumns={{
            base: "repeat(2, 1fr)",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
            lg: "repeat(4, 1fr)",
            xl: "repeat(5, 1fr)",
          }}
          gap={6}
          px={14}
          py={5}
        >
          {popularCategories.map((category, index) => (
            <Box
              key={index}
              bg="white"
              p={4}
              borderRadius="lg"
              shadow="md"
              cursor="pointer"
              onClick={() => handleCategoryClick(category.topic)}
              textAlign="center"
            >
              <Image
                src={category.img}
                alt={category.topic}
                w="60"
                h="40"
                objectFit="cover"
                borderRadius="lg"
                border="1px solid black"
              />
              <Text fontSize="lg" fontWeight="semibold" mt={4}>
                {category.topic}
              </Text>
            </Box>
          ))}
        </Grid>
        <Box display="flex" justifyContent="center" my={7}>
          <Button onClick={() => navigate("/natservices/services")}>
            View All Services
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default ServiceSection;
