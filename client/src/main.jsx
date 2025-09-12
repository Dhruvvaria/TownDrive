import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import { AppProvider } from "./context/AppContext.jsx";
import { MotionConfig } from "motion/react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AppProvider>
      <MotionConfig viewport={{ once: true }}>
        <App />
      </MotionConfig>
    </AppProvider>
  </BrowserRouter>
);
