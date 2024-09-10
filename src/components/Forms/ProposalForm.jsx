import React, { useState, useEffect } from "react";
import { TextField, Button, Container, Stack } from "@mui/material";

const ProposalForm = ({ proposal = null, onSubmit }) => {
  // If a proposal is provided, we use it for editing; otherwise, use default values for creating a new proposal.
  const [formState, setFormState] = useState({
    name: "",
    description: "",
    date_registered: new Date(),
    status: "pending",
    author: "",
    address: {
      street: "",
      number: "",
      neighborhood: "",
    },
  });

  // If a proposal is passed via props, update the form state accordingly (for editing).
  useEffect(() => {
    if (proposal) {
      setFormState(proposal);
    }
  }, [proposal]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    // Handle nested address fields separately
    if (name.includes("address.")) {
      const field = name.split(".")[1]; // Get the field after 'address.'
      setFormState((prevState) => ({
        ...prevState,
        address: {
          ...prevState.address,
          [field]: value,
        },
      }));
    } else {
      setFormState((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(formState);
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <Stack
          direction="column"
          spacing={2}
          sx={{
            width: "100%",
            paddingY: 1,
          }}
        >
          <TextField
            label="Nombre"
            name="name"
            value={formState.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Descripción"
            name="description"
            value={formState.description}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Autor"
            name="author"
            value={formState.author}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Calle"
            name="address.street"
            value={formState.address.street}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Número"
            name="address.number"
            value={formState.address.number}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Colonia"
            name="address.neighborhood"
            value={formState.address.neighborhood}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{
              width: "200px",
              alignSelf: "flex-end",
            }}
          >
            {proposal ? "Editar Propuesta" : "Crear Propuesta"}
          </Button>
        </Stack>
      </form>
    </Container>
  );
};

export default ProposalForm;
