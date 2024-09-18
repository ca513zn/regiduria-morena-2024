import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { useAppContext } from "../contexts/AppContext";
import { Delete, Image } from "@mui/icons-material";
import { status_colors, statuses } from "../constants";

const CardComponent = ({
  data,
  handleDelete,
  handleEdit,
  handlePreviewImages,
}) => {
  const {
    district_section,
    title,
    description,
    categories,
    date_registered,
    status,
    author,
    address,
    phone,
    applicant_name,
    request_type,
    documents,
    category,
    id,
    images,
  } = data;
  const { proposals, setState, isAdmin } = useAppContext();
  return (
    <Card onClick={() => handleEdit(data)}>
      <CardHeader title={title} subheader={`ID: #${id}`} />
      <Divider />
      <CardContent>
        <Stack
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <Typography>
            {request_type} / {category}
          </Typography>
        </Stack>
        <Typography variant="caption" color="textSecondary">
          {description}
        </Typography>
        <br />
        <Typography
          sx={{
            marginTop: 2,
          }}
        >
          Datos adicionales:
        </Typography>
        <Typography variant="caption" color="textSecondary">
          Seccion Distrital: {district_section}
        </Typography>
        <br />
        <Typography variant="caption" color="textSecondary">
          Fecha de registro: {new Date(date_registered).toLocaleDateString()}
        </Typography>
        <br />
        <Typography variant="caption" color="textSecondary">
          Contacto del solicitante:
          <br /> {applicant_name} {phone}
        </Typography>
        <br />
        <Typography variant="caption" color="textSecondary">
          Domicilio:
          <br />{" "}
          {`${address.street} ${address.number}, ${address.neighborhood}`}
        </Typography>
        <br />
      </CardContent>
      <Divider />
      <CardActions
        sx={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Chip
          label={statuses[status]}
          color={status_colors[status]}
          variant="outlined"
        />
        <IconButton
          aria-label="preview-images"
          color="primary"
          onClick={(e) => {
            e.stopPropagation();
            handlePreviewImages(images);
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
              handleDelete(id);
            }}
          >
            <Delete />
          </IconButton>
        )}
      </CardActions>
    </Card>
  );
};

export default CardComponent;
