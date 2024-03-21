import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { calculateScore } from "../redux/quiz/quizSlice";
import { useNavigate } from "react-router-dom";

const GameOn = () => {
  // creating navigate to redirect the user to different page
  const navigate = useNavigate();
  // creating dispatch to call actions
  const dispatch = useDispatch();
  // accessing thq quizId from the url paramms using useParams hook
  const { quizId } = useParams();
  // some necessary states
  const [questionCount, setQuestionCount] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [activeBtn, setActiveBtn] = useState(true);
  // accessing the quizzes from the redux store
  const { quizzes } = useSelector((state) => state.quiz);
  // storing the quiz using quizId in a variable
  const quiz = quizzes[quizId];
  // storing the current question in a variable
  const currentQuestion = quiz.questions[questionCount];
  // function to handle option selection
  const handleOptionSelect = (option) => {
    // setting the states
    setSelectedOption(option);
    setActiveBtn(false);
  };
  // function to handle next question button
  const handleNextQuestion = () => {
    // conditional statement
    if (questionCount + 1 < quiz.questions.length) {
      // dispatching the calculateScore action to redux
      dispatch(calculateScore({ selectedOption, questionCount, quizId }));
      // setting the states
      setQuestionCount(questionCount + 1);
      setActiveBtn(true);
    } else if (questionCount + 1 === quiz.questions.length) {
      // dispatching the calculateScore action to redux
      dispatch(calculateScore({ selectedOption, questionCount, quizId }));
      // redirecting the user to this route
      navigate(`/result/${quizId}`);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="flex justify-center bg-white w-[90%] sm:w-1/2 lg:w-1/3 rounded-md shadow-lg">
        <div className="flex flex-col items-start py-16 gap-6">
          {/* displaying the current question */}
          <h1 className="text-xl">{currentQuestion.question}</h1>
          <div className="w-full">
            {/* displaying the current question options */}
            {currentQuestion.options?.map((option, index) => (
              <div
                key={index}
                className="flex gap-5 rounded-md  hover:bg-gray-100  p-2"
              >
                <input
                  type="radio"
                  id={`option${index}`}
                  value={option}
                  checked={selectedOption === option}
                  onChange={() => handleOptionSelect(option)}
                  className="cursor-pointer"
                />
                <label htmlFor={`option${index}`}>{option}</label>
              </div>
            ))}
          </div>
          <button
            disabled={activeBtn}
            onClick={handleNextQuestion}
            className="py-2 px-3 rounded-md bg-red-800 text-white"
          >
            {questionCount + 1 === quiz.questions.length
              ? "Submit Quiz"
              : "Next Question"}
          </button>

          <p>
            Question {questionCount + 1}/{quiz?.questions?.length}
          </p>
        </div>
      </div>
    </div>
  );
};

export default GameOn;
