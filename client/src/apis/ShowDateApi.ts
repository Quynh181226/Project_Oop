// apis/ShowDateApi.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosConfig from "../utils/axiosConfig";
import type { ShowDate, NewShowDate } from "../types/type";

export const getAllShowDates = createAsyncThunk("showDates/getAll", async () => {
    const res = await axiosConfig.get<ShowDate[]>("show-dates");
    return res.data;
});

export const addShowDate = createAsyncThunk("showDates/add", async (date: NewShowDate) => {
    const res = await axiosConfig.post<ShowDate>("show-dates", date);
    return res.data;
});

export const editShowDate = createAsyncThunk("showDates/edit", async (date: ShowDate) => {
    const res = await axiosConfig.put<ShowDate>(`show-dates/${date.id}`, date);
    return res.data;
});

export const deleteShowDate = createAsyncThunk("showDates/delete", async (id: number) => {
    await axiosConfig.delete(`show-dates/${id}`);
    return id;
});