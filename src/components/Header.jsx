import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { signOutSuccess } from "../redux/user/userSlice";

const Header = () => {
  // creating navigate to redirect the user to different route using useNavigate hook
  const navigate = useNavigate();
  // creating dispatch to call actions
  const dispatch = useDispatch();
  // setting up some states
  const { fullName } = useSelector((state) => state.user);
  const [activeMenuItem, setActiveMenuItem] = useState(0);

  // function to log user out
  const handleLogout = async () => {
    try {
      // using signOut from firebase
      await signOut(auth);
      //clearing the cookies
      Cookies.remove("accessToken");
      // dispatching the action to redux
      dispatch(signOutSuccess());
      // navigating the user to sign-in page
      navigate("/sign-in");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="flex h-[90px] items-center justify-between px-4 md:px-16 shadow-md">
      <div>
        <img
          className="w-16 md:w-32"
          src="https://media.istockphoto.com/id/1488144839/vector/quiz-logo-quiz-time-label-with-question-mark-quiz-emblem-for-business-marketing-and.jpg?s=612x612&w=0&k=20&c=eYgHRl9M7FtpLRCS-ZKABj3IU5E62cgGUTCY2HN5JO8="
          alt="quiz_app"
        />
      </div>
      <div>
        <ul className="flex text-sm items-center gap-4 md:gap-12">
          <li>
            {/* conditional styling */}
            <Link
              to="/"
              className={` ${
                activeMenuItem === 0 ? "text-blue-600" : "text-black"
              } font-semibold`}
              onClick={() => setActiveMenuItem(0)}
            >
              Home
            </Link>
          </li>
          <li>
            {/* conditional styling */}
            <Link
              to="/my-quiz"
              className={` ${
                activeMenuItem === 1 ? "text-blue-600" : "text-black"
              } font-semibold`}
              onClick={() => setActiveMenuItem(1)}
            >
              My Quizzes
            </Link>
          </li>
          <li>
            {/* conditional styling */}
            <Link
              to="/play-quiz"
              className={` ${
                activeMenuItem === 2 ? "text-blue-600" : "text-black"
              } font-semibold`}
              onClick={() => setActiveMenuItem(2)}
            >
              Play Quiz
            </Link>
          </li>
          <li>
            {/* passing the logout function in onClick */}
            <Link
              onClick={handleLogout}
              className="md:px-4 md:py-3 p-2 bg-red-800 rounded-md text-white font-semibold"
            >
              Logout
            </Link>
          </li>
          {/* displaying full name on condition */}
          {fullName && <li className="font-semibold">{fullName}</li>}
        </ul>
      </div>
    </div>
  );
};

export default Header;
