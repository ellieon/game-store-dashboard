import { Switch } from "@chakra-ui/react";
import { useColorMode } from "./ui/color-mode";
const ColorModeSwitch = () => {
  const { toggleColorMode, colorMode } = useColorMode();

  return (
    <Switch.Root
      checked={colorMode === "dark"}
      colorPalette="purple"
      onCheckedChange={toggleColorMode}
    >
      <Switch.HiddenInput />
      <Switch.Control />
      <Switch.Label>Dark Mode</Switch.Label>
    </Switch.Root>
  );
};

export default ColorModeSwitch;
