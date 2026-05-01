import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const fetchMyPrescriptions = createAsyncThunk(
  "prescription/fetchMy",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `${BASE_URL}/api/prescriptions/mine`,
        {
          headers: {
            // Bearer token standard practice hai
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true, 
        }
      );
      
      // Aapke provided JSON structure ke hisaab se action.payload.prescriptions set hoga
      return response.data; 
    } catch (error) {
      // Error message handle karne ke liye fallback
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch prescriptions"
      );
    }
  }
);

const prescriptionSlice = createSlice({
  name: "prescription",
  initialState: {
    prescriptions: [],
    loading: false,
    error: null,
  },
  reducers: {
    // Agar logout par data clear karna ho toh yahan reducer add kar sakte hain
    clearPrescriptions: (state) => {
      state.prescriptions = [];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyPrescriptions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyPrescriptions.fulfilled, (state, action) => {
        state.loading = false;
        // API response se 'prescriptions' array extract kar rahe hain
        state.prescriptions = action.payload.prescriptions;
      })
      .addCase(fetchMyPrescriptions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearPrescriptions } = prescriptionSlice.actions;
export default prescriptionSlice.reducer;