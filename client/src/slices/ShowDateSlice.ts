// slices/ShowDateSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ShowDate, ShowDatesState } from "../types/type";
import { getAllShowDates, addShowDate, editShowDate, deleteShowDate } from "../apis/ShowDateApi";

const initialState: ShowDatesState = {
    dates: [],
    loading: false,
    error: null,
};

const ShowDateSlice = createSlice({
    name: "showDates",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllShowDates.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllShowDates.fulfilled, (state, action: PayloadAction<ShowDate[]>) => {
                state.loading = false;
                state.dates = action.payload;
            })
            .addCase(getAllShowDates.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch show dates";
            })
            .addCase(addShowDate.fulfilled, (state, action: PayloadAction<ShowDate>) => {
                state.dates.push(action.payload);
            })
            .addCase(editShowDate.fulfilled, (state, action: PayloadAction<ShowDate>) => {
                const index = state.dates.findIndex((d) => d.id === action.payload.id);
                if (index !== -1) state.dates[index] = action.payload;
            })
            .addCase(deleteShowDate.fulfilled, (state, action: PayloadAction<number>) => {
                state.dates = state.dates.filter((d) => d.id !== action.payload);
            });
    },
});

export const showDateReducer = ShowDateSlice.reducer;