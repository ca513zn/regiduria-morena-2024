import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Container,
  Stack,
  Typography,
  IconButton,
  Checkbox,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { useAppContext } from "../../contexts/AppContext";
import { AddPhotoAlternate, Delete } from "@mui/icons-material";
import { request_types } from "../../constants";

const ProposalForm = ({ proposal = null, onSubmit }) => {
  const { setState } = useAppContext();

  const [formState, setFormState] = useState({
    name: "",
    id: Date.now(),
    description: "",
    date_registered: new Date(),
    status: "pending",
    author: "",
    address: {
      street: "",
      number: "",
      neighborhood: "",
    },
    request_type: "", // Stores the selected request type
    category: "", // Stores the selected category
    images: [], // Array for storing image file objects and URLs
    terms_agreed: false, // This will control the checkbox state
  });

  const [imagePreviews, setImagePreviews] = useState([]);

  // Handle when the form is in edit mode and a proposal is provided.
  useEffect(() => {
    if (proposal) {
      setFormState(proposal);

      // Set image previews using the existing URLs if editing a proposal
      if (proposal.images) {
        setImagePreviews(proposal.images); // Assume `proposal.images` contains URLs or file paths
      }
    }
  }, [proposal]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name.includes("address.")) {
      const field = name.split(".")[1];
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

    // Create object URLs for preview
    const newPreviews = files.map((file) => URL.createObjectURL(file));

    setImagePreviews((prevPreviews) => [...prevPreviews, ...newPreviews]);

    // Add files to the formState
    setFormState((prevState) => ({
      ...prevState,
      images: [...prevState.images, ...files],
    }));
  };

  const handleDeleteImage = (index) => {
    // Remove from previews
    setImagePreviews((prevPreviews) =>
      prevPreviews.filter((_, i) => i !== index)
    );

    // Remove from formState
    setFormState((prevState) => ({
      ...prevState,
      images: prevState.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (proposal) {
      // If editing a proposal, update the existing proposal
      setState((prevState) => ({
        ...prevState,
        proposals: prevState.proposals.map((p) =>
          p.name === proposal.name ? formState : p
        ),
      }));
      onSubmit();
      return;
    }
    setState((prevState) => ({
      ...prevState,
      proposals: [...prevState.proposals, formState],
    }));
    onSubmit();
  };

  const handleTermsAgreedChange = (event) => {
    const { checked } = event.target;
    setFormState((prevState) => ({
      ...prevState,
      terms_agreed: checked,
    }));
  };

  // Handle changes in the request type and category selection
  const handleRequestTypeChange = (event) => {
    setFormState((prevState) => ({
      ...prevState,
      request_type: event.target.value,
      category: "", // Reset category when request type changes
    }));
  };

  const handleCategoryChange = (event) => {
    setFormState((prevState) => ({
      ...prevState,
      category: event.target.value,
    }));
  };

  // Find categories for the selected request type
  const selectedRequestType = request_types.find(
    (type) => type.name === formState.request_type
  );

  return (
    <Container disableGutters>
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

          {/* Request Type Dropdown */}
          <FormControl fullWidth margin="normal">
            <InputLabel>Tipo de Petición</InputLabel>
            <Select
              value={formState.request_type}
              onChange={handleRequestTypeChange}
              label="Tipo de Petición"
            >
              {request_types.map((type) => (
                <MenuItem key={type.name} value={type.name}>
                  {type.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Category Dropdown (only if a request type is selected) */}
          {selectedRequestType && (
            <FormControl fullWidth margin="normal">
              <InputLabel>Categoría</InputLabel>
              <Select
                value={formState.category}
                onChange={handleCategoryChange}
                label="Categoría"
              >
                {selectedRequestType.categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}

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
                  src={
                    typeof image === "string"
                      ? image
                      : URL.createObjectURL(image)
                  }
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

          {/* Terms and Conditions */}
          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            sx={{
              backgroundColor: "#f3f3f3",
              color: "#444",
              padding: 1,
              borderRadius: 1,
            }}
          >
            <Checkbox
              checked={formState.terms_agreed}
              onChange={handleTermsAgreedChange}
            />
            <Stack>
              <Typography variant="caption" gutterBottom>
                Declaro bajo protesta de decir verdad que la información
                proporcionada en este formulario es precisa, completa, y
                auténtica, y asumo plena responsabilidad por su veracidad.
              </Typography>
              <Typography variant="caption">
                Conforme al artículo
                <span style={{ fontWeight: 900 }}> 247 del Código Penal</span>,
                proporcionar información falsa o engañosa puede resultar en
                sanciones, que incluyen{" "}
                <span style={{ fontWeight: 900 }}>
                  multas y penas de prisión de hasta 5 años.
                </span>
              </Typography>
            </Stack>
          </Stack>

          {/* Buttons */}
          <Stack
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
            spacing={2}
          >
            <Button
              variant="text"
              onClick={() => {
                setImagePreviews([]);
                onSubmit();
              }}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={
                !formState.terms_agreed ||
                !formState.name ||
                !formState.address.street ||
                !formState.address.number ||
                !formState.address.neighborhood ||
                !formState.description ||
                !formState.request_type ||
                !formState.category
              }
            >
              {proposal ? "Editar Petición" : "Crear Petición"}
            </Button>
          </Stack>
        </Stack>
      </form>
    </Container>
  );
};

export default ProposalForm;
