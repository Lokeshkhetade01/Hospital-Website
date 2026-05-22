// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";
// import { toast } from "react-toastify";

// const BASE_URL = import.meta.env.VITE_BASE_URL;


// // Fetch User Profile Data
// export const getMe = createAsyncThunk("profile/getMe", async (_, { rejectWithValue }) => {
//   try {
//     const token = localStorage.getItem("token");
//     const response = await axios.get(`${BASE_URL}/api/auth/me`, {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     return response.data.user;
//   } catch (error) {
//     return rejectWithValue(error.response.data);
//   }
// });

// // Update Profile
// export const updateProfile = createAsyncThunk(
//   "profile/updateProfile",
//   async (formData, { rejectWithValue, dispatch }) => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await axios.put(`${BASE_URL}/api/auth/update-profile`, formData, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       toast.success("Profile updated successfully!");
//       dispatch(getMe()); // Refresh profile data
//       return response.data.user;
//     } catch (error) {
//       toast.error(error.response.data.message || "Update failed");
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// const profileSlice = createSlice({
//   name: "profile",
//   initialState: { user: null, loading: false, error: null },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(getMe.pending, (state) => { state.loading = true; })
//       .addCase(getMe.fulfilled, (state, action) => {
//         state.loading = false;
//         state.user = action.payload;
//       })
//       .addCase(getMe.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       .addCase(updateProfile.pending, (state) => { state.loading = true; })
//       .addCase(updateProfile.fulfilled, (state, action) => {
//         state.loading = false;
//       })
//       .addCase(updateProfile.rejected, (state) => { state.loading = false; });
//   },
// });

// export default profileSlice.reducer;





import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const BASE_URL = import.meta.env.VITE_BASE_URL;

// Fetch User Profile Data
export const getMe = createAsyncThunk("profile/getMe", async (_, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${BASE_URL}/api/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.user;
  } catch (error) {
    return rejectWithValue(error.response?.data || "Failed to fetch profile");
  }
});

// Update Profile (With File Support)
export const updateProfile = createAsyncThunk(
  "profile/updateProfile",
  async (formDataToSend, { rejectWithValue, dispatch }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(`${BASE_URL}/api/auth/update-profile`, formDataToSend, {
        headers: { 
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data" // Crucial for file uploads
        },
      });
      toast.success("Profile updated successfully!");
      dispatch(getMe()); // Refresh profile data
      return response.data.user;
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
      return rejectWithValue(error.response?.data || "Update failed");
    }
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState: { user: null, loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMe.pending, (state) => { state.loading = true; })
      .addCase(getMe.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getMe.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateProfile.pending, (state) => { state.loading = true; })
      .addCase(updateProfile.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateProfile.rejected, (state) => { state.loading = false; });
  },
});

export default profileSlice.reducer;