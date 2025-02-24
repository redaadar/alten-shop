import React, { FC } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import {
  FallbackProps,
  ErrorBoundary as ReactErrorBoundary,
} from "react-error-boundary";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Collapse,
  useDisclosure,
} from "@chakra-ui/react";

const ErrorFallback = ({ error }: FallbackProps) => {
  const { isOpen, onToggle } = useDisclosure();
  return (
    <Box p="1" w="full" maxW="30rem" m="auto">
      <Alert status="error" py="2" px="4" borderRadius="md">
        <AlertIcon />
        <Box flex="1">
          <AlertTitle color="error.900" fontSize="xs">
            Une erreur est survenue.
          </AlertTitle>
          <AlertDescription mt="-1" display="block" lineHeight="1.2">
            <Button
              variant="link"
              colorScheme="error"
              size="xs"
              rightIcon={isOpen ? <FiChevronUp /> : <FiChevronDown />}
              onClick={onToggle}
            >
              Afficher le détail
            </Button>
            <Collapse in={isOpen} animateOpacity>
              <Box mt={4} fontFamily="monospace">
                {error.message}
              </Box>
            </Collapse>
          </AlertDescription>
        </Box>
      </Alert>
    </Box>
  );
};

export const ErrorBoundary: FC<React.PropsWithChildren> = (props) => {
  return <ReactErrorBoundary FallbackComponent={ErrorFallback} {...props} />;
};
