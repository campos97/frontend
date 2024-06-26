import React, { useEffect, useState, useContext } from "react";
import { AuthContext, useAuth } from "../Auth/AuthProvider";
import { useNavigate } from "react-router-dom";


const LoginView = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const { token } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => { 
    e.preventDefault();
    // Llamar a la función login del contexto
     login(username, password);
  };

  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  }, [token, navigate]);
    


  return (
    <div className="login-view">
      <div className="wrap">
        <form>
          <input
            className="login-input"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="login-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="login-btn" type="submit" onClick={(e) => handleLogin(e)}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginView;