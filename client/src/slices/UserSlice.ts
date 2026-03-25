// // // import { createSlice } from "@reduxjs/toolkit";
// // // import { getByEmail, add, login } from "../apis/UserApi";
// // // import type { UserState } from "../types/type";
// // //
// // // const initialState: UserState = {
// // //     users: [],
// // //     loading: false,
// // //     error: null,
// // //     currentUser: JSON.parse(localStorage.getItem('currentUser') || 'null'),
// // //     isLoggedIn: !!localStorage.getItem('currentUser'),
// // // };
// // //
// // // //getUserByEmail
// // // //addUser
// // // //login
// // // const userSlice = createSlice({
// // //     name: "user",
// // //     initialState,
// // //     reducers: {},
// // //     extraReducers: (builder) => {
// // //         builder
// // //             .addCase(getByEmail.pending, (state) => {
// // //                 state.loading = true;
// // //                 state.error = null;
// // //             })
// // //             .addCase(getByEmail.fulfilled, (state, action) => {
// // //                 state.loading = false;
// // //                 state.users = action.payload;
// // //             })
// // //             .addCase(getByEmail.rejected, (state) => {
// // //                 state.loading = false;
// // //                 state.error = "Error";
// // //             })
// // //             .addCase(add.pending, (state) => {
// // //                 state.loading = true;
// // //                 state.error = null;
// // //             })
// // //             .addCase(add.fulfilled, (state, action) => {
// // //                 state.loading = false;
// // //                 state.users.push(action.payload);
// // //             })
// // //             .addCase(add.rejected, (state) => {
// // //                 state.loading = false;
// // //                 state.error = "Error";
// // //             })
// // //             .addCase(login.pending, (state) => {
// // //                 state.loading = true;
// // //                 state.error = null;
// // //             })
// // //             .addCase(login.fulfilled, (state) => {
// // //                 state.loading = false;
// // //             })
// // //             .addCase(login.rejected, (state, action) => {
// // //                 state.loading = false;
// // //                 state.error = action.payload as string;
// // //             });
// // //     },
// // // });
// // //
// // // export const userReducer = userSlice.reducer;
// //
// // // slices/UserSlice.ts
// // import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
// // import type { User, CurrentUser } from "../types/type";
// //
// // interface UserState {
// //     currentUser: CurrentUser;
// //     isLoggedIn: boolean;
// // }
// //
// // const initialState: UserState = {
// //     currentUser: null,
// //     isLoggedIn: false,
// // };
// //
// // const userSlice = createSlice({
// //     name: "user",
// //     initialState,
// //     reducers: {
// //         setUser: (state, action: PayloadAction<User>) => {
// //             state.currentUser = action.payload;
// //             state.isLoggedIn = true;
// //         },
// //         logout: (state) => {
// //             state.currentUser = null;
// //             state.isLoggedIn = false;
// //         },
// //     },
// // });
// //
// // export const { setUser, logout } = userSlice.actions;
// // export const userReducer = userSlice.reducer;
//
// // slices/UserSlice.ts (file duy nhất, thay thế cả 2 file cũ)
// import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
// import type { User, CurrentUser } from "../types/type";
// import {
//     getAllUsers,
//     addUser,
//     editUser,
//     deleteUser,
// } from "../apis/UserManagementApi";
//
// export interface UserState {
//     // Danh sách người dùng (dùng cho trang quản lý admin)
//     users: User[];
//     loading: boolean;
//     error: string | null;
//
//     // Người dùng hiện tại đang đăng nhập
//     currentUser: CurrentUser;
//     isLoggedIn: boolean;
// }
//
// const initialState: UserState = {
//     users: [],
//     loading: false,
//     error: null,
//
//     currentUser: null,
//     isLoggedIn: false,
// };
//
// const userSlice = createSlice({
//     name: "user",
//     initialState,
//     reducers: {
//         // Đăng nhập / set user hiện tại
//         setUser: (state, action: PayloadAction<User>) => {
//             state.currentUser = action.payload;
//             state.isLoggedIn = true;
//         },
//
//         // Đăng xuất
//         logout: (state) => {
//             state.currentUser = null;
//             state.isLoggedIn = false;
//         },
//     },
//     extraReducers: (builder) => {
//         // Quản lý danh sách users (cho admin)
//         builder
//             .addCase(getAllUsers.pending, (state) => {
//                 state.loading = true;
//                 state.error = null;
//             })
//             .addCase(getAllUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
//                 state.loading = false;
//                 state.users = action.payload;
//             })
//             .addCase(getAllUsers.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.error.message || "Failed to fetch users";
//             })
//
//             // Thêm user mới
//             .addCase(addUser.fulfilled, (state, action: PayloadAction<User>) => {
//                 state.users.push(action.payload);
//             })
//
//             // Sửa user
//             .addCase(editUser.fulfilled, (state, action: PayloadAction<User>) => {
//                 const index = state.users.findIndex((u) => u.id === action.payload.id);
//                 if (index !== -1) {
//                     state.users[index] = action.payload;
//                 }
//                 // Nếu đang sửa chính user hiện tại → cập nhật luôn currentUser
//                 if (state.currentUser && state.currentUser.id === action.payload.id) {
//                     state.currentUser = action.payload;
//                 }
//             })
//
//             // Xóa user
//             .addCase(deleteUser.fulfilled, (state, action: PayloadAction<string | number>) => {
//                 state.users = state.users.filter((u) => u.id !== action.payload);
//             });
//     },
// });
//
// export const { setUser, logout } = userSlice.actions;
// export default userSlice.reducer; // Export default để dùng trong store

