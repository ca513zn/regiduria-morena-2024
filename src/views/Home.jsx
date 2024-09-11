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
} from "@mui/material";
import React from "react";
import { useAppContext } from "../contexts/AppContext";
import { status_colors, statuses } from "../constants";
import { Add, Delete } from "@mui/icons-material";
import DialogComponent from "../components/DialogComponent";
import ProposalForm from "../components/Forms/ProposalForm";

const Home = () => {
  const { proposals, setState } = useAppContext();
  const [open, setOpen] = React.useState(false);
  const [selectedProposal, setSelectedProposal] = React.useState(null);

  const handleEdit = (proposal) => {
    setSelectedProposal(proposal);
    setOpen(true);
  };

  const handleDelete = (id) => {
    setState((prevState) => ({
      ...prevState,
      proposals: prevState.proposals.filter((proposal) => proposal.id !== id),
    }));
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
          <Typography variant="h5">Peticiones</Typography>
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
                <TableCell sx={{ minWidth: "100px" }}>Estatus</TableCell>
                <TableCell sx={{ minWidth: "180px" }}>
                  Nombre Del Solicitante
                </TableCell>
                <TableCell sx={{ minWidth: "200px" }}>Dirección</TableCell>
                <TableCell sx={{ minWidth: "100px" }}>
                  Sección Distrital
                </TableCell>
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
                      {proposal.name}
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
                    <Chip
                      label={statuses[proposal.status]}
                      color={status_colors[proposal.status]}
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>{proposal.applicant_name}</TableCell>
                  <TableCell>
                    {`${proposal.address.street} ${proposal.address.number}, ${proposal.address.neighborhood}`}
                  </TableCell>
                  <TableCell>{proposal.district_section}</TableCell>
                  <TableCell>
                    <Stack
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
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
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Container>
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
