import { FC } from "react";
import {
  FormControl,
  FormLabel,
  Textarea as FormTextarea,
  TextareaProps as FormTextareaProps,
  FormErrorMessage,
} from "@chakra-ui/react";

type TextareaProps = FormTextareaProps & {
  label: string;
  errorMessage?: string;
  placeholder?: string;
  name: string;
  hasError?: boolean;
  isRequired?: boolean;
};
export const Textarea: FC<TextareaProps> = ({
  label,
  errorMessage,
  placeholder,
  name,
  hasError = false,
  isRequired = false,
  ...rest
}) => {
  return (
    <FormControl isRequired={isRequired} isInvalid={hasError}>
      <FormLabel>{label}</FormLabel>
      <FormTextarea placeholder={placeholder} name={name} {...rest} />
      {hasError && <FormErrorMessage>{errorMessage}</FormErrorMessage>}
    </FormControl>
  );
};
