import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../api/axiosInstance";

export const createLoan = createAsyncThunk(
  "loan/createLoan",
  async (loanData, { rejectWithValue }) => {
    try {
      const body = new FormData();

      // Normal Fields
      Object.keys(loanData).forEach((key) => {
        if (key !== "goldPhoto" && key !== "vehiclePhoto") {
          body.append(key, loanData[key]);
        }
      });

      // Images
      if (loanData.goldPhoto) {
        body.append("goldPhoto", loanData.goldPhoto);
      }

      if (loanData.vehiclePhoto) {
        body.append("vehiclePhoto", loanData.vehiclePhoto);
      }

      const res = await axios.post("/loans/create", body);

      return res.data.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);
export const fetchLoans = createAsyncThunk(
  "loan/fetchLoans",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("/loans");

      return res.data.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);
const loanSlice = createSlice({
  name: "loan",

  initialState: {
    loans: [],
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
  .addCase(fetchLoans.pending, (state) => {
      state.loading = true;
    })

    .addCase(fetchLoans.fulfilled, (state, action) => {
      state.loading = false;
      state.loans = action.payload;
    })

    .addCase(fetchLoans.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

      .addCase(createLoan.pending, (state) => {
        state.loading = true;
      })

      .addCase(createLoan.fulfilled, (state, action) => {
        state.loading = false;
        state.loans.unshift(action.payload);
      })

      .addCase(createLoan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default loanSlice.reducer;