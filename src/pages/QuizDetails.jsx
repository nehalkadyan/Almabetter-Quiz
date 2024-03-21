import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addFullName } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

const QuizDetails = () => {
  // creating dispatch to call actions
  const dispatch = useDispatch();
  // accessing the quiz id from the url params
  const { quizId } = useParams();
  //  creating navigate to redirect the user to different page
  const navigate = useNavigate();
  // state for full name
  const [fullName, setFullName] = useState("");
  // accessing quizzes from the redux store
  const { quizzes } = useSelector((state) => state.quiz);
  // variable to store the quiz using quizId
  const quizToPlay = quizzes[quizId];
  // function to start quiz
  const handleStartQuiz = () => {
    // conditional statement
    if (fullName.length < 5 || fullName.length > 50) {
      return alert(
        "Full Name of user should be minimum of 5 characters and maximum of 50 characters"
      );
    }
    // dispatching the action to store the full name in redux
    dispatch(addFullName(fullName));
    // navigating the user to this route
    navigate(`/game-on/${quizId}`);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="flex justify-center bg-white w-[90%] sm:w-1/2 lg:w-1/3 shadow-lg">
        <div className="flex flex-col items-start py-16 gap-6">
          <h1 className="text-2xl">{quizToPlay.title}</h1>
          <label className="text-lg">Enter Your Name :</label>
          <input
            className="p-2 border border-gray-300 rounded-md outline-none"
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          <div
            onClick={handleStartQuiz}
            className="py-2 px-3 cursor-pointer rounded-md bg-red-800 text-white"
          >
            Start Quiz
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizDetails;
