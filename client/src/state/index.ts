import { createSlice } from '@reduxjs/toolkit';

const initialState: TState = {
  mode: 'light',
  user: null,
  token: null,
  currentReview: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === 'light' ? 'dark' : 'light';
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setCurrentReview: (state, action) => {
      state.currentReview = action.payload.currentReview;
    }
  },
});

export const {
  setMode,
  setLogin,
  setLogout,
  setCurrentReview,
} = authSlice.actions;
export default authSlice.reducer;