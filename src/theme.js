import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#A50051", // Magenta/pink from the background and text
    },
    secondary: {
      main: "#581845", // Darker magenta from the cap
    },
    error: {
      main: "#D9A382", // Skin tone as an accent color
    },
    background: {
      default: "#FFFFFF", // White from the text
    },
    text: {
      primary: "#000000", // Black from the outline
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
  },
});

export default theme;
