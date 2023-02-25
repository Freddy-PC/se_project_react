import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/App/App"; // App.js
import reportWebVitals from "./reportWebVitals";
import { HashRouter } from "react-router-dom";

// Instead of BrowserRoyter comp...
// HashRouter component allows depployment on GitHub to function
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
