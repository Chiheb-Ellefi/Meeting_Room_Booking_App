import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import apiClient from "../../api/ApiClient";
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userCredentials) => {
    const request = await axios.post(
      `/domain/api/v2/auth/login`,
      userCredentials
    );
    const response = request.data;
    localStorage.setItem("access_token", response.tokens.access_token);
    localStorage.setItem("refresh_token", response.tokens.refresh_token);
    return response;
  }
);
export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  const request = await apiClient.delete(`/auth/logout`);
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  const response = request.data;

  return response;
});
export const sendEmail = createAsyncThunk("auth/sendEmail", async (details) => {
  const request = await axios.post(`/domain/api/v2/auth/email`, details);
  const response = request.data;
  return response;
});

const initialState = {
  loading: false,
  isLoggedIn: false,
  user: null,
  code: null,
  error: null,
};

const authSlice = createSlice({
  name: "auth",

  initialState,
  reducers: {
    setUserProfile: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
    setCode(state, action) {
      state.code = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      toast.success("User Logged In successfully");
      state.loading = false;
      state.isLoggedIn = true;
      state.user = action.payload.user;
      state.error = null;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.user = null;
      state.isLoggedIn = false;
      if (action.error.message == "Request failed with status code 401") {
        state.error = "Access denied, invalid credentials.";
      } else {
        state.error = action.error.message;
      }
      console.log("error", state.error);
      toast.error(state.error);
    });
    builder.addCase(logoutUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(logoutUser.fulfilled, (state) => {
      toast.success("User Logged Out Successfully");
      state.loading = false;
      state.isLoggedIn = false;
      state.user = null;
      state.error = null;
    });
    builder.addCase(logoutUser.rejected, (state, action) => {
      state.loading = false;
      state.isLoggedIn = false;
      if (action.error.message == "Request failed with status code 401") {
        state.error = "Access denied, invalid credentials.";
      }
      if (action.error.message == "Request failed with status code 400") {
        state.error = "No session Found with this access_token!";
      } else {
        state.error = action.error.message;
      }
      console.log("error", state.error);
      toast.error(state.error);
    });
    builder.addCase(sendEmail.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(sendEmail.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(sendEmail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
      if (action.error.message == "Request failed with status code 404") {
        state.error = "No user was found with this email.";
      } else {
        state.error = action.error;
      }
      toast.error("Error", state.error);
    });
  },
});

export default authSlice.reducer;
export const { setUserProfile, setCode } = authSlice.actions;
