import { FC } from "react";
import { Image, Stack, StackProps } from "@chakra-ui/react";

import { MainMenu } from "@/components/MainMenu";
import LOGO from "@/assets/logo.svg";

type SidebarProps = StackProps;

export const Sidebar: FC<SidebarProps> = ({ ...rest }) => {
  return (
    <Stack
      position="fixed"
      alignItems="flex-start"
      top="0"
      left="0"
      bottom="0"
      bg="white"
      boxShadow="lg"
      overflowX="hidden"
      overflowY="auto"
      {...rest}
    >
      <Image src={LOGO} alt="ALTEN" boxSize="24" objectFit="cover" />
      <MainMenu />
    </Stack>
  );
};
