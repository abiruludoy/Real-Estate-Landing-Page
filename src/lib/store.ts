import { configureStore } from "@reduxjs/toolkit";
import realtyReducer from "@/features/realty/realtySlice";

export const store = configureStore({
  reducer: {
    realty: realtyReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
