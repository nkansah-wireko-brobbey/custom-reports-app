import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, 
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, 
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error(`[Axios Error]: ${error.message}`);
    return Promise.reject(error);
  }
);

export default apiClient;
