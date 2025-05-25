import { useEffect, useState } from "react";
import LoginTab from "../Componentes/logintab";
import Quiz from "../Componentes/quiz";
import QuizPlaying from "../Componentes/quizPlaying";
import Navbar from "../Componentes/navbar";
import QuitButton from "../Componentes/quitButton";

function QuizPlay() {
  const [placeholder, setPlaceholder] = useState([]);

  useEffect(() => {
    document.title = "Tela de Quiz";
  }, []);

  return (
    <div>
      <Navbar/>
      <QuizPlaying />
      <QuitButton/>
    </div>
  );
}

export default QuizPlay;