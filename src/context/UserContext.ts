import { createContext, useContext } from "react";
export interface UserContextObject {
  apiKey: string | undefined;
}
export const UserContext = createContext<UserContextObject>({ apiKey: "" });

export const useUserContext = () => useContext(UserContext);
