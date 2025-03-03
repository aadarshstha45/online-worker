import { TextInput } from "@/components/Form/Inputs";
import { useLogin } from "@/services/service-auth";
import { Box, Button, Heading, Text, VStack } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const defaultValues = {
    email: "",
    password: "",
  };

  const { control, handleSubmit, reset } = useForm({ defaultValues });
  const navigate = useNavigate();
  const { mutateAsync, isPending } = useLogin();

  const onSubmit = async (data) => {
    try {
      const response = await mutateAsync(data);
      toast.success("Login successful");
      reset();
      if (response.data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      minH="100vh"
      bg="gray.100"
    >
      <Box
        bg="white"
        p={6}
        rounded="lg"
        shadow="lg"
        w={{ base: "90%", sm: "400px" }}
      >
        <Heading as="h2" size="lg" textAlign="center" mb={6}>
          Login
        </Heading>
        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack spacing={4}>
            <TextInput name="email" control={control} label="Email" />
            <TextInput
              name="password"
              control={control}
              label="Password"
              type="password"
            />

            <Button
              isLoading={isPending}
              colorScheme="blue"
              type="submit"
              width="full"
            >
              Login
            </Button>
            <Text fontSize="sm" color="gray.500">
              Don't have an account?{" "}
              <Link to="/signup" style={{ color: "blue" }}>
                Sign up
              </Link>
            </Text>
          </VStack>
        </form>
      </Box>
      <ToastContainer />
    </Box>
  );
};

export default Login;
