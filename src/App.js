import { ThemeProvider } from "@emotion/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import theme from "./theme";
import AppHeader from "./components/AppHeader";
import AppDrawer from "./components/AppDrawer";
import { Stack } from "@mui/material";
import Home from "./views/Home";
import About from "./views/About"; // Example for additional routes
import Proposals from "./views/Proposals";
import Events from "./views/Events";
import { AppContextProvider } from "./contexts/AppContext";

const routes = [
  {
    component: Home,
    path: "/",
  },
  {
    component: About,
    path: "/contacto",
  },
  {
    component: Proposals,
    path: "/propuestas",
  },
  {
    component: Events,
    path: "/eventos",
  },
];

function App() {
  return (
    <AppContextProvider>
      <ThemeProvider theme={theme}>
        <Router>
          <AppHeader />
          <AppDrawer />
          <Stack
            sx={{
              overflowX: { xs: "hidden", md: "auto" },
              marginLeft: "272px",
              marginTop: 10,
            }}
          >
            <Routes>
              {routes.map((route, index) => (
                <Route
                  key={index}
                  element={<route.component />}
                  path={route.path}
                />
              ))}
            </Routes>
          </Stack>
        </Router>
      </ThemeProvider>
    </AppContextProvider>
  );
}

export default App;
