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

// Add this export to your existing slice file
export const downloadPrescriptionPDF = createAsyncThunk(
  "prescription/downloadPDF",
  async (prescriptionId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${BASE_URL}/api/prescriptions/${prescriptionId}/pdf`,
        {
          headers: { Authorization: `Bearer ${token}` },
          responseType: 'blob', 
          withCredentials: true,
        }
      );

      // Create a Blob from the PDF Stream
      const file = new Blob([response.data], { type: 'application/pdf' });
      
      // Create a URL for the blob
      const fileURL = window.URL.createObjectURL(file);

      // Next tab mein open karne ke liye
      window.open(fileURL, '_blank');

      return true;
    } catch (error) {
      return rejectWithValue("Failed to open PDF");
    }
  }
);
const prescriptionSlice = createSlice({
  name: "prescription",
  initialState: {
    prescriptions: [],
    loading: false,
    downloadLoading: false, // Naya state download ke liye
    error: null,
  },
  reducers: {
    clearPrescriptions: (state) => {
      state.prescriptions = [];
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Prescriptions Cases
      .addCase(fetchMyPrescriptions.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMyPrescriptions.fulfilled, (state, action) => {
        state.loading = false;
        state.prescriptions = action.payload.prescriptions;
      })
      .addCase(fetchMyPrescriptions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Download/Open PDF Cases
      .addCase(downloadPrescriptionPDF.pending, (state) => {
        state.downloadLoading = true;
      })
      .addCase(downloadPrescriptionPDF.fulfilled, (state) => {
        state.downloadLoading = false;
      })
      .addCase(downloadPrescriptionPDF.rejected, (state, action) => {
        state.downloadLoading = false;
        state.error = action.payload;
      });
  },
});
export const { clearPrescriptions } = prescriptionSlice.actions;
export default prescriptionSlice.reducer;