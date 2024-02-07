import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import getHours from "../../../../libs/api/getHours";
import styles from "./WeeklyView.module.css"; // Import CSS file for styling

export default function WeeklyView() {
  const empId = useSelector((state) => state.auth.user.id);
  const [scheduledHours, setScheduledHours] = useState({});
  const [workedHours, setWorkedHours] = useState({});

  useEffect(() => {
    const fetchHours = async () => {
      try {
        const resp = await getHours(empId);
        if (resp) {
          setScheduledHours(resp.scheduled);
          setWorkedHours(resp.worked);
        } else {
          console.log("Error retrieving hours");
        }
      } catch (error) {
        console.error("Error retrieving hours:", error);
      }
    };

    fetchHours();

    return () => {
      setScheduledHours({});
      setWorkedHours({});
    };
  }, [empId]);

  // Function to render table row for hours
  const renderHoursRow = (data) => {
    return (
      <tr>
        {Object.values(data).map((hours, index) => (
          <td key={index}>{hours}</td>
        ))}
      </tr>
    );
  };

  return (
    <div className={styles.weeklyView}>
      <div>
        <h2 className={styles.tableHeader}>Scheduled Hours</h2>
        <table className={styles.hoursTable}>
          <thead>{RenderHeaderRow(scheduledHours)}</thead>
          <tbody>{renderHoursRow(scheduledHours)}</tbody>
        </table>
      </div>
      <div>
        <h2 className={styles.tableHeader}>Worked Hours</h2>
        <table className={styles.hoursTable}>
          <thead>{RenderHeaderRow(workedHours)}</thead>
          <tbody>{renderHoursRow(workedHours)}</tbody>
        </table>
      </div>
    </div>
  );
}

// Function to render table header row for days of the week
const RenderHeaderRow = (data) => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <tr>
      {Object.keys(data).map((day) => (
        <th key={day}>
          {screenWidth > 768
            ? day.charAt(0).toUpperCase() + day.slice(1)
            : day.charAt(0).toUpperCase() + day.slice(1, 3)}
        </th>
      ))}
    </tr>
  );
};
