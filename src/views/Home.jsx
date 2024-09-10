import {
  Container,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from "@mui/material";
import React from "react";
import { useAppContext } from "../contexts/AppContext";

const Home = () => {
  const { latest_proposals } = useAppContext();

  return (
    <Container disableGutters maxWidth="large">
      <Typography variant="h5" gutterBottom>
        Inicio
      </Typography>

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
                <TableCell>{proposal.status}</TableCell>
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
