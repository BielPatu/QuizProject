import { useNavigate } from "react-router-dom";


function MakerButton(){

const navigate = useNavigate();


const handleMaker = () => {
    navigate("/quizMaker");
  };

    return (
        <div className="quizMakerbutton" onClick={() => handleMaker()}>
        <span>{"✚"}</span>
        </div>
    );
}

export default MakerButton;