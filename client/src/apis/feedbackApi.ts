import axiosConfig from "../utils/axiosConfig.ts";

export interface Feedback {
    id: number;
    userId?: number | null;
    userName: string;
    userAvatar?: string | null;
    rating: number;
    comment: string;
    created_at: string;
}

export interface SubmitFeedbackData {
    userId?: number | null;
    userName: string;
    userAvatar?: string | null;
    rating: number;
    comment: string;
}

export const feedbackApi = {
    getAllFeedback: async (): Promise<Feedback[]> => {
        const response = await axiosConfig.get('feedback');
        return response.data;
    },

    submitFeedback: async (feedbackData: SubmitFeedbackData): Promise<{ message: string; id: number }> => {
        const response = await axiosConfig.post('feedback', feedbackData);
        return response.data;
    }
};