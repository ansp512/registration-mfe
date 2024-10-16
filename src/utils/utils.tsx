export function getTimeFromString(dateString: string): string {
  // Convert the string to a Date object
  const date = new Date(dateString);

  // Check if the conversion was successful
  if (isNaN(date.getTime())) {
    throw new Error("Invalid date string format");
  }

  // Extract hours and minutes
  const hours = date.getHours();
  const minutes = date.getMinutes();

  // Format time as HH:MM
  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}`;
}


export function getDateFromString(dateTimeString: string): string {
  // Convert the string to a Date object
  const dateTime = new Date(dateTimeString);

  // Check if the conversion was successful
  if (isNaN(dateTime.getTime())) {
    throw new Error("Invalid date string format");
  }

  // Extract the year, month, and day
  const year = dateTime.getFullYear();
  const month = (dateTime.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-indexed
  const day = dateTime.getDate().toString().padStart(2, "0");

  return `${day}-${month}-${year}`; // Format: DD-MM-YY
}

