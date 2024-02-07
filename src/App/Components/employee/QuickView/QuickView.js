import { useState, useEffect } from "react";
import styles from "./QuickView.module.css";
import { DateTime } from "luxon";

export default function QuickView() {
  // State to store the times array
  const [times, setTimes] = useState([]);
  const [reload, setReload] = useState(true);

  function postTime(e) {
    const value = e.target.value;
    const firstIndex = value.indexOf(" ");
    const action = value.slice(0, firstIndex);
    const reason = value.slice(firstIndex + 1);
    const timestamp = Date.now(); // Get the current timestamp

    const obj = {
      action: action,
      reason: reason,
      timestamp: timestamp,
    };

    // Retrieve existing times array from localStorage
    const existingTimes = localStorage.getItem("times");
    let times = existingTimes ? JSON.parse(existingTimes) : [];

    // Add the new object to the times array
    times.push(obj);

    // Store the updated times array back into localStorage
    localStorage.setItem("times", JSON.stringify(times));
    setReload(true);
  }

  useEffect(() => {
    // Function to fetch times from LocalStorage
    const fetchTimes = () => {
      // Retrieve times from LocalStorage
      const storedTimes = localStorage.getItem("times");
      if (storedTimes && reload) {
        // Parse the stored times if available
        const parsedTimes = JSON.parse(storedTimes);
        setTimes(parsedTimes);
      }
    };

    // Call fetchTimes function
    fetchTimes();
    setReload(false);
  }, [reload]); // Run once on component mount

  return (
    <div className={styles.mainCon}>
      <div className={styles.tracking}>
        <div className={styles.start}>
          <h2>Start</h2>
          <div>
            <button
              value="Start Shift"
              className={styles.shift}
              onClick={postTime}
            >
              Shift
            </button>
            <button
              value="Start Lunch"
              className={styles.lunch}
              onClick={postTime}
            >
              Lunch
            </button>
          </div>
        </div>

        <div className={styles.end}>
          <h2>End</h2>
          <div>
            <button
              value="End Lunch"
              className={styles.lunch}
              onClick={postTime}
            >
              Lunch
            </button>
            <button
              value="End Shift"
              className={styles.shift}
              onClick={postTime}
            >
              Shift
            </button>
          </div>
        </div>
      </div>

      <div className={styles.entries}>
        <h2>Last 8 entries</h2>
        <table className={styles.entriesTable}>
          <thead>
            <tr>
              <th>Action</th>
              <th>Reason</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {/* Map through the times array to display last 8 entries */}
            {times
              .slice(-8) // Slice the last 8 elements of the array
              .reverse() // Reverse the order to show the latest entry first
              .map((entry, index) => (
                <tr key={index}>
                  {/* Display each entry's action, time, and reason */}
                  <td>{entry.action}</td>
                  <td>{entry.reason}</td>
                  <td>
                    {DateTime.fromMillis(entry.timestamp).toLocaleString(
                      DateTime.DATETIME_MED
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
