import { useEffect, useState } from "react";
import getEmp from "../../../../libs/api/getEmp";
import styles from "./WeeklyView.module.css";
import getHours from "../../../../libs/api/getHours";

export default function WeeklyView() {
  const [empList, setEmpList] = useState([]);
  const [selectedEmp, setSelectedEmp] = useState(""); // State to store selected employee
  const [scheduledHours, setScheduledHours] = useState({});
  const [workedHours, setWorkedHours] = useState({});

  useEffect(() => {
    const employeeList = getEmp();
    setEmpList(employeeList);
  }, []);

  useEffect(() => {
    const fetchHours = async () => {
      try {
        const resp = await getHours(selectedEmp);

        if (resp) {
          setScheduledHours(resp.scheduled);
          setWorkedHours(resp.worked);
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
  }, [selectedEmp]);

  // Function to handle employee selection
  const handleSelectChange = (event) => {
    setSelectedEmp(event.target.value);
  };

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
      {/* Dropdown to select employee */}
      <select
        value={selectedEmp}
        onChange={handleSelectChange}
        className={styles.dropDown}
      >
        <option value="">Select Employee</option>
        {/* Map through the empList to create options */}
        {empList.map((emp) => (
          <option key={emp.id} value={emp.id}>
            {emp.name}
          </option>
        ))}
      </select>

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
