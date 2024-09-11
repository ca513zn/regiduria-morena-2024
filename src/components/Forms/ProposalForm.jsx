import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Container,
  Stack,
  Typography,
  IconButton,
} from "@mui/material";
import { useAppContext } from "../../contexts/AppContext";
import { AddPhotoAlternate, Delete } from "@mui/icons-material";

const ProposalForm = ({ proposal = null, onSubmit }) => {
  const { setState } = useAppContext();
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
    images: [], // For storing images
  });

  const [imagePreviews, setImagePreviews] = useState([]);

  // If a proposal is passed via props, update the form state accordingly (for editing).
  useEffect(() => {
    if (proposal) {
      setFormState(proposal);
      setImagePreviews(proposal.images || []);
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

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    const newImages = files.map((file) => URL.createObjectURL(file));
    setImagePreviews((prevPreviews) => [...prevPreviews, ...newImages]);

    // Add the files to formState
    setFormState((prevState) => ({
      ...prevState,
      images: [...prevState.images, ...files],
    }));
  };

  const handleDeleteImage = (index) => {
    setImagePreviews((prevPreviews) =>
      prevPreviews.filter((_, i) => i !== index)
    );
    setFormState((prevState) => ({
      ...prevState,
      images: prevState.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setState((prevState) => ({
      ...prevState,
      proposals: [...prevState.proposals, formState],
    }));
    onSubmit();
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
            label="Nombre del Solicitante"
            name="name"
            value={formState.name}
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
          <TextField
            label="Descripción"
            name="description"
            value={formState.description}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />

          {/* Image Upload */}
          <Button
            variant="outlined"
            component="label"
            startIcon={<AddPhotoAlternate />}
          >
            Subir Imágenes
            <input
              type="file"
              multiple
              hidden
              accept="image/*"
              onChange={handleImageChange}
            />
          </Button>

          {/* Image Previews */}
          <Stack direction="row" spacing={2} sx={{ flexWrap: "wrap" }}>
            {imagePreviews.map((image, index) => (
              <div
                key={index}
                style={{ position: "relative", display: "inline-block" }}
              >
                <img
                  src={image}
                  alt={`Preview ${index}`}
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                  }}
                />
                <IconButton
                  sx={{ position: "absolute", top: 0, right: 0 }}
                  size="small"
                  color="error"
                  onClick={() => handleDeleteImage(index)}
                >
                  <Delete />
                </IconButton>
              </div>
            ))}
          </Stack>

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
