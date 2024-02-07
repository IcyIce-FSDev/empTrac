import React from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./index.css";
import App from "./App/App";
import { Provider } from "react-redux";
import store from "./libs/redux/store";
import Dashboard from "./App/Pages/Dashboard/Dashboard";
import Logout from "./App/Pages/Logout/Logout";

function isAuthenticated() {
  const userJSON = localStorage.getItem("user");
  return userJSON ? true : false;
}

function ProtectedRoute({ element, ...rest }) {
  return isAuthenticated() ? element : <Navigate to="/" replace />;
}

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Provider store={store}>
              <App />
            </Provider>
          }
        />

        <Route
          path="/logout"
          element={
            <Provider store={store}>
              <Logout />
            </Provider>
          }
        />

        <Route
          path="/dashboard"
          element={
            <Provider store={store}>
              <ProtectedRoute element={<Dashboard />} />
            </Provider>
          }
        />
      </Routes>
    </Router>
  </React.StrictMode>
);
