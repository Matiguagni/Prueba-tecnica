import axios from "axios";

//INSTANCIA DE AXIOS
const axiosClient = axios.create({
  baseURL: "https://api.artic.edu/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosClient;
