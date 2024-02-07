import React from "react";
import styles from "./EmployeeDash.module.css";
import WeeklyView from "../../../Components/employee/WeeklyView/WeeklyView";
import Nav from "../../../Components/Nav";
import QuickView from "../../../Components/employee/QuickView/QuickView";

export default function EmployeeDash() {
  return (
    <div className={styles.mainCon}>
      <header className={styles.headerCon}>
        <h1>Dashboard</h1>

        <Nav />
      </header>

      <section className={styles.weekView}>
        <WeeklyView />
      </section>

      <section className={styles.quickTrack}>
        <QuickView />
      </section>
    </div>
  );
}
