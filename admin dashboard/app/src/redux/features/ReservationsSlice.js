import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import apiClient from "../../api/ApiClient";
const initialState = {
  loading: false,
  data: [],
  selectedItemsList: [],
  nbrRes: 0,
  error: null,
};
export const fetchReservations = createAsyncThunk(
  "reservations/fetchReservations",
  async ({ offset, valid, sort, search }) => {
    const request = await apiClient.get(
      `/reservations/all?${sort ? `&sort=${sort}` : ""}&offset=${offset}${
        valid != null ? `&valid=${valid}` : "&valid=all"
      }&search=${search || ""}`
    );
    const response = request.data;

    return response;
  }
);
export const cancelReservation = createAsyncThunk(
  "reservations/cancelReservation",
  async ({ res_id, data }) => {
    const request = apiClient.patch(`/reservation/cancel/${res_id}`, data);
    const response = request.data;
    return response;
  }
);
export const deleteReservation = createAsyncThunk(
  "reservations/deleteReservation",
  async ({ res_id, data }) => {
    const request = apiClient.delete(`/reservation/${res_id}`, data);
    const response = request.data;
    return response;
  }
);
const reservationsSlice = createSlice({
  name: "reservations",
  initialState,
  reducers: {
    setSelectedItemsList: (state, action) => {
      state.selectedItemsList = [...action.payload];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchReservations.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchReservations.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload.reservations;
      state.nbrRes = action.payload.nbrRes;
    });
    builder.addCase(fetchReservations.rejected, (state, action) => {
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
    builder.addCase(cancelReservation.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(cancelReservation.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(cancelReservation.rejected, (state, action) => {
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
    builder.addCase(deleteReservation.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteReservation.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(deleteReservation.rejected, (state, action) => {
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
export const { setSelectedItemsList } = reservationsSlice.actions;
export default reservationsSlice.reducer;
