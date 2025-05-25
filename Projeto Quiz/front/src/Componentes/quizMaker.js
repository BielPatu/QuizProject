import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../Styles/quizmaker.css";

function QuizMaker() {
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([]);
  const [description, setDescription] = useState("");


  const addQuestion = () => {
    setQuestions(prev => [
      ...prev,
      { text: "", options: [{ text: "", isCorrect: false }], id: Date.now() },
    ]);
  };

  const removeQuestion = (qIndex) => {
    const newQuestions = [...questions];
    newQuestions.splice(qIndex, 1);
    setQuestions(newQuestions);
  };

  const updateQuestionText = (index, text) => {
    const newQuestions = [...questions];
    newQuestions[index].text = text;
    setQuestions(newQuestions);
  };

  const addOption = (qIndex) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options.push({ text: "", isCorrect: false });
    setQuestions(newQuestions);
  };

  const updateOptionText = (qIndex, oIndex, text) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options[oIndex].text = text;
    setQuestions(newQuestions);
  };

  const setCorrectOption = (qIndex, oIndex) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options = newQuestions[qIndex].options.map((opt, idx) => ({
      ...opt,
      isCorrect: idx === oIndex,
    }));
    setQuestions(newQuestions);
  };

  const removeOption = (qIndex, oIndex) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options.splice(oIndex, 1);
    setQuestions(newQuestions);
  };


  const handleSubmit = async () => {
    if (!title.trim()) return alert("Digite o título do quiz");
    if (questions.length === 0) return alert("Adicione pelo menos uma pergunta");

    for (const q of questions) {
      if (!q.options.some(opt => opt.isCorrect)) {
        return alert("Cada pergunta deve ter uma opção correta marcada");
      }
    }

    for (const q of questions) {
      if (q.text.trim() === "") {
        return alert("Não deixe perguntas vazias");
      }
      if (q.options.length < 2) {
        return alert("Cada pergunta deve ter pelo menos duas opções");
      }
      for (const opt of q.options) {
        if (opt.text.trim() === "") {
          return alert("Não deixe opções vazias");
        }
      }
    }

    const cleanedQuestions = questions.map(q => ({
      text: q.text,
      options: q.options.map(opt => ({ text: opt.text, isCorrect: opt.isCorrect })),
    }));

    try {
      await axios.post(
        "http://localhost:5000/quiz",
        {
          title,
          description,
          questions: cleanedQuestions,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      alert("Quiz criado com sucesso!");
      setTitle("");
      setDescription("");
      setQuestions([]);
    } catch (error) {
      console.error("Erro ao criar quiz:", error);
      alert("Erro ao criar quiz. Veja o console.");
    }
  };

  return (
    <div className="quiz-maker-container">
      <h2 className="quiz-title">Criar Novo Quiz</h2>

      <input
        className="quiz-input"
        type="text"
        placeholder="Título do quiz"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        className="quiz-textarea"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Descrição do quiz"
      />

      {questions.map((question, qIndex) => (
        <div key={question.id} className="question-card">
          <div className="question-header">
            <h4>Pergunta #{qIndex + 1}</h4>
            <button className="remove-button" onClick={() => removeQuestion(qIndex)}>✖</button>
          </div>

          <input
            className="quiz-input question-input"
            type="text"
            placeholder="Texto da pergunta"
            value={question.text}
            onChange={(e) => updateQuestionText(qIndex, e.target.value)}
          />

          {question.options.map((option, oIndex) => (
            <div key={oIndex} className="option-line">
              <input
                type="radio"
                name={`correctOption-${qIndex}`}
                checked={option.isCorrect}
                onChange={() => setCorrectOption(qIndex, oIndex)}
              />
              <input
                className="quiz-input option-input"
                type="text"
                placeholder={`Opção #${oIndex + 1}`}
                value={option.text}
                onChange={(e) => updateOptionText(qIndex, oIndex, e.target.value)}
              />
              <button className="remove-button" onClick={() => removeOption(qIndex, oIndex)}>✖</button>
            </div>
          ))}

          <button className="btn secondary" type="button" onClick={() => addOption(qIndex)}>
            Adicionar Opção
          </button>
        </div>
      ))}

      <button className="btn primary" type="button" onClick={addQuestion}>
        Adicionar Pergunta
      </button>

      <button className="btn success" type="button" onClick={handleSubmit}>
        Criar Quiz
      </button>
    </div>
  );
}

export default QuizMaker;
