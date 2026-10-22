import { Collapsible, Stack, Text, VStack } from "@chakra-ui/react";
import { LuChevronRight } from "react-icons/lu";
import GameGrid from "./game-grid";
import { DeltaCategory } from "@/model/api-model";

type Props = {
  categories: DeltaCategory[];
};

const CategoryList = ({ categories }: Props) => {
  const filteredCategories = categories.filter(
    (category) => category.newGames.length > 0,
  );
  return (
    <>
      {filteredCategories.map((category) => (
        <Collapsible.Root defaultOpen>
          <Collapsible.Trigger paddingY="3" paddingX="5" display="flex" gap="2">
            <Collapsible.Indicator
              transition="transform 0.2s"
              _open={{ transform: "rotate(90deg)" }}
            >
              <LuChevronRight />
            </Collapsible.Indicator>
            <Text textStyle="md">{category.name}</Text>
          </Collapsible.Trigger>
          <Collapsible.Content>
            <GameGrid games={category.newGames} />
          </Collapsible.Content>
        </Collapsible.Root>
      ))}
    </>
  );
};

export default CategoryList;
