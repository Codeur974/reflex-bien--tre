import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { News } from "../../types/types";
import axios from "axios";

interface NewsState {
  news: News[];
  isLoading: boolean;
  error: string | null;
}

const initialState: NewsState = {
  news: [],
  isLoading: false,
  error: null,
};

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000";

export const fetchNews = createAsyncThunk(
  "news/fetchNews",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}/api/v1/news`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        return thunkAPI.rejectWithValue(error.response.data.message);
      }
      return thunkAPI.rejectWithValue(
        "Erreur inconnue lors du chargement des annonces"
      );
    }
  }
);

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchNews.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchNews.fulfilled, (state, action) => {
      state.isLoading = false;
      state.news = action.payload;
    });
    builder.addCase(fetchNews.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });
  },
});

export const { clearError } = newsSlice.actions;
export default newsSlice.reducer;
