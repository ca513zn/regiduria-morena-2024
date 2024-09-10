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
} from "@mui/material";
import React from "react";
import { useAppContext } from "../contexts/AppContext";
import { latest_proposals, status_colors, statuses } from "../constants"; // Assuming proposals are imported from constants
import { Add } from "@mui/icons-material";
import DialogComponent from "../components/DialogComponent";
import ProposalForm from "../components/Forms/ProposalForm";

const Home = () => {
  const { state } = useAppContext();
  const [open, setOpen] = React.useState(false);
  const [selectedProposal, setSelectedProposal] = React.useState(null);

  return (
    <>
      <Container maxWidth="large">
        <Stack
          sx={{
            //space between
            justifyContent: "space-between",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Typography variant="h5" gutterBottom>
            Inicio
          </Typography>
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

        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nombre</TableCell>
                <TableCell>Descripción</TableCell>
                <TableCell>Fecha de Registro</TableCell>
                <TableCell>Estatus</TableCell>
                <TableCell>Autor</TableCell>
                <TableCell>Dirección</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {latest_proposals.map((proposal, index) => (
                <TableRow key={index}>
                  <TableCell>{proposal.name}</TableCell>
                  <TableCell>{proposal.description}</TableCell>
                  <TableCell>
                    {new Date(proposal.date_registered).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={statuses[proposal.status]}
                      color={status_colors[proposal.status]}
                    />
                  </TableCell>
                  <TableCell>{proposal.author}</TableCell>
                  <TableCell>
                    {`${proposal.address.street} ${proposal.address.number}, ${proposal.address.neighborhood}`}
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
        title={selectedProposal ? "Editar Propuesta" : "Nueva Propuesta"}
      >
        <ProposalForm
          proposal={selectedProposal}
          onSubmit={(proposal) => {
            console.log(proposal);
          }}
        />
      </DialogComponent>
    </>
  );
};

export default Home;
