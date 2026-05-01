import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const bookAppointment = createAsyncThunk(
  "appointment/book",
  async (appointmentData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token"); // Token from localStorage
      const response = await axios.post(
        `${BASE_URL}/api/appointments/book`,
        appointmentData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const appointmentSlice = createSlice({
  name: "appointment",
  initialState: { loading: false, success: false, error: null,appointmentId: null },
  reducers: {
    resetState: (state) => {
      state.success = false;
      state.error = null;
      state.appointmentId = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(bookAppointment.pending, (state) => {
        state.loading = true;
      })
      .addCase(bookAppointment.fulfilled, (state,action) => {
        state.loading = false;
        state.success = true;
        state.error = null; 
        state.appointmentId = 
    action.payload?._id || 
    action.payload?.data?._id || 
    action.payload?.appointment?._id || 
    action.payload?.id;
    console.log("Payload received in Slice:", action.payload);
      })
      .addCase(bookAppointment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetState } = appointmentSlice.actions;
export default appointmentSlice.reducer;