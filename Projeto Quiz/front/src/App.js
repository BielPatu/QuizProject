import './App.css';
import QuizPage from './Page/homeScreen';
import LoginScreen from './Page/loginScreen';
import QuizPlay from './Page/quizPlayScreen';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from './Page/registerScreen';
import QuizMakerPage from './Page/quizMakerPage';
import ProfilePage from './Page/profileScreen';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginScreen />} />
          <Route path="/quizPlay" element={<QuizPlay />} />
          <Route path="/homepage" element={<QuizPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/quizMaker" element={<QuizMakerPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
