import { FC } from "react";
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardHeader,
  CardProps,
  Heading,
  Stack,
} from "@chakra-ui/react";
import * as Yup from "yup";
import { Formik, FormikHelpers } from "formik";

import { Input } from "@/components/Input";
import { Textarea } from "@/components/Textarea";

type ContactProps = CardProps;

type FormValues = {
  email: string;
  message: string;
};

export const Contact: FC<ContactProps> = ({ ...rest }) => {
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email invalide")
      .required("Email est obligatoire"),
    message: Yup.string().max(
      300,
      "Le message doit contenir moins de 300 caractères"
    ),
  });

  const initialValues = {
    email: "",
    message: "",
  };

  const handleSubmit = (
    values: FormValues,
    actions: FormikHelpers<FormValues>
  ) => {
    alert(JSON.stringify(values, null, 2));
    actions.setSubmitting(false);
  };

  return (
    <Card {...rest}>
      <CardHeader>
        <Heading as="h1" size="md">
          Contact
        </Heading>
      </CardHeader>
      <CardBody>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <form onSubmit={handleSubmit}>
              <Stack spacing={4}>
                <Input
                  label="Email"
                  name="email"
                  placeholder="Saisir votre E-mail"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  hasError={!!(touched.email && errors.email)}
                  errorMessage={errors.email}
                />
                <Textarea
                  label="Message"
                  placeholder="Saisir votre message"
                  name="message"
                  value={values.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  hasError={!!(touched.message && errors.message)}
                  errorMessage={errors.message}
                />
                <ButtonGroup justifyContent="flex-end" flex="1" display="flex">
                  <Button
                    type="submit"
                    disabled={
                      isSubmitting || !!(errors.email && errors.message)
                    }
                    bg="green.500"
                  >
                    {isSubmitting ? "Envoi..." : "Envoyer"}
                  </Button>
                </ButtonGroup>
              </Stack>
            </form>
          )}
        </Formik>
      </CardBody>
    </Card>
  );
};
