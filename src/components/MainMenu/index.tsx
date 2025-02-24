import { FC } from "react";
import { FaCartPlus } from "react-icons/fa";
import {
  Button,
  SimpleGrid,
  SimpleGridProps,
  useDisclosure,
} from "@chakra-ui/react";

import { MainMenuItem } from "@/components/MainMenuItem";
import { useCart } from "@/context/CartContext";
import { Cart } from "@/components/Cart";

type MainMenuProps = SimpleGridProps;
export const MainMenu: FC<MainMenuProps> = ({ ...rest }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { countItems } = useCart();

  return (
    <SimpleGrid columns={1} w="full" spacing="2" {...rest}>
      <MainMenuItem to="/" title="Accueil" />
      <MainMenuItem to="/contact" title="Contact" />
      <Button leftIcon={<FaCartPlus />} variant="unstyled" onClick={onOpen}>
        Panier {countItems()}
      </Button>
      <Cart isOpen={isOpen} onClose={onClose} />
    </SimpleGrid>
  );
};
