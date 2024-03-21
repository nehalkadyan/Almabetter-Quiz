import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // wrapping up the app with provider
  <Provider store={store}>
    {/* wrapping up app with PersistGate so redux state remains */}
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);
