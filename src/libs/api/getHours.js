// getHours.js
import hours from "../datasets/hours.json";

export default function getHours(id) {
  if (!id || id <= 0) {
    return false;
  }

  let formattedObj;

  try {
    // eslint-disable-next-line
    const hoursObj = hours.find((el) => el.id == id);

    formattedObj = {
      scheduled: hoursObj.scheduled,
      worked: hoursObj.worked,
    };
  } catch (error) {
    console.log(error);
  }

  return formattedObj;
}
