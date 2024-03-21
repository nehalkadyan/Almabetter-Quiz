import React, { useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
  // creating navigate to navigate the user to different route
  const navigate = useNavigate();
  // creating formData state
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  // function to handle formData state change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  // function to sign up the user
  const handleSignUp = async (e) => {
    e.preventDefault();
    // using try catch block
    try {
      // conditional statements
      if (formData.username.length <= 5 || formData.username.length > 50) {
        return alert(
          "Username should be atleast 5 characters and maximum 50 characters long"
        );
      } else if (formData.email.length < 6) {
        return alert("Email length should be more than 5 letters");
      } else if (formData.password.length < 5) {
        return alert("password should contain atleast 5 characters");
      }
      // storing the user credentials
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      // storing the user object
      const user = userCredential.user;

      // set username
      await updateProfile(user, {
        displayName: formData.username,
      });

      // navigating the user to sign-in page
      navigate("/sign-in");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex bg-red-800 justify-center items-center min-h-screen">
      <div className="lg:w-1/3 flex items-center flex-col sm:w-1/2 w-[90%] bg-white py-12 gap-6 rounded-md">
        <h2 className="text-2xl font-semibold">Sign up</h2>
        <form className="flex flex-col gap-4" onSubmit={handleSignUp}>
          <input
            type="text"
            placeholder="Username"
            id="username"
            onChange={handleChange}
            className="p-2 outline-none text-lg"
          />
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
            Sign Up
          </button>
        </form>
        <p>
          Already have an account?{" "}
          <Link to="/sign-in" className="text-blue-600 text-sm">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
