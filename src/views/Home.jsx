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
  Button,
  IconButton,
} from "@mui/material";
import React from "react";
import { useAppContext } from "../contexts/AppContext";
import { status_colors, statuses } from "../constants";
import { Add, Edit, Delete } from "@mui/icons-material";
import DialogComponent from "../components/DialogComponent";
import ProposalForm from "../components/Forms/ProposalForm";

const Home = () => {
  const { proposals } = useAppContext();
  const [open, setOpen] = React.useState(false);
  const [selectedProposal, setSelectedProposal] = React.useState(null);

  const handleEdit = (proposal) => {
    setSelectedProposal(proposal);
    setOpen(true);
  };

  const handleDelete = (id) => {
    // You can implement the delete functionality here
    console.log(`Deleting proposal with id: ${id}`);
  };

  return (
    <>
      <Container maxWidth="large">
        <Stack
          sx={{
            justifyContent: "space-between",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Typography variant="h5">Peticiones</Typography>
          <Button
            startIcon={<Add />}
            variant="contained"
            color="primary"
            onClick={() => {
              setOpen(true);
              setSelectedProposal(null);
            }}
          >
            Nueva Propuesta
          </Button>
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
                <TableCell>Petición</TableCell>
                <TableCell>Fecha de Registro</TableCell>
                <TableCell>Estatus</TableCell>
                <TableCell>Nombre Del Solicitante</TableCell>
                <TableCell>Dirección</TableCell>
                <TableCell>Sección Distrital</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {proposals.map((proposal, index) => (
                <TableRow
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
                        aria-label="edit"
                        color="primary"
                        onClick={() => handleEdit(proposal)}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        aria-label="delete"
                        color="secondary"
                        onClick={() => handleDelete(proposal.id)}
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
