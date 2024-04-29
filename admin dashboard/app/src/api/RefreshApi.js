import axios from "axios";

const refreshApi = async () => {
  const refreshToken = localStorage.getItem("refresh_token");
  try {
    const response = await axios.post(`/domain/api/v2/auth/token`, {
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    });
    const { access_token, refresh_token } = response.data;
    localStorage.setItem("access_token", access_token);
    localStorage.setItem("refresh_token", refresh_token);
    console.log("refreshed tokens");
    return access_token;
  } catch (error) {
    console.log("erororor", error);
  }
};
export default refreshApi;
