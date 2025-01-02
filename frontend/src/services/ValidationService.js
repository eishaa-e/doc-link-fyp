import { jwtDecode } from "jwt-decode";

const validationService = {
  validateToken: () => {
    const token = localStorage.getItem("authToken");
    console.log("initial token: ", token);
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp < Date.now()) {
        localStorage.removeItem("authToken");
        return false;
      }
      return true;
    } else {
      localStorage.removeItem("authToken");
      return false;
    }
  }
};

export default validationService;