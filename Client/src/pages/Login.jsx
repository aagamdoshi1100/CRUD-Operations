import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import useAuthContext from "../contexts/authContext";
import loginStyles from "../modules/login.module.css";

const Login = () => {
  const { user, setUser, signIn } = useAuthContext();
  return (
    <div className={loginStyles.container}>
      <div className={loginStyles.loginForm}>
        <p className={loginStyles.heading}>Login</p>
        <TextField
          margin="normal"
          required
          className={loginStyles.inputs}
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
        <div className={loginStyles.submit}>
          <Button
            variant="contained"
            color="primary"
            style={{ padding: "8px 30px" }}
            onClick={signIn}
          >
            Login
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
