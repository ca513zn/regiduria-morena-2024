import React, { useEffect, useState } from "react";
import {
  AppBar,
  Avatar,
  IconButton,
  Stack,
  Toolbar,
  Menu,
  MenuItem,
  Badge,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { Notifications } from "@mui/icons-material";
import { useAppContext } from "../contexts/AppContext";

const AppHeader = () => {
  const { unread_notifications, proposals, auth } = useAppContext();
  const { user } = auth;
  const [anchorEl, setAnchorEl] = useState(null);
  const [counter, setCounter] = useState(0);
  const [menuId, setMenuId] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    setCounter(unread_notifications);
  }, [unread_notifications]);

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
          {auth.user ? (
            <Stack
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <IconButton
                onClick={(e) => {
                  setCounter(0);
                  handleMenuOpen(e);
                  setMenuId("notifications");
                }}
              >
                <Badge badgeContent={counter} color="error">
                  <Notifications sx={{ fill: "#fff" }} />
                </Badge>
              </IconButton>
              <IconButton
                onClick={(e) => {
                  handleMenuOpen(e);
                  setMenuId("profile");
                }}
              >
                <Avatar
                  src={user.avatar}
                  sx={{
                    height: 50,
                    width: 50,
                  }}
                />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                PaperProps={{
                  sx: {
                    width: menuId === "notifications" ? 300 : 200,
                  },
                }}
              >
                {menuId === "notifications" && (
                  <>
                    {proposals.map((proposal, index) => (
                      <MenuItem key={index} onClick={handleMenuClose}>
                        <Stack
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                          }}
                        >
                          <Typography
                            sx={{ fontWeight: 900, fontSize: "0.9rem" }}
                          >
                            {proposal.title}
                          </Typography>
                          <Typography
                            sx={{
                              fontWeight: 400,
                              fontSize: "0.7rem",
                              color: "text.secondary",
                            }}
                          >
                            {proposal.title}
                          </Typography>
                        </Stack>
                      </MenuItem>
                    ))}
                  </>
                )}
                {menuId === "profile" && (
                  <>
                    <MenuItem component={Link} to="/" onClick={handleMenuClose}>
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
                  </>
                )}
              </Menu>
            </Stack>
          ) : (
            <Stack
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <Typography variant="h6">Bienvenidos!</Typography>
            </Stack>
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default AppHeader;
