import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import React from "react";

const DialogComponent = ({ children, title, open, onClose }) => {
  return (
    <Dialog fullWidth open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent dividers>{children}</DialogContent>
    </Dialog>
  );
};

export default DialogComponent;
