import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import "../Styles/homepage.css";

function Quiz() {
  const [quizes, setQuizzes] = useState([]);
  const [userScores, setUserScores] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/quiz")
      .then((response) => setQuizzes(response.data))
      .catch((error) => console.error("Erro ao buscar quizzes:", error));
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) return;

    const userId = jwtDecode(token).sub;

    axios
      .get(`http://localhost:5000/user-score/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const scoresByQuiz = {};
        response.data.forEach((entry) => {
          scoresByQuiz[entry.quiz.id] = entry.score;
        });
        setUserScores(scoresByQuiz);
      })
      .catch((error) => {
        console.error("Erro ao buscar pontuação do usuário:", error);
      });
  }, []);

  const handleSelectQuiz = (id) => {
    localStorage.setItem("selectedQuizId", id);
    navigate("/quizPlay");
  };


  return (
    <div className="quiz-page">
      <h3>Quizes Disponíveis</h3>
      <div className="quiz-list">
        {quizes.map((quiz) => (
          <div key={quiz.id} className="quiz-card">
            <button className="quiz-button" onClick={() => handleSelectQuiz(quiz.id)}>
              <h2>{quiz.title}</h2>
              <h3>
                Seu Score: {userScores[quiz.id] ?? "N/A"} de {quiz.questions.length}
              </h3>
              <h5>Questões: {quiz.questions.length}</h5>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Quiz;
