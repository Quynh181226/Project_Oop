export interface Promotion {
    id: number;
    img: string;
    date: string;
    title: string;
}


export interface BookingHistory {
    id: number;
    customerEmail: string;
    customerName: string;
    phoneNumber: string;
    movieTitle: string;
    date: string;
    time: string;
    seats: string[];
    totalPrice: number;
    bookingCode: string;
    createdAt: string;
    status: string;
}


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

export interface FeedbackState {
    feedbacks: Feedback[];
    loading: boolean;
    error: string | null;
}

export interface Festival {
    id: number;
    title: string;
    date: string;
    description?: string;
    image: string;
}

export interface FestivalDetail {
    id: number;
    title: string;
    subtitle?: string;
    paragraphs: string[];
    ticketInfo?: string[];
    extraInfo?: string[];
    link?: string;
    banner: string;
    scheduleImage?: string;
}




export type Role = "user" | "admin";

export interface User {
    id: string;
    fullName: string;
    email: string;
    password: string;
    phone?: string;
    address?: string;
    avatar?: string;
    gender?: "male" | "female" | "other";
    dob?: string;
    status?: "active" | "blocked";
    role: Role;
}
export type CurrentUser = User | null;
export type NewUser = Omit<User, "id">;
export type UpdateUser = User;

export interface UserState {
    users: User[];
    loading: boolean;
    error: string | null | undefined;


    currentUser: CurrentUser;
    isLoggedIn: boolean;
}

export interface TimeSlot {
    id: number;
    time: string;
}

export type NewTimeSlot = Omit<TimeSlot, "id">;

export interface TimeSlotsState {
    slots: TimeSlot[];
    loading: boolean;
    error: string | null;
}



export interface ShowDate {
    id: number;
    date: string;
}

export type NewShowDate = Omit<ShowDate, "id">;

export interface ShowDatesState {
    dates: ShowDate[];
    loading: boolean;
    error: string | null;
}

export interface Movie {
    id: number;
    title: string;
    country: string;
    director: string;
    actors: string;
    genres: string[];
    duration: number;
    rated: string;
    releaseDate?: string;
    description?: string;
    trailer?: string;
    poster: string;
    // revenue?: string;
    status: "showing" | "coming" | "ended";
    showDates: string[];
    timeSlots: string[];
}

export type NewMovie = Omit<Movie, "id">;

export interface MoviesState {
    movies: Movie[];
    loading: boolean;
    error: string | null;
}



export interface Category {
    id: number;
    name: string;
    // image: string;
}

export type NewCategory = {
    name: string;
    // image: string;
};

export interface CategoriesState {
    categories: Category[];
    loading: boolean;
    error: string | null | undefined;
}