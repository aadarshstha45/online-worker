import AboutImage from "@/assets/about-section.jpg";
import { Box, Container, Heading, Image, Text, VStack } from "@chakra-ui/react";

const About = () => {
  return (
    <Box>
      {/* Hero Section */}
      <Box position="relative" w="full" h={{ base: "40vh", md: "50vh" }}>
        <Image
          src={AboutImage}
          alt="About NAT-Services"
          position="absolute"
          inset={0}
          w="full"
          h="full"
          objectFit="cover"
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
            color="white"
            fontSize={{ base: "3xl", md: "5xl" }}
            fontWeight="bold"
            px={4}
            py={2}
            rounded="md"
          >
            COMPANY OVERVIEW
          </Heading>
        </Box>
      </Box>

      {/* Content Section */}
      <Box bg="gray.100" py={8} px={{ base: 4, md: 8 }} mt={6}>
        <Container
          maxW="4xl"
          bg="white"
          shadow="lg"
          rounded="lg"
          overflow="hidden"
          p={6}
        >
          <VStack align="stretch" spacing={6}>
            <Heading fontSize="2xl" color="gray.800">
              About NAT-Services
            </Heading>
            <Text color="gray.700">
              NAT-Services is one of the trustable names in the field of
              servicing and repairing sector. Established with the aim of
              providing a "one-call solution for a wide range of home
              maintenance and repair needs", we are committed to delivering
              world-class service that brings a smile to your face.
            </Text>
            <Text color="gray.700">
              We don't just aim for a one-time service; we strive to be your
              long-term partner whenever your home or office needs repairs or
              remodeling. Our reputation is built on satisfied customers, so you
              can always trust us for any kind of maintenance and renovation
              service you need.
            </Text>
            <Heading fontSize="xl" color="gray.800">
              Company Overview
            </Heading>
            <Text color="gray.700">
              At NAT-Services, our mission is to provide exceptional service and
              reliable solutions for all your home and office maintenance needs.
              With years of experience and a team of dedicated professionals, we
              are here to ensure that your space remains in top condition,
              addressing any issues promptly and effectively.
            </Text>
            <Text color="gray.700">
              At NAT-Services, we pride ourselves on offering comprehensive
              solutions for all your home and office needs. From routine
              maintenance to complex repairs and remodeling, our team of
              experienced professionals is dedicated to providing exceptional
              service and ensuring the highest level of customer satisfaction.
              Our commitment to quality and reliability makes us a trusted
              partner in maintaining and enhancing the spaces you care about.
            </Text>
          </VStack>
        </Container>
      </Box>
    </Box>
  );
};

export default About;
