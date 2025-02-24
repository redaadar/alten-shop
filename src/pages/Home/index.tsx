import { Products } from "@/components/Products";
import { Heading, Stack } from "@chakra-ui/react";

export const Home = () => {
  return (
    <Stack boxShadow="md" borderRadius="md" p={4} border="1px solid gray.200">
      <Heading as="h1" size="md" mb={4}>
        Produits
      </Heading>
      <Products />
    </Stack>
  );
};
