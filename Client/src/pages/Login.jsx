import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import useAuthContext from "../contexts/authContext";

const Login = () => {
  const { user, setUser, signIn } = useAuthContext();
  return (
    <div>
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
        value={user.inputs.email}
        onChange={(e) =>
          setUser({
            ...user,
            inputs: {
              ...user.inputs,
              email: e.target.value,
            },
          })
        }
        autoFocus
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        value={user.inputs.password}
        onChange={(e) =>
          setUser({
            ...user,
            inputs: {
              ...user.inputs,
              password: e.target.value,
            },
          })
        }
        autoComplete="current-password"
      />
      <Button variant="contained" color="primary" onClick={signIn}>
        Login
      </Button>
    </div>
  );
};

export default Login;
