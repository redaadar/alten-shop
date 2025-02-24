import { FC, useContext } from "react";
import { FaTrashAlt } from "react-icons/fa";
import {
  Button,
  Center,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerProps,
  IconButton,
  Image,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tr,
} from "@chakra-ui/react";

import { CartContext } from "@/context/CartContext";

export type CartProps = Omit<DrawerProps, "children"> & {
  isOpen: boolean;
  onClose: () => void;
};

export const Cart: FC<CartProps> = ({ isOpen, onClose, ...rest }) => {
  const { items, removeFromCart, setItemCount } = useContext(CartContext);

  const handleChange = (id: number, value: string) => {
    const count = parseInt(value);
    if (isNaN(count) || count < 1) return;
    setItemCount(id, count);
  };

  return (
    <Drawer
      isOpen={isOpen}
      size="xl"
      placement="right"
      onClose={onClose}
      {...rest}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Votre panier</DrawerHeader>

        <DrawerBody>
          {!items?.length ? (
            <Center>
              <Text>La liste des produits est vide</Text>
            </Center>
          ) : (
            <TableContainer>
              <Table variant="striped" colorScheme="teal">
                <Tbody>
                  {items?.map((product) => {
                    return (
                      <Tr key={product?.id}>
                        <Td>
                          <Image
                            src={product?.image}
                            alt={product?.title}
                            w={100}
                          />
                        </Td>
                        <Td>
                          <Text>{product?.title}</Text>
                          <Text>{product?.price} $</Text>
                        </Td>
                        <Td>
                          <NumberInput
                            defaultValue={product?.count}
                            min={1}
                            max={99}
                            onChange={(val) => handleChange(product.id, val)}
                          >
                            <NumberInputField />
                            <NumberInputStepper>
                              <NumberIncrementStepper />
                              <NumberDecrementStepper />
                            </NumberInputStepper>
                          </NumberInput>
                        </Td>
                        <Td>
                          <IconButton
                            icon={<FaTrashAlt />}
                            aria-label="Supprimer"
                            onClick={() => removeFromCart(product?.id)}
                          />
                        </Td>
                      </Tr>
                    );
                  })}
                </Tbody>
              </Table>
            </TableContainer>
          )}
        </DrawerBody>

        <DrawerFooter>
          <Button variant="outline" mr={3} onClick={onClose}>
            Annuler
          </Button>
          <Button colorScheme="blue" isDisabled={!items?.length}>
            Continuer le paiement
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
