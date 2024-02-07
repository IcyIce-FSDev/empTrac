import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import EmployeeDash from "./Employee/EmployeeDash";
import ManagerDash from "./Manager/ManagerDash";

export default function Dashboard() {
  const empType = useSelector((state) => state.auth.user.type);
  const navi = useNavigate();

  // Render different components based on empType
  return (
    <main>
      {empType === "employee" && <EmployeeDash />}
      {empType === "manager" && <ManagerDash />}
      {empType !== "employee" && empType !== "manager" && navi("/")}
    </main>
  );
}
