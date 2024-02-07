// getUser.js
import users from "../datasets/users.json";

export default function getUser(username, password) {
  const userObj = users.find(
    (user) => user.username === username && user.password === password
  );

  if (!userObj) {
    throw new Error("Incorrect Username or Password");
  }

  return userObj;
}
