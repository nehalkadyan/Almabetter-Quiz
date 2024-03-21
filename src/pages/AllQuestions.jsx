import React from "react";
import { useSelector } from "react-redux";

const AllQuestions = () => {
  // accessing the currentQuizData from the redux store
  const { currentQuizData } = useSelector((state) => state.quiz);
  // destructuring the questions array from currentQuizData
  const { questions } = currentQuizData;

  return (
    <div className="flex items-center flex-col gap-4">
      <h1 className="text-4xl font-semibold">All Questions</h1>
      <div>
        <span className="text-2xl font-semibold">Quiz Title :</span>
        {/* displaying the quiz title */}
        <span className="text-xl ml-3">{currentQuizData.title}</span>
      </div>
      <div>
        <span className="text-2xl font-semibold">Quiz Description :</span>
        {/* displaying the quiz description */}
        <span className="text-xl ml-3">{currentQuizData.description}</span>
      </div>

      <div className="flex flex-col gap-3">
        {/* displaying all the questions  */}
        {questions?.map((question, idx) => (
          <div key={idx} className="text-xl">
            <span className="font-semibold">Question {idx + 1} : </span>
            <span className="ml-1">{question.question}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllQuestions;
