import { X } from "lucide-react";
import { useState } from "react";
import axios from "../utils/axiosConfig";
import { message } from "antd";

export const RegisterModal = ({
                                  onClose,
                                  onOpenLogin,
                              }: {
    onClose: () => void;
    onOpenLogin?: () => void;
}) => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    // const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [agreeTerms, setAgreeTerms] = useState(false); // Thêm state đồng ý điều khoản
    const [loading, setLoading] = useState(false);

    const handleRegister = async () => {
        if (!fullName || !email || !password || !confirmPassword) {
            message.error("Vui lòng nhập đầy đủ thông tin");
            return;
        }

        if (!agreeTerms) {
            message.error("Bạn cần đồng ý với điều khoản sử dụng");
            return;
        }

        if (password !== confirmPassword) {
            message.error("Mật khẩu không khớp");
            return;
        }

        if (password.length < 6) {
            message.error("Mật khẩu phải ít nhất 6 ký tự");
            return;
        }

        setLoading(true);
        try {
            const check = await axios.get("/users", {
                params: { email },
            });

            if (check.data.length > 0) {
                message.error("Email đã tồn tại");
                setLoading(false);
                return;
            }

            await axios.post("/users", {
                fullName,
                email,
                password,
                // phone: phone || null,
                role: "user",
                status: "active",
                createdAt: new Date().toISOString(),
            });

            message.success("Đăng ký thành công");
            onClose();
            onOpenLogin?.();
        } catch (err) {
            message.error("Đăng ký thất bại");
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

            <div className="relative w-[75%] md:w-[555px] border border-[#1E293B] bg-[#020817] text-white rounded-lg px-8 py-7 shadow-xl">
                <button
                    onClick={onClose}
                    className="cursor-pointer absolute top-5 right-5 text-gray-400 hover:text-gray-300"
                >
                    <X size={28} />
                </button>

                <h2 className="text-[22px] font-semibold mb-7">Đăng ký</h2>

                <div className="space-y-6">
                    <div>
                        <label className="block text-[15px] mb-1.5">Họ và tên</label>
                        <input
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            placeholder="Nhập họ và tên"
                            className="w-full px-4 py-[10px] bg-transparent border border-[#18243c] rounded-lg outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-[15px] mb-1.5">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Nhập email"
                            className="w-full px-4 py-[10px] bg-transparent border border-[#18243c] rounded-lg outline-none"
                        />
                    </div>

                    {/*<div>*/}
                    {/*    <label className="block text-[15px] mb-1.5">Số điện thoại</label>*/}
                    {/*    <input*/}
                    {/*        type="text"*/}
                    {/*        value={phone}*/}
                    {/*        onChange={(e) => setPhone(e.target.value)}*/}
                    {/*        placeholder="Nhập số điện thoại (không bắt buộc)"*/}
                    {/*        className="w-full px-4 py-[10px] bg-transparent border border-[#18243c] rounded-lg outline-none"*/}
                    {/*    />*/}
                    {/*</div>*/}

                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="block text-[15px] mb-1.5">Mật khẩu</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Nhập mật khẩu"
                                className="w-full px-4 py-[10px] bg-transparent border border-[#18243c] rounded-lg outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-[15px] mb-1.5">Xác nhận mật khẩu</label>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Xác nhận mật khẩu"
                                className="w-full px-4 py-[10px] bg-transparent border border-[#18243c] rounded-lg outline-none"
                            />
                        </div>
                    </div>
                </div>

                {/* Checkbox đồng ý điều khoản */}
                <div className="flex items-center gap-3 mt-6">
                    <input
                        type="checkbox"
                        id="agreeTerms"
                        checked={agreeTerms}
                        onChange={(e) => setAgreeTerms(e.target.checked)}
                        className="cursor-pointer w-4 h-4 accent-[#F85154]"
                    />
                    <label htmlFor="agreeTerms" className="text-sm text-gray-300 cursor-pointer">
                        Tôi đồng ý với{" "}
                        <a href="/terms" target="_blank" className="text-[#F85154] hover:underline">
                            Điều khoản sử dụng
                        </a>{" "}
                        và{" "}
                        <a href="/policy" target="_blank" className="text-[#F85154] hover:underline">
                            Chính sách bảo mật
                        </a>
                    </label>
                </div>

                <button
                    onClick={handleRegister}
                    disabled={loading || !agreeTerms}
                    className="cursor-pointer w-full mt-6 py-3 rounded-full font-medium bg-gradient-to-r from-[#E5101B] to-[#F85154] hover:opacity-90 transition disabled:opacity-50"
                >
                    {loading ? "Đang đăng ký..." : "Đăng ký"}
                </button>

                <p className="text-center text-sm mt-5 text-gray-300">
                    Đã có tài khoản?
                    <button
                        onClick={() => {
                            onClose();
                            onOpenLogin?.();
                        }}
                        className="cursor-pointer text-[#F85154] hover:text-[#E5101B] hover:underline font-medium"
                    >
                        Đăng nhập
                    </button>
                </p>
            </div>
        </div>
    );
};