import { Card, Skeleton } from "@chakra-ui/react";

const GameCardSkeleton = () => {
  return (
    <Card.Root>
      <Skeleton height="200px" />
    </Card.Root>
  );
};

export default GameCardSkeleton;
