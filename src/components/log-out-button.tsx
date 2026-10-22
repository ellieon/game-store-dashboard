import { Button } from "@chakra-ui/react";

type Props = {
  onLogout: () => void;
};

const LogOutButton = ({ onLogout }: Props) => {
  return (
    <Button colorPalette="red" onClick={onLogout}>
      Logout
    </Button>
  );
};

export default LogOutButton;
