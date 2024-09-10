import { ThemeProvider } from "@emotion/react";
import theme from "./theme";
import AppHeader from "./components/AppHeader";
import AppDrawer from "./components/AppDrawer";
import { Button, Stack, useMediaQuery } from "@mui/material";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AppHeader />
      <AppDrawer />
      <Stack
        sx={{
          overflowX: { xs: "hidden", md: "auto" },
          marginLeft: "256px",
          marginTop: 8,
        }}
      ></Stack>
    </ThemeProvider>
  );
}

export default App;
