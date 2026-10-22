import { ChangeEvent, ChangeEventHandler, useEffect, useState } from "react";
import { Button, Field, HStack, NativeSelect } from "@chakra-ui/react";
import useDeltaStates from "../hooks/useDeltaStates";

export interface StateMetadataListProps {
  onStateSelected: (id: number) => void;
  onRefreshClicked: () => void;
}

function StateMetadataList({
  onStateSelected,
  onRefreshClicked,
}: StateMetadataListProps) {
  const { isLoading, states } = useDeltaStates();

  const onStateSelectionChange = (event: ChangeEvent<HTMLSelectElement>) => {
    console.log("State selection change", event.target.value);
    onStateSelected(Number(event.target.value));
  };

  return (
    <HStack className="row mb-3">
      <Field.Root orientation="horizontal">
        <Field.Label textStyle="4xl">Since:</Field.Label>
        <NativeSelect.Root>
          <NativeSelect.Field onChange={onStateSelectionChange}>
            <option id="filter-box" value="-1" className="form-control">
              {!isLoading ? "Yesterday" : "Fetching"}
            </option>
            {states
              ?.slice(0)
              .reverse()
              .map((state) => (
                <option key={state.stateId} value={state.stateId}>
                  {state.date.toString()}
                </option>
              ))}
          </NativeSelect.Field>
          <NativeSelect.Indicator />
        </NativeSelect.Root>
        <Button className="btn btn-primary col-sm-1" onClick={onRefreshClicked}>
          Refresh
        </Button>
      </Field.Root>
    </HStack>
  );
}

export default StateMetadataList;
