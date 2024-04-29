import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import apiClient from "../../api/ApiClient";

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
  },
});

export default reportsSlice.reducer;
