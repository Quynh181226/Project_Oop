import { configureStore } from "@reduxjs/toolkit";
import {userReducer} from "../slices/UserSlice.ts";
import {categoriesReducer} from '../slices/GenreSlice.ts';
// import {testsReducer} from "../slices/TestsSlice.ts";
// import {quesReducer} from "../slices/QuesSlice.ts";
import {timeSlotReducer} from "../slices/TimeSlotSlice.ts";
import {showDateReducer} from "../slices/ShowDateSlice.ts";
import {movieReducer} from "../slices/MovieSlice.ts";
import {festivalReducer} from "../slices/FestivalSlice.ts";
import feedbackReducer from '../slices/feedbackSlice';

export const Store = configureStore({
    reducer: {
        user: userReducer,
        categories: categoriesReducer,
        // tests: testsReducer,
        // ques: quesReducer,
        timeSlots: timeSlotReducer,
        showDates: showDateReducer,
        movies: movieReducer,
        festivals: festivalReducer,
        feedback: feedbackReducer,
    },
    // devTools: true,
});

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;