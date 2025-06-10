import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Work } from "../../types/types";
import axios from "axios";

interface WorkState {
  works: Work[];
  isLoading: boolean;
  error: string | null;
}

const initialState: WorkState = {
  works: [],
  isLoading: false,
  error: null,
};

export const fetchWorks = createAsyncThunk(
  "works/fetchWorks",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("http://localhost:4000/api/v1/works");
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        return thunkAPI.rejectWithValue(error.response.data.message);
      }
      return thunkAPI.rejectWithValue(
        "Erreur inconnue lors du chargement des travaux"
      );
    }
  }
);

const worksSlice = createSlice({
  name: "works",
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchWorks.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchWorks.fulfilled, (state, action) => {
      state.isLoading = false;
      state.works = action.payload;
    });
    builder.addCase(fetchWorks.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });
  },
});
export const { clearError } = worksSlice.actions;
export default worksSlice.reducer;
