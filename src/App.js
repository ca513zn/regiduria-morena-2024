import { ThemeProvider } from "@emotion/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import theme from "./theme";
import AppHeader from "./components/AppHeader";
import AppDrawer from "./components/AppDrawer";
import { Stack } from "@mui/material";
import Home from "./views/Home";
import About from "./views/About"; // Example for additional routes
import Events from "./views/Events";
import { useAppContext } from "./contexts/AppContext";
import Login from "./views/Login";
import { useEffect } from "react";

const routes = [
  {
    component: Home,
    path: "/",
    auth: true,
    admin: true,
  },
  {
    component: About,
    path: "/contacto",
    auth: true,
  },
  {
    component: Events,
    path: "/eventos",
    auth: true,
  },
];

function App() {
  const {
    auth: { user = null },
    setAuth,
  } = useAppContext();
  useEffect(() => {
    //check if local storage has localStorage.setItem("user", JSON.stringify(user));
    const user = localStorage.getItem("user");
    if (user) {
      setAuth(JSON.parse(user));
    }
  }, [setAuth]);
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <AppHeader />
        {user && <AppDrawer />}
        <Stack
          sx={{
            overflowX: { xs: "hidden", md: "auto" },
            marginLeft: {
              xs: 0,
              md: user ? "264px" : "0",
            },
            marginTop: 10,
            paddingBottom: 6,
          }}
        >
          <Routes>
            {routes.map((route, index) => {
              const { component: Component, path, auth, admin } = route;
              if (auth && !user) {
                return <Route key={index} element={<Login />} path={path} />;
              }
              return <Route key={index} element={<Component />} path={path} />;
            })}
          </Routes>
        </Stack>
      </Router>
    </ThemeProvider>
  );
}

export default App;
