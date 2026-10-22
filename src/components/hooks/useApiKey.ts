import setCookie from "../../helper/setCookie";
import getCookie from "../../helper/getCookie";
import { useEffect, useState } from "react";

const useApiKey = () => {
  const [apiKey, setApiKey] = useState<string | undefined>("");

  const setApiKeyCookie = (apiKey: string) => {
    setCookie("apiKey", apiKey, 30);
    setApiKey(apiKey);
  };
  useEffect(() => setApiKey(getCookie("apiKey")));
  return { apiKey, setApiKeyCookie };
};
export default useApiKey;
