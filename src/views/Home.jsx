import {
  Container,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Chip,
  Stack,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import React, { useEffect } from "react";
import { useAppContext } from "../contexts/AppContext";
import { latest_proposals, status_colors, statuses } from "../constants";
import { Add, Delete, Image } from "@mui/icons-material";
import DialogComponent from "../components/DialogComponent";
import ProposalForm from "../components/Forms/ProposalForm";

const Home = () => {
  const { proposals, setState, isAdmin } = useAppContext();
  const [open, setOpen] = React.useState(false);
  const [selectedProposal, setSelectedProposal] = React.useState(null);
  const [imageDialogOpen, setImageDialogOpen] = React.useState(false);
  const [imagesToPreview, setImagesToPreview] = React.useState([]);
  const [filteredProposals, setFilteredProposals] = React.useState(proposals);

  useEffect(() => {
    setFilteredProposals(proposals);
  }, [proposals]);

  const handleEdit = (proposal) => {
    if (!isAdmin) return;
    setSelectedProposal(proposal);
    setOpen(true);
  };

  const handleDelete = (id) => {
    setState((prevState) => ({
      ...prevState,
      proposals: prevState.proposals.filter((proposal) => proposal.id !== id),
    }));
  };

  const handlePreviewImages = (images) => {
    setImagesToPreview(images);
    setImageDialogOpen(true);
  };

  const handleSearchByStatusorDistrict = (e) => {
    const value = e.target.value
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, ""); // normalize input
    if (value === "") {
      setFilteredProposals(proposals);
      return;
    }
    const filtered = proposals.filter((proposal) => {
      const requestType = proposal.request_type
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
      const category = proposal.category
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
      const districtSection = proposal.district_section
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

      return (
        requestType.includes(value) ||
        category.includes(value) ||
        districtSection.includes(value)
      );
    });

    setFilteredProposals(filtered);
  };

  return (
    <>
      <Container maxWidth={false}>
        <Stack
          sx={{
            justifyContent: "space-between",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginTop: 1,
          }}
        >
          <Typography
            sx={{
              fontWeight: 600,
              fontSize: "1.5rem",
            }}
          >
            Peticiones
          </Typography>
          <Stack
            sx={{
              display: {
                xs: "none",
                sm: "flex",
              },
            }}
          >
            {/* text search input */}
            <TextField
              label="Buscar"
              variant="outlined"
              size="small"
              sx={{ width: "300px" }}
              onChange={handleSearchByStatusorDistrict}
            />
          </Stack>
          {isAdmin && (
            <IconButton
              aria-label="add"
              onClick={() => {
                setOpen(true);
                setSelectedProposal(null);
              }}
              sx={{
                backgroundColor: "primary.main",
                color: "#ffffff",
                ":hover": {
                  backgroundColor: "primary.dark",
                },
              }}
            >
              <Add />
            </IconButton>
          )}
        </Stack>
        <Stack
          sx={{
            display: {
              xs: "flex",
              sm: "none",
            },
            marginTop: "0.8rem",
          }}
        >
          {/* text search input */}
          <TextField
            label="Buscar"
            variant="outlined"
            size="small"
            onChange={handleSearchByStatusorDistrict}
            fullWidth
          />
        </Stack>
        <Paper
          sx={{
            marginTop: "1rem",
            overflowX: "auto",
          }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ minWidth: "60px" }}>
                  Sección Distrital
                </TableCell>
                <TableCell sx={{ minWidth: "300px" }}>Petición</TableCell>
                <TableCell sx={{ minWidth: "150px" }}>
                  Fecha de Registro
                </TableCell>
                <TableCell sx={{ minWidth: "180px" }}>
                  Contacto del Solicitante
                </TableCell>
                <TableCell sx={{ minWidth: "200px" }}>Dirección</TableCell>
                <TableCell sx={{ minWidth: "100px" }}>
                  Tipo - Categoria
                </TableCell>
                <TableCell sx={{ minWidth: "100px" }}>Estatus</TableCell>
                <TableCell sx={{ minWidth: "120px" }}>Acciones</TableCell>
              </TableRow>
            </TableHead>
            {
              //no proposals found
              filteredProposals.length === 0 && (
                <TableBody>
                  <TableRow>
                    <TableCell colSpan={8}>
                      <Typography
                        variant="h6"
                        sx={{
                          textAlign: "center",
                          marginTop: "1rem",
                          color: "gray",
                        }}
                      >
                        No se encontraron peticiones
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableBody>
              )
            }
            <TableBody>
              {filteredProposals.map((proposal, index) => (
                <TableRow
                  onClick={() => handleEdit(proposal)}
                  key={index}
                  sx={{
                    "&:nth-of-type(odd)": {
                      backgroundColor: "#f3f3f3",
                    },
                    ":hover": {
                      backgroundColor: "#e1e1e1",
                    },
                    cursor: "pointer",
                  }}
                >
                  <TableCell>{proposal.district_section}</TableCell>
                  <TableCell sx={{ minWidth: "300px" }}>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontWeight: "bold",
                      }}
                    >
                      {proposal.title}
                    </Typography>
                    <Typography
                      gutterBottom
                      sx={{
                        fontSize: "0.8rem",
                        color: "gray",
                      }}
                    >
                      {proposal.description}
                    </Typography>

                    {/* Display categories using Chips */}
                    <Stack
                      direction="row"
                      spacing={1}
                      sx={{ marginTop: "0.5rem" }}
                    >
                      {proposal.categories && proposal.categories.length > 0
                        ? proposal.categories.map((category, idx) => (
                            <Chip key={idx} label={category} size="small" />
                          ))
                        : null}
                    </Stack>
                  </TableCell>
                  <TableCell>
                    {new Date(proposal.date_registered).toLocaleDateString()}
                  </TableCell>

                  <TableCell>
                    <Stack
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                      }}
                    >
                      <Typography>{proposal.applicant_name}</Typography>
                      <Typography variant="caption">
                        {proposal.phone}
                      </Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    {`${proposal.address.street} ${proposal.address.number}, ${proposal.address.neighborhood}`}
                  </TableCell>
                  <TableCell>
                    <Stack
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                      }}
                    >
                      <Typography>{proposal.request_type}</Typography>
                      <Typography variant="caption">
                        {proposal.category}
                      </Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={statuses[proposal.status]}
                      color={status_colors[proposal.status]}
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>
                    <Stack
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "çenter",
                      }}
                    >
                      {/* Preview Images IconButton */}
                      <IconButton
                        aria-label="preview-images"
                        color="primary"
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePreviewImages(proposal.images);
                        }}
                      >
                        <Image />
                      </IconButton>
                      {isAdmin && (
                        <IconButton
                          aria-label="delete"
                          color="secondary"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(proposal.id);
                          }}
                        >
                          <Delete />
                        </IconButton>
                      )}
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Container>

      {/* Image Preview Dialog */}
      <Dialog
        open={imageDialogOpen}
        onClose={() => setImageDialogOpen(false)}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>Preview Images</DialogTitle>
        <DialogContent>
          <Stack direction="row" spacing={2} sx={{ flexWrap: "wrap" }}>
            {imagesToPreview.length > 0 ? (
              imagesToPreview.map((image, index) => (
                <img
                  key={index}
                  src={
                    typeof image === "string"
                      ? image
                      : URL.createObjectURL(image)
                  }
                  alt={`Preview ${index}`}
                  style={{
                    width: "200px",
                    height: "150px",
                    objectFit: "cover",
                    marginRight: "1rem",
                    marginBottom: "1rem",
                  }}
                />
              ))
            ) : (
              <Typography>No images to preview</Typography>
            )}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setImageDialogOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      <DialogComponent
        open={open}
        onClose={() => setOpen(false)}
        title={selectedProposal ? "Editar Petición" : "Nueva Petición"}
      >
        <ProposalForm
          proposal={selectedProposal}
          onSubmit={() => {
            setOpen(false);
          }}
        />
      </DialogComponent>
    </>
  );
};

export default Home;
