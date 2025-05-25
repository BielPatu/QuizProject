import { useEffect, useState } from "react";
import LoginTab from "../Componentes/logintab";

function LoginScreen() {
  const [placeholder, setPlaceholder] = useState([]);

  useEffect(() => {
    document.title = "Tela de Login";
  }, []);

  return (
    <div>
      <LoginTab/>
    </div>
  );
}

export default LoginScreen;