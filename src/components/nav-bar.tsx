import { Group, HStack, Image } from "@chakra-ui/react";
import ColorModeSwitch from "./color-mode-switch";
import { RiMoonClearFill } from "react-icons/ri";
import LogOutButton from "./log-out-button";

type Props = {
  onLogout: () => void;
};
const NavBar = ({ onLogout }: Props) => {
  return (
    <HStack justifyContent="space-between" padding="10px">
      <RiMoonClearFill size="60px" />
      <Group>
        <ColorModeSwitch></ColorModeSwitch>
        <LogOutButton onLogout={onLogout}></LogOutButton>
      </Group>
    </HStack>
  );
};

export default NavBar;
