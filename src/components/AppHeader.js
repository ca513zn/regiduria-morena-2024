import React from "react";
import {
  AppBar,
  Avatar,
  Button,
  Container,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";

const AppHeader = () => {
  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar>
        <Stack
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            flexDirection: "row",
          }}
        >
          <Stack
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <Avatar sx={{ marginRight: 2 }} src="/taja1.png" />
            <Typography variant="h6">Regiduria Morena</Typography>
          </Stack>
          <Stack
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <Typography>Ricardo Taja</Typography>
            <IconButton>
              <Avatar src="/taja1.png" />
            </IconButton>
          </Stack>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default AppHeader;
