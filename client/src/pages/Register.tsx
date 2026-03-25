// // import { useState, type FormEvent } from "react";
// // import { useNavigate, Link } from "react-router-dom";
// // import { useAppDispatch, useAppSelector } from "../hooks/Hook";
// // import { getByEmail, add } from "../apis/UserApi";
// // import type { User } from "../types/type";
// // import LoadingProcess from "../components/LoadingProcess";
// // import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// // import { faLock, faEnvelope, faKey } from "@fortawesome/free-solid-svg-icons";
// // import { toast } from "react-toastify";
// // import "react-toastify/dist/ReactToastify.css";
// //
// // const Register = () => {
// //     const navigate = useNavigate();
// //     const dispatch = useAppDispatch();
// //
// //     const { loading } = useAppSelector((state) => state.user);
// //
// //     const [form, setForm] = useState({
// //         username: "",
// //         email: "",
// //         password: "",
// //         confirmPassword: "",
// //     });
// //
// //     const [errors, setErrors] = useState<Record<string, string>>({});
// //
// //     const validate = () => {
// //         const newErrors: Record<string, string> = {};
// //         if (!form.username.trim()) newErrors.username = "Full name not empty";
// //         if (!form.email.trim()) newErrors.email = "Email not empty";
// //         else {
// //             const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// //             if (!emailRegex.test(form.email.trim())) newErrors.email = "Email invalid";
// //         }
// //         if (form.password.length < 8) newErrors.password = "Password must be at least 8 characters";
// //         if (form.confirmPassword !== form.password) newErrors.confirmPassword = "Passwords do not match";
// //         return newErrors;
// //     };
// //
// //     const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
// //         e.preventDefault();
// //         setErrors({});
// //
// //         const clientErrors = validate();
// //         if (Object.keys(clientErrors).length > 0) {
// //             setErrors(clientErrors);
// //             toast.error("Register failed!!")
// //             return;
// //         }
// //
// //         try {
// //             const res = await dispatch(getByEmail(form.email.trim())).unwrap();
// //             if (res.length > 0) {
// //                 setErrors({ email: "Email already exists" });
// //                 return;
// //             }
// //
// //             const newUser: User = {
// //                 id: Date.now(),
// //                 fullName: form.username.trim(),
// //                 email: form.email.trim(),
// //                 password: form.password.trim(),
// //                 role: "user",
// //             };
// //
// //             await dispatch(add(newUser));
// //
// //             sessionStorage.setItem("isLoggedIn", "true");
// //             sessionStorage.setItem("currentUser", JSON.stringify(newUser.id));
// //
// //             toast.success("Register success!!");
// //             // navigate("/dashboard");
// //
// //             setTimeout(()=>{
// //                 navigate("/login");
// //             }, 3000)
// //
// //
// //         } catch (err) {
// //
// //             console.error("Register error:", err);
// //             setErrors({ general: "Failed to register!!" });
// //         }
// //     };
// //
// //     return (
// //         <div className="bg-gray-50">
// //             {loading && <LoadingProcess />}
// //             <h1 className="text-center font-medium text-4xl pt-5">Register</h1>
// //
// //             <p className="text-[#52525B] font-poppins text-[18px] font-normal leading-[30px] text-center mt-5 mb-8 max-w-md mx-auto">
// //                 QuizForge – Nền tảng sáng tạo bài kiểm tra trực tuyến, giúp bạn dễ dàng thiết kế, chia sẻ và thực hiện các bài kiểm tra một cách nhanh chóng và hiệu quả!
// //             </p>
// //
// //             <div className="flex items-center justify-center bg-gray-50">
// //                 <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
// //                     {errors.general && (
// //                         <div className="mb-4 text-red-600 text-sm">{errors.general}</div>
// //                     )}
// //
// //                     <form className="space-y-4" onSubmit={handleSubmit} noValidate>
// //                         <div>
// //                             <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
// //                                 Full Name
// //                             </label>
// //                             <div className="flex items-center border border-[#dadadd] rounded-md focus-within:ring-2 focus-within:ring-blue-200">
// //                                 <span className="px-3 text-gray-400">
// //                                     <FontAwesomeIcon icon={faLock} />
// //                                 </span>
// //                                 <input type="text" id="username" placeholder="Enter full name" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} className="flex-1 p-2 outline-none"
// //                                 />
// //                             </div>
// //                             {errors.username && (
// //                                 <p className="text-red-500 text-sm mt-1">{errors.username}</p>
// //                             )}
// //                         </div>
// //
// //                         <div>
// //                             <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
// //                                 Email
// //                             </label>
// //                             <div className="flex items-center border border-[#dadadd] rounded-md focus-within:ring-2 focus-within:ring-blue-200">
// //                                 <span className="px-3 text-gray-400">
// //                                     <FontAwesomeIcon icon={faEnvelope} />
// //                                 </span>
// //                                 <input type="email" id="email" placeholder="Enter email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="flex-1 p-2 outline-none"/>
// //                             </div>
// //                             {errors.email && (
// //                                 <p className="text-red-500 text-sm mt-1">{errors.email}</p>
// //                             )}
// //                         </div>
// //
// //                         <div>
// //                             <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
// //                                 Password
// //                             </label>
// //                             <div className="flex items-center border border-[#dadadd] rounded-md focus-within:ring-2 focus-within:ring-blue-200">
// //                                 <span className="px-3 text-gray-400">
// //                                     <FontAwesomeIcon icon={faKey} />
// //                                 </span>
// //                                 <input type="password" id="password" placeholder="Enter password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="flex-1 p-2 outline-none"
// //                                 />
// //                             </div>
// //                             {errors.password && (
// //                                 <p className="text-red-500 text-sm mt-1">{errors.password}</p>
// //                             )}
// //                         </div>
// //
// //                         <div>
// //                             <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
// //                                 Confirm Password
// //                             </label>
// //                             <div className="flex items-center border border-[#dadadd] rounded-md focus-within:ring-2 focus-within:ring-blue-200">
// //                                 <span className="px-3 text-gray-400">
// //                                     <FontAwesomeIcon icon={faKey} />
// //                                 </span>
// //                                 <input type="password" id="confirmPassword" placeholder="Enter password" value={form.confirmPassword} className="flex-1 p-2 outline-none"
// //                                         onChange={(e) =>
// //                                             setForm({ ...form, confirmPassword: e.target.value })
// //                                         }
// //                                 />
// //                             </div>
// //                             {errors.confirmPassword && (
// //                                 <p className="text-red-500 text-sm mt-1">
// //                                     {errors.confirmPassword}
// //                                 </p>
// //                             )}
// //                         </div>
// //
// //                         <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors">
// //                             Sign Up
// //                         </button>
// //                     </form>
// //
// //                     <p className="text-center text-gray-600 mt-4">
// //                         Have an account?{" "}
// //                         <Link to="/login" className="text-blue-600 hover:underline">
// //                             Log in
// //                         </Link>
// //                     </p>
// //                 </div>
// //             </div>
// //         </div>
// //     );
// // };
// //
// // export default Register;
//
// import { useState, type FormEvent } from "react";
// // import "../styles/login.css"; // Giữ nếu cần, hoặc tạo style riêng
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEnvelope, faKey, faUser, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
// import { Link, useNavigate } from "react-router-dom";
// import { useAppDispatch, useAppSelector } from "../hooks/Hook";
// import { getByEmail, add } from "../apis/UserApi";
// import LoadingProcess from "../components/LoadingProcess.tsx";
// import { toast } from "react-toastify";
// import { type User } from "../types/type.ts";
//
// const Register = () => {
//     const navigate = useNavigate();
//     const dispatch = useAppDispatch();
//     const { loading } = useAppSelector((state) => state.user);
//
//     const [form, setForm] = useState({
//         username: "",
//         email: "",
//         password: "",
//         confirmPassword: "",
//     });
//
//     const [showPassword, setShowPassword] = useState(false);
//     const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//
//     const [errors, setErrors] = useState<Record<string, string>>({});
//
//     const validate = () => {
//         const newErrors: Record<string, string> = {};
//         if (!form.username.trim()) newErrors.username = "Họ và tên không được để trống";
//         if (!form.email.trim()) newErrors.email = "Email không được để trống";
//         else {
//             const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//             if (!emailRegex.test(form.email.trim())) newErrors.email = "Email không hợp lệ";
//         }
//         if (form.password.length < 8) newErrors.password = "Mật khẩu phải ít nhất 8 ký tự";
//         if (form.confirmPassword !== form.password) newErrors.confirmPassword = "Mật khẩu xác nhận không khớp";
//         return newErrors;
//     };
//
//     const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//         e.preventDefault();
//         setErrors({});
//
//         const clientErrors = validate();
//         if (Object.keys(clientErrors).length > 0) {
//             setErrors(clientErrors);
//             toast.error("Đăng ký thất bại!!");
//             return;
//         }
//
//         try {
//             const res = await dispatch(getByEmail(form.email.trim())).unwrap();
//             if (res.length > 0) {
//                 setErrors({ email: "Email đã tồn tại" });
//                 toast.error("Email đã tồn tại");
//                 return;
//             }
//
//             const newUser: User = {
//                 id: Date.now(),
//                 fullName: form.username.trim(),
//                 email: form.email.trim(),
//                 password: form.password.trim(),
//                 role: "user",
//             };
//
//             await dispatch(add(newUser)).unwrap();
//
//             sessionStorage.setItem("isLoggedIn", "true");
//             sessionStorage.setItem("currentUser", JSON.stringify(newUser.id));
//
//             toast.success("Đăng ký thành công!!");
//
//             setTimeout(() => {
//                 navigate("/login");
//             }, 3000);
//         } catch (err) {
//             console.error("Register error:", err);
//             toast.error("Đăng ký thất bại!!");
//         }
//     };
//
//     return (
//         <>
//             <div className="min-h-screen bg-gradient-to-tl from-[#d4d7e2]/95 via-[#f2f3f7]/60 to-white/80 backdrop-blur-sm flex items-center">
//                 <div className="flex flex-col sm:flex-row p-5 gap-[10px] font-['FS_PF_BeauSans_Pro'] w-full mx-auto items-center sm:items-start">
//                     {/* Phần bên trái: Background rạp chiếu phim */}
//                     <div className="hidden sm:flex relative w-[80%] h-[95vh] rounded-3xl overflow-hidden flex-col items-center bg-cover bg-center bg-no-repeat">
//                         <img
//                             src="https://thumbs.dreamstime.com/b/modern-cinema-theater-featuring-plush-red-seating-large-illuminated-blank-screen-rows-empty-seats-create-symmetrical-view-393603142.jpg"
//                             alt="Cinema Background"
//                             className="absolute w-full h-full object-cover"
//                         />
//                         <div className="absolute top-[6%] left-12">
//                             <div className="flex items-center gap-2 text-[#6a7698] rotate-[-4deg] skew-y-[-3.5deg]">
//                                 <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#6a7698">
//                                     <path d="m160-800 80 160h120l-80-160h80l80 160h120l-80-160h80l80 160h120l-80-160h120q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800Zm0 240v320h640v-320H160Zm0 0v320-320Z"/>
//                                 </svg>
//                                 <span className="font-['Dancing_Script',cursive] font-semibold tracking-wide italic transform text-[1.8rem]">
//                   Ncc Management
//                 </span>
//                             </div>
//                         </div>
//                     </div>
//
//                     {/* Phần form đăng ký */}
//                     <div className="w-full sm:w-[60%] sm:mt-[86px] sm:p-0 flex justify-center">
//                         <div className="bg-white/90 sm:bg-transparent border border-gray-200 sm:border-none rounded-2xl sm:rounded-none shadow-md sm:shadow-none px-8 py-10 w-[90%] sm:w-[80%]">
//                             {/* Logo trên mobile */}
//                             <div className="flex sm:hidden justify-center mb-6">
//                                 <div className="flex items-center gap-2 text-[#6a7698] rotate-[-3.6deg]">
//                                     <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#6a7698">
//                                         <path d="m160-800 80 160h120l-80-160h80l80 160h120l-80-160h80l80 160h120l-80-160h120q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800Zm0 240v320h640v-320H160Zm0 0v320-320Z"/>
//                                     </svg>
//                                     <span className="font-['Dancing_Script',cursive] font-semibold italic text-[1.6rem]">
//                     Ncc Management
//                   </span>
//                                 </div>
//                             </div>
//
//                             <span className="text-[28px] sm:text-[32px] font-bold text-[#3D3D3D] block text-center sm:text-left">
//                 Đăng Ký
//               </span>
//                             <span className="block text-sm text-[#676767] text-center sm:text-left mt-1">
//                 Tạo tài khoản mới cho National Cinema Center Management !!
//               </span>
//
//                             {loading && <LoadingProcess />}
//
//                             <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-[10px] mt-6">
//                                 <label htmlFor="username" className="block text-sm font-medium text-gray-700">
//                                     Họ và tên
//                                 </label>
//                                 <div className="flex items-center mt-1">
//                   <span className="flex items-center justify-center bg-[#6a7698] px-3 py-3.5 rounded-l-md">
//                     <FontAwesomeIcon icon={faUser} className="text-[#f4eeee]" />
//                   </span>
//                                     <input
//                                         type="text"
//                                         id="username"
//                                         value={form.username}
//                                         onChange={(e) => setForm({ ...form, username: e.target.value })}
//                                         placeholder="Nhập họ và tên"
//                                         className="w-full border border-gray-300 rounded-r-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#6a7698]"
//                                     />
//                                 </div>
//                                 {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
//
//                                 <label htmlFor="email" className="block text-sm font-medium text-gray-700 mt-3">
//                                     Email
//                                 </label>
//                                 <div className="flex items-center mt-1">
//                   <span className="flex items-center justify-center bg-[#6a7698] px-3 py-3.5 rounded-l-md">
//                     <FontAwesomeIcon icon={faEnvelope} className="text-[#f4eeee]" />
//                   </span>
//                                     <input
//                                         type="email"
//                                         id="email"
//                                         value={form.email}
//                                         onChange={(e) => setForm({ ...form, email: e.target.value })}
//                                         placeholder="Nhập email"
//                                         className="w-full border border-gray-300 rounded-r-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#6a7698]"
//                                     />
//                                 </div>
//                                 {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
//
//                                 <label htmlFor="password" className="block text-sm font-medium text-gray-700 mt-3">
//                                     Mật khẩu
//                                 </label>
//                                 <div className="flex items-center mt-1">
//                   <span className="flex items-center justify-center bg-[#6a7698] px-3 py-3.5 rounded-l-md">
//                     <FontAwesomeIcon icon={faKey} className="text-[#f4eeee]" />
//                   </span>
//                                     <div className="relative w-full">
//                                         <input
//                                             type={showPassword ? "text" : "password"}
//                                             id="password"
//                                             value={form.password}
//                                             onChange={(e) => setForm({ ...form, password: e.target.value })}
//                                             placeholder="Nhập mật khẩu"
//                                             className="w-full border border-gray-300 rounded-r-md px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-[#6a7698]"
//                                         />
//                                         <FontAwesomeIcon
//                                             icon={showPassword ? faEyeSlash : faEye}
//                                             onClick={() => setShowPassword(!showPassword)}
//                                             className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
//                                         />
//                                     </div>
//                                 </div>
//                                 {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
//
//                                 <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mt-3">
//                                     Xác nhận mật khẩu
//                                 </label>
//                                 <div className="flex items-center mt-1">
//                   <span className="flex items-center justify-center bg-[#6a7698] px-3 py-3.5 rounded-l-md">
//                     <FontAwesomeIcon icon={faKey} className="text-[#f4eeee]" />
//                   </span>
//                                     <div className="relative w-full">
//                                         <input
//                                             type={showConfirmPassword ? "text" : "password"}
//                                             id="confirmPassword"
//                                             value={form.confirmPassword}
//                                             onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
//                                             placeholder="Nhập lại mật khẩu"
//                                             className="w-full border border-gray-300 rounded-r-md px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-[#6a7698]"
//                                         />
//                                         <FontAwesomeIcon
//                                             icon={showConfirmPassword ? faEyeSlash : faEye}
//                                             onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                                             className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
//                                         />
//                                     </div>
//                                 </div>
//                                 {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
//
//                                 <div className="flex flex-col gap-4 mt-6">
//                                     <button
//                                         type="submit"
//                                         disabled={loading}
//                                         className="relative mb-2.5 border border-[#5a637d] bg-[#7d88a8] hover:bg-[#6a7698] text-white font-bold text-[16px] rounded-2xl h-[5vh] shadow-[0_6px_0_#5a637d] cursor-pointer overflow-hidden hover:-translate-y-[1px] hover:shadow-[0_9px_0_#5a637d] transition-all"
//                                     >
//                                         <span className="relative z-10">Đăng Ký</span>
//                                         <div className="absolute inset-0 bg-[linear-gradient(-115deg,#6a7698_60%,#7d88a7_60%,#7d88a7_62%,#6a7698_62%,#6a7698_65%,#7d88a7_65%,#7d88a7_70%,#6a7698_70%,#6a7698_73%,#7d88a7_73%,#7d88a7_75%,#6a7698_75%)] z-0 pointer-events-none"></div>
//                                     </button>
//                                 </div>
//
//                                 <p className="text-center text-gray-600 mt-4">
//                                     Đã có tài khoản?{" "}
//                                     <Link to="/login" className="text-blue-600 hover:underline">
//                                         Đăng nhập
//                                     </Link>
//                                 </p>
//                             </form>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// };
//
// export default Register;