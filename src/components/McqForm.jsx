import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addCurrentQuiz, addToQuizzes } from "../redux/quiz/quizSlice";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";

const McqForm = () => {
  // creating necessary states
  const [showModal, setShowModal] = useState(false);
  const [questionCount, setQuestionCount] = useState(1);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    questions: [],
    currentQuestion: "",
    currentOptions: [],
    currentCorrectOption: "",
  });

  // creating dispatch to call actions
  const dispatch = useDispatch();

  // function to handle input value changes
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // function to add question to formData state
  const handleAddQuestion = () => {
    setQuestionCount(questionCount + 1);
    if (formData.currentOptions.length < 2) {
      return alert("Atleast two options required to save question");
    }
    if (formData.currentOptions.length >= 2) {
      setFormData({
        ...formData,
        questions: [
          ...formData.questions,
          {
            question: formData.currentQuestion,
            options: formData.currentOptions,
            correctOption: formData.currentCorrectOption,
          },
        ],
        currentQuestion: "",
        currentOptions: [],
        currentCorrectOption: "",
      });
    }
  };

  // function to add option
  const handleAddOption = () => {
    if (
      formData.currentQuestion.length < 10 ||
      formData.currentQuestion.length > 200
    ) {
      return alert(
        "Question length should be minimum of 10 characters and maximum of 200 characters"
      );
    }
    if (formData.currentOptions.length < 4) {
      setFormData({
        ...formData,
        currentOptions: [...formData.currentOptions, ""],
      });
    }
  };

  // function to delete option
  const handleDeleteOption = (index) => {
    const updatedOptions = [...formData.currentOptions];
    updatedOptions.splice(index, 1);
    setFormData({
      ...formData,
      currentOptions: updatedOptions,
    });
  };

  // function to handle changes in selecting option
  const handleCheckboxChange = (option) => {
    setFormData({
      ...formData,
      currentCorrectOption: option,
    });
  };

  // function to submit the form
  const handleSubmit = (e) => {
    // preventing the default behavior
    e.preventDefault();
    if (formData.title.length < 10 || formData.title.length > 30) {
      return alert("Title length should be minimum of 10 characters ");
    }
    if (
      formData.questions.length < 11 &&
      formData.title.length >= 10 &&
      formData.title.length < 201
    ) {
      const { title, description, questions } = formData;
      // function to get the desired date and time format
      const formatDate = (date) => {
        const day = date.getDate();
        const monthNames = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];
        const monthIndex = date.getMonth();
        let hours = date.getHours();
        const minutes = date.getMinutes().toString().padStart(2, "0");
        const ampm = hours >= 12 ? "PM" : "AM";

        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'

        return `${day} ${monthNames[monthIndex]}, ${hours}:${minutes} ${ampm}`;
      };

      // getting the object from Date()
      const currentDate = new Date();
      const formattedDateTime = formatDate(currentDate);
      const isActive = true;
      // Dispatch action to save form data to Redux store
      dispatch(addCurrentQuiz({ title, description, questions }));
      dispatch(
        addToQuizzes({
          title,
          description,
          questions,
          formattedDateTime,
          isActive,
        })
      );
      // Reset form after submission
      setFormData({
        title: "",
        description: "",
        questions: [],
        currentQuestion: "",
        currentOptions: [],
        currentCorrectOption: "",
      });
      // setting showModal to true
      setShowModal(true);
    }
  };

  return (
    <div className="md:w-[80%] flex justify-center">
      <div className="border p-4 border-black md:w-3/4 ">
        <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
          <div className="flex justify-around items-center gap-2">
            <input
              className="border w-[80%] outline-none border-gray-400 rounded-lg p-4"
              placeholder="Title"
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              min={10}
              max={30}
            />
            <textarea
              className="border w-[80%] outline-none border-gray-400 rounded-lg p-4"
              placeholder="Description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
            />
          </div>

          <div className="flex justify-between items-center">
            <div className="w-full">
              <input
                className="border w-3/4 outline-none border-gray-400 rounded-lg p-4"
                type="text"
                placeholder="Enter Question"
                value={formData.currentQuestion}
                min={10}
                max={200}
                onChange={(e) =>
                  setFormData({ ...formData, currentQuestion: e.target.value })
                }
              />
            </div>
            <div className="w-1/4">Question {questionCount}</div>
          </div>

          {formData.currentOptions.map((option, index) => (
            <div key={index} className="flex flex-wrap items-center gap-2">
              <input
                className="border outline-none border-gray-400 rounded-lg p-4"
                type="text"
                placeholder="Enter Option"
                value={option}
                onChange={(e) => {
                  const updatedOptions = [...formData.currentOptions];
                  updatedOptions[index] = e.target.value;
                  setFormData({
                    ...formData,
                    currentOptions: updatedOptions,
                  });
                }}
              />
              <div className="flex  gap-2 border border-gray-400 p-2 rounded-md">
                <input
                  type="radio"
                  checked={formData.currentCorrectOption === option}
                  onChange={() => handleCheckboxChange(option)}
                />
                <label>Correct Answer</label>
              </div>
              <button
                type="button"
                className="text-3xl"
                onClick={() => handleDeleteOption(index)}
              >
                <MdDelete />
              </button>
            </div>
          ))}
          <button type="button" onClick={handleAddOption}>
            Add Option
          </button>
          <button type="button" onClick={handleAddQuestion}>
            Add Question
          </button>
          <button
            className="bg-red-900 w-[70%] md:w-[50%] lg:w-[30%] text-white rounded-lg p-4"
            type="submit"
          >
            Submit Quiz
          </button>
        </form>
      </div>

      {showModal && (
        <div className="modal-wrapper">
          <div className="modal-container">
            <h1 className="text-red-800 font-semibold">
              Quiz submitted successfully🥳
            </h1>
            <Link
              to="/all-questions"
              className="font-bold mt-2 cursor-pointer"
              onClick={() => setShowModal(false)}
            >
              View all Questions
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default McqForm;
