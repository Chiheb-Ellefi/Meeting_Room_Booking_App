import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import apiClient from "../../api/ApiClient";

const initialState = {
  loading: false,
  data: [],
  count: 0,
  error: null,
};
export const fetchRooms = createAsyncThunk(
  "rooms/fetchRooms",
  async ({ offset, limit, search, filter }) => {
    const request = await apiClient.get(
      `/rooms?offset=${offset}&limit=${limit}${
        search != "" ? `&search=${search}` : ""
      }${filter != "" ? `&filter=${filter}` : ""}`
    );
    const response = request.data;
    return response;
  }
);
export const addRoom = createAsyncThunk("rooms/addRoom", async (data) => {
  const request = await apiClient.post("/room", data);
  const response = request.data;
  return response;
});
export const editRoom = createAsyncThunk(
  "rooms/editRoom",
  async ({ data, room_id }) => {
    const request = await apiClient.patch(`/room/${room_id}`, data);
    const response = request.data;
    return response;
  }
);
export const deleteRoom = createAsyncThunk(
  "rooms/deleteRoom",
  async ({ room_id }) => {
    const request = await apiClient.delete(`/room/${room_id}`);
    const response = request.data;
    return response;
  }
);

const roomsSlice = createSlice({
  name: "rooms",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchRooms.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchRooms.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload.rooms;
      state.count = action.payload.count;
      state.error = null;
    });
    builder.addCase(fetchRooms.rejected, (state, action) => {
      state.loading = false;
      state.data = [];
      if (action.error.message == "Request failed with status code 401") {
        state.error = "Access denied, invalid credentials.";
      } else {
        state.error = action.error.message;
      }

      toast.error(state.error);
    });
    builder.addCase(addRoom.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addRoom.fulfilled, (state) => {
      state.loading = false;
      state.error = null;
    });
    builder.addCase(addRoom.rejected, (state, action) => {
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
    builder.addCase(editRoom.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(editRoom.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(editRoom.rejected, (state, action) => {
      state.loading = false;
      state.data = [];
      if (action.error.message == "Request failed with status code 401") {
        state.error = "Access denied, invalid credentials.";
      } else {
        state.error = action.error.message;
      }
      toast.error(state.error);
    });
    builder.addCase(deleteRoom.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteRoom.fulfilled, (state) => {
      state.loading = false;
      state.error = null;
    });
    builder.addCase(deleteRoom.rejected, (state, action) => {
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
export default roomsSlice.reducer;
