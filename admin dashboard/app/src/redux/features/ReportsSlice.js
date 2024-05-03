import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import apiClient from "../../api/ApiClient";
import axios from "axios";
const initialState = {
  loading: false,
  data: [],
  count: 0,
  error: null,
};
export const fetchReports = createAsyncThunk(
  "reports/fetchReports",
  async ({ offset, limit }) => {
    const request = await apiClient.get(
      `/reports?offset=${offset}&limit=${limit}`
    );
    const response = request.data;
    return response;
  }
);
export const deleteReport = createAsyncThunk(
  "reports/deleteReport",
  async ({ rep_id }) => {
    const request = await apiClient.delete(`/report/${rep_id}`);
    const response = request.data;
    return response;
  }
);
export const sendToSupport = createAsyncThunk(
  "reports/sendToSupport",
  async (details) => {
    const request = await axios.post(`/domain/api/v2/auth/email`, details);
    const response = request.data;
    return response;
  }
);
export const updateReport = createAsyncThunk(
  "reports/updateReport",
  async ({ rep_id, details }) => {
    const request = await apiClient.patch(`/report/${rep_id}`, details);
    const response = request.data;
    return response;
  }
);
const reportsSlice = createSlice({
  name: "reports",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchReports.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchReports.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload.data;
      state.count = action.payload.count;
      state.error = null;
    });
    builder.addCase(fetchReports.rejected, (state, action) => {
      state.loading = false;
      state.data = [];
      if (action.error.message == "Request failed with status code 401") {
        state.error = "Access denied, invalid credentials.";
      } else {
        state.error = action.error.message;
      }
      console.log("error", state.error);
      toast.error(state.error);
    });
    builder.addCase(deleteReport.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteReport.fulfilled, (state) => {
      state.loading = false;

      state.error = null;
    });
    builder.addCase(deleteReport.rejected, (state, action) => {
      state.loading = false;
      state.data = [];
      if (action.error.message == "Request failed with status code 401") {
        state.error = "Access denied, invalid credentials.";
      } else {
        state.error = action.error.message;
      }
      console.log("error", state.error);
      toast.error(state.error);
    });
    builder.addCase(sendToSupport.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(sendToSupport.fulfilled, (state) => {
      state.loading = false;
      state.error = null;
    });
    builder.addCase(sendToSupport.rejected, (state, action) => {
      state.loading = false;
      if (action.error.message == "Request failed with status code 401") {
        state.error = "Access denied, invalid credentials.";
      } else {
        state.error = action.error.message;
      }
      console.log("error", state.error);
      toast.error(state.error);
    });
    builder.addCase(updateReport.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateReport.fulfilled, (state) => {
      state.loading = false;
      state.error = null;
    });
    builder.addCase(updateReport.rejected, (state, action) => {
      state.loading = false;
      if (action.error.message == "Request failed with status code 401") {
        state.error = "Access denied, invalid credentials.";
      } else {
        state.error = action.error.message;
      }
      console.log("error", state.error);
      toast.error(state.error);
    });
  },
});

export default reportsSlice.reducer;
