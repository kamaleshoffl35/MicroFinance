import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../api/axiosInstance";

export const createLoanType = createAsyncThunk(
  "loanType/create",
  async (data, thunkAPI) => {
    try {
      const res = await axios.post("/loan-types", data);

      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  },
);

export const fetchLoanTypes = createAsyncThunk(
  "loanType/fetch",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get("/loan-types");

      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  },
);

export const updateLoanType = createAsyncThunk(
  "loanType/update",
  async ({ id, loanTypeName }, thunkAPI) => {
    try {
      const res = await axios.put(`/loan-types/${id}`, { loanTypeName });

      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  },
);

export const deleteLoanType = createAsyncThunk(
  "loanType/delete",
  async (id, thunkAPI) => {
    try {
      await axios.delete(`/loan-types/${id}`);

      return id;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  },
);
const loanTypeSlice = createSlice({
  name: "loanType",

  initialState: {
    loanTypes: [],
    loading: false,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(fetchLoanTypes.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchLoanTypes.fulfilled, (state, action) => {
        state.loading = false;
        state.loanTypes = action.payload;
      })

      .addCase(createLoanType.fulfilled, (state, action) => {
        state.loanTypes.unshift(action.payload);
      })

      .addCase(updateLoanType.fulfilled, (state, action) => {
        state.loanTypes = state.loanTypes.map((item) =>
          item._id === action.payload._id ? action.payload : item,
        );
      })

      .addCase(deleteLoanType.fulfilled, (state, action) => {
        state.loanTypes = state.loanTypes.filter(
          (item) => item._id !== action.payload,
        );
      });
  },
});

export default loanTypeSlice.reducer;
