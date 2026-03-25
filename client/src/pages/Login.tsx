import { useState, type FormEvent } from "react";
import "../styles/login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faKey, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/Hook";
import { login } from "../apis/UserApi";
import LoadingProcess from "../components/LoadingProcess.tsx";
import { toast } from "react-toastify";
import { type User } from "../types/type.ts";
import ImgLogo from "../assets/ImgLogo.jpg"
import {setUser} from "../slices/UserSlice.ts";

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { loading } = useAppSelector((state) => state.user);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [remember, setRemember] = useState(false);
    const [errors, setErrors] = useState({ email: "", password: "", login: "" });

    // const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    //     e.preventDefault();
    //     setErrors({ email: "", password: "", login: "" });
    //
    //     try {
    //         const result = await dispatch(login({ email: email.trim(), password: password.trim() }));
    //         console.log("Login result:", result);
    //
    //         if (login.rejected.match(result)) {
    //             toast.error("Invalid email or password");
    //             return;
    //         }
    //
    //         const user: User = result.payload;
    //         sessionStorage.setItem("isLoggedIn", "true");
    //         sessionStorage.setItem("currentUser", JSON.stringify(user.id));
    //
    //         if (login.fulfilled.match(result)) {
    //             toast.success("Login success!!");
    //
    //             const storage = remember ? localStorage : sessionStorage;
    //             storage.setItem("currentUser", JSON.stringify(user));
    //             storage.setItem("isLoggedIn", "true");
    //
    //             setTimeout(() => {
    //                 if (user.role === "admin") {
    //                     // categoryManagement
    //                     navigate("/dashBoardManagement");
    //                 } else {
    //                     navigate("/homePage");
    //                 }
    //             }, 2000);
    //         }
    //     } catch (err) {
    //         console.error("Login error:", err);
    //         toast.error("Login failed!!");
    //     }
    // };
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrors({ email: "", password: "", login: "" });

        try {
            const result = await dispatch(login({ email: email.trim(), password: password.trim() }));

            // Nếu login thất bại
            if (login.rejected.match(result)) {
                toast.error("Email hoặc mật khẩu không đúng!");
                return;
            }

            // Login thành công
            const user: User = result.payload as User;

            // QUAN TRỌNG: Dispatch để cập nhật Redux state
            dispatch(setUser(user));

            if (user.role === "admin") {
                toast.success("Đăng nhập thành công!");
            }else {
                // navigate("/homePage");
                toast.info("not user")
            }

            // Lưu vào storage phù hợp
            const storage = remember ? localStorage : sessionStorage;
            storage.setItem("currentUser", JSON.stringify(user));
            storage.setItem("isLoggedIn", "true");

            // Navigate sau một chút để toast hiện
            setTimeout(() => {
                if (user.role === "admin") {
                    navigate("/dashBoardManagement");
                }else {
                    // navigate("/homePage");
                    toast.info("not user")
                }
            }, 1500);

        } catch (err) {
            console.error("Login error:", err);
            toast.error("Đăng nhập thất bại, vui lòng thử lại!");
        }
    };

    return (
        <>
            <div className="min-h-screen bg-[#F4F5F8] bg-gradient-to-tl from-[#d4d7e2]/95 via-[#f2f3f7]/60 to-white/80 backdrop-blur-sm flex items-center">
                <div className="flex flex-col sm:flex-row p-5 gap-[10px] font-['FS_PF_BeauSans_Pro'] w-full mx-auto items-center sm:items-start">
                    {/* Phần bên trái: Background rạp chiếu phim */}
                    <div className="ml-22 hidden sm:flex relative w-[55%] h-[95vh] rounded-3xl overflow-hidden flex-col items-center bg-cover bg-center bg-no-repeat">
                        <img
                            src={ImgLogo}
                            alt=""
                            className="absolute w-full h-full object-cover"
                        />
                        {/*https://thumbs.dreamstime.com/b/modern-cinema-hall-rows-red-seats-facing-large-pink-screen-neon-lights-walls-ceiling-illuminate-empty-theater-410951218.jpg*/}
                        <div className="absolute top-[6%] left-12">
                            <div className="flex items-center gap-2 text-[#6a7698] rotate-[-4deg] skew-y-[-3.5deg]">
                                <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#6a7698">
                                    <path d="m160-800 80 160h120l-80-160h80l80 160h120l-80-160h80l80 160h120l-80-160h120q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800Zm0 240v320h640v-320H160Zm0 0v320-320Z"/>
                                </svg>
                                <span className="font-['Dancing_Script',cursive] font-semibold tracking-wide italic transform text-[1.8rem]">
                  Ncc Management
                </span>
                            </div>
                        </div>
                    </div>

                    {/* Phần form đăng nhập */}
                    <div className="w-full sm:w-[60%] sm:mt-[86px] sm:p-0 flex justify-center">
                        <div className="bg-white/90 sm:bg-transparent border border-gray-200 sm:border-none rounded-2xl sm:rounded-none shadow-md sm:shadow-none px-8 py-10 w-[90%] sm:w-[80%]">
                            {/* Logo trên mobile */}
                            <div className="flex sm:hidden justify-center mb-6">
                                <div className="flex items-center gap-2 text-[#6a7698] rotate-[-3.6deg]">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#6a7698">
                                        <path d="m160-800 80 160h120l-80-160h80l80 160h120l-80-160h80l80 160h120l-80-160h120q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800Zm0 240v320h640v-320H160Zm0 0v320-320Z"/>
                                    </svg>
                                    <span className="font-['Dancing_Script',cursive] font-semibold italic text-[1.6rem]">
                    Ncc Management
                  </span>
                                </div>
                            </div>

                            <span className="text-[28px] sm:text-[32px] font-bold text-[#3D3D3D] block text-center sm:text-left">
                Đăng Nhập
              </span>
                            <span className="block text-sm text-[#676767] text-center sm:text-left mt-1">
                Truy cập vào National Cinema Center Management nào !!
              </span>

                            {loading && <LoadingProcess />}
                            {errors.login && <div className="mb-4 text-red-600 text-sm">{errors.login}</div>}

                            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-[10px] mt-6">
                                <label htmlFor="email1" className="block text-sm font-medium text-gray-700">
                                    Email
                                </label>
                                <div className="flex items-center mt-1">
                  <span className="flex items-center justify-center bg-[#6a7698] px-3 py-3.5 rounded-l-md">
                    <FontAwesomeIcon icon={faEnvelope} className="text-[#f4eeee]" />
                  </span>
                                    <input
                                        type="email"
                                        id="email1"
                                        name="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Nhập email"
                                        className="w-full border border-gray-300 rounded-r-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#6a7698]"
                                    />
                                </div>

                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mt-3">
                                    Mật khẩu
                                </label>
                                <div className="flex items-center mt-1">
                  <span className="flex items-center justify-center bg-[#6a7698] px-3 py-3.5 rounded-l-md">
                    <FontAwesomeIcon icon={faKey} className="text-[#f4eeee]" />
                  </span>
                                    <div className="relative w-full">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            id="password"
                                            name="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="Nhập mật khẩu"
                                            className="w-full border border-gray-300 rounded-r-md px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-[#6a7698]"
                                        />
                                        <FontAwesomeIcon
                                            icon={showPassword ? faEyeSlash : faEye}
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
                                        />
                                    </div>
                                </div>

                                <a className="text-[#6a7698] text-[12px] cursor-pointer w-fit mt-2">Quên Mật Khẩu</a>

                                <div className="flex flex-col gap-4 mt-3">
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            id="remember"
                                            checked={remember}
                                            onChange={() => setRemember(!remember)}
                                        />
                                        <label htmlFor="remember" className="text-sm text-[#676767]">
                                            Lưu thông tin đăng nhập
                                        </label>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="relative mb-2.5 border border-[#5a637d] bg-[#7d88a8] hover:bg-[#6a7698] text-white font-bold text-[16px] rounded-2xl h-[5vh] shadow-[0_6px_0_#5a637d] cursor-pointer overflow-hidden hover:-translate-y-[1px] hover:shadow-[0_9px_0_#5a637d] transition-all"
                                    >
                                        <span className="relative z-10">Đăng Nhập</span>
                                        <div className="absolute inset-0 bg-[linear-gradient(-115deg,#6a7698_60%,#7d88a7_60%,#7d88a7_62%,#6a7698_62%,#6a7698_65%,#7d88a7_65%,#7d88a7_70%,#6a7698_70%,#6a7698_73%,#7d88a7_73%,#7d88a7_75%,#6a7698_75%)] z-0 pointer-events-none"></div>
                                    </button>
                                </div>

                                {/*<p className="text-center text-gray-600 mt-4">*/}
                                {/*    Don't have an account yet?{" "}*/}
                                {/*    <Link to="/" className="text-blue-600 hover:underline">*/}
                                {/*        Sign up*/}
                                {/*    </Link>*/}
                                {/*</p>*/}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;