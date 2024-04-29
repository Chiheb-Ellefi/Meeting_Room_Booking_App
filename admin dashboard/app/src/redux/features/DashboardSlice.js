import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import apiClient from "../../api/ApiClient";

const initialState = {
  reservationsPerRoomLoading: false,
  reservationsPerRoom: [],
  reservationsPerRoomError: null,
  reservationsPerUserLoading: false,
  reservationsPerUser: [],
  reservationsPerUserError: null,
  mostBookedRoomLoading: false,
  mostBookedRoom: [],
  mostBookedRoomError: null,
  mostCancelsPerUserLoading: false,
  mostCancelsPerUser: [],
  mostCancelsPerUserError: null,
};
export const getReservationsPerRoom = createAsyncThunk(
  "dashboard/getReservationsPerRoom",
  async () => {
    const request = await apiClient.get("/reservations-per-room");
    const response = request.data;

    return response;
  }
);
export const getReservationsPerUser = createAsyncThunk(
  "dashboard/getReservationsPerUser",
  async () => {
    const request = await apiClient.get("/reservations-per-user");
    const response = request.data;
    return response;
  }
);
export const getMostBookedRooms = createAsyncThunk(
  "dashboard/getMostBookedRooms",
  async () => {
    const request = await apiClient.get("/top-rooms");
    const response = request.data;
    return response;
  }
);
export const getMostCancelsPerUser = createAsyncThunk(
  "dashboard/getMostCancelsPerUser",
  async () => {
    const request = await apiClient.get("/cancels-per-user");
    const response = request.data;
    return response;
  }
);
const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getReservationsPerRoom.pending, (state) => {
      state.reservationsPerRoomLoading = true;
    });
    builder.addCase(getReservationsPerRoom.fulfilled, (state, action) => {
      state.reservationsPerRoomLoading = false;
      state.reservationsPerRoom = action.payload;
    });
    builder.addCase(getReservationsPerRoom.rejected, (state, action) => {
      state.reservationsPerRoomLoading = false;

      if (action.error.message == "Request failed with status code 401") {
        state.reservationsPerRoomError = "Access denied, invalid credentials.";
      } else {
        state.reservationsPerRoomError = action.error.message;
      }
      console.log("error", state.reservationsPerRoomError);
      toast.error(state.reservationsPerRoomError);
    });
    builder.addCase(getReservationsPerUser.pending, (state) => {
      state.reservationsPerUserLoading = true;
    });
    builder.addCase(getReservationsPerUser.fulfilled, (state, action) => {
      state.reservationsPerUserLoading = false;
      state.reservationsPerUser = action.payload;
    });
    builder.addCase(getReservationsPerUser.rejected, (state, action) => {
      state.reservationsPerUserLoading = false;

      if (action.error.message == "Request failed with status code 401") {
        state.reservationsPerUserError = "Access denied, invalid credentials.";
      } else {
        state.reservationsPerUserError = action.error.message;
      }
      console.log("error", state.reservationsPerUserError);
      toast.error(state.reservationsPerUserError);
    });
    builder.addCase(getMostBookedRooms.pending, (state) => {
      state.mostBookedRoomLoading = true;
    });
    builder.addCase(getMostBookedRooms.fulfilled, (state, action) => {
      state.mostBookedRoomLoading = false;
      state.mostBookedRoom = action.payload;
    });
    builder.addCase(getMostBookedRooms.rejected, (state, action) => {
      state.mostBookedRoomLoading = false;

      if (action.error.message == "Request failed with status code 401") {
        state.mostBookedRoomError = "Access denied, invalid credentials.";
      } else {
        state.mostBookedRoomError = action.error.message;
      }
      console.log("error", state.mostBookedRoomError);
      toast.error(state.mostBookedRoomError);
    });
    builder.addCase(getMostCancelsPerUser.pending, (state) => {
      state.mostBookedRoomLoading = true;
    });
    builder.addCase(getMostCancelsPerUser.fulfilled, (state, action) => {
      state.mostCancelsPerUserLoading = false;
      state.mostCancelsPerUser = action.payload;
    });
    builder.addCase(getMostCancelsPerUser.rejected, (state, action) => {
      state.mostCancelsPerUserLoading = false;

      if (action.error.message == "Request failed with status code 401") {
        state.mostCancelsPerUserError = "Access denied, invalid credentials.";
      } else {
        state.mostCancelsPerUserError = action.error.message;
      }
      console.log("error", state.mostCancelsPerUserError);
      toast.error(state.mostCancelsPerUserError);
    });
  },
});

export default dashboardSlice.reducer;
