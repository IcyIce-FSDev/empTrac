import employees from "../datasets/employees.json";

export default function getEmp() {
  // Map employees to new objects with id and name properties
  let list = employees.map((emp) => ({
    id: emp.id,
    name: `${emp.lastName}, ${emp.firstName}`, // Add space after comma for better readability
  }));

  // Custom sorting function to sort by name
  list.sort((a, b) => a.name.localeCompare(b.name));

  return list;
}
