import { FC } from "react";
import {
  FormControl,
  FormLabel,
  Input as FormInput,
  InputProps as FormInputProps,
  FormErrorMessage,
} from "@chakra-ui/react";

type InputProps = FormInputProps & {
  label: string;
  type?: "email" | "text";
  name: string;
  placeholder?: string;
  hasError?: boolean;
  errorMessage?: string;
  isRequired?: boolean;
};
export const Input: FC<InputProps> = ({
  label,
  type = "text",
  placeholder,
  errorMessage,
  name,
  hasError = false,
  isRequired = false,
  ...rest
}) => {
  return (
    <FormControl isRequired={isRequired} isInvalid={hasError}>
      <FormLabel>{label}</FormLabel>
      <FormInput type={type} placeholder={placeholder} name={name} {...rest} />
      {hasError && <FormErrorMessage>{errorMessage}</FormErrorMessage>}
    </FormControl>
  );
};
