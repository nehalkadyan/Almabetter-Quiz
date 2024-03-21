import React from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetScore } from "../redux/quiz/quizSlice";
import { addFullName } from "../redux/user/userSlice";

const Result = () => {
  // creating dispatch to call actions
  const dispatch = useDispatch();
  // accessing the quizId using urlParams hook
  const { quizId } = useParams();
  // accessing thq quizzes from the redux store
  const { quizzes } = useSelector((state) => state.quiz);
  // accessing the total score form the redux store
  const { totalScore } = useSelector((state) => state.quiz);
  // storing the quiz with given id to a variable
  const currentQuiz = quizzes[quizId];
  // function to navigate the user to home page
  const goHome = () => {
    // dispatching actions to redux
    dispatch(resetScore());
    dispatch(addFullName(null));
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="lg:w-1/3 sm:w-1/2 w-[90%] relative">
        <div className="text-9xl z-10 bottom-40 absolute left-[30%] md:left-[35%]">
          🎉
        </div>
        <div className="bg-white text-center py-16 font-bold text-xl rounded-md flex flex-col gap-3">
          <div>
            you scored {totalScore} out of {currentQuiz.questions.length}
          </div>
          <Link
            onClick={goHome}
            className="text-lg font-semibold py-1 text-white bg-red-800 w-1/3 mx-auto rounded-md"
            to={"/"}
          >
            Go to home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Result;
