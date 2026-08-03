import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../api/axiosInstance";

export const fetchPermissions = createAsyncThunk(
  "permissions/fetchPermissions",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get("/permissions");
      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const addPermission = createAsyncThunk(
  "permissions/addPermission",
  async (name, thunkAPI) => {
    try {
      const res = await axios.post("/permissions", {
        name,
      });

      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

const permissionSlice = createSlice({
  name: "permissions",

  initialState: {
    permissions: [],
    loading: false,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(fetchPermissions.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchPermissions.fulfilled, (state, action) => {
        state.loading = false;
        state.permissions = action.payload;
      })

      .addCase(addPermission.fulfilled, (state, action) => {
        state.permissions.push(action.payload);
      });
  },
});

export default permissionSlice.reducer;