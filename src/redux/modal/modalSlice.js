import { createSlice } from "@reduxjs/toolkit";

// creating initial state
const initialState = {
  modal: false,
};

// creating modalslice
const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    modalToggle: (state) => {
      state.modal = !state.modal;
    },
  },
});

// exporting the action
export const { modalToggle } = modalSlice.actions;
// exporting the reducer
export default modalSlice.reducer;
