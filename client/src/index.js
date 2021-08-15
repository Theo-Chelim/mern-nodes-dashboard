import React from "react";
import ReactDOM from "react-dom";

import "./css/index.css";

import { BrowserRouter as Router } from "react-router-dom";

import App from "./components/App";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);