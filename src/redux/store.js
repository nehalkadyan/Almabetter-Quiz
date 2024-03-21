import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
//  importing reducer slices
import userReducer from "./user/userSlice";
import modalReducer from "./modal/modalSlice";
import quizReducer from "./quiz/quizSlice";

// combining reducers
const rootReducer = combineReducers({
  user: userReducer,
  modal: modalReducer,
  quiz: quizReducer,
});

// creating persist config
const persistConfig = {
  key: "root",
  storage,
  version: 1,
};

// creating persistedReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// exporting the store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: process.env.NODE_ENV !== "production",
});

// exporting persistor
export const persistor = persistStore(store);
