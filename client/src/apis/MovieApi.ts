import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosConfig from "../utils/axiosConfig";
import type { Movie, NewMovie } from "../types/type";

export const getAllMovies = createAsyncThunk("movies/getAll", async () => {
    const res = await axiosConfig.get<Movie[]>("movies");
    return res.data;
});

export const addMovie = createAsyncThunk("movies/add", async (movie: NewMovie) => {
    const res = await axiosConfig.post<Movie>("movies", movie);
    return res.data;
});

export const editMovie = createAsyncThunk("movies/edit", async (movie: Movie) => {
    const res = await axiosConfig.put<Movie>(`movies/${movie.id}`, movie);
    return res.data;
});

export const deleteMovie = createAsyncThunk("movies/delete", async (id: number) => {
    await axiosConfig.delete(`movies/${id}`);
    return id;
});