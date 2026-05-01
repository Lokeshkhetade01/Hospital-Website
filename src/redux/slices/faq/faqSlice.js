import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL;


// Async thunk to fetch FAQs
export const fetchPublicFaqs = createAsyncThunk('faqs/fetchPublic', async () => {
  const response = await axios.get(`${BASE_URL}/api/faqs`);
  return response.data; // Response contains { success, total, Faqs }
});

const faqSlice = createSlice({
  name: 'faqs',
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPublicFaqs.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPublicFaqs.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.Faqs; // Accessing the "Faqs" key from your response
      })
      .addCase(fetchPublicFaqs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default faqSlice.reducer;