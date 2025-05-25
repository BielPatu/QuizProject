import { useEffect, useState } from "react";
import Registertab from "../Componentes/registertab";

function Register() {
  const [placeholder, setPlaceholder] = useState([]);

  useEffect(() => {
    document.title = "Tela de Registro";
  }, []);

  return (
    <div>
      <Registertab/>
    </div>
  );
}

export default Register;