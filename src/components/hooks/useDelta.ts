import getCookie from "../../helper/getCookie";
import { useEffect, useState } from "react";
import apiClient from "../../service/api-client";
import { CanceledError } from "axios";
import { DeltaStore, UserDeltaResponse } from "../../model/api-model";

const useDelta = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [stores, setStores] = useState<DeltaStore[]>([]);
  const [stateId, setStateId] = useState(-1);
  const [refreshDeltaFlag, setRefreshDeltaFlag] = useState(false);

  const refreshDelta = () => {
    setRefreshDeltaFlag(!refreshDeltaFlag);
  };

  useEffect(() => {
    const apiKey = getCookie("apiKey");
    if (!apiKey) return;

    setIsLoading(true);
    let url = "/delta/get-store-delta";
    if (stateId > -1) url += `?stateId=${stateId}`;

    apiClient
      .get<UserDeltaResponse>(url, {
        headers: {
          "x-api-key": apiKey,
        },
      })
      .then((res) => {
        setError("");
        setStores(res.data.stores);
        setIsLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        err.status === 401
          ? setError("Invalid API Key")
          : setError(err.message);
        setIsLoading(false);
      });
  }, [refreshDeltaFlag, stateId]);

  return { isLoading, error, stores, setStateId, refreshDelta };
};

export default useDelta;
