const CommonService = {
    formatDate: (date) => {
        if (date === null) return "";

        const dateObj = new Date(date);

        const year = dateObj.getFullYear();
        const month = String(dateObj.getMonth() + 1).padStart(2, "0");
        const day = String(dateObj.getDate()).padStart(2, "0");

        return `${day}-${month}-${year}`;
    }
}

export default CommonService;