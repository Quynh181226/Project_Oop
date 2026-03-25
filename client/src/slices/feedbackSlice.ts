import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Feedback, SubmitFeedbackData, FeedbackState } from '../types/type';

// Async thunks
export const fetchFeedbacks = createAsyncThunk(
    'feedback/fetchFeedbacks',
    async () => {
        const response = await fetch('http://localhost:8080/feedback');
        if (!response.ok) {
            throw new Error('Failed to fetch feedbacks');
        }
        return await response.json();
    }
);

export const submitFeedback = createAsyncThunk(
    'feedback/submitFeedback',
    async (feedbackData: SubmitFeedbackData) => {
        const response = await fetch('http://localhost:8080/feedback', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...feedbackData,
                created_at: new Date().toISOString()
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to submit feedback');
        }

        return await response.json();
    }
);

const initialState: FeedbackState = {
    feedbacks: [],
    loading: false,
    error: null,
};

const feedbackSlice = createSlice({
    name: 'feedback',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Fetch feedbacks
        builder.addCase(fetchFeedbacks.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchFeedbacks.fulfilled, (state, action: PayloadAction<Feedback[]>) => {
            state.loading = false;
            state.feedbacks = action.payload;
        });
        builder.addCase(fetchFeedbacks.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Failed to fetch feedbacks';
        });

        // Submit feedback
        builder.addCase(submitFeedback.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(submitFeedback.fulfilled, (state, action: PayloadAction<Feedback>) => {
            state.loading = false;
            state.feedbacks = [action.payload, ...state.feedbacks];
        });
        builder.addCase(submitFeedback.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Failed to submit feedback';
        });
    },
});

export default feedbackSlice.reducer;