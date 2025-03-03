import { TextInput } from "@/components/Form/Inputs";
import FileInput from "@/components/Form/Inputs/FileInput";
import { Button } from "@/components/ui/button";
import { useRegisterUser } from "@/services/service-auth";
import { toFormData } from "@/services/service-axios";
import { Box, Center, Stack, Text } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Signup = () => {
  const defaultValues = {
    fullName: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    role: "customer", // default to customer
    file: "",
  };

  const navigate = useNavigate();

  const { control, handleSubmit, reset } = useForm({ defaultValues });

  const { mutateAsync, isPending } = useRegisterUser();

  const onSubmit = async (data) => {
    try {
      const formData = toFormData(data);
      await mutateAsync(formData);
      toast.success("Account created successfully. Please login.");
      navigate("/login");
      reset();
    } catch (error) {
      console.error(error);
      const errorMessage = error.response.data.message;
      toast.error(errorMessage);
    }
  };

  return (
    <Center minHeight="100vh" bg="gray.100">
      <Box bg="white" p={6} rounded="lg" shadow="lg" w="full" maxW="md">
        <Text fontSize="2xl" fontWeight="bold" mb={6} textAlign="center">
          Sign Up
        </Text>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={4}>
            <TextInput name="fullName" control={control} label="Full Name" />
            <TextInput name="email" control={control} label="Email" />
            <TextInput name="phone" control={control} label="Phone" />
            <TextInput name="address" control={control} label="Address" />
            <TextInput
              name="password"
              control={control}
              label="Password"
              type="password"
            />
            <TextInput
              type={"select"}
              name="role"
              control={control}
              label="Role"
              options={[
                { value: "customer", label: "Customer" },
                { value: "worker", label: "Worker" },
              ]}
            />
            <FileInput name="file" control={control} label="Profile Photo" />

            <Button
              loading={isPending}
              loadingText="Signing Up"
              colorScheme="blue"
              width="full"
              type="submit"
            >
              Signup
            </Button>

            <Text textAlign="center" color="gray.500" mt={4}>
              Already have an account?{" "}
              <a href="/login" style={{ color: "#3182ce" }}>
                Login
              </a>
            </Text>
          </Stack>
        </form>
      </Box>
    </Center>
  );
};

export default Signup;
