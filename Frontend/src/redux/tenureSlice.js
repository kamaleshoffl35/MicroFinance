import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../api/axiosInstance";

export const createTenure = createAsyncThunk(
  "tenure/create",
  async (data, thunkAPI) => {
    try {
      const res = await axios.post("/tenures", data);
      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message,
      );
    }
  },
);

export const fetchTenures = createAsyncThunk(
  "tenure/fetch",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get("/tenures");
      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message,
      );
    }
  },
);

export const updateTenure = createAsyncThunk(
  "tenure/update",
  async ({ id, tenureName }, thunkAPI) => {
    try {
      const res = await axios.put(`/tenures/${id}`, {
        tenureName,
      });

      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message,
      );
    }
  },
);

export const deleteTenure = createAsyncThunk(
  "tenure/delete",
  async (id, thunkAPI) => {
    try {
      await axios.delete(`/tenures/${id}`);
      return id;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message,
      );
    }
  },
);

const tenureSlice = createSlice({
  name: "tenure",

  initialState: {
    tenures: [],
    loading: false,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(fetchTenures.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchTenures.fulfilled, (state, action) => {
        state.loading = false;
        state.tenures = action.payload;
      })

      .addCase(fetchTenures.rejected, (state) => {
        state.loading = false;
      })

      .addCase(createTenure.fulfilled, (state, action) => {
        state.tenures.unshift(action.payload);
      })

      .addCase(updateTenure.fulfilled, (state, action) => {
        state.tenures = state.tenures.map((item) =>
          item._id === action.payload._id ? action.payload : item,
        );
      })

      .addCase(deleteTenure.fulfilled, (state, action) => {
        state.tenures = state.tenures.filter(
          (item) => item._id !== action.payload,
        );
      });
  },
});

export default tenureSlice.reducer;
