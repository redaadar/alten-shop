import { FC } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  CardProps,
  Divider,
  Heading,
  IconButton,
  Image,
  Stack,
  Text,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import { FiEye } from "react-icons/fi";

import { ProductItem } from "@/components/Product/Product.type";
import { ProductModal } from "@/components/ProductModal";
import { useCart } from "@/context/CartContext";

type ProductProps = CardProps & {
  product: ProductItem;
};

export const Product: FC<ProductProps> = ({ product, ...rest }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { addToCart } = useCart();

  return (
    <Card maxW="sm" {...rest}>
      <CardBody>
        <Box overflow="hidden" h={200} display="flex" justifyContent="center">
          <Image
            src={product?.image}
            alt={product?.title}
            borderRadius="lg"
            resize="block"
          />
        </Box>
        <Stack mt="6" spacing="3">
          <Tooltip label={product?.title}>
            <Heading size="sm" noOfLines={1}>
              {product?.title}
            </Heading>
          </Tooltip>
          <Text color="blue.600" fontSize="2xl">
            $ {product?.price}
          </Text>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter justifyContent="flex-end">
        <ButtonGroup>
          <Button
            variant="solid"
            colorScheme="blue"
            onClick={() => addToCart(product)}
          >
            Ajouter au panier
          </Button>
          <IconButton
            icon={<FiEye />}
            onClick={onOpen}
            aria-label="afficher le détail"
            colorScheme="green"
          />
        </ButtonGroup>
      </CardFooter>
      <ProductModal product={product} isOpen={isOpen} onClose={onClose} />
    </Card>
  );
};
