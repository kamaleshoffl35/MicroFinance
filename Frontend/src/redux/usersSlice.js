import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../api/axiosInstance";

const API = "/users";

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.get(API);
      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  },
);

export const addUser = createAsyncThunk(
  "users/addUser",
  async (user, thunkAPI) => {
    try {
      const res = await axiosInstance.post(API, user);
      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  },
);

export const updateUser = createAsyncThunk(
  "users/updateUser",
  async ({ id, data }, thunkAPI) => {
    try {
      const res = await axiosInstance.put(`${API}/${id}`, data);
      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  },
);

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (id, thunkAPI) => {
    try {
      await axiosInstance.delete(`${API}/${id}`);
      return id;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  },
);

const userSlice = createSlice({
  name: "users",

  initialState: {
    users: [],

    loading: false,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;

        state.users = action.payload;
      })

      .addCase(addUser.fulfilled, (state, action) => {
        state.users.unshift(action.payload);
      })

      .addCase(updateUser.fulfilled, (state, action) => {
        const index = state.users.findIndex(
          (x) => x._id === action.payload._id,
        );

        if (index !== -1) state.users[index] = action.payload;
      })

      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((x) => x._id !== action.payload);
      });
  },
});

export default userSlice.reducer;
