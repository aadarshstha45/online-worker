import { Flex } from "@chakra-ui/react";
import HeroSection from "./Hero";
import ServiceSection from "./Services";
const Home = () => {
  return (
    <Flex flexDirection={"column"}>
      <HeroSection />
      <ServiceSection />
    </Flex>
  );
};

export default Home;
