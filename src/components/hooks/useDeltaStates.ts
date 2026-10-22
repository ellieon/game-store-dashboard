import getCookie from "../../helper/getCookie";
import { useEffect, useState } from "react";
import apiClient from "../../service/api-client";
import { CanceledError } from "axios";
import { StateMetadata, StateMetadataResponse } from "../../model/api-model";

const useDeltaStates = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [states, setStates] = useState<StateMetadata[]>();

  useEffect(() => {
    const apiKey = getCookie("apiKey");
    if (!apiKey) {
      setError("Invalid API Key");
      return;
    }

    setIsLoading(true);

    apiClient
      .get<StateMetadataResponse>("/delta/get-store-record-metadata", {
        headers: {
          "x-api-key": apiKey,
        },
      })
      .then((res) => {
        setError("");
        setStates(res.data.stateMetadata);
        setIsLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        err.status === 401
          ? setError("Invalid API Key")
          : setError(err.message);
        setIsLoading(false);
      });
  }, []);

  return { isLoading, error, states };
};

export default useDeltaStates;
