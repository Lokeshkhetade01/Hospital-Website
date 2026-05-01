import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
// Fetch My Bookings
export const fetchMyBookings = createAsyncThunk(
  "bookings/fetchMyBookings",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("https://hospital-backend-fwrb.onrender.com/api/appointments/mine", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data.appointments;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Cancel Appointment
export const cancelAppointment = createAsyncThunk(
  "bookings/cancelAppointment",
  async ({ id, reason }, { rejectWithValue, dispatch }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `https://hospital-backend-fwrb.onrender.com/api/appointments/${id}/cancel`,
        { reason },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      dispatch(fetchMyBookings()); // Refresh list after cancel
      
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const myBookingSlice = createSlice({
  name: "myBookings",
  initialState: { bookings: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyBookings.pending, (state) => { state.loading = true; })
      .addCase(fetchMyBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings = action.payload;
      })
      .addCase(fetchMyBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

       .addCase(cancelAppointment.pending, (state) => { state.loading = true; })
      .addCase(cancelAppointment.fulfilled, (state, action) => {
        state.loading = false;
        toast.success("Appointment cancel Successfully!",{
        autoClose:1500
      })
      })
      .addCase(cancelAppointment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default myBookingSlice.reducer;