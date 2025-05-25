import { useEffect, useState } from "react";
import Quiz from "../Componentes/quiz";
import "../Styles/homepage.css";
import Navbar from "../Componentes/navbar";
import ProfileLiteComponent from "../Componentes/profilelite";
import MakerButton from "../Componentes/makerButton";


function QuizPage() {
  const [placeholder, setPlaceholder] = useState([]);

  useEffect(() => {
    document.title = "Quizes";
  }, []);

  return (
    <div>
      <Navbar/>
      <ProfileLiteComponent/>
      <Quiz/>
      <MakerButton/>
    </div>
  );
}

export default QuizPage;