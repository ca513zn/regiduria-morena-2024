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
} from "@mui/material";
import React from "react";
import { useAppContext } from "../contexts/AppContext";
import { status_colors, statuses } from "../constants";
import { Add, Delete, Image } from "@mui/icons-material";
import DialogComponent from "../components/DialogComponent";
import ProposalForm from "../components/Forms/ProposalForm";

const Home = () => {
  const { proposals, setState, isAdmin } = useAppContext();
  const [open, setOpen] = React.useState(false);
  const [selectedProposal, setSelectedProposal] = React.useState(null);
  const [imageDialogOpen, setImageDialogOpen] = React.useState(false);
  const [imagesToPreview, setImagesToPreview] = React.useState([]);

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

  return (
    <>
      <Container maxWidth={false}>
        <Stack
          sx={{
            justifyContent: "space-between",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
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

        <Paper
          sx={{
            marginTop: "1rem",
            overflowX: "auto",
          }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ minWidth: "300px" }}>Petición</TableCell>
                <TableCell sx={{ minWidth: "150px" }}>
                  Fecha de Registro
                </TableCell>
                <TableCell sx={{ minWidth: "180px" }}>
                  Contacto del Solicitante
                </TableCell>
                <TableCell sx={{ minWidth: "200px" }}>Dirección</TableCell>
                <TableCell sx={{ minWidth: "100px" }}>
                  Sección Distrital
                </TableCell>
                <TableCell sx={{ minWidth: "100px" }}>Tipo</TableCell>
                <TableCell sx={{ minWidth: "100px" }}>Categoria</TableCell>
                <TableCell sx={{ minWidth: "100px" }}>Estatus</TableCell>
                <TableCell sx={{ minWidth: "120px" }}>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {proposals.map((proposal, index) => (
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
                  <TableCell>{proposal.district_section}</TableCell>
                  <TableCell>{proposal.request_type}</TableCell>
                  <TableCell>{proposal.category}</TableCell>
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
