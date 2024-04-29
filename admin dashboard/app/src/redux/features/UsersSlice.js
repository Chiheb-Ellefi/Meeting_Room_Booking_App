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

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async ({ offset, limit, search, sort, filter }) => {
    const request = await apiClient.get(
      `/users?offset=${offset}&limit=${limit}${
        sort != null ? `&sort=${sort}` : "&sort=A-Z"
      }${search != "" ? `&search=${search}` : ""}${
        filter != "" ? `&filter=${filter}` : ""
      }`
    );

    const response = request.data;

    return response;
  }
);
export const toggleUser = createAsyncThunk("users/toggleUser", async (data) => {
  const request = await apiClient.patch("/user/toggle", data);
  const response = request.data;

  return response;
});
export const createUser = createAsyncThunk("users/createUser", async (data) => {
  const request = await axios.post("/domain/api/v2/auth/register", data);
  const response = request.data;
  console.log(response);
  return response;
});
export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async ({ user_id }) => {
    const request = await apiClient.delete(`/user/${user_id}`);
    const response = request.data;

    return response;
  }
);
export const editUser = createAsyncThunk(
  "users/editUser",
  async ({ user_id, data }) => {
    const request = await apiClient.patch(`/user/${user_id}`, data);
    const response = request.data;
    console.log(response);
    return response;
  }
);
export const editUserPassword = createAsyncThunk(
  "users/editUserPassword",
  async (data) => {
    console.log(data);
    const request = await axios.patch(
      `/domain/api/v2/auth/forgotPassword`,
      data
    );
    const response = request.data;

    return response;
  }
);
const usersSlice = createSlice({
  name: "users",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.loading = true;
      state.data = [];
      state.error = null;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload.users;
      state.count = action.payload.count;
      state.error = null;
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.loading = false;
      if (action.error.message == "Request failed with status code 401") {
        state.error = "Access denied, invalid credentials.";
      } else {
        state.error = action.error.message;
      }
      console.log("error", state.error);
      toast.error(state.error);
    });
    builder.addCase(toggleUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(toggleUser.fulfilled, (state) => {
      state.loading = false;

      state.error = null;
    });
    builder.addCase(toggleUser.rejected, (state, action) => {
      state.loading = false;
      if (action.error.message == "Request failed with status code 401") {
        state.error = "Access denied, invalid credentials.";
      } else {
        state.error = action.error.message;
      }
      console.log("error", state.error);
      toast.error(state.error);
    });
    builder.addCase(createUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createUser.fulfilled, (state) => {
      state.loading = false;
      state.error = null;
    });
    builder.addCase(createUser.rejected, (state, action) => {
      state.loading = false;
      if (action.error.message == "Request failed with status code 401") {
        state.error = "Access denied, invalid credentials.";
      } else {
        state.error = action.error.message;
      }
      console.log("error", state.error);
      toast.error(state.error);
    });
    builder.addCase(deleteUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteUser.fulfilled, (state) => {
      state.loading = false;
      state.error = null;
    });
    builder.addCase(deleteUser.rejected, (state, action) => {
      state.loading = false;
      if (action.error.message == "Request failed with status code 401") {
        state.error = "Access denied, invalid credentials.";
      } else {
        state.error = action.error.message;
      }
      console.log("error", state.error);
      toast.error(state.error);
    });
    builder.addCase(editUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(editUser.fulfilled, (state) => {
      state.loading = false;
      state.error = null;
    });
    builder.addCase(editUser.rejected, (state, action) => {
      state.loading = false;
      if (action.error.message == "Request failed with status code 401") {
        state.error = "Access denied, invalid credentials.";
      } else {
        state.error = action.error.message;
      }
      console.log("error", state.error);
      toast.error(state.error);
    });
    builder.addCase(editUserPassword.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(editUserPassword.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(editUserPassword.rejected, (state, action) => {
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
export default usersSlice.reducer;
