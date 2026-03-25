// apis/TimeSlotApi.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosConfig from "../utils/axiosConfig";
import type { TimeSlot, NewTimeSlot } from "../types/type";

export const getAllTimeSlots = createAsyncThunk("timeSlots/getAll", async () => {
    const res = await axiosConfig.get<TimeSlot[]>("time-slots");
    return res.data;
});

export const addTimeSlot = createAsyncThunk("timeSlots/add", async (slot: NewTimeSlot) => {
    const res = await axiosConfig.post<TimeSlot>("time-slots", slot);
    return res.data;
});

export const editTimeSlot = createAsyncThunk("timeSlots/edit", async (slot: TimeSlot) => {
    const res = await axiosConfig.put<TimeSlot>(`time-slots/${slot.id}`, slot);
    return res.data;
});

export const deleteTimeSlot = createAsyncThunk("timeSlots/delete", async (id: number) => {
    await axiosConfig.delete(`time-slots/${id}`);
    return id;
});