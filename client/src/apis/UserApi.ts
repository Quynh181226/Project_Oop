import axiosConfig from "../utils/axiosConfig.ts";
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { User, NewUser } from "../types/type";

export const getByEmail = createAsyncThunk("user/getByEmail", async (email: string) => {
    const res = await axiosConfig.get(`users?email=${email}`);
    return res.data;
});

export const add = createAsyncThunk("user/add", async (user: any) => {
    const res = await axiosConfig.post(`users`, user);
    return res.data;
});

export const login = createAsyncThunk(
    "user/login",
    async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
        try {
            const res = await axiosConfig.get(`users?email=${email}`);
            const users = res.data;
            if (users.length === 0 || users[0].password !== password) {
                return rejectWithValue("Invalid email or password");
            }
            return users[0];
        } catch (err) {
            return rejectWithValue("Login failed");
            // console.error("Login failed: ",err);
        }
    }
);

export const getAllUsers = createAsyncThunk("userManagement/getAll", async () => {
    const res = await axiosConfig.get<User[]>("/users");
    return res.data;
});

export const addUser = createAsyncThunk("userManagement/add", async (user: NewUser) => {
    const res = await axiosConfig.post<User>("/users", user);
    return res.data;
});

export const editUser = createAsyncThunk("userManagement/edit", async (user: User) => {
    const res = await axiosConfig.put<User>(`/users/${user.id}`, user);
    return res.data;
});

export const deleteUser = createAsyncThunk("userManagement/delete", async (id: string | number) => {
    await axiosConfig.delete(`/users/${id}`);
    return id;
});