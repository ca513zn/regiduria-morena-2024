import React from "react";
import { Drawer, List, ListItem, ListItemText } from "@mui/material";

const AppDrawer = () => {
  return (
    <Drawer
      open={true}
      variant="persistent"
      PaperProps={{
        sx: {
          paddingTop: 8,
          paddingX: 1,
          width: "256px",
          zIndex: 1,
          backgroundColor: "background.paper",
          boxShadow: "none",
          border: "none",
        },
      }}
      //   onClose={() => setOpen(false)}
    >
      <List>
        {["Inicio", "Propuestas", "Eventos", "Contacto"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default AppDrawer;
