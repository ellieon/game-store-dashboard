import { useEffect, useState } from "react";
import axios from "axios";
import { DeltaResponseObject } from "./model/dashboardApiModel";
import DeltaList from "./components/DeltaList";
import ApiKeyInput from "./components/ApiKeyInput";

function App() {
  const handleSelectItem = (item: string) => {
    console.log(item);
  };

  const getCookie = (): string | undefined => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; apiKey=`);
    if (parts.length === 2) return parts.pop()?.split(";").shift();
    return undefined;
  };

  const [delta, setDelta] = useState<DeltaResponseObject>();
  const [message, setMessage] = useState<string>("Enter API Key");
  const [apiKey, setKey] = useState<string>(getCookie() || "");

  const handleApiKeyChange = (key: string) => {
    setKey(key);
  };

  useEffect(() => {
    setMessage("Fetching Delta");
    axios
      .get("https://api.vertigomoon.co.uk/delta/get-store-delta", {
        headers: {
          "x-api-key": apiKey,
        },
      })
      .then((response) => {
        setDelta(response.data);
        setMessage("");
      })
      .catch((error) => {
        console.log(error.status);
        if (error.status === 401) {
          setMessage("Invalid API Key");
        } else {
          setMessage("Error Reaching API");
        }
      });
  }, [apiKey]);

  if (delta == undefined)
    return (
      <>
        {message}
        <ApiKeyInput onSubmit={handleApiKeyChange}></ApiKeyInput>
      </>
    );

  return (
    <div>
      {message}
      <DeltaList delta={delta} onSelectItem={handleSelectItem} />
    </div>
  );
}

export default App;
