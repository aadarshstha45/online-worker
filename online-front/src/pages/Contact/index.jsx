import { TextInput } from "@/components/Form/Inputs";
import {
  Box,
  Button,
  Heading,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Stack } from "@mui/material";
import { useForm } from "react-hook-form";
import { FaLocationDot, FaSquarePhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { toast } from "react-toastify";

const Contact = () => {
  const defaultValues = {
    name: "",
    email: "",
    message: "",
  };

  const { control, handleSubmit, reset } = useForm({ defaultValues });

  const onSubmit = (data) => {
    console.log(data);
    setTimeout(() => {
      toast.success("Message sent successfully!");
      reset();
    }, 500);
  };

  return (
    <SimpleGrid
      columns={{ base: 1, md: 2 }}
      gap={8}
      py={12}
      px={{ base: 4, sm: 6, lg: 8 }}
    >
      <Stack
        p={8}
        w="full"
        maxW={{ base: "full", md: "md" }}
        ml={{ md: "auto" }}
      >
        <Heading as="h1" size="2xl" mb={8} textAlign="center" color="gray.800">
          Contact Information
        </Heading>
        <VStack spacing={4} align="start" fontSize="lg" color="gray.700">
          <Text display="flex" alignItems="center">
            <FaLocationDot className="mr-2" style={{ color: "#5A67D8" }} />
            Khandbari, Sankhuwasabha, Nepal
          </Text>
          <Text display="flex" alignItems="center">
            <MdEmail className="mr-2" style={{ color: "#5A67D8" }} />
            info@natservices.com
          </Text>
          <Text display="flex" alignItems="center">
            <FaSquarePhone className="mr-2" style={{ color: "#5A67D8" }} />
            +977-9812345678
          </Text>
        </VStack>
      </Stack>

      <Box w="full" p={8} maxW={{ base: "full", md: "md" }} mx={"auto"}>
        <Heading as="h2" size="xl" mb={6} textAlign="center" color="gray.900">
          Contact Us
        </Heading>
        <Text textAlign="center" color="gray.600" mb={6}>
          We'd love to hear from you! Fill out the form below to get in touch.
        </Text>
        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack spacing={4} align="stretch">
            <TextInput name="name" label="Name" control={control} />
            <TextInput name="email" label="Email" control={control} />
            <TextInput
              name="message"
              label="Message"
              control={control}
              type={"textarea"}
            />
            <Button
              type="submit"
              colorScheme="indigo"
              size="lg"
              width="full"
              mt={6}
              _hover={{ bg: "indigo.700" }}
            >
              Send Message
            </Button>
          </VStack>
        </form>
      </Box>
    </SimpleGrid>
  );
};

export default Contact;
