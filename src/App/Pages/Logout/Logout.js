// Logout.js
import React from "react";
import styles from "./Logout.module.css"; // Import CSS file
import { useDispatch } from "react-redux";
import { logout } from "../../../libs/redux/slice/authSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const resp = true; // This is request to server to logout.

    if (resp) {
      localStorage.removeItem("times");
      dispatch(logout());
      navigate("/");
    }
  }, [dispatch, navigate]);

  return (
    <div className={styles.cont}>
      <div className={styles.loadingCircle}></div>
    </div>
  );
}
