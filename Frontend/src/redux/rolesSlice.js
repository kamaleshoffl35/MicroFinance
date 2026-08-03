import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axiosInstance from "../api/axiosInstance";

const API = "/roles";

export const fetchRoles = createAsyncThunk(
  "roles/fetchRoles",
  async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.get(API);
      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message);
    }
  }
);


export const addRole = createAsyncThunk(
  "roles/addRole",
  async (roleData, thunkAPI) => {
    try {
      const res = await axiosInstance.post(API, roleData);
      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message);
    }
  }
);


export const updateRole = createAsyncThunk(
  "roles/updateRole",
  async ({ id, roleData }, thunkAPI) => {
    try {
      const res = await axiosInstance.put(`${API}/${id}`, roleData);
      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message);
    }
  }
);


export const deleteRole = createAsyncThunk(
  "roles/deleteRole",
  async (id, thunkAPI) => {
    try {
      await axiosInstance.delete(`${API}/${id}`);
      return id;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message);
    }
  }
);

const rolesSlice = createSlice({
  name: "roles",

  initialState: {
    roles: [],
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      // Fetch
      .addCase(fetchRoles.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchRoles.fulfilled, (state, action) => {
        state.loading = false;
        state.roles = action.payload;
      })

      .addCase(fetchRoles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add
      .addCase(addRole.fulfilled, (state, action) => {
        state.roles.unshift(action.payload);
      })

      // Update
      .addCase(updateRole.fulfilled, (state, action) => {
        const index = state.roles.findIndex(
          (r) => r._id === action.payload._id
        );

        if (index !== -1) {
          state.roles[index] = action.payload;
        }
      })

      // Delete
      .addCase(deleteRole.fulfilled, (state, action) => {
        state.roles = state.roles.filter(
          (r) => r._id !== action.payload
        );
      });
  },
});

export default rolesSlice.reducer;