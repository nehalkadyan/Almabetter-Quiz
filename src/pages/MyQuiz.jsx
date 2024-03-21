import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toggleQuizStatus, editQuizTitle } from "../redux/quiz/quizSlice";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { modalToggle } from "../redux/modal/modalSlice";
import { deleteQuiz } from "../redux/quiz/quizSlice";

const MyQuiz = () => {
  // creating the dispatch to call actions
  const dispatch = useDispatch();
  //accessing the quizzes from the redux store using useSelector hook
  const { quizzes } = useSelector((state) => state.quiz);
  // some necessary states
  const [showModal, setShowModal] = useState(false);
  const [quizIdToEdit, setQuizIdToEdit] = useState(null);
  const [quizIdToDelete, setQuizIdToDelete] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  // function to toggle status
  const handleStatusToggle = (index) => {
    // dispatching the action to redux
    dispatch(toggleQuizStatus(index));
  };
  // function to get the quizId to edit quiz
  const handleQuizIdToEdit = (index) => {
    // setting states to new values
    setQuizIdToEdit(index);
    setShowModal(true);
    setEditTitle(quizzes[index].title);
  };
  // function to edit the quiz
  const handleEditQuizTitle = () => {
    if (editTitle.length < 11 || editQuizTitle.length > 30) {
      return alert(
        "title length should be minimum of 10 characters and maximum of 30 characters"
      );
    } else {
      // dispatching the action to redux
      dispatch(editQuizTitle({ quizIdToEdit, editTitle }));
      setShowModal(false);
    }
  };
  // function to get the quizId to delete quiz
  const handleQuizIdToDelete = (index) => {
    // setting states to new values
    setQuizIdToDelete(index);
    setShowDeleteModal(true);
  };
  // function to delete the quiz
  const handleDeleteQuiz = () => {
    // dispatching the action to redux
    dispatch(deleteQuiz({ quizIdToDelete }));
    setShowDeleteModal(false);
  };

  console.log(quizzes);
  return (
    <div>
      <div className="p-6 mt-5">
        <div className="flex justify-around mb-6">
          <div className="text-2xl">My Quizzes</div>

          <Link
            to="/create-quiz"
            className="px-3 py-2 bg-red-800 rounded-md text-white cursor-pointer"
            onClick={() => dispatch(modalToggle())}
          >
            Create New Quiz
          </Link>
        </div>

        <div className="flex flex-col items-center sm:flex-row w-full justify-around border border-gray-300 p-4">
          <div className="flex sm:flex-col gap-2">
            <h1 className="mb-2 text-lg font-semibold">Title</h1>
            {quizzes?.map((quiz, id) => (
              <div key={id}>{quiz.title}</div>
            ))}
          </div>

          <div className="flex sm:flex-col gap-2">
            <h1 className="mb-2  text-lg font-semibold">Status</h1>
            {quizzes?.map((quiz, id) => (
              <div
                className="cursor-pointer font-semibold text-red-800"
                key={id}
                onClick={() => handleStatusToggle(id)}
              >
                {quiz.isActive ? "Active" : "Inactive"}
              </div>
            ))}
          </div>

          <div className="flex sm:flex-col gap-2">
            <h1 className="mb-2 gap-2  text-lg font-semibold">Created Date</h1>
            {quizzes?.map((quiz, id) => (
              <div key={id}>{quiz.formattedDateTime}</div>
            ))}
          </div>

          <div className="flex sm:flex-col gap-2">
            <h1 className="mb-2  text-lg font-semibold">Actions</h1>
            {quizzes.map((quiz, id) => (
              <div className="flex gap-3 ">
                <div
                  onClick={() => handleQuizIdToEdit(id)}
                  className="text-2xl cursor-pointer text-gray-500"
                >
                  <FaEdit />
                </div>
                <div
                  onClick={() => handleQuizIdToDelete(id)}
                  className="text-2xl cursor-pointer text-gray-500"
                >
                  <MdDelete />
                </div>
              </div>
            ))}
          </div>
        </div>

        {showModal && (
          <div className="modal-wrapper">
            <div className="modal-container">
              <h1 className="text-2xl font-bold">Edit Quiz</h1>
              <div className="my-4">
                <span className="text-xl font-semibold">Title : </span>
                <input
                  type="text"
                  placeholder="edit title"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="border border-gray-400 p-2 rounded-md outline-none"
                />
              </div>
              <div className="flex gap-8">
                <div
                  onClick={handleEditQuizTitle}
                  className="bg-blue-800 cursor-pointer px-4 py-2 text-white font-semibold rounded-md"
                >
                  Save
                </div>
                <div
                  onClick={() => setShowModal(false)}
                  className="bg-red-800 cursor-pointer px-4 py-2 text-white font-semibold rounded-md"
                >
                  Cancel
                </div>
              </div>
            </div>
          </div>
        )}

        {showDeleteModal && (
          <div className="modal-wrapper">
            <div className="modal-container">
              <h1 className="text-2xl font-bold">Delete Quiz</h1>

              <p className="my-4 text-gl font-semibold">
                Are you sure you want to delete this quiz?
              </p>

              <div className="flex gap-8">
                <div
                  onClick={handleDeleteQuiz}
                  className="bg-blue-800 cursor-pointer px-4 py-2 text-white font-semibold rounded-md"
                >
                  Yes
                </div>
                <div
                  onClick={() => setShowDeleteModal(false)}
                  className="bg-red-800 cursor-pointer px-4 py-2 text-white font-semibold rounded-md"
                >
                  Cancel
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyQuiz;
