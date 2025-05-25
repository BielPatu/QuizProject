import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../Styles/register.css"; 

function Registrar() {
  const [email, setEmail] = useState("");
  const [nome, setNome] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [termos, setTermos] = useState(false);
  const navigate = useNavigate();

  const registerUser = async () => {
    if (senha !== confirmarSenha) {
      alert("As senhas não coincidem!");
      return;
    }

    if (!termos) {
      alert("Você precisa aceitar os termos de uso e a política de privacidade.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/auth/register", {
        email,
        name: nome,
        password: senha,
      });

      if (response.data.message === "Usuário registrado com sucesso!") {
        alert("Usuário registrado com sucesso!");
        navigate("/");
      }
    } catch (error) {
      console.error("Erro ao registrar usuário", error.response || error);
      alert("Erro ao registrar o usuário. Tente novamente.");
    }
  };

  return (
    <div className="registro-background">
      <div className="registro-container">
        <h1 className="registro-titulo">Registrar</h1>

        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Nome</label>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />

        <label>Senha</label>
        <input
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />

        <label>Confirmar Senha</label>
        <input
          type="password"
          value={confirmarSenha}
          onChange={(e) => setConfirmarSenha(e.target.value)}
        />

        <div className="checkbox-container">
          <input
            type="checkbox"
            checked={termos}
            onChange={(e) => setTermos(e.target.checked)}
            id="termos"
          />
          <label htmlFor="termos">
            Aceito os termos de uso e a política de privacidade
          </label>
        </div>

        <button className="registerButton" onClick={registerUser}>Registrar</button>
        <a href="/">Já possui conta?</a>
      </div>
    </div>
  );
}

export default Registrar;
