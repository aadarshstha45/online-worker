import { Checkbox } from "@/components/ui/checkbox";
import { Field } from "@/components/ui/field";
import { InputGroup } from "@/components/ui/input-group";
import {
  NativeSelectField,
  NativeSelectRoot,
} from "@/components/ui/native-select";
import { PasswordInput } from "@/components/ui/password-input";
import { Icon, Input, Textarea } from "@chakra-ui/react";
import { Controller } from "react-hook-form";

const TextInput = ({
  name,
  control,
  isControlled = true,
  label,
  helperText,
  backendError,
  type,
  startElement,
  endElement,
  options,
  ...rest
}) => {
  return isControlled ? (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <Field
          label={type !== "checkbox" && label}
          invalid={!!error || !!backendError?.length}
          errorText={backendError?.[0] ?? error?.message}
          helperText={helperText}
          readOnly={rest.readOnly}
          required={rest.required}
          hidden={rest.hidden}
          flex={1}
        >
          <InputGroup
            flex={"1"}
            startElement={
              startElement && (
                <Icon boxSize={5} asChild>
                  {startElement}
                </Icon>
              )
            }
            endElement={endElement && endElement}
            w={"full"}
            bg={"white"}
          >
            {type === "textarea" ? (
              <Textarea
                size={"xl"}
                value={value}
                onChange={onChange}
                minH={"150px"}
                borderColor={
                  !!error || !!backendError?.length ? "red.500" : "gray.300"
                }
                focusRing={"inside"}
                {...rest}
              />
            ) : type === "password" ? (
              <PasswordInput
                size={"lg"}
                value={value}
                onChange={onChange}
                borderColor={
                  !!error || !!backendError?.length ? "red.500" : "gray.300"
                }
                focusRing={"inside"}
                {...rest}
              />
            ) : type === "checkbox" ? (
              <Checkbox
                checked={value}
                onCheckedChange={({ checked }) => onChange(checked)}
              >
                {label}
              </Checkbox>
            ) : type === "select" ? (
              <NativeSelectRoot size={"lg"} {...rest}>
                <NativeSelectField
                  borderColor={
                    !!error || !!backendError?.length ? "red.500" : "gray.300"
                  }
                  focusRing={"inside"}
                  value={value}
                  onChange={onChange}
                >
                  {options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </NativeSelectField>
              </NativeSelectRoot>
            ) : (
              <Input
                size={"lg"}
                value={value}
                type={type}
                onChange={onChange}
                borderColor={
                  !!error || !!backendError?.length ? "red.500" : "gray.300"
                }
                focusRing={"inside"}
                onWheel={(e) => {
                  const target = e.target;
                  type == "number" && target.blur();
                }}
                {...rest}
              />
            )}
          </InputGroup>
        </Field>
      )}
    />
  ) : (
    <Field
      label={label}
      helperText={helperText}
      readOnly={rest.readOnly}
      required={rest.required}
    >
      <InputGroup
        flex={"1"}
        startElement={
          startElement && (
            <Icon boxSize={5} asChild>
              {startElement}
            </Icon>
          )
        }
        endElement={
          endElement && (
            <Icon boxSize={5} asChild>
              {endElement}
            </Icon>
          )
        }
        w={"full"}
      >
        {type === "select" ? (
          <NativeSelectRoot size={"lg"}>
            <NativeSelectField>{options}</NativeSelectField>
          </NativeSelectRoot>
        ) : (
          <Input
            size={"lg"}
            type={type}
            onWheel={(e) => {
              const target = e.target;
              type == "number" && target.blur();
            }}
            {...rest}
          />
        )}
      </InputGroup>
    </Field>
  );
};

export default TextInput;
