import { SimpleGrid, Text } from "@chakra-ui/react";
import GameCardContainer from "./game-container";
import GameCard from "./game-card";
import { Game } from "@/model/api-model";

type Props = {
  games: Game[];
};
const GameGrid = ({ games }: Props) => {
  return (
    <>
      <SimpleGrid
        minChildWidth="sm"
        justifyContent="start"
        padding="10px"
        gap="40px"
      >
        {games.map((game) => (
          <GameCardContainer key={game.id}>
            <GameCard item={game} />
          </GameCardContainer>
        ))}
      </SimpleGrid>
    </>
  );
};

export default GameGrid;
