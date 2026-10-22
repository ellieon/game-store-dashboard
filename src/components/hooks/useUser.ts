import { useEffect, useState } from "react";
import { UserPreferences } from "../../model/api-model";
import apiClient from "../../service/api-client";
import { CanceledError } from "axios";

type Props = {
  apiKey: string;
  onLogin: (apiKey: string) => void;
};
const useUser = ({ apiKey, onLogin }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState<UserPreferences>();

  useEffect(() => {
    if (!apiKey) return;
    setIsLoading(true);
    apiClient
      .get<UserPreferences>("/user/preferences", {
        headers: {
          "x-api-key": apiKey,
        },
      })
      .then((data) => {
        setError("");
        setIsLoading(false);
        setUser(data.data);
        console.log(onLogin);
        onLogin(apiKey);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        err.status === 401
          ? setError("Invalid API Key")
          : setError(err.message);
        setIsLoading(false);
      });
  }, [apiKey]);

  return { isLoading, error, user };
};

export default useUser;
