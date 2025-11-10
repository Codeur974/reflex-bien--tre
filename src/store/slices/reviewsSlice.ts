import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface Review {
  _id: string;
  author: string;
  date: string;
  rating: number;
  text: string;
  source: string;
}

interface ReviewsState {
  reviews: Review[];
  isLoading: boolean;
  error: string | null;
}

const initialState: ReviewsState = {
  reviews: [],
  isLoading: false,
  error: null,
};

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000";

export const fetchReviews = createAsyncThunk(
  "reviews/fetchReviews",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}/api/v1/reviews`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        return thunkAPI.rejectWithValue(error.response.data.message);
      }
      return thunkAPI.rejectWithValue(
        "Erreur inconnue lors du chargement des avis"
      );
    }
  }
);

const reviewsSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchReviews.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchReviews.fulfilled, (state, action) => {
      state.isLoading = false;
      state.reviews = action.payload;
    });
    builder.addCase(fetchReviews.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });
  },
});

export const { clearError } = reviewsSlice.actions;
export default reviewsSlice.reducer;
