import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { initAuthSync } from "./utils/auth";

initAuthSync();
const savedTheme = window.localStorage.getItem("theme");
const prefersDark =
  window.matchMedia?.("(prefers-color-scheme: dark)")?.matches ?? false;
const useDark = savedTheme ? savedTheme === "dark" : prefersDark;
document.documentElement.classList.toggle("dark", useDark);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
