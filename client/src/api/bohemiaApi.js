import axios from "axios";

export const bohemiaApi = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL || 'http://localhost:3306',
/*   headers:{"ngrok-skip-browser-warning": "Set and send an ngrok-skip-browser-warning request header with any value."} */
});

bohemiaApi.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    console.log(" vite server url: ", import.meta.env.VITE_SERVER_URL);
    if (error.response.status === 401 || error.response.status === 403) {
      localStorage.removeItem("Authorization");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
