import { FC } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";

import { Box, BoxProps } from "@chakra-ui/react";

type MainMenuItemProps = BoxProps & {
  to: string;
  title: string;
};
export const MainMenuItem: FC<MainMenuItemProps> = ({ to, title, ...rest }) => {
  const { pathname } = useLocation();
  const isActive = pathname === to;
  return (
    <Box
      as={RouterLink}
      to={to}
      color={isActive ? "white" : "blackAlpha.700"}
      bg={isActive ? "blue.600" : undefined}
      p={2}
      boxShadow={isActive ? "inset 0 0 20px rgba(0, 0, 0, 0.05)" : undefined}
      {...rest}
    >
      {title}
    </Box>
  );
};
