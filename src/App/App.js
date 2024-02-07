// App.js
import { useNavigate } from "react-router-dom";
import getUser from "../libs/api/getUser";
import { login } from "../libs/redux/slice/authSlice";
import styles from "./App.module.css";
import { useState } from "react";
import { useDispatch } from "react-redux";

export default function App() {
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    try {
      const userObj = await getUser(username, password);

      if (userObj) {
        dispatch(login(userObj));
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Authentication error:", error.message);
      setErrorMessage("Incorrect Username or Password");

      // Clear the error message after 5 seconds
      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
    } finally {
      setLoading(false);
      setUsername("");
      setPassword("");
    }
  };

  return (
    <main className={styles.main}>
      {loading && (
        <div className={styles.overlay}>
          <div className={styles.spinner}></div>
        </div>
      )}

      <h1 className={styles.title}>Emp Trac</h1>

      <form onSubmit={handleSubmit} className={styles.form}>
        <section className={styles.inputbox}>
          <label htmlFor="username" className={styles.labels}>
            Username:
            <input
              type="text"
              id="username"
              autoComplete="false"
              value={username}
              onChange={handleUsernameChange}
            />
          </label>

          <label htmlFor="password" className={styles.labels}>
            Password:
            <input
              type="password"
              id="password"
              autoComplete="false"
              value={password}
              onChange={handlePasswordChange}
            />
          </label>
        </section>

        <button type="submit" className={styles.button}>
          Submit
        </button>
        {errorMessage && <p className={styles.error}>{errorMessage}</p>}
      </form>
    </main>
  );
}
