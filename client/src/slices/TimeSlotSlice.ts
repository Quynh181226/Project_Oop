// slices/TimeSlotSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { TimeSlot, TimeSlotsState } from "../types/type";
import { getAllTimeSlots, addTimeSlot, editTimeSlot, deleteTimeSlot } from "../apis/TimeSlotApi";

const initialState: TimeSlotsState = {
    slots: [],
    loading: false,
    error: null,
};

const TimeSlotSlice = createSlice({
    name: "timeSlots",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllTimeSlots.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllTimeSlots.fulfilled, (state, action: PayloadAction<TimeSlot[]>) => {
                state.loading = false;
                state.slots = action.payload;
            })
            .addCase(getAllTimeSlots.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch time slots";
            })
            .addCase(addTimeSlot.fulfilled, (state, action: PayloadAction<TimeSlot>) => {
                state.slots.push(action.payload);
            })
            .addCase(editTimeSlot.fulfilled, (state, action: PayloadAction<TimeSlot>) => {
                const index = state.slots.findIndex((s) => s.id === action.payload.id);
                if (index !== -1) state.slots[index] = action.payload;
            })
            .addCase(deleteTimeSlot.fulfilled, (state, action: PayloadAction<number>) => {
                state.slots = state.slots.filter((s) => s.id !== action.payload);
            });
    },
});

export const timeSlotReducer = TimeSlotSlice.reducer;