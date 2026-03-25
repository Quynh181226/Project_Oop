import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Festival } from "../types/type";
import { getAllFestivals, addFestival, editFestival, deleteFestival } from "../apis/festivalApi";

export interface FestivalsState {
  festivals: Festival[];
  loading: boolean;
  error: string | null;
}

const initialState: FestivalsState = {
  festivals: [],
  loading: false,
  error: null,
};

const FestivalSlice = createSlice({
  name: "festivals",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllFestivals.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllFestivals.fulfilled, (state, action: PayloadAction<Festival[]>) => {
        state.loading = false;
        state.festivals = action.payload;
      })
      .addCase(getAllFestivals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch festivals";
      })
      .addCase(addFestival.fulfilled, (state, action: PayloadAction<Festival>) => {
        state.festivals.push(action.payload);
      })
      .addCase(editFestival.fulfilled, (state, action: PayloadAction<Festival>) => {
        const index = state.festivals.findIndex((f) => f.id === action.payload.id);
        if (index !== -1) state.festivals[index] = action.payload;
      })
      .addCase(deleteFestival.fulfilled, (state, action: PayloadAction<number>) => {
        state.festivals = state.festivals.filter((f) => f.id !== action.payload);
      });
  },
});

export const festivalReducer = FestivalSlice.reducer;
