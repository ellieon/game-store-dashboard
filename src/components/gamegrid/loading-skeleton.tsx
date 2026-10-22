import { SimpleGrid } from "@chakra-ui/react";

import GameCardContainer from "./game-container";
import GameCardSkeleton from "./game-skeleton";

const LoadingSkeleton = () => {
  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8];
  return (
    <SimpleGrid
      columns={{ sm: 2, md: 3, lg: 4, xl: 4 }}
      padding="10px"
      gap="40px"
    >
      {skeletons.map((skeleton) => (
        <GameCardContainer key={skeleton}>
          <GameCardSkeleton />
        </GameCardContainer>
      ))}
    </SimpleGrid>
  );
};

export default LoadingSkeleton;
