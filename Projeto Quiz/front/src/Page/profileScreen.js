import { useEffect, useState } from "react";
import Navbar from "../Componentes/navbar";
import ProfileComponent from "../Componentes/profile";
import UserHistoryComponent from "../Componentes/historico";
import QuitButton from "../Componentes/quitButton";

function ProfilePage() {
  const [placeholder, setPlaceholder] = useState([]);

  useEffect(() => {
    document.title = "Tela de Criação de Quiz";
  }, []);

  return (
    <div>
      <Navbar/>
      <ProfileComponent/>
      <UserHistoryComponent/>
      <QuitButton/>
    </div>
  );
}

export default ProfilePage;