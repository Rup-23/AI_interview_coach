// import axios from "axios";

// const api = axios.create({
//   baseURL: "http://localhost:5000/api/v1",
//   withCredentials: true,
// });

// export default api;

import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

let isRefreshing = false;

let failedQueue = [];

const processQueue = (error = null) => {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve();
    }
  });

  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve,
            reject,
          });
        }).then(() => api(originalRequest));
      }

      isRefreshing = true;

      try {
        await api.post("/auth/refresh-token");

        processQueue();

        return api(originalRequest);
      }
      catch (refreshError) {
        processQueue(refreshError);

        // window.location.href = "/login";

        return Promise.reject(refreshError);
      }
      finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;