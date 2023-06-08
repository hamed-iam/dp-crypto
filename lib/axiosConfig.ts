import axios from "axios";

const api = axios.create({
  baseURL: process.env.BASE_URL as string,
});

// Add a request interceptor
api.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // DO something with response error
    return Promise.reject(error);
  }
);

export { api };
