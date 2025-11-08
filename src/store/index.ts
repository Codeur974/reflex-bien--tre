import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import worksReducer from "./slices/worksSlice";
import newsReducer from "./slices/newsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    works: worksReducer,
    news: newsReducer,
  },
});

// Types pour le store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
