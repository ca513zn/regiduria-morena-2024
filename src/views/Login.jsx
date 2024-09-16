import React, { useState } from "react";
import { useAppContext } from "../contexts/AppContext";
import { Typography, TextField, Button, Alert, Stack } from "@mui/material";
import Grid2 from "@mui/material/Grid2";

const users = ["ricardotaja", "josejuan"];

const profiles = [
  {
    name: "Ricardo Taja",
    username: "ricardotaja",
    password: "acapulco",
    admin: true,
    avatar: "/taja1.png",
  },
  {
    name: "José Juan",
    username: "josejuan",
    password: "acapulco",
    admin: false,
    avatar: "https://i.pravatar.cc/150?img=52.png",
  },
];

const Login = () => {
  const { setAuth } = useAppContext();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    // Perform authentication logic here
    // For simplicity, let's assume the login is successful
    if (password !== "acapulco" || !users.includes(username)) {
      setError("Usuario o contraseña incorrectos");
      return;
    }

    let user = {};

    if (username === "ricardotaja") {
      user = profiles[0];
    }

    if (username === "josejuan") {
      user = profiles[1];
    }

    // Store the authenticated user in local storage
    localStorage.setItem("user", JSON.stringify(user));

    // Update the authentication state
    setAuth(user);
  };

  return (
    <Grid2 container direction="column" alignItems="center" spacing={2}>
      <Grid2 item>
        <Stack sx={{ backgroundColor: "#fff", padding: 0.5, borderRadius: 1 }}>
          <img src="/Morena_logotipo.png" alt="Morena" width="300" />
        </Stack>
      </Grid2>
      <Grid2 item>
        <Typography variant="h6">
          Para ver esta página, por favor acceda.
        </Typography>
      </Grid2>
      <Grid2 item>
        <TextField
          label="Usuario"
          fullWidth
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          sx={{
            minWidth: "380px",
          }}
          error={error !== ""}
        />
      </Grid2>
      <Grid2 item>
        <TextField
          sx={{
            minWidth: "380px",
          }}
          fullWidth
          label="Contraseña"
          variant="outlined"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={error !== ""}
        />
      </Grid2>
      <Grid2 item>
        {error && (
          <Alert
            severity="error"
            onClose={() => setError("")}
            sx={{
              minWidth: "380px",
            }}
          >
            {error}
            <br /> Contacte un administrador.
          </Alert>
        )}
      </Grid2>
      <Grid2 item>
        <Button variant="contained" color="primary" onClick={handleLogin}>
          Iniciar sesión
        </Button>
      </Grid2>
    </Grid2>
  );
};

export default Login;
