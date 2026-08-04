import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../api/axiosInstance";

export const fetchFieldVerifications = createAsyncThunk(
  "fieldVerification/fetch",
  async () => {
    const res = await axios.get("/field-verifications");

    return res.data;
  },
);

export const addFieldVerification = createAsyncThunk(
  "fieldVerification/add",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post("/field-verifications", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  },
);

export const updateFieldVerification = createAsyncThunk(
  "fieldVerification/update",
  async ({ id, data }) => {
    const res = await axios.put(`/field-verifications/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return res.data;
  },
);

export const deleteFieldVerification = createAsyncThunk(
  "fieldVerification/delete",
  async (id) => {
    await axios.delete(`/field-verifications/${id}`);

    return id;
  },
);

const fieldVerificationSlice = createSlice({
  name: "fieldVerification",

  initialState: {
    fieldVerifications: [],
    loading: false,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(fetchFieldVerifications.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchFieldVerifications.fulfilled, (state, action) => {
        state.loading = false;
        state.fieldVerifications = action.payload;
      })

      .addCase(addFieldVerification.pending, (state) => {
        state.loading = true;
      })

      .addCase(addFieldVerification.fulfilled, (state, action) => {
        state.loading = false;
        state.fieldVerifications.push(action.payload.data);
      })

      .addCase(addFieldVerification.rejected, (state) => {
        state.loading = false;
      })

      .addCase(updateFieldVerification.fulfilled, (state, action) => {
        const index = state.fieldVerifications.findIndex(
          (x) => x._id === action.payload._id,
        );

        state.fieldVerifications[index] = action.payload;
      })

      .addCase(deleteFieldVerification.fulfilled, (state, action) => {
        state.fieldVerifications = state.fieldVerifications.filter(
          (x) => x._id !== action.payload,
        );
      });
  },
});

export default fieldVerificationSlice.reducer;
