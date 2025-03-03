import { Field } from "@/components/ui/field";
import { Input, Text } from "@chakra-ui/react";
import { Controller } from "react-hook-form";

const FileInput = ({ name, label, control, isMultiple = false }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Field flexDir={"column"} gap={2}>
          <Text htmlFor={label} className="block text-gray-700">
            {label}

            <Input
              type="file"
              accept="image/*"
              onChange={(e) => {
                isMultiple
                  ? field.onChange(e.target.files)
                  : field.onChange(e.target.files[0]);
              }}
              mt={2}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
              borderColor={error ? "red.500" : "gray.300"}
              multiple={isMultiple}
            />
          </Text>

          {error && (
            <Text color={"red.500"} fontSize={"sm"}>
              {error.message}
            </Text>
          )}
        </Field>
      )}
    />
  );
};

export default FileInput;
