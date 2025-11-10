import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import worksReducer from "./slices/worksSlice";
import newsReducer from "./slices/newsSlice";
import reviewsReducer from "./slices/reviewsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    works: worksReducer,
    news: newsReducer,
    reviews: reviewsReducer,
  },
});

// Types pour le store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
