import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { modalToggle } from "../redux/modal/modalSlice";
import McqForm from "../components/McqForm";

const CreateQuiz = () => {
  // creating a dispatch to call actions
  const dispatch = useDispatch();
  // accessing modal from the redux store
  const { modal } = useSelector((state) => state.modal);

  // creating state for quiz selection type
  const [selectionType, setSelectionType] = useState(null);

  // function to handle the quiz selection type
  const handleSelectionType = (type) => {
    dispatch(modalToggle());
    setSelectionType(type);
  };

  return (
    <div className="p-6">
      <div>
        <h2 className="text-2xl font-bold">Create New Quiz</h2>
      </div>
      {/* showing modal if modal state is true */}
      {modal && (
        <div className="modal-wrapper">
          <div className="modal-container">
            <h3>Select Question Type</h3>
            <label>
              <input
                type="radio"
                name="questionType"
                value="mcqSingle"
                onChange={() => handleSelectionType("mcqSingle")}
              />
              MCQ (Single Correct)
            </label>
          </div>
        </div>
      )}

      <div className="flex justify-center mt-8">
        {/* rendering MCQForm on condition */}
        {selectionType === "mcqSingle" && <McqForm />}
      </div>
    </div>
  );
};

export default CreateQuiz;
