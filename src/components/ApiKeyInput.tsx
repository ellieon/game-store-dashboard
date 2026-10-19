import { useState } from "react";

export interface ApiKeyInputProps {
  onSubmit: (item: string) => void;
}
function ApiKeyInput({ onSubmit }: ApiKeyInputProps) {
  const [key, setKey] = useState("");

  function handleSubmit(e: any) {
    e.preventDefault();
    setCookieFunction("apiKey", key, 30);
    onSubmit(key);
  }

  function handleChange(e: any) {
    setKey(e.target.value);
  }

  const setCookieFunction = (name: string, value: string, days: number) => {
    let expires = "";
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie =
      name + "=" + value + expires + "; path=/" + ";secure=true";
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Enter your API Key:
        <input type="text" value={key} onChange={handleChange} />
      </label>
      <input type="submit" />
    </form>
  );
}

export default ApiKeyInput;
