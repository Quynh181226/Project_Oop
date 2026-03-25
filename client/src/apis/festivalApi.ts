import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosConfig from "../utils/axiosConfig";
import type { Festival, FestivalDetail } from "../types/type.ts";

// USER
export async function getFestivals(): Promise<Festival[]> {
  const res = await axiosConfig.get<Festival[]>("/festivals");
  return res.data;
}

export async function getFestivalDetailById(id: number): Promise<FestivalDetail> {
  const res = await axiosConfig.get<FestivalDetail>(`/festivalDetails/${id}`);
  return res.data;
}

// ADMIN
export type NewFestival = Omit<Festival, "id">;

function buildDefaultDetailFromFestival(f: Festival): FestivalDetail {
  const desc = (f.description || "").trim();

  return {
    id: f.id,
    title: f.title,
    subtitle: f.title,
    paragraphs: desc ? [desc] : [],
    ticketInfo: [],
    extraInfo: [],
    link: "",
    banner: f.image,
    scheduleImage: "",
  };
}

export const getAllFestivals = createAsyncThunk("festivals/getAll", async () => {
  const res = await axiosConfig.get<Festival[]>("/festivals");
  return res.data;
});

export const addFestival = createAsyncThunk("festivals/add", async (festival: NewFestival) => {
  // 1) tạo festival
  const res = await axiosConfig.post<Festival>("/festivals", festival);
  const created = res.data;

  // 2) tạo detail cùng id
  const detail = buildDefaultDetailFromFestival(created);
  try {
    await axiosConfig.post<FestivalDetail>("/festivalDetails", detail);
  } catch (e) {
    console.error("Create festivalDetails failed:", e);
  }

  return created;
});

export const editFestival = createAsyncThunk("festivals/edit", async (festival: Festival) => {
  // 1) update festival
  const res = await axiosConfig.put<Festival>(`/festivals/${festival.id}`, festival);
  const updated = res.data;

  // 2) update detail (upsert)
  const detail = buildDefaultDetailFromFestival(updated);

  try {
    await axiosConfig.put<FestivalDetail>(`/festivalDetails/${updated.id}`, detail);
  } catch (e) {
    try {
      await axiosConfig.post<FestivalDetail>("/festivalDetails", detail);
    } catch (e2) {
      console.error("Upsert festivalDetails failed:", e2);
    }
  }

  return updated;
});

export const deleteFestival = createAsyncThunk("festivals/delete", async (id: number) => {
  await axiosConfig.delete(`/festivals/${id}`);

  try {
    await axiosConfig.delete(`/festivalDetails/${id}`);
  } catch (e) {
    console.warn("Delete festivalDetails failed (maybe not exist):", e);
  }

  return id;
});
