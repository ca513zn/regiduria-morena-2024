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

const Home = () => {
  const { state } = useAppContext();

  return (
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
        <Button startIcon={<Add />} variant="contained" color="primary">
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
  );
};

export default Home;
