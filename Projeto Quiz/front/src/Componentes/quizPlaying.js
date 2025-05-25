import React, { useEffect, useState } from "react";
import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import "../Styles/quizplay.css";
import { useNavigate } from "react-router-dom";

function QuizPlaying() {
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);

  const quizId_ = localStorage.getItem("selectedQuizId");
  const navigate = useNavigate();

  useEffect(() => {
    if (!quizId_) {
      console.error("Nenhum quiz selecionado");
      return;
    }
  
    axios.get(`http://localhost:5000/quiz/${quizId_}`)
      .then(response => setQuiz(response.data))
      .catch(error => console.error('Erro ao buscar quiz:', error));
  }, [quizId_]);
  
  const handleRadioChange = (questionId, optionId) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: optionId
    }));
  };

  const handleSubmit = async () => {
    let tempScore = 0;
  
    quiz.questions.forEach(question => {
      const correctOption = question.options.find(opt => opt.isCorrect);
      if (answers[question.id] === correctOption?.id) {
        tempScore += 1;
      }
    });
  
    setScore(tempScore);
  


    try {
        const usertoken = localStorage.getItem("access_token");
        const id = jwtDecode(usertoken).sub;
        console.log(id);
        console.log(jwtDecode(usertoken));


        await axios.post(
          "http://localhost:5000/user-score/submit",
          {
            userId: id,
            quizId: quizId_,
            score: tempScore,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        );
      console.log("Score salvo com sucesso.");
    } catch (error) {
      console.error("Erro ao salvar o score:", error);
    }
  };
  

  if (!quiz) return <div>Carregando...</div>;

  return (
    <div className="quiz-container">
      <h1 className="quiz-title-play">{quiz.title}</h1>
      <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
        {quiz.questions.map((question, index) => (
          <div key={question.id} className="question-block">
            <h3 className="question-title">{index + 1}. {question.text}</h3>
            {question.options.map((option) => (
              <label key={option.id} className="option-label">
                <input
                  type="radio"
                  name={`question-${question.id}`}
                  checked={answers[question.id] === option.id}
                  onChange={() => handleRadioChange(question.id, option.id)}
                />
                {option.text}
              </label>
            ))}
          </div>
        ))}
        <button type="submit" className="submit-button">Enviar Respostas</button>
      </form>
  
      {score !== null && (
        <div className="result-message">
          <h2>Você acertou {score} de {quiz.questions.length} questões.</h2>
        </div>
      )}
      <div className="quizMakerbutton" onClick={() => navigate("/homepage")}>
      <span>{"x"}</span>
      </div>
    </div>
  );
  
}

export default QuizPlaying;
