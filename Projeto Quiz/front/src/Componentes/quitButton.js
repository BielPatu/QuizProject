import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


function QuitButton(){

const navigate = useNavigate();


const handleQuit = () => {
    navigate("/homepage");
  };

    return (
        <div className="quizMakerbutton" onClick={() => handleQuit()}>
        <span>{"✖"}</span>
        </div>
    );
}

export default QuitButton;