import { useState } from "react";
import { X } from "lucide-react";
import axios from "../utils/axiosConfig";
import { message } from "antd";
import { sendOtpEmail } from "../apis/emailApi";
import {toast} from "react-toastify";

type Step = "email" | "otp" | "reset";

export const ForgotPasswordModal = ({
                                        onClose,
                                    }: {
    onClose: () => void;
}) => {
    const [step, setStep] = useState<Step>("email");
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [generatedOtp, setGeneratedOtp] = useState("");

    const handleSendOtp = async () => {
        if (!email) return message.error("Vui lòng nhập email");

        setLoading(true);
        try {
            const res = await axios.get("/users", { params: { email } });
            if (res.data.length === 0) {
                message.error("Email không tồn tại trong hệ thống");
                setLoading(false);
                return;
            }

            const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
            setGeneratedOtp(otpCode);

            const result = await sendOtpEmail(email, otpCode);

            if (result.success) {
                toast.info("Mã OTP đã được gửi đến email!!");
                setStep("otp");
            } else {
                toast.error("Không thể gửi OTP. Vui lòng thử lại sau.");
            }
        } catch (error: any) {
            console.error("Lỗi khi gửi OTP:", error);
            toast.error("Đã xảy ra lỗi. Vui lòng thử lại.");
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOtp = () => {
        if (!otp || otp.length !== 6) {
            return message.error("Vui lòng nhập đầy đủ 6 chữ số OTP");
        }

        if (otp !== generatedOtp) {
            return message.error("Mã OTP không đúng. Vui lòng thử lại.");
        }

        message.success("Xác thực thành công!");
        setStep("reset");
    };

    const handleResetPassword = async () => {
        if (newPassword !== confirmPassword) {
            message.error("Mật khẩu xác nhận không khớp");
            return;
        }
        if (newPassword.length < 6) {
            message.error("Mật khẩu phải có ít nhất 6 ký tự");
            return;
        }

        setLoading(true);
        try {
            const res = await axios.get("/users", { params: { email } });
            const user = res.data[0];

            await axios.patch(`/users/${user.id}`, { password: newPassword });

            message.success("Đặt lại mật khẩu thành công! Bạn có thể đăng nhập ngay bây giờ.");
            onClose();
        } catch (error) {
            console.error("Lỗi đổi mật khẩu:", error);
            message.error("Đổi mật khẩu thất bại. Vui lòng thử lại.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[999] flex items-center justify-center">
            <div className="absolute inset-0 bg-black/55 backdrop-blur-[1px]" onClick={onClose} />
            <div className="relative w-[75%] md:w-[500px] border border-[#1E293B] bg-[#020817] text-white rounded-lg px-8 py-7 shadow-xl">
                <button onClick={onClose} className="cursor-pointer absolute top-4 right-4 text-gray-400 hover:text-gray-300">
                    <X size={28} />
                </button>

                <h2 className="text-[22px] font-semibold mb-7 text-center">
                    {step === "email" && "Quên mật khẩu"}
                    {step === "otp" && "Nhập mã OTP"}
                    {step === "reset" && "Đặt mật khẩu mới"}
                </h2>

                {step === "email" && (
                    <div className="space-y-6">
                        <div>
                            <label className="block text-[15px] mb-1.5">Email của bạn</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="example@gmail.com"
                                className="w-full px-4 py-[10px] bg-transparent border border-[#18243c] rounded-lg outline-none"
                            />
                        </div>
                        <button
                            onClick={handleSendOtp}
                            disabled={loading}
                            className="cursor-pointer w-full mt-2 py-3 rounded-full font-medium bg-gradient-to-r from-[#E5101B] to-[#F85154] hover:opacity-90 transition disabled:opacity-50"
                        >
                            {loading ? "Đang gửi OTP..." : "Gửi mã OTP"}
                        </button>
                    </div>
                )}

                {step === "otp" && (
                    <div className="space-y-6">
                        <div>
                            <label className="block text-[15px] mb-1.5">Mã OTP (6 chữ số)</label>
                            <input
                                type="text"
                                maxLength={6}
                                value={otp}
                                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                                placeholder="------"
                                className="w-full px-4 py-[10px] text-center text-2xl tracking-widest font-mono bg-transparent border border-[#18243c] rounded-lg outline-none focus:border-[#F85154]"
                            />
                        </div>
                        <p className="text-sm text-gray-400 text-center">
                            Mã OTP đã được gửi đến <span className="text-[#F85154]">{email}</span>
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={handleSendOtp}
                                disabled={loading}
                                className="cursor-pointer flex-1 py-2.5 rounded-full border border-gray-600 text-sm hover:bg-white/10 transition disabled:opacity-50"
                            >
                                {loading ? "Đang gửi..." : "Gửi lại OTP"}
                            </button>
                            <button
                                onClick={handleVerifyOtp}
                                className="cursor-pointer flex-1 py-2.5 rounded-full font-medium bg-gradient-to-r from-[#E5101B] to-[#F85154] hover:opacity-90 transition"
                            >
                                Xác nhận
                            </button>
                        </div>
                    </div>
                )}

                {step === "reset" && (
                    <div className="space-y-6">
                        <div>
                            <label className="block text-[15px] mb-1.5">Mật khẩu mới</label>
                            <input
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder="Ít nhất 6 ký tự"
                                className="w-full px-4 py-[10px] bg-transparent border border-[#18243c] rounded-lg outline-none "
                            />
                        </div>
                        <div>
                            <label className="block text-[15px] mb-1.5">Xác nhận mật khẩu</label>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Nhập lại mật khẩu"
                                className="w-full px-4 py-[10px] bg-transparent border border-[#18243c] rounded-lg outline-none"
                            />
                        </div>
                        <button
                            onClick={handleResetPassword}
                            disabled={loading}
                            className="cursor-pointer w-full py-3 rounded-full font-medium bg-gradient-to-r from-[#E5101B] to-[#F85154] hover:opacity-90 disabled:opacity-50 transition"
                        >
                            {loading ? "Đang cập nhật..." : "Hoàn tất"}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};