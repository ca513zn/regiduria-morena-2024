import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";

const AppDrawer = () => {
  const location = useLocation();

  const menuItems = [
    { text: "Propuestas", path: "/" },
    { text: "Eventos", path: "/eventos" },
    { text: "Contacto", path: "/contacto" },
  ];

  return (
    <Drawer
      open={true}
      variant="persistent"
      PaperProps={{
        sx: {
          paddingTop: 7,
          width: "256px",
          zIndex: 1,
          backgroundColor: "background.paper",
          boxShadow: 2,
        },
      }}
      sx={{
        display: { xs: "none", md: "block" },
      }}
    >
      <List>
        {menuItems.map((item, index) => (
          <ListItem
            button
            key={item.text}
            component={Link}
            to={item.path}
            sx={{
              cursor: "pointer",
              backgroundColor:
                item.path === location.pathname ? "#e0e0e0" : "transparent",
              color: "#000000",
            }}
          >
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
      <Typography
        variant="caption"
        sx={{
          marginTop: "calc(100vh - 26vh)",
          paddingLeft: 1,
        }}
      >
        © 2021 Morena. Todos los derechos reservados.
      </Typography>
    </Drawer>
  );
};

export default AppDrawer;
