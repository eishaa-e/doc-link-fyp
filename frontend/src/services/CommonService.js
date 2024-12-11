const CommonService = {
  formatDate: (date) => {
    if (date === null) return "";

    const dateObj = new Date(date);

    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const day = String(dateObj.getDate()).padStart(2, "0");

    return `${day}-${month}-${year}`;
  },

  formatTimeToAMPM: (time) => {
    const [hour, minute] = time.split(":").map(Number);
    const isPM = hour >= 12;
    const formattedHour = isPM ? hour % 12 || 12 : hour;
    const ampm = isPM ? "PM" : "AM";
    return `${formattedHour.toString().padStart(2, "0")}:${minute
      .toString()
      .padStart(2, "0")} ${ampm}`;
  }

};

export default CommonService;