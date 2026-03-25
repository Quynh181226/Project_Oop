import React, { useEffect, useMemo, useRef, useState } from "react";
import Header from "../components/Header";
import { Footer } from "../components/Footer";
import { Link, useNavigate } from "react-router-dom";
import { Modal } from "antd";
import { QRCodeSVG } from "qrcode.react";
import { sendTicketEmail, generateBookingCode } from "../apis/emailApi";
import { useAppSelector } from "../hooks/Hook";
import { LoginModal } from "./LoginModal";

type PaymentMethod = "VietQR" | "VNPAY" | "Viettel" | "MoMo";

type PaymentDataLS = {
    movieTitle?: string;
    date?: string;
    time?: string;
    seats?: string[];
    total?: number;
};

const formatCurrency = (value: number): string => value.toLocaleString("vi-VN") + "đ";

const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};

const Payment: React.FC = () => {
    const navigate = useNavigate();

    const paymentData: PaymentDataLS = JSON.parse(localStorage.getItem("paymentData") || "{}");
    const {
        movieTitle = "Không có thông tin",
        date = "Không có thông tin",
        time = "Không có thông tin",
        seats = [],
        total = 0,
    } = paymentData;

    const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>("VietQR");
    const [confirmed, setConfirmed] = useState(false);
    const [loading, setLoading] = useState(false);

    const [openSuccess, setOpenSuccess] = useState(false);
    const [emailSent, setEmailSent] = useState(false);
    const [bookingCode, setBookingCode] = useState("");

    const [openLogin, setOpenLogin] = useState(false);

    const timerRef = useRef<number | null>(null);

    useEffect(() => {
        return () => {
            if (timerRef.current) window.clearTimeout(timerRef.current);
        };
    }, []);

    const { currentUser, isLoggedIn } = useAppSelector((state) => state.user);
    const name = currentUser?.fullName || "";
    const email = currentUser?.email || "";
    const phone = currentUser?.phone || "";

    useEffect(() => {
        if (isLoggedIn) setOpenLogin(false);
    }, [isLoggedIn]);

    const emailValid = useMemo(() => {
        if (!email) return false;
        return validateEmail(email);
    }, [email]);

    const canPay = Boolean(selectedMethod) && confirmed && (!isLoggedIn || emailValid) && !loading;

    const handlePayment = async () => {
        if (!isLoggedIn) {
            setOpenLogin(true);
            return;
        }

        if (!canPay || emailSent) return;

        setLoading(true);
        try {
            const code = generateBookingCode();
            setBookingCode(code);

            await sendTicketEmail({
                customerEmail: email.trim(),
                customerName: name.trim(),
                phoneNumber: phone.trim(),
                movieTitle,
                date,
                time,
                seats,
                totalPrice: total,
                bookingCode: code,
            });

            setOpenSuccess(true);
        } catch (err) {
            //
        } finally {
            setLoading(false);
        }
    };

    const handleConfirmPopup = () => {
        setOpenSuccess(false);
        setEmailSent(true);

        const bookingInfo = {
            movieTitle,
            date,
            time,
            seats,
            total,
            bookingCode,
            customerEmail: email.trim(),
            customerName: name.trim(),
            phoneNumber: phone.trim(),
            paymentMethod: selectedMethod,
            createdAt: new Date().toISOString(),
            status: "confirmed",
        };

        localStorage.setItem("bookingInfo", JSON.stringify(bookingInfo));

        timerRef.current = window.setTimeout(() => {
            localStorage.removeItem("paymentData");
            localStorage.removeItem("selectedSeats");
            navigate("/paymentSuccess");
        }, 5000);
    };

    return (
        <div className="min-h-screen bg-[#17191f] text-white">
            <Header />

            <main className="pt-24 pb-16">
                <div className="max-w-[1400px] mx-auto px-6">
                    <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
                        {/* LEFT */}
                        <div className="flex-1 flex flex-col gap-5">

                            {/* Thông tin phim */}
                            <section className="bg-[#1f232b] border border-[#2f333c] rounded-xl px-8 py-6 shadow-md">
                                <h2 className="text-[18px] font-semibold mb-4">Thông tin phim</h2>

                                <div className="space-y-1 mb-5">
                                    <p className="text-xs text-gray-400">Phim</p>
                                    <p className="font-semibold uppercase">{movieTitle}</p>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-5 text-sm md:text-[15px]">
                                    <div className="space-y-1">
                                        <p className="text-xs text-gray-400">Ngày giờ chiếu</p>
                                        <p className="font-semibold">
                                            <span className="text-[#ffa500]">{time || "--:--"}</span>
                                            <span className="text-white"> - {date || "Không có thông tin"}</span>
                                        </p>
                                    </div>

                                    <div className="space-y-1">
                                        <p className="text-xs text-gray-400">Ghế</p>
                                        <p className="font-semibold">
                                            {seats.length > 0 ? seats.join(", ") : "Chưa có"}
                                        </p>
                                    </div>

                                    <div className="space-y-1">
                                        <p className="text-xs text-gray-400">Định dạng</p>
                                        <p className="font-semibold">2D</p>
                                    </div>

                                    <div className="space-y-1">
                                        <p className="text-xs text-gray-400">Phòng chiếu</p>
                                        <p className="font-semibold">1</p>
                                    </div>
                                </div>
                            </section>




                            {/* Thông tin thanh toán */}
                            <section className="bg-[#1f232b] border border-[#2f333c] rounded-xl px-8 py-6 shadow-md">
                                <h2 className="text-[18px] font-semibold mb-4">Thông tin thanh toán</h2>

                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm md:text-[15px] border-collapse">
                                        <thead>
                                        <tr className="border-b border-[#3c4048] text-left text-gray-300">
                                            <th className="py-2 px-1 font-medium">Danh mục</th>
                                            <th className="py-2 px-1 font-medium">Số lượng</th>
                                            <th className="py-2 px-1 font-medium">Tổng tiền</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr className="border-b border-[#3c4048]">
                                            <td className="py-3 px-1">Ghế ({seats.join(", ")})</td>
                                            <td className="py-3 px-1">{seats.length}</td>
                                            <td className="py-3 px-1">{formatCurrency(total || 0)}</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </section>
                        </div>

                        {/* RIGHT */}
                        <aside className="w-full lg:w-[360px] bg-[#1f232b] border border-[#2f333c] rounded-xl p-6 shadow-md flex flex-col">
                            <h2 className="text-[18px] font-semibold mb-4">Phương thức thanh toán</h2>

                            <div className="space-y-3 mb-5">
                                {(
                                    [
                                        {
                                            key: "VietQR",
                                            label: "VietQR",
                                            img: "https://1400.vn/hotrodieutribenhlao/images/logo-vietqr.png",
                                            bg: "",
                                        },
                                        {
                                            key: "VNPAY",
                                            label: "VNPAY",
                                            img: "https://khoahocsinhvien.com/wp-content/uploads/2021/11/Logo-VNPAY-QR.png",
                                            bg: "bg-white",
                                        },
                                        {
                                            key: "Viettel",
                                            label: "Viettel Money",
                                            img: "https://media.loveitopcdn.com/3807/logo-viettel-money-compressed.jpg",
                                            bg: "bg-white",
                                        },
                                        {
                                            key: "MoMo",
                                            label: "MoMo",
                                            img: "https://chieuphimquocgia.com.vn/_next/image?url=%2Fimages%2Fmomo3.png&w=128&q=75",
                                            bg: "bg-white",
                                        },
                                    ] as const
                                ).map((m) => (
                                    <label
                                        key={m.key}
                                        className={`flex items-center w-full rounded-lg border px-4 py-2 text-sm cursor-pointer transition ${
                                            selectedMethod === m.key ? "border-[#E50914]" : "border-[#2b2e35]"
                                        }`}
                                    >
                                        <input
                                            type="radio"
                                            name="payment-method"
                                            checked={selectedMethod === m.key}
                                            onChange={() => setSelectedMethod(m.key)}
                                            className="mr-3 w-5 h-5 accent-[#E50914] cursor-pointer"
                                        />
                                        <img src={m.img} alt={m.label} className={`w-8 h-8 object-contain rounded ${m.bg}`} />
                                        <span className="ml-2 font-bold">{m.label}</span>
                                    </label>
                                ))}
                            </div>

                            <div className="mt-1 mb-4">
                                <h3 className="text-sm font-semibold mb-2">Chi phí</h3>
                                <div className="space-y-1 text-sm">
                                    <div className="flex justify-between">
                                        <span>Thanh toán</span>
                                        <span>{formatCurrency(total || 0)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Phí</span>
                                        <span>0đ</span>
                                    </div>
                                    <div className="flex justify-between font-semibold">
                                        <span>Tổng cộng</span>
                                        <span>{formatCurrency(total || 0)}</span>
                                    </div>
                                </div>
                            </div>

                            <label className="flex gap-3 items-start text-sm text-gray-200 mb-5">
                                <input
                                    type="checkbox"
                                    checked={confirmed}
                                    onChange={(e) => setConfirmed(e.target.checked)}
                                    className="mt-1 w-4 h-4 accent-[#E50914]"
                                />
                                <span>
                  Tôi xác nhận các thông tin đã chính xác và đồng ý với các{" "}
                                    <Link to="/" className="text-[#3c85eb] underline">
                    điều khoản & chính sách
                  </Link>
                </span>
                            </label>

                            <button
                                type="button"
                                onClick={handlePayment}
                                disabled={!canPay || emailSent}
                                className={`w-full py-2.5 mb-3 rounded-full font-semibold transition ${
                                    canPay && !emailSent
                                        ? "text-white bg-linear-to-r from-[#EC2931] to-[#F85557] hover:opacity-90 cursor-pointer"
                                        : "bg-linear-to-r from-[#821C24] to-[#89383C] text-gray-400 cursor-not-allowed"
                                }`}
                            >
                                {loading ? "Đang xử lý..." : "Thanh toán"}
                            </button>

                            <button
                                type="button"
                                onClick={() => navigate(-1)}
                                className="w-full py-2.5 mb-3 rounded-full text-sm font-medium bg-transparent border border-[#555] text-gray-200 hover:bg-[#2a2f37] transition cursor-pointer"
                            >
                                Quay lại
                            </button>

                            <p className="mt-1 text-[11px] leading-relaxed text-[#f39c12]">
                                <span className="font-semibold">Lưu ý:</span> Không mua vé cho trẻ em dưới 13 tuổi đối với các suất chiếu
                                phim kết thúc sau 22h00 và không mua vé cho trẻ em dưới 16 tuổi đối với các suất chiếu phim kết thúc sau
                                23h00.
                            </p>

                            {/* Hiển thị mã đặt vé nếu thành công */}
                            {emailSent && bookingCode && (
                                <div className="mt-4 p-4 bg-green-900/20 border border-green-700/40 rounded-lg">
                                    <p className="mt-1 text-green-200">
                                        Mã đặt vé: <span className="font-bold">{bookingCode}</span>
                                    </p>
                                    <p className="mt-1 text-xs text-green-200">
                                        Vui lòng kiểm tra email <span className="font-medium">{email}</span> để xem vé
                                    </p>
                                </div>
                            )}
                        </aside>
                    </div>
                </div>
            </main>

            <Footer />

            {openLogin && <LoginModal onClose={() => setOpenLogin(false)} />}

            <Modal
                open={openSuccess}
                onCancel={() => setOpenSuccess(false)}
                onOk={handleConfirmPopup}
                okText="Xác nhận"
                cancelText="Đóng"
                centered
                title={<span className="text-white text-base font-semibold">Xác nhận thanh toán</span>}
                styles={{
                    content: { background: "#1f232b", border: "1px solid #2f333c" },
                    header: { background: "#1f232b", borderBottom: "1px solid #2f333c", paddingBottom: "12px" },
                    body: { background: "#1f232b" },
                    footer: { background: "#1f232b", borderTop: "1px solid #2f333c", paddingTop: "16px" },
                }}
                okButtonProps={{
                    className:
                        "!py-4 !px-6 !bg-[#C10007] hover:!bg-[#a00006] !border-[#C10007] !text-white font-semibold rounded-md",
                }}
                cancelButtonProps={{
                    className:
                        "!py-4 !px-6 !bg-transparent !text-gray-300 hover:!text-white !border-[#2f333c] rounded-md",
                }}
                closeIcon={<span className="text-gray-300 hover:text-white text-lg leading-none">×</span>}
            >
                <div className="space-y-3 text-gray-200 text-sm">
                    <p>
                        Họ tên: <b>{name || "-"}</b>
                    </p>
                    <p>
                        Email: <b>{email || "-"}</b>
                    </p>
                    <p>
                        Số điện thoại: <b>{phone || "-"}</b>
                    </p>
                    <p>
                        Phương thức: <b>{selectedMethod}</b>
                    </p>
                    <p>
                        Mã đặt vé: <b>{bookingCode}</b>
                    </p>

                    <div className="flex justify-center pt-2">
                        <div className="bg-white p-2 rounded">
                            <QRCodeSVG
                                value={JSON.stringify({
                                    bookingCode,
                                    customerEmail: email.trim(),
                                    customerName: name.trim(),
                                    phoneNumber: phone.trim(),
                                    movieTitle,
                                    date,
                                    time,
                                    seats,
                                    total,
                                    paymentMethod: selectedMethod,
                                })}
                                size={160}
                            />
                        </div>
                    </div>

                    <p className="text-xs text-gray-400 text-center">Nhấn xác nhận để hoàn tất.</p>
                </div>
            </Modal>
        </div>
    );
};

export default Payment;

    