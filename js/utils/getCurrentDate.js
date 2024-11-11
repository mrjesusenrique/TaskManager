const getCurrentDate = () => {
  const now = new Date();
  const anio = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hour = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const ampm = hour >= 12 ? "PM" : "AM";
  const hour12 = hour % 12 || 12;

  return `${anio}/${month}/${day} ${hour12}:${minutes} ${ampm}`;
};

export default getCurrentDate;