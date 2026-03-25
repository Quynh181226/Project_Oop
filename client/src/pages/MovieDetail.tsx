// // import Header from "../components/Header.tsx";
// // import {Footer} from "../components/Footer.tsx";
// //
// // export const MovieDetail = () => {
// //     return (
// //         <>
// //             <Header/>
// //
// //
// //             <Footer/>
// //         </>
// //     )
// // }
// // pages/MovieDetail.tsx
// import { useState, useEffect } from "react";
// import { useParams, Link } from "react-router-dom";
// // import { UploadOutlined } from "@ant-design/icons";
// import { message } from "antd";
//
// const fakeMovies = [
//     {
//         id: 1,
//         title: "Oppenheimer",
//         country: "Mỹ",
//         director: "Christopher Nolan",
//         actors: "Cillian Murphy, Emily Blunt, Robert Downey Jr.",
//         genres: ["Tiểu sử", "Lịch sử", "Chính kịch"],
//         duration: 180,
//         rated: "C16",
//         releaseDate: "2023-07-21",
//         description: "Câu chuyện về nhà vật lý J. Robert Oppenheimer và vai trò của ông trong việc phát triển bom nguyên tử trong Thế chiến II.",
//         trailer: "https://www.youtube.com/embed/uYPbbksJxIg",
//         poster: "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
//         status: "showing",
//         showDates: ["2025-12-17", "2025-12-18", "2025-12-19", "2025-12-20", "2025-12-21", "2025-12-22", "2025-12-23"],
//         timeSlots: ["09:00", "11:30", "14:00", "16:30", "19:00", "21:30"]
//     },
//     {
//         id: 2,
//         title: "Deadpool & Wolverine",
//         country: "Mỹ",
//         director: "Shawn Levy",
//         actors: "Ryan Reynolds, Hugh Jackman",
//         genres: ["Hành động", "Hài hước", "Siêu anh hùng"],
//         duration: 128,
//         rated: "C18",
//         releaseDate: "2024-07-26",
//         description: "Wade Wilson và Wolverine hợp sức chống lại mối đe dọa chung.",
//         trailer: "https://www.youtube.com/embed/73_1biulkYk",
//         poster: "https://image.tmdb.org/t/p/w500/8cdWjvZQUExUUTzyp4t6EDMUB1k.jpg",
//         status: "showing",
//         showDates: ["2025-12-17", "2025-12-18", "2025-12-19", "2025-12-20"],
//         timeSlots: ["10:00", "13:00", "15:30", "18:00", "20:30", "22:00"]
//     }
// ];
//
// // Lưu vào localStorage để test
// localStorage.setItem("movies", JSON.stringify(fakeMovies));
// console.log("Đã thêm 2 phim giả để test!");
//
// const ticketPrices = {
//     weekday: {
//         Standard: { early: 55000, noon: 70000, evening: 80000, late: 65000 },
//         VIP: { early: 65000, noon: 75000, evening: 85000, late: 70000 },
//         Sweetbox: { early: 140000, noon: 160000, evening: 180000, late: 150000 },
//     },
//     weekend: {
//         Standard: { early: 70000, noon: 80000, evening: 90000, late: 75000 },
//         VIP: { early: 80000, noon: 85000, evening: 95000, late: 80000 },
//         Sweetbox: { early: 170000, noon: 180000, evening: 200000, late: 170000 },
//     },
// };
//
// const doubleSeatPairs = [
//     ["K1", "K2"], ["K3", "K4"], ["K5", "K6"], ["K7", "K8"],
//     ["K9", "K10"], ["K11", "K12"], ["K13", "K14"],
// ];
//
// const MovieDetail = () => {
//     const { id } = useParams<{ id: string }>();
//     const [movie, setMovie] = useState<any>(null);
//     const [selectedDate, setSelectedDate] = useState<string>("");
//     const [selectedTime, setSelectedTime] = useState<string>("");
//     const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
//     const [showSeatSelection, setShowSeatSelection] = useState(false);
//     const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//
//     useEffect(() => {
//         // Giả lập lấy phim từ localStorage hoặc API
//         const movies = JSON.parse(localStorage.getItem("movies") || "[]");
//         const found = movies.find((m: any) => m.id === Number(id));
//         if (found) {
//             setMovie(found);
//             if (found.showDates?.length > 0) {
//                 setSelectedDate(found.showDates[0]);
//             }
//         }
//     }, [id]);
//
//     if (!movie) return <div className="text-center py-20 text-white">Đang tải...</div>;
//
//     const getPrice = (type: string, time: string) => {
//         const isWeekend = [0, 5, 6].includes(new Date(selectedDate).getDay());
//         const priceTable = isWeekend ? ticketPrices.weekend : ticketPrices.weekday;
//         const timeSlot = time < "12:00" ? "early" : time < "19:00" ? "noon" : time < "22:00" ? "evening" : "late";
//         return priceTable[type as keyof typeof priceTable][timeSlot] || 0;
//     };
//
//     const calculateTotal = () => {
//         let total = 0;
//         const countedPairs = new Set<string>();
//         selectedSeats.forEach((seatId) => {
//             const seatEl = document.querySelector(`[data-id="${seatId}"]`) as HTMLElement;
//             const seatType = seatEl?.classList.contains("vip") ? "VIP" : seatEl?.classList.contains("double") ? "Sweetbox" : "Standard";
//
//             if (seatType === "Sweetbox") {
//                 const pair = doubleSeatPairs.find(p => p.includes(seatId));
//                 if (pair && !countedPairs.has(pair.join("-"))) {
//                     total += getPrice("Sweetbox", selectedTime);
//                     countedPairs.add(pair.join("-"));
//                 }
//             } else {
//                 total += getPrice(seatType, selectedTime);
//             }
//         });
//         return total;
//     };
//
//     const toggleSeat = (seatId: string) => {
//         const seatEl = document.querySelector(`[data-id="${seatId}"]`) as HTMLElement;
//         if (!seatEl || seatEl.classList.contains("booked")) return;
//
//         let seatsToToggle = [seatId];
//         if (seatEl.classList.contains("double")) {
//             const pair = doubleSeatPairs.find(p => p.includes(seatId));
//             if (pair) seatsToToggle = pair;
//         }
//
//         const allSelected = seatsToToggle.every(s => selectedSeats.includes(s));
//         if (allSelected) {
//             setSelectedSeats(prev => prev.filter(s => !seatsToToggle.includes(s)));
//         } else {
//             setSelectedSeats(prev => [...prev, ...seatsToToggle.filter(s => !prev.includes(s))]);
//         }
//     };
//
//     const selectTime = (time: string) => {
//         setSelectedTime(time);
//         setShowSeatSelection(true);
//     };
//
//     const backToTime = () => {
//         setShowSeatSelection(false);
//         setSelectedSeats([]);
//     };
//
//     return (
//         <div className="min-h-screen bg-[#17191f] text-white">
//             {/* NAVBAR */}
//             <nav className="fixed top-0 w-full bg-black/50 backdrop-blur-md z-50 h-16">
//                 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-full">
//                     <div className="flex items-center gap-4">
//                         <img src="/assets/images/image.png" alt="Logo" className="h-10" />
//                         <div className="hidden md:block">
//                             <p className="text-sm font-medium">TRUNG TÂM CHIẾU PHIM QUỐC GIA</p>
//                             <p className="text-xs opacity-70">National Cinema Center</p>
//                         </div>
//                     </div>
//
//                     {/* Desktop Menu */}
//                     <ul className="hidden lg:flex items-center gap-8">
//                         <li><Link to="/" className="hover:text-red-500 transition">Trang chủ</Link></li>
//                         <li><Link to="/calendar" className="hover:text-red-500 transition">Lịch chiếu</Link></li>
//                         <li><Link to="/news" className="hover:text-red-500 transition">Tin tức</Link></li>
//                         <li><Link to="/promotion" className="hover:text-red-500 transition">Khuyến mãi</Link></li>
//                         <li><Link to="/ticket-price" className="hover:text-red-500 transition">Giá vé</Link></li>
//                         <li><Link to="/festival" className="hover:text-red-500 transition">Liên hoan phim</Link></li>
//                     </ul>
//
//                     <div className="hidden lg:flex items-center gap-4">
//                         <button className="px-4 py-2 border border-white rounded-full hover:bg-white hover:text-black transition">Đăng ký</button>
//                         <button className="px-4 py-2 bg-red-600 rounded-full hover:bg-red-700 transition">Đăng nhập</button>
//                     </div>
//
//                     {/* Mobile Hamburger */}
//                     <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden">
//                         <div className={`w-8 h-6 flex flex-col justify-between ${mobileMenuOpen ? "toggle" : ""}`}>
//                             <span className="w-full h-0.5 bg-white transition"></span>
//                             <span className="w-full h-0.5 bg-white transition"></span>
//                             <span className="w-full h-0.5 bg-white transition"></span>
//                         </div>
//                     </button>
//                 </div>
//
//                 {/* Mobile Menu */}
//                 {mobileMenuOpen && (
//                     <div className="lg:hidden absolute top-16 left-0 w-full bg-black/90 backdrop-blur-md">
//                         <ul className="flex flex-col py-4">
//                             <li className="px-6 py-3 hover:bg-red-600"><Link to="/">Trang chủ</Link></li>
//                             <li className="px-6 py-3 hover:bg-red-600"><Link to="/calendar">Lịch chiếu</Link></li>
//                             <li className="px-6 py-3 hover:bg-red-600"><Link to="/news">Tin tức</Link></li>
//                             <li className="px-6 py-3 hover:bg-red-600"><Link to="/promotion">Khuyến mãi</Link></li>
//                             <li className="px-6 py-3 hover:bg-red-600"><Link to="/ticket-price">Giá vé</Link></li>
//                             <li className="px-6 py-3 hover:bg-red-600"><Link to="/festival">Liên hoan phim</Link></li>
//                             <li className="px-6 py-3 border-t border-gray-700 mt-4 pt-4 flex flex-col gap-3">
//                                 <button className="px-4 py-2 border border-white rounded-full">Đăng ký</button>
//                                 <button className="px-4 py-2 bg-red-600 rounded-full">Đăng nhập</button>
//                             </li>
//                         </ul>
//                     </div>
//                 )}
//             </nav>
//
//             {/* HERO SECTION */}
//             <section className="relative h-screen mt-16 overflow-hidden">
//                 <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${movie.backdrop || movie.poster})`, filter: "blur(8px) brightness(0.4)" }}></div>
//                 <div className="absolute inset-0 bg-black/50"></div>
//                 <div className="relative z-10 max-w-6xl mx-auto px-6 h-full flex items-center gap-12">
//                     <img src={movie.poster} alt={movie.title} className="w-80 rounded-xl shadow-2xl" />
//                     <div>
//                         <h1 className="text-5xl font-bold mb-4">{movie.title}</h1>
//                         <div className="flex items-center gap-4 mb-6">
//                             <span className="px-3 py-1 border border-white rounded">{movie.rated || "2D"}</span>
//                             <span>{movie.duration} phút</span>
//                             <span>{movie.country}</span>
//                         </div>
//                         <p className="text-lg mb-6 max-w-3xl">{movie.description}</p>
//                         <div className="flex gap-6">
//                             <button className="px-6 py-3 border border-yellow-500 text-yellow-500 rounded-full hover:bg-yellow-500 hover:text-black transition">
//                                 Xem Trailer
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </section>
//
//             {/* SHOWTIME SECTION */}
//             <section className="bg-[#1e2026] py-12 text-center">
//                 <h2 className="text-3xl font-bold mb-8">Chọn suất chiếu</h2>
//                 <div className="flex justify-center gap-4 flex-wrap mb-8">
//                     {movie.showDates?.map((date: string) => (
//                         <button
//                             key={date}
//                             onClick={() => setSelectedDate(date)}
//                             className={`px-6 py-4 rounded-3xl transition ${selectedDate === date ? "bg-red-600" : "bg-[#2e3138] hover:bg-red-600/70"}`}
//                         >
//                             <div className="text-sm opacity-70">Tháng {date.split("-")[1]}</div>
//                             <div className="text-3xl font-bold">{date.split("-")[2]}</div>
//                             <div className="text-sm opacity-70">{new Date(date).toLocaleDateString("vi-VN", { weekday: "long" })}</div>
//                         </button>
//                     ))}
//                 </div>
//
//                 <div className="flex justify-center gap-4 flex-wrap mb-6">
//                     {movie.timeSlots?.map((time: string) => (
//                         <button
//                             key={time}
//                             onClick={() => selectTime(time)}
//                             className="px-8 py-4 border border-white rounded-full hover:bg-white hover:text-black transition"
//                         >
//                             {time}
//                         </button>
//                     ))}
//                 </div>
//
//                 <p className="text-red-500 text-sm">
//                     Lưu ý: Khán giả dưới 13 tuổi chỉ chọn suất chiếu trước 22h, dưới 16 tuổi trước 23h
//                 </p>
//             </section>
//
//             {/* SEAT SELECTION */}
//             {showSeatSelection && (
//                 <section className="py-12">
//                     <div className="max-w-4xl mx-auto">
//                         <button onClick={backToTime} className="mb-6 text-blue-400 hover:underline">&larr; Quay lại chọn suất</button>
//                         <div className="bg-gradient-to-b from-yellow-500 to-yellow-600 h-16 rounded-b-full shadow-2xl mb-8"></div>
//                         <h2 className="text-2xl text-center mb-8">Chọn ghế - Phòng chiếu số 2</h2>
//
//                         <div className="grid grid-cols-14 gap-2 max-w-3xl mx-auto mb-12">
//                             {Array.from({ length: 14 }, (_, i) => String.fromCharCode(65 + Math.floor(i / 14))).map(row => (
//                                 Array.from({ length: 14 }, (_, i) => `${row}${i + 1}`).map(seatId => {
//                                     const isVIP = ["D", "E", "F", "G", "H", "I", "J"].includes(row);
//                                     const isDouble = row === "K";
//                                     const isBooked = Math.random() < 0.3; // Giả lập ghế đã đặt
//                                     return (
//                                         <div
//                                             key={seatId}
//                                             data-id={seatId}
//                                             onClick={() => toggleSeat(seatId)}
//                                             className={`w-10 h-10 rounded flex items-center justify-center text-sm cursor-pointer transition
//                         ${isBooked ? "bg-gray-600 text-gray-400 cursor-not-allowed" : ""}
//                         ${isVIP ? "bg-orange-600" : isDouble ? "bg-red-600" : "bg-gray-700"}
//                         ${selectedSeats.includes(seatId) ? "bg-green-500" : ""}
//                         hover:scale-110
//                       `}
//                                         >
//                                             {isBooked ? "X" : seatId}
//                                         </div>
//                                     );
//                                 })
//                             ))}
//                         </div>
//
//                         <div className="flex justify-center gap-8 mb-12">
//                             <div className="flex items-center gap-3">
//                                 <div className="w-6 h-6 bg-gray-600 rounded"></div>
//                                 <span>Đã đặt</span>
//                             </div>
//                             <div className="flex items-center gap-3">
//                                 <div className="w-6 h-6 bg-gray-700 rounded"></div>
//                                 <span>Ghế thường</span>
//                             </div>
//                             <div className="flex items-center gap-3">
//                                 <div className="w-6 h-6 bg-orange-600 rounded"></div>
//                                 <span>Ghế VIP</span>
//                             </div>
//                             <div className="flex items-center gap-3">
//                                 <div className="w-6 h-6 bg-red-600 rounded"></div>
//                                 <span>Ghế đôi</span>
//                             </div>
//                             <div className="flex items-center gap-3">
//                                 <div className="w-6 h-6 bg-green-500 rounded"></div>
//                                 <span>Đang chọn</span>
//                             </div>
//                         </div>
//
//                         <div className="max-w-3xl mx-auto bg-gray-800 rounded-xl p-6 flex justify-between items-center">
//                             <div>
//                                 <p>Suất: <strong>{selectedTime}</strong> - Ngày: <strong>{selectedDate}</strong></p>
//                                 <p>Ghế đã chọn: <strong>{selectedSeats.length}</strong></p>
//                                 <p className="text-2xl font-bold mt-2">{calculateTotal().toLocaleString()}đ</p>
//                             </div>
//                             <div className="flex gap-4">
//                                 <button onClick={backToTime} className="px-8 py-3 border border-white rounded-full hover:bg-white hover:text-black transition">
//                                     Quay lại
//                                 </button>
//                                 <button
//                                     onClick={() => message.success("Chuyển sang thanh toán!")}
//                                     disabled={selectedSeats.length === 0}
//                                     className="px-8 py-3 bg-red-600 rounded-full hover:bg-red-700 transition disabled:opacity-50"
//                                 >
//                                     Thanh toán
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 </section>
//             )}
//
//             {/* FOOTER */}
//             <footer className="bg-[#0b0d13] py-12 text-center">
//                 <ul className="flex justify-center gap-8 flex-wrap mb-8">
//                     <li><Link to="#" className="hover:text-white">Chính sách</Link></li>
//                     <li><Link to="/calendar" className="hover:text-white">Lịch chiếu</Link></li>
//                     <li><Link to="/news" className="hover:text-white">Tin tức</Link></li>
//                     <li><Link to="/ticket-price" className="hover:text-white">Giá vé</Link></li>
//                     <li><Link to="/faq" className="hover:text-white">Hỏi đáp</Link></li>
//                     <li><Link to="/contact" className="hover:text-white">Liên hệ</Link></li>
//                 </ul>
//                 <div className="flex justify-center gap-8 mb-8">
//                     <img src="/assets/images/Facebook.png" alt="Facebook" className="h-8" />
//                     <img src="/assets/images/Zalo.png" alt="Zalo" className="h-8" />
//                     <img src="/assets/images/Youtube.png" alt="YouTube" className="h-8" />
//                     <img src="/assets/images/GG Play.png" alt="Google Play" className="h-8" />
//                     <img src="/assets/images/App store.png" alt="App Store" className="h-8" />
//                 </div>
//                 <div className="text-gray-500 text-sm">
//                     <p>Cơ quan chủ quản: BỘ VĂN HÓA, THỂ THAO VÀ DU LỊCH</p>
//                     <p>Bản quyền thuộc Trung tâm Chiếu phim Quốc gia.</p>
//                     <p>Giấy phép số: 224/GP-TTĐT ngày 31/8/2010</p>
//                     <p>Địa chỉ: 87 Láng Hạ, Quận Ba Đình, Tp. Hà Nội - Điện thoại: 024.35141791</p>
//                     <p>© 2025 By NCC - All rights reserved.</p>
//                 </div>
//             </footer>
//         </div>
//     );
// };
//
// export default MovieDetail;