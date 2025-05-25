import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import "../Styles/historico.css";

function UserHistoryComponent() {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quizzes, setQuizzes] = useState([]);

  const navigate = useNavigate();


  useEffect(() => {
    axios
      .get("http://localhost:5000/quiz")
      .then((response) => setQuizzes(response.data))
      .catch((error) => console.error("Erro ao buscar quizzes:", error));
  }, []);



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
      .then((res) => {

        return axios.get(`http://localhost:5000/user-score/${decodedToken}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      })
      .then((res) => {
        setScores(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erro ao carregar histórico:", err);
        window.location.href = "/login";
      });
  }, []);

  if (loading) return <p>Carregando histórico...</p>;

  return (
    <div className="user-history">
      <h2>Histórico de Quizzes</h2>
      {scores.length === 0 ? (
        <p>Você ainda não respondeu a nenhum quiz.</p>
      ) : (
        <div className='score-list'>
          {scores.map((score) => (
            <div key={score.id} className="score-item">
              <strong>{score.quiz?.title || "Quiz Desconhecido"}</strong> <strong className="date">{new Date(score.createdAt).toLocaleString("pt-BR")}</strong> Acertou {score.score} de {score.quiz?.questions?.length || 0} perguntas
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default UserHistoryComponent;
