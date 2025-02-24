import { FC, ReactNode } from "react";
import { Flex, FlexProps } from "@chakra-ui/react";

import { Sidebar } from "@/components/Sidebar";
import { CartProvider } from "@/context/CartContext";
export type LayoutProps = FlexProps & {
  children: ReactNode;
};

export const Layout: FC<LayoutProps> = ({ children, ...rest }) => {
  return (
    <Flex position="relative" zIndex="1" flex="1" w="full" {...rest}>
      <CartProvider>
        <Sidebar zIndex="3" />
        <Flex flex="1" direction="column" pl="28">
          {children}
        </Flex>
      </CartProvider>
    </Flex>
  );
};
