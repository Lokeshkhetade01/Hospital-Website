import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;

// 1. Create Order
export const createOrder = createAsyncThunk(
  "payment/createOrder",
  async ({ appointmentId, token }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/payments/create-order`,
        { appointmentId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// 2. Verify Payment
export const verifyPayment = createAsyncThunk(
  "payment/verifyPayment",
  async ({ orderId, token }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/payments/verify`,
        { orderId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const paymentSlice = createSlice({
  name: "payment",
  initialState: {
    order: null,
    loading: false,
    orderKey: null,
    verifying: false,
    paymentSuccess: false,
    error: null,
  },
  reducers: {
    resetPaymentState: (state) => {
      state.order = null;
      state.orderKey = null;
      state.paymentSuccess = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => { state.loading = true; })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
        state.order = action.payload.order;
        state.orderKey = action.payload.key; 
        state.error = null;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(verifyPayment.pending, (state) => { state.verifying = true; })
      .addCase(verifyPayment.fulfilled, (state) => {
        state.verifying = false;
        state.paymentSuccess = true;
      })
      .addCase(verifyPayment.rejected, (state, action) => {
        state.verifying = false;
        state.error = action.payload;
      });
  },
});

export const { resetPaymentState } = paymentSlice.actions;
export default paymentSlice.reducer;