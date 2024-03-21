import React, { useState } from "react";
import { auth } from "../firebase";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { signInSuccess } from "../redux/user/userSlice";
import { signInWithEmailAndPassword } from "firebase/auth";

const Signin = () => {
  // creating dispatch to call actions
  const dispatch = useDispatch();
  // creating navigate to navigate the user to different routes
  const navigate = useNavigate();
  // setting up necessary states
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // function to handle the changes in formData state
  const handleChange = (e) => {
    setFormData({
      // retaining the previous unchanged data
      ...formData,
      // setting new values
      [e.target.id]: e.target.value,
    });
  };

  // function to sign in the user
  const handleSignIn = async (e) => {
    e.preventDefault();
    // using try catch block
    try {
      // changing state values
      setError(null);
      setLoading(true);
      if (formData.email.length < 5 || formData.email.length > 50) {
        return alert(
          "Email length should be minimum of 5 characters and maximum of 50 characters long"
        );
      } else if (formData.password.length < 5) {
        return alert("password should contain atleast 5 characters");
      }
      // storing the user credentials in a variable
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      // storing the user object in user variable
      const user = userCredentials.user;
      // storing the token
      const accessToken = await user.getIdToken();
      // setting the cookies
      Cookies.set("accessToken", accessToken);
      // dispatching the action to redux
      dispatch(
        signInSuccess({
          email: user.email,
          username: user.displayName,
        })
      );
      // changing loading state
      setLoading(false);
      if (user) {
        // navigating the user to home page
        navigate("/");
      }
    } catch (err) {
      console.log(err);
      // changing states
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="flex bg-red-800 justify-center items-center min-h-screen">
      <div className="lg:w-1/3 flex items-center flex-col sm:w-1/2 w-[90%] bg-white py-12 gap-6 rounded-md">
        <h2 className="text-2xl font-semibold">Sign In</h2>
        <form className="flex flex-col gap-4" onSubmit={handleSignIn}>
          <input
            type="email"
            placeholder="Email"
            id="email"
            onChange={handleChange}
            className="p-2 outline-none text-lg"
          />
          <input
            type="password"
            placeholder="Passsword"
            id="password"
            onChange={handleChange}
            className="p-2 outline-none text-lg"
          />
          <button
            className="text-lg bg-red-800 font-semibold transition duration-300 hover:bg-white hover:text-black border border-gray-500  text-white w-1/2 mx-auto rounded-md py-2"
            type="submit"
          >
            {loading ? "Loading" : "Sign In"}
          </button>
        </form>
        <p>
          Don't have an account?{" "}
          <Link to="/sign-up" className="text-blue-600 text-sm">
            Sign up
          </Link>
          {/* displaying error is there is */}
        </p>
        {error && <p>{error}</p>}
      </div>
    </div>
  );
};

export default Signin;
