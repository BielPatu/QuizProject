import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../Styles/login.css"; 

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const loginValidation = async () => {
    try {
      const response = await axios.post("http://localhost:5000/auth/login", {
        email,
        password,
      });

      localStorage.setItem("access_token", response.data.access_token);
      navigate("/homepage");
    } catch (error) {
      console.error("Erro ao fazer login:", error.response?.data || error);
      alert(
        "Erro ao fazer login: " +
          (error.response?.data.message || "Tente novamente.")
      );
    }
  };

  return (
    <div className="login-background">
      <div className="login-container">
        <h1 className="login-title">Login</h1>

        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Senha</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="checkbox-container">
          <input type="checkbox" id="lembrar" />
          <label htmlFor="lembrar">Lembrar de mim</label>
        </div>

        <button className="loginButton" onClick={loginValidation}>Entrar</button>

        <div className="register-link">
          <a href="/register">Não possui conta?</a>
        </div>
      </div>
    </div>
  );
}

export default Login;
