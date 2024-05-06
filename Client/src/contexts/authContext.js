import { useState } from "react";
import { useContext } from "react";
import { createContext } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../constants";

const AuthContext = createContext();

const reset = {
  inputs: {
    email: "",
    password: "",
    isAdmin: false,
  },
};

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState({
    inputs: {
      email: "",
      password: "",
    },
    isAdmin: false,
    loading: false,
  });
  const navigate = useNavigate();

  const signIn = async () => {
    try {
      setUser({ ...user, loading: true });
      const signResponse = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user.inputs.email,
          password: user.inputs.password,
        }),
      });
      const resData = await signResponse.json();
      if (!signResponse.ok) {
        throw resData;
      } else {
        localStorage.setItem("token", resData.token);
        setUser({
          ...user,
          loading: false,
          inputs: reset.inputs,
          isAdmin: resData.loggedInUser.isAdmin,
        });
        navigate("/products");
      }
    } catch (err) {
      setUser({ ...user, loading: false });
      console.error(err);
    }
  };

  const logoutHandler = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ user, setUser, signIn, logoutHandler }}>
      {children}
    </AuthContext.Provider>
  );
}

const useAuthContext = () => useContext(AuthContext);
export default useAuthContext;
