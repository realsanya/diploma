import { createSlice } from '@reduxjs/toolkit';

const initialState: TState = {
  mode: 'light',
  user: null,
  token: null,
  reviews: [],
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
    setReviews: (state, action) => {
      state.reviews = action.payload.reviews;
    },
    setReview: (state, action) => {
      const updatedReviews: TReview[] = state.reviews.map((review: TReview) => {
        if (review.id === action.payload.review.reviewId) return action.payload.review;
        return review;
      });
      state.reviews = updatedReviews;
    },
  },
});

export const {
  setMode,
  setLogin,
  setLogout,
  setReviews,
  setReview,
} = authSlice.actions;
export default authSlice.reducer;