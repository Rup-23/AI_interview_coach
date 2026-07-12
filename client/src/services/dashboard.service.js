import api from "../api/axios";

export const getDashboardStats = async () => {
  const response = await api.get("/users/dashboard-stats");
  return response.data;
};