import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  fullName: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
    },
    signOutSuccess: (state) => {
      state.currentUser = null;
    },
    addFullName: (state, action) => {
      state.fullName = action.payload;
    },
  },
});

export const { signInSuccess, addFullName, signOutSuccess } = userSlice.actions;
export default userSlice.reducer;
