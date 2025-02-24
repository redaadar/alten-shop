import { FC } from "react";
import {
  Center,
  Grid,
  GridItem,
  Spinner,
  Stack,
  StackProps,
  Text,
} from "@chakra-ui/react";

import { useProducts } from "@/components/Products/Products.service";
import { ProductItem } from "@/components/Product/Product.type";
import { Product } from "@/components/Product";

type ProductsProps = StackProps;

export const Products: FC<ProductsProps> = () => {
  const { data: products, isError, isLoading } = useProducts();

  if (isLoading) {
    return (
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    );
  }

  if (isError) {
    return (
      <Stack layerStyle="layoutBox" p={4} bg="gray" flex={1}>
        <Center>
          <Text>Erreur lors de chargement des produits</Text>
        </Center>
      </Stack>
    );
  }

  return (
    <Grid
      templateColumns={{
        base: "repeat(1, 1fr)",
        md: "repeat(2, 1fr)",
        lg: "repeat(3, 1fr)",
        xl: "repeat(4, 1fr)",
      }}
      gap={4}
    >
      {products?.map((product: ProductItem) => (
        <GridItem key={product.id}>
          <Product product={product} />
        </GridItem>
      ))}
    </Grid>
  );
};
