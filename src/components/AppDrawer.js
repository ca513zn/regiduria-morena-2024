import React from "react";
import { Drawer, List, ListItem, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";

const AppDrawer = () => {
  const menuItems = [
    { text: "Inicio", path: "/" },
    { text: "Propuestas", path: "/propuestas" },
    { text: "Eventos", path: "/eventos" },
    { text: "Contacto", path: "/contacto" },
  ];

  return (
    <Drawer
      open={true}
      variant="persistent"
      PaperProps={{
        sx: {
          paddingTop: 8,
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
            }}
          >
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default AppDrawer;
