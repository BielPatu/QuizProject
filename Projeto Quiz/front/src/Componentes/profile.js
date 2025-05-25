import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import "../Styles/profile.css";

function ProfileComponent() {
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    if (!token) {
    navigate("/");
      return;
    }
    const decodedToken = jwtDecode(token).sub;
    axios
      .get(`http://localhost:5000/users/${decodedToken}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar o perfil:", error);
        navigate("/");
      });
  }, []);


  return (
    <div className="profile-page">
      <div className="user-info">
        <h2>Informações do Usuário</h2>
        {user ? (
          <>
            <img src="https://static.vecteezy.com/ti/gratis-vektor/t2/7232099-user-vector-icon-das-fur-kommerzielle-arbeit-geeignet-ist-und-es-einfach-modifizieren-oder-bearbeiten-kann-vektor.jpg" alt="Foto de perfil" className="profile-picture" />
            <p>Nome - <strong>{user.name}</strong></p>
            <p>Email - <strong>{user.email}</strong></p>
            <p>Data de Criação - {new Date(user.createdAt).toLocaleString("pt-BR")}</p>
            
          </>
        ) : (
          <p>Carregando...</p>
        )}
      </div>
    </div>
  );
}

export default ProfileComponent;
