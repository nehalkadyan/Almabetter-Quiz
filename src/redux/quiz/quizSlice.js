import { createSlice } from "@reduxjs/toolkit";
// creating initialState
const initialState = {
  currentQuizData: null,
  quizzes: [],
  totalScore: 0,
};
// creating userSlice
const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    addCurrentQuiz: (state, action) => {
      state.currentQuizData = action.payload;
    },
    addToQuizzes: (state, action) => {
      state.quizzes.push(action.payload);
    },
    toggleQuizStatus: (state, action) => {
      const quizId = action.payload;
      state.quizzes[quizId].isActive = !state.quizzes[quizId].isActive;
    },
    editQuizTitle: (state, action) => {
      const { quizIdToEdit } = action.payload;
      const { editTitle } = action.payload;
      state.quizzes[quizIdToEdit].title = editTitle;
    },
    deleteQuiz: (state, action) => {
      const { quizIdToDelete } = action.payload;
      state.quizzes = state.quizzes.filter(
        (quiz, index) => index !== quizIdToDelete
      );
    },
    calculateScore: (state, action) => {
      const { selectedOption, questionCount, quizId } = action.payload;
      const quizToPlay = state.quizzes[quizId];
      const currentQuestion = quizToPlay.questions[questionCount];

      if (selectedOption === currentQuestion.correctOption) {
        state.totalScore += 1;
      }
    },
    resetScore: (state) => {
      state.totalScore = 0;
    },
  },
});
// exporting actions
export const {
  addCurrentQuiz,
  addToQuizzes,
  toggleQuizStatus,
  editQuizTitle,
  deleteQuiz,
  calculateScore,
  resetScore,
} = quizSlice.actions;
// exporting reducer
export default quizSlice.reducer;
