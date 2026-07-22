import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCustomers = createAsyncThunk(
  "customer/fetchCustomers",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch("http://localhost:5000/api/customers");
      const data = await res.json();

      if (!data.success) {
        return rejectWithValue(data.message);
      }

      return data.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);


export const addCustomer = createAsyncThunk(
  "customer/addCustomer",
  async (formData, { rejectWithValue }) => {
    try {
      const body = new FormData();

      Object.keys(formData).forEach((key) => {
        if (
          key !== "address" &&
          key !== "identity" &&
          key !== "bank" &&
          key !== "nominee" &&
          key !== "guarantor" &&
          key !== "documents"
        ) {
          body.append(key, formData[key]);
        }
      });

      body.append("address", JSON.stringify(formData.address));
      body.append("identity", JSON.stringify(formData.identity));
      body.append("bank", JSON.stringify(formData.bank));
      body.append("nominee", JSON.stringify(formData.nominee));
      body.append("guarantor", JSON.stringify(formData.guarantor));

      Object.entries(formData.documents).forEach(([key, file]) => {
        if (file) {
          body.append(key, file);
        }
      });

      const res = await fetch("http://localhost:5000/api/customers", {
        method: "POST",
        body,
      });

      const data = await res.json();

      if (!data.success) {
        return rejectWithValue(data.message);
      }

      return data.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);


export const updateCustomer = createAsyncThunk(
  "customer/updateCustomer",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const body = new FormData();

      Object.keys(formData).forEach((key) => {
        if (
          key !== "address" &&
          key !== "identity" &&
          key !== "bank" &&
          key !== "nominee" &&
          key !== "guarantor" &&
          key !== "documents"
        ) {
          body.append(key, formData[key]);
        }
      });

      body.append("address", JSON.stringify(formData.address));
      body.append("identity", JSON.stringify(formData.identity));
      body.append("bank", JSON.stringify(formData.bank));
      body.append("nominee", JSON.stringify(formData.nominee));
      body.append("guarantor", JSON.stringify(formData.guarantor));

      Object.entries(formData.documents).forEach(([key, file]) => {
        if (file instanceof File) {
          body.append(key, file);
        }
      });

      const res = await fetch(
        `http://localhost:5000/api/customers/${id}`,
        {
          method: "PUT",
          body,
        }
      );

      const data = await res.json();

      if (!data.success) {
        return rejectWithValue(data.message);
      }

      return data.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);


export const deleteCustomer = createAsyncThunk(
  "customer/deleteCustomer",
  async (id, { rejectWithValue }) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/customers/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();

      if (!data.success) {
        return rejectWithValue(data.message);
      }

      return id;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const customerSlice = createSlice({
  name: "customer",

  initialState: {
    customers: [],
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(fetchCustomers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCustomers.fulfilled, (state, action) => {
        state.loading = false;
        state.customers = action.payload;
      })
      .addCase(fetchCustomers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

  
      .addCase(addCustomer.fulfilled, (state, action) => {
        state.customers.unshift(action.payload);
      })


      .addCase(updateCustomer.fulfilled, (state, action) => {
        const index = state.customers.findIndex(
          (item) => item._id === action.payload._id
        );

        if (index !== -1) {
          state.customers[index] = action.payload;
        }
      })

      .addCase(deleteCustomer.fulfilled, (state, action) => {
        state.customers = state.customers.filter(
          (item) => item._id !== action.payload
        );
      });
  },
});

export default customerSlice.reducer;
