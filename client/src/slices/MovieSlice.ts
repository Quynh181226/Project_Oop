// slices/MovieSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Movie, MoviesState } from "../types/type";
import { getAllMovies, addMovie, editMovie, deleteMovie } from "../apis/MovieApi";

const initialState: MoviesState = {
    movies: [],
    loading: false,
    error: null,
};

const MovieSlice = createSlice({
    name: "movies",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllMovies.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllMovies.fulfilled, (state, action: PayloadAction<Movie[]>) => {
                state.loading = false;
                state.movies = action.payload;
            })
            .addCase(getAllMovies.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch movies";
            })
            .addCase(addMovie.fulfilled, (state, action: PayloadAction<Movie>) => {
                state.movies.push(action.payload);
            })
            .addCase(editMovie.fulfilled, (state, action: PayloadAction<Movie>) => {
                const index = state.movies.findIndex((m) => m.id === action.payload.id);
                if (index !== -1) state.movies[index] = action.payload;
            })
            .addCase(deleteMovie.fulfilled, (state, action: PayloadAction<number>) => {
                state.movies = state.movies.filter((m) => m.id !== action.payload);
            });
    },
});

export const movieReducer = MovieSlice.reducer;