import { useState } from "react";
import { X } from "lucide-react";
import axios from "../utils/axiosConfig";
import { useAppDispatch } from "../hooks/Hook";
import { setUser } from "../slices/UserSlice";
import { message } from "antd";
import type { User } from "../types/type";

export const LoginModal = ({
                               onClose,
                               onOpenRegister,
                               onOpenForgot
                           }: {
    onClose: () => void;
    onOpenRegister?: () => void;
    onOpenForgot?: () => void;
}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const dispatch = useAppDispatch();

    const handleLogin = async () => {
        if (!email || !password) {
            message.error("Vui lòng nhập đầy đủ");
            return;
        }

        setLoading(true);
        try {
            const res = await axios.get<User[]>("/users", {
                params: { email, password },
            });

            if (res.data.length === 0) {
                message.error("Sai email hoặc mật khẩu");
                setLoading(false);
                return;
            }

            const user = res.data[0];

            if (user.role === "admin") {
                message.error("Vui lòng dùng trang quản trị để đăng nhập");
                setLoading(false);
                return;
            }

            dispatch(setUser(user));
            sessionStorage.setItem("currentUser", JSON.stringify(user));
            sessionStorage.setItem("isLoggedIn", "true");

            message.success("Đăng nhập thành công!");
            onClose();
        } catch {
            message.error("Đăng nhập thất bại");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[999] flex items-center justify-center">
            <div
                className="absolute inset-0 bg-black/55 backdrop-blur-[1px]"
                onClick={onClose}
            />
            <div className="relative w-[75%] md:w-[500px] border border-[#1E293B] bg-[#020817] text-white rounded-lg px-8 py-7 shadow-xl">
                <button
                    onClick={onClose}
                    className="cursor-pointer absolute top-5 right-5 text-gray-400 hover:text-gray-300"
                >
                    <X size={28} />
                </button>

                <h2 className="text-[22px] font-semibold mb-7">Đăng nhập</h2>

                <div className="space-y-6">
                    <div>
                        <label className="block text-[15px] mb-1.5">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            className="w-full px-4 py-[10px] bg-transparent border border-[#18243c] rounded-lg outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-[15px] mb-1.5">Mật khẩu</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Mật khẩu"
                            className="w-full px-4 py-[10px] bg-transparent border border-[#18243c] rounded-lg outline-none"
                        />
                    </div>
                </div>

                <div className="text-right mt-3">
                    <button
                        onClick={() => {
                            onClose();
                            onOpenForgot?.(); // Mở modal quên mật khẩu
                        }}
                        className="cursor-pointer text-sm text-[#F85154] hover:text-[#E5101B] hover:underline"
                    >
                        Quên mật khẩu?
                    </button>
                </div>

                <button
                    onClick={handleLogin}
                    disabled={loading}
                    className="cursor-pointer w-full mt-2 py-3 rounded-full font-medium bg-gradient-to-r from-[#E5101B] to-[#F85154] hover:opacity-90 transition disabled:opacity-50"
                >
                    {loading ? "Đang đăng nhập..." : "Đăng Nhập"}
                </button>

                <p className="text-center text-sm mt-2 text-gray-300">
                    Chưa có tài khoản?{" "}
                    <button
                        onClick={() => {
                            onClose();
                            onOpenRegister?.(); // Mở modal đăng ký
                        }}
                        className="cursor-pointer text-[#F85154] hover:text-[#E5101B] hover:underline font-medium"
                    >
                        Đăng ký
                    </button>
                </p>
            </div>
        </div>
    );
};