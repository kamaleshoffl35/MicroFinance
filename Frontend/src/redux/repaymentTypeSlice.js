import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../api/axiosInstance";


export const createRepaymentType = createAsyncThunk(
  "repaymentType/create",
  async (data, thunkAPI) => {
    try {
      const res = await axios.post("/repayment-types", data);
      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to create repayment type"
      );
    }
  }
);


export const fetchRepaymentTypes = createAsyncThunk(
  "repaymentType/fetch",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get("/repayment-types");
      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch repayment types"
      );
    }
  }
);


export const updateRepaymentType = createAsyncThunk(
  "repaymentType/update",
  async ({ id, repaymentTypeName }, thunkAPI) => {
    try {
      const res = await axios.put(`/repayment-types/${id}`, {
        repaymentTypeName,
      });

      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to update repayment type"
      );
    }
  }
);

export const deleteRepaymentType = createAsyncThunk(
  "repaymentType/delete",
  async (id, thunkAPI) => {
    try {
      await axios.delete(`/repayment-types/${id}`);
      return id;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to delete repayment type"
      );
    }
  }
);

const repaymentTypeSlice = createSlice({
  name: "repaymentType",

  initialState: {
    repaymentTypes: [],
    loading: false,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      // Fetch
      .addCase(fetchRepaymentTypes.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchRepaymentTypes.fulfilled, (state, action) => {
        state.loading = false;
        state.repaymentTypes = action.payload;
      })

      .addCase(fetchRepaymentTypes.rejected, (state) => {
        state.loading = false;
      })

      // Create
      .addCase(createRepaymentType.fulfilled, (state, action) => {
        state.repaymentTypes.unshift(action.payload);
      })

      // Update
      .addCase(updateRepaymentType.fulfilled, (state, action) => {
        state.repaymentTypes = state.repaymentTypes.map((item) =>
          item._id === action.payload._id ? action.payload : item
        );
      })

      // Delete
      .addCase(deleteRepaymentType.fulfilled, (state, action) => {
        state.repaymentTypes = state.repaymentTypes.filter(
          (item) => item._id !== action.payload
        );
      });
  },
});

export default repaymentTypeSlice.reducer;