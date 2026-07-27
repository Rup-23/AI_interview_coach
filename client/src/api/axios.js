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

// Endpoints that should never trigger a token refresh
const SKIP_REFRESH_URLS = [
  "/auth/refresh-token",
  "/auth/login",
  "/auth/register",
];

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    // Don't retry auth endpoints — prevents infinite refresh loops
    const shouldSkip = SKIP_REFRESH_URLS.some((url) =>
      originalRequest.url?.includes(url)
    );

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !shouldSkip
    ) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(() => api(originalRequest));
      }

      isRefreshing = true;

      try {
        await api.post("/auth/refresh-token");
        processQueue();
        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError);

        // Notify the app that the session is dead — AuthProvider listens for this
        window.dispatchEvent(new CustomEvent("auth:logout"));

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;