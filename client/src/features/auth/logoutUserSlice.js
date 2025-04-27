import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


const apiUrl = import.meta.env.VITE_API_URL;


export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${apiUrl}/api/v1/auth/logout`, {
        withCredentials: true,
      });

      if (response.data?.success) {

        localStorage.removeItem('MbPeShVmY');
        return { success: true, message: 'Logout successful' };
      } else {
        return rejectWithValue(response.data.message || 'Error logging out');
      }
    } catch (error) {

      return rejectWithValue(error.response?.data?.message || error.message || 'Error logging out');
    }
  }
);

const initialState = {
  error: null,
  message: null,
  isLoading: false,
};

const logoutSlice = createSlice({
  name: 'logout',
  initialState,
  reducers: {
	resetLogout: (state) => {
		state.error = null;
		state.message = null;
		state.isLoading = false;
	  },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.message;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Logout failed';
        state.message = null;
      });
  },
});

export const {resetLogout} = logoutSlice.actions

export default logoutSlice.reducer;
