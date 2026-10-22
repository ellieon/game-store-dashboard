import { Grid, GridItem } from "@chakra-ui/react";
import "./App.css";
import LoginForm from "./components/login/LoginForm";
import useApiKey from "./components/hooks/useApiKey";
import StoreList from "./components/gamegrid/store-list";
import NavBar from "./components/nav-bar";
import { UserContext } from "./context/UserContext";

function App() {
  const { apiKey, setApiKeyCookie } = useApiKey();

  return (
    <Grid templateAreas={{ base: `"nav" "main"`, lg: `"nav" "main"` }}>
      <GridItem area="nav">
        <NavBar onLogout={() => setApiKeyCookie("")} />
      </GridItem>
      <GridItem area="main">
        {!apiKey && <LoginForm onLogin={setApiKeyCookie}></LoginForm>}
        <UserContext.Provider value={{ apiKey }}>
          {apiKey && <StoreList />}
        </UserContext.Provider>
      </GridItem>
    </Grid>
  );
}
export default App;
