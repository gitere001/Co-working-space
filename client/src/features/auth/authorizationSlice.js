import { createSlice } from '@reduxjs/toolkit';

const initialState = {

  isAuthenticated: false,
  wasLoggedOutManually: false,
  user:null
};

const authorizationSlice = createSlice({
  name: 'authorization',
  initialState,
  reducers: {

    setIsAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    setWasLoggedOutManually: (state, action) => {
      state.wasLoggedOutManually = action.payload;
    },
    resetSessionFlags: (state) => {
      state.wasLoggedOutManually = false;
    },
    setUser: (state, action) => {
      state.user = action.payload
    },
    unsetUser: (state) => {
      state.user = null
    }
  },
});

export const {

  setIsAuthenticated,
  setWasLoggedOutManually,
  resetSessionFlags,
  setUser,
  unsetUser
} = authorizationSlice.actions;

export default authorizationSlice.reducer;