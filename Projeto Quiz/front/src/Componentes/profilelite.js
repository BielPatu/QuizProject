import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import "../Styles/profileLite.css";

function ProfileLiteComponent() {
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
    <div className="profile-page-lite">
  <div className="user-info-lite">
    {user ? (
      <a href="/profile">
      <div className="profile-container-lite">
          <img
            src="https://static.vecteezy.com/ti/gratis-vektor/t2/7232099-user-vector-icon-das-fur-kommerzielle-arbeit-geeignet-ist-und-es-einfach-modifizieren-oder-bearbeiten-kann-vektor.jpg"
            alt="Foto de perfil"
            className="profile-picture-lite"
          />
        
        <p className="profile-text">
          <strong>{user.name}</strong>
        </p>
        <p className="profile-access">Acessar perfil</p>
      </div>
      </a>
    ) : (
      <p>Carregando...</p>
    )}
  </div>
</div>

  );
}

export default ProfileLiteComponent;
