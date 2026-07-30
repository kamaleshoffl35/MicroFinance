import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../api/axiosInstance";

export const createLoan = createAsyncThunk(
  "loan/createLoan",
  async (loanData, { rejectWithValue }) => {
    try {
      const body = new FormData();

      Object.keys(loanData).forEach((key) => {
        if (key !== "goldPhoto" && key !== "vehiclePhoto") {
          body.append(key, loanData[key]);
        }
      });

      if (loanData.goldPhoto) {
        body.append("goldPhoto", loanData.goldPhoto);
      }

      if (loanData.vehiclePhoto) {
        body.append("vehiclePhoto", loanData.vehiclePhoto);
      }

      const res = await axios.post("/loans/create", body);

      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  },
);
export const fetchLoans = createAsyncThunk(
  "loan/fetchLoans",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("/loans");

      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  },
);
export const deleteLoan = createAsyncThunk(
  "loan/deleteLoan",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`/loans/${id}`);

      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  },
);

export const updateLoan = createAsyncThunk(
  "loan/updateLoan",
  async ({ id, loanData }, { rejectWithValue }) => {
    try {
      const body = new FormData();
      Object.keys(loanData).forEach((key) => {
        if (key !== "goldPhoto" && key !== "vehiclePhoto") {
          body.append(key, loanData[key]);
        }
      });

      if (loanData.goldPhoto instanceof File) {
        body.append("goldPhoto", loanData.goldPhoto);
      }

      if (loanData.vehiclePhoto instanceof File) {
        body.append("vehiclePhoto", loanData.vehiclePhoto);
      }

      const res = await axios.put(`/loans/${id}`, body);

      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  },
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
        console.log("create payload", action.payload);

        state.loading = false;

        if (action.payload) {
          state.loans.unshift(action.payload);
        }
      })

      .addCase(createLoan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteLoan.fulfilled, (state, action) => {
        state.loans = state.loans.filter((loan) => loan._id !== action.payload);
      })
      .addCase(updateLoan.fulfilled, (state, action) => {
        const index = state.loans.findIndex(
          (loan) => loan._id === action.payload._id,
        );

        if (index !== -1) {
          state.loans[index] = action.payload;
        }
      });
  },
});

export default loanSlice.reducer;
