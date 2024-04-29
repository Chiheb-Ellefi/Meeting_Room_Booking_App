import axios from "axios";
import refreshToken from "./RefreshApi";

const apiClient = axios.create({
  baseURL: `/domain/api/v2`,
});

apiClient.interceptors.request.use(async (config) => {
  const access_token = localStorage.getItem("access_token");

  if (access_token) {
    config.headers.Authorization = `Bearer ${access_token}`;
  }
  return config;
});
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response && error.response.status === 403) {
      try {
        const access_token = await refreshToken();
        error.config.headers.Authorization = `Bearer ${access_token}`;
        // Retry the original request
        return apiClient(error.config);
      } catch (refreshError) {
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);
export default apiClient;
