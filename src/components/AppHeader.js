import React, { useState } from "react";
import {
  AppBar,
  Avatar,
  IconButton,
  Stack,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
} from "@mui/material";
import { Link } from "react-router-dom";

const AppHeader = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        boxShadow: "none",
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
            <Stack
              sx={{ backgroundColor: "#fff", padding: 0.5, borderRadius: 1 }}
            >
              <img src="/Morena_logotipo.png" alt="Morena" width="120" />
            </Stack>
          </Stack>
          <Stack
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <Typography
              sx={{
                fontWeight: 900,
              }}
            >
              Ricardo Taja
            </Typography>
            <IconButton onClick={handleMenuOpen}>
              <Avatar src="/taja1.png" />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              PaperProps={{
                sx: {
                  width: "230px",
                },
              }}
            >
              <MenuItem component={Link} to="/" onClick={handleMenuClose}>
                Inicio
              </MenuItem>
              <MenuItem
                component={Link}
                to="/propuestas"
                onClick={handleMenuClose}
              >
                Propuestas
              </MenuItem>
              <MenuItem
                component={Link}
                to="/eventos"
                onClick={handleMenuClose}
              >
                Eventos
              </MenuItem>
              <MenuItem
                component={Link}
                to="/contacto"
                onClick={handleMenuClose}
              >
                Contacto
              </MenuItem>
              <MenuItem>Salir</MenuItem>
            </Menu>
          </Stack>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default AppHeader;
