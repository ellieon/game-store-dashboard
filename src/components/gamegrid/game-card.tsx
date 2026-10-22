import { Game } from "@/model/api-model";
import { Card, Center, HStack, Image, Text } from "@chakra-ui/react";
type Props = {
  item: Game;
};

const GameCard = ({ item }: Props) => {
  return (
    <Card.Root background="purple.800">
      <Card.Body>
        <Center>
          <Image
            background="gray.100"
            fit="contain"
            width="600px"
            height="400px"
            borderRadius={10}
            src={item.image}
          />
        </Center>
        <HStack justify="space-between">
          <Card.Title fontSize="md">{item.boxName}</Card.Title>
          <Text textStyle="xl">£{item.sellPrice}</Text>
        </HStack>
      </Card.Body>
    </Card.Root>
  );
};

export default GameCard;
