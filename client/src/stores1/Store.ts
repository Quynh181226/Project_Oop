import { configureStore } from "@reduxjs/toolkit";
import {userReducer} from "../slices1/UserSlice.ts";
import {categoriesReducer} from '../slices1/CategoriesSlice.ts';
import {testsReducer} from "../slices1/TestsSlice.ts";
import {quesReducer} from "../slices1/QuesSlice.ts";
import {courseReducer} from "../slices1/CourseSlice.ts";
import {examReducer} from "../slices1/ExamSlice.ts";
// import {topicReducer} from "../slices/TopicSlice.ts";


export const Store = configureStore({
    reducer: {
        user: userReducer,
        categories: categoriesReducer,
        tests: testsReducer,
        ques: quesReducer,
        courses: courseReducer,
        exams: examReducer,
        // topics: topicReducer
    },
    // devTools: true,
});

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;