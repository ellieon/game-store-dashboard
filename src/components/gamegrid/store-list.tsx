import { Card, Collapsible, HStack, Text } from "@chakra-ui/react";
import useDelta from "../hooks/useDelta";
import { LuChevronRight } from "react-icons/lu";
import LoadingSkeleton from "./loading-skeleton";
import CategoryList from "./category-list";
import StateMetadataList from "./state-metadata-list";
import { useEffect, useState } from "react";

const StoreList = () => {
  const { error, stores, isLoading, setStateId, refreshDelta } = useDelta();
  const [refresh, setRefresh] = useState(false);

  const MINUTE_MS = 60_000;

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      console.log("Timeout " + new Date().toString());
      refreshDelta();
      setRefresh(!refresh);
    }, MINUTE_MS * 15);

    return () => clearTimeout(timeoutId);
  }, [refresh]);
  return (
    <>
      <Card.Root margin={7} padding={2}>
        <Card.Header>
          <HStack>
            <Text textStyle="4xl">{error || "Store Delta"}</Text>

            <StateMetadataList
              onStateSelected={setStateId}
              onRefreshClicked={refreshDelta}
            ></StateMetadataList>
          </HStack>
        </Card.Header>
        <Card.Body>
          {isLoading && <LoadingSkeleton />}
          {stores.map((store) => (
            <Collapsible.Root defaultOpen>
              <Collapsible.Trigger paddingY="3" display="flex" gap="2">
                <Collapsible.Indicator
                  transition="transform 0.2s"
                  _open={{ transform: "rotate(90deg)" }}
                >
                  <LuChevronRight />
                </Collapsible.Indicator>
                <Text textStyle="2xl">{store.name}</Text>
              </Collapsible.Trigger>
              <Collapsible.Content>
                <CategoryList categories={store.categories} />
              </Collapsible.Content>
            </Collapsible.Root>
          ))}
        </Card.Body>
        <Card.Footer />
      </Card.Root>
    </>
  );
};

export default StoreList;