// slices/UserSlice.ts (file DUY NHẤT quản lý toàn bộ user)
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User, CurrentUser } from "../types/type";
import {
    getAllUsers,
    addUser,
    editUser,
    deleteUser,
} from "../apis/UserApi.ts";

export interface UserState {
    // Danh sách người dùng (cho trang quản lý admin)
    users: User[];
    loading: boolean; // loading cho fetch list users
    error: string | null;

    // Người dùng hiện tại đang đăng nhập (auth)
    currentUser: CurrentUser;
    isLoggedIn: boolean;
}

const initialState: UserState = {
    users: [],
    loading: false,
    error: null,

    currentUser: JSON.parse(localStorage.getItem("currentUser")||"null"),
    isLoggedIn: !!localStorage.getItem('currentUser')
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        // Auth: đăng nhập
        setUser: (state, action: PayloadAction<User>) => {
            state.currentUser = action.payload;
            state.isLoggedIn = true;



            localStorage.setItem('currentUser', JSON.stringify(action.payload));





            // Nếu user đang đăng nhập có trong danh sách → cập nhật luôn (nếu đã fetch trước đó)
            const index = state.users.findIndex((u) => u.id === action.payload.id);
            if (index !== -1) {
                state.users[index] = action.payload;
            }
        },

        // Auth: đăng xuất
        logout: (state) => {
            state.currentUser = null;
            state.isLoggedIn = false;
        },
    },
    extraReducers: (builder) => {
        // Quản lý danh sách users (admin)
        builder
            // Lấy danh sách users
            .addCase(getAllUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(getAllUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch users";
            })

            // Thêm user mới
            .addCase(addUser.fulfilled, (state, action: PayloadAction<User>) => {
                state.users.push(action.payload);
            })

            // Sửa user
            .addCase(editUser.fulfilled, (state, action: PayloadAction<User>) => {
                const index = state.users.findIndex((u) => u.id === action.payload.id);
                if (index !== -1) {
                    state.users[index] = action.payload;
                }
                // Nếu sửa chính user đang đăng nhập → cập nhật currentUser
                if (state.currentUser && state.currentUser.id === action.payload.id) {
                    state.currentUser = action.payload;
                }
            })

            // Xóa user
            .addCase(deleteUser.fulfilled, (state, action: PayloadAction<string | number>) => {
                state.users = state.users.filter((u) => u.id !== action.payload);
                // Nếu xóa chính user đang đăng nhập → tự động logout
                if (state.currentUser && state.currentUser.id === action.payload) {
                    state.currentUser = null;
                    state.isLoggedIn = false;
                }
            });
    },
});

export const { setUser, logout } = userSlice.actions;
export const userReducer=userSlice.reducer; // Dùng trong store: user: userReducer