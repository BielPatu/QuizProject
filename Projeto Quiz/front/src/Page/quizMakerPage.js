import { useEffect, useState } from "react";
import QuizMaker from "../Componentes/quizMaker";
import Navbar from "../Componentes/navbar";
import QuitButton from "../Componentes/quitButton";

function QuizMakerPage() {
  const [placeholder, setPlaceholder] = useState([]);

  useEffect(() => {
    document.title = "Tela de Criação de Quiz";
  }, []);

  return (
    <div>
        <Navbar/>
      <QuizMaker/>
      <QuitButton/>
    </div>
  );
}

export default QuizMakerPage;