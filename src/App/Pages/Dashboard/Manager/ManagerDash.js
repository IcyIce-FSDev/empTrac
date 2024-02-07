import React from "react";
import styles from "./ManagerDash.module.css";
import Nav from "../../../Components/Nav";
import WeeklyView from "../../../Components/manager/WeeklyView/WeeklyView";
import QuickView from "../../../Components/employee/QuickView/QuickView";

export default function ManagerDash() {
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
