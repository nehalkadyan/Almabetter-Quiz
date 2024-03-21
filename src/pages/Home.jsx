import React from "react";
import { Link } from "react-router-dom";
import { modalToggle } from "../redux/modal/modalSlice";
import { useDispatch } from "react-redux";

const Home = () => {
  // creating a dispatch to call actions
  const dispatch = useDispatch();
  return (
    <div className="min-h-screen pt-6 sm:pt-12 md:pt-24">
      <div className="flex py-12 md:py-0 md:flex-row flex-col gap-8 md:gap-0 justify-around items-center">
        <div className="md:w-1/4 w-3/4 py-32 text-center bg-orange-600">
          {/* toggling the modal on click  */}
          <Link to="/create-quiz" onClick={() => dispatch(modalToggle())}>
            <h2 className="text-xl font-bold text-white">Create New Quiz</h2>
          </Link>
        </div>

        <div className="md:w-1/4 w-3/4 py-32 text-center bg-green-600">
          {/* to link to my quiz page */}
          <Link to="/my-quiz">
            <h2 className="text-xl font-bold text-white">My Quizzes</h2>
          </Link>
        </div>

        <div className="md:w-1/4 w-3/4 py-32 text-center bg-purple-600">
          {/* to link to play quiz page */}
          <Link to="/play-quiz">
            <h2 className="text-xl font-bold text-white">Play Quiz</h2>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
