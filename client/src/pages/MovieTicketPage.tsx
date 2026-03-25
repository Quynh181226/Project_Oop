
//Ở ĐÂY NÈ


// import { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { useAppSelector, useAppDispatch } from "../hooks/Hook";
// import { getAllMovies } from "../apis/MovieApi";
// import Header from "../components/Header.tsx";
// import { Footer } from "./Footer.tsx";
// import LoadingProcess from "../components/LoadingProcess.tsx";
// import LoadingSeats from "../components/LoadingSeats.tsx";
// import MovieDetailsModal from "../components/MovieDetailsModal.tsx";
// import type { Movie } from "../types/type";
// import SeatSelection from "./SeatSelection.tsx";
//
// const MovieTicketBooking = () => {
//     const { movieId } = useParams<{ movieId: string }>();
//     const dispatch = useAppDispatch();
//     const { movies, loading: moviesLoading } = useAppSelector((state) => state.movies);
//
//     const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
//     const [selectedDate, setSelectedDate] = useState<string>("");
//     const [selectedTime, setSelectedTime] = useState<string>("");
//     const [isSelectingSeats, setIsSelectingSeats] = useState(false);
//     const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
//     const [loadingSeats, setLoadingSeats] = useState(false);
//     const [showDetailsModal, setShowDetailsModal] = useState(false);
//     const [countdown, setCountdown] = useState(600);
//
//     useEffect(() => {
//         if (movies.length === 0) {
//             dispatch(getAllMovies());
//         }
//     }, [dispatch, movies.length]);
//
//     useEffect(() => {
//         if (movieId && movies.length > 0) {
//             const movie = movies.find((m) => m.id === Number(movieId));
//             if (movie) {
//                 setSelectedMovie(movie);
//                 if (movie.showDates.length > 0) {
//                     setSelectedDate(movie.showDates[0]);
//                 }
//             } else {
//                 setSelectedMovie(null);
//             }
//         }
//     }, [movieId, movies]);
//
//     useEffect(() => {
//         const savedSeats = localStorage.getItem('selectedSeats');
//         if (savedSeats) {
//             setSelectedSeats(JSON.parse(savedSeats));
//         }
//     }, []);
//
//     const handleTimeSelect = (time: string) => {
//         setSelectedTime(time);
//         setLoadingSeats(true);
//
//         setTimeout(() => {
//             setLoadingSeats(false);
//             setIsSelectingSeats(true);
//             setCountdown(600);
//             setSelectedSeats([]);
//         }, 2500);
//     };
//
//     const handleBackToShowtimes = () => {
//         setIsSelectingSeats(false);
//         setSelectedTime("");
//         setSelectedSeats([]);
//         setCountdown(600);
//     };
//
//     const toggleSeat = (seatId: string) => {
//         const reservedSeats = ["D5", "D6", "E7", "K3", "K4", "K5", "K10", "K11"];
//         if (reservedSeats.includes(seatId)) return;
//
//         const newSelectedSeats = selectedSeats.includes(seatId)
//             ? selectedSeats.filter(id => id !== seatId)
//             : [...selectedSeats, seatId];
//
//         setSelectedSeats(newSelectedSeats);
//         localStorage.setItem('selectedSeats', JSON.stringify(newSelectedSeats));
//     };
//
//     const getTicketPrice = (seatType: 'Standard' | 'VIP' | 'Sweetbox', time: string): number => {
//         if (!time) return 0;
//         const day = new Date(selectedDate).getDay();
//         const dayType = day >= 5 || day === 0 ? 'Friday, Saturday, Sunday & public holiday' : 'Monday to Thursday';
//         const hour = parseInt(time.split(":")[0]);
//         const timeSlot = hour < 12 ? 'Before 12PM' : hour < 19 ? '12PM to 7PM' : hour < 22 ? '7PM to 10PM' : 'After 10PM';
//
//         const ticketPrices = {
//             'Monday to Thursday': {
//                 'Standard': { 'Before 12PM': 55000, '12PM to 7PM': 70000, '7PM to 10PM': 80000, 'After 10PM': 65000 },
//                 'VIP': { 'Before 12PM': 65000, '12PM to 7PM': 75000, '7PM to 10PM': 85000, 'After 10PM': 70000 },
//                 'Sweetbox': { 'Before 12PM': 140000, '12PM to 7PM': 160000, '7PM to 10PM': 180000, 'After 10PM': 150000 }
//             },
//             'Friday, Saturday, Sunday & public holiday': {
//                 'Standard': { 'Before 12PM': 70000, '12PM to 7PM': 80000, '7PM to 10PM': 90000, 'After 10PM': 75000 },
//                 'VIP': { 'Before 12PM': 80000, '12PM to 7PM': 85000, '7PM to 10PM': 95000, 'After 10PM': 80000 },
//                 'Sweetbox': { 'Before 12PM': 170000, '12PM to 7PM': 180000, '7PM to 10PM': 200000, 'After 10PM': 170000 }
//             }
//         };
//
//         return ticketPrices[dayType][seatType][timeSlot] || 0;
//     };
//
//     const calculateTotalPrice = () => {
//         return selectedSeats.reduce((total, seatId) => {
//             const row = seatId[0];
//             const num = parseInt(seatId.slice(1));
//             let seatType: 'Standard' | 'VIP' | 'Sweetbox' = 'Standard';
//             if (row === 'K') seatType = 'Sweetbox';
//             else if (['D','E','F','G','H','I','J'].includes(row) && num >= 3 && num <= 12) seatType = 'VIP';
//             return total + getTicketPrice(seatType, selectedTime);
//         }, 0);
//     };
//
//     const totalPrice = calculateTotalPrice();
//
//     const handlePayment = () => {
//         if (selectedSeats.length === 0) {
//             alert("Vui lòng chọn ít nhất 1 ghế!");
//             return;
//         }
//
//         const paymentData = {
//             movieId: selectedMovie?.id,
//             movieTitle: selectedMovie?.title,
//             date: selectedDate,
//             time: selectedTime,
//             seats: selectedSeats,
//             total: totalPrice,
//             poster: selectedMovie?.poster,
//         };
//
//         localStorage.setItem("paymentData", JSON.stringify(paymentData));
//         localStorage.removeItem('selectedSeats');
//         window.location.href = "/payment";
//     };
//
//     useEffect(() => {
//         if (isSelectingSeats && countdown > 0) {
//             const timer = setInterval(() => {
//                 setCountdown(prev => {
//                     if (prev <= 1) {
//                         clearInterval(timer);
//                         handleBackToShowtimes();
//                         return 0;
//                     }
//                     return prev - 1;
//                 });
//             }, 1000);
//
//             return () => clearInterval(timer);
//         }
//     }, [isSelectingSeats, countdown]);
//
//     if (moviesLoading) return <LoadingProcess />;
//     if (!selectedMovie) return <div className="min-h-screen bg-[#17191f] flex items-center justify-center text-white text-2xl">Không tìm thấy phim</div>;
//
//     return (
//         <div className="bg-[#17191f] text-white min-h-screen">
//             <Header />
//
//             {/* Hero Section */}
//             <section className="relative bg-black pt-4 ">
//
//                 {/* Background layer */}
//                 <div className="relative h-[240px] sm:h-[300px] md:h-[380px] lg:h-[440px] overflow-hidden">
//                     <div
//                         className="absolute inset-0 bg-center bg-cover"
//                         style={{
//                             backgroundImage: `url(${selectedMovie.poster})`,
//                             filter: "blur(3px) brightness(0.45)",
//                             transform: "scale(1.12)",
//                         }}
//                     />
//                     <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/50 to-black" />
//                 </div>
//
//                 {/*<section className="relative pt-4 pb-8 md:pt-6 md:pb-12">*/}
//                 {/* Background */}
//                 {/*<div*/}
//                 {/*    className="absolute inset-0 bg-cover bg-center bg-no-repeat"*/}
//                 {/*    style={{*/}
//                 {/*        backgroundImage: `url(${selectedMovie.poster})`,*/}
//                 {/*        filter: 'blur(3px) brightness(0.4)',*/}
//                 {/*        transform: 'scale(1.1)'*/}
//                 {/*    }}*/}
//                 {/*/>*/}
//                 {/*<div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black" />*/}
//                 {/* Content layer */}
//                 {/*<div className="relative z-10 -mt-32 sm:-mt-40 md:-mt-44">*/}
//                 {/*    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6">*/}
//
//
//                 {/*/!*<div className="relative z-10 max-w-7xl mx-auto px-4 mt-18 sm:px-6 lg:px-8">*!/*/}
//                 {/*/!*    <div className="flex flex-col lg:flex-row gap-6 md:gap-10">*!/*/}
//                 {/*        /!* Poster *!/*/}
//                 {/*        <div className="lg:w-1/4 md:w-1/3 w-full max-w-xs mx-auto lg:mx-0">*/}
//                 {/*            <img*/}
//                 {/*                src={selectedMovie.poster}*/}
//                 {/*                alt={selectedMovie.title}*/}
//                 {/*                className="w-full h-auto rounded-lg shadow-2xl"*/}
//                 {/*            />*/}
//                 {/*        </div>*/}
//
//                 {/*        /!* Movie Info *!/*/}
//                 {/*        <div className="lg:w-3/4 md:w-2/3">*/}
//                 <div className="relative z-10 -mt-32 sm:-mt-40 md:-mt-44">
//                     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6">
//                         <div className="flex flex-col lg:flex-row gap-6 md:gap-10">
//                             <div className="lg:w-1/4 md:w-1/3 w-full max-w-xs mx-auto lg:mx-0 flex-shrink-0">
//                                 <img
//                                     src={selectedMovie.poster}
//                                     alt={selectedMovie.title}
//                                     className="w-full h-auto rounded-lg shadow-2xl"
//                                 />
//                             </div>
//                             <div className="lg:w-3/4 md:w-2/3 w-full">
//                 {/* Title and Format */}
//                             <div className="flex flex-col md:flex-row md:items-center gap-3 mb-4">
//                                 <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">
//                                     {selectedMovie.title}
//                                 </h1>
//                                 <div className="flex flex-wrap gap-2">
//                                     <span className="border border-white px-3 py-1 rounded text-sm">
//                                         {selectedMovie.rated}
//                                     </span>
//                                 </div>
//                             </div>
//
//                             {/* Movie details in format: Hài - 113 phút - Hàn Quốc */}
//                             <div className="mb-4">
//                                 <p className="text-gray-300 text-base md:text-lg">
//                                     {selectedMovie.genres.join(", ")} - {selectedMovie.duration} phút - {selectedMovie.country}
//                                 </p>
//                             </div>
//
//                             {/* Director and Actors */}
//                             <div className="space-y-2 mb-6">
//                                 <div>
//                                     <span className="text-gray-400 text-sm md:text-base">Đạo diễn: </span>
//                                     <span className="text-white">{selectedMovie.director}</span>
//                                 </div>
//                                 <div>
//                                     <span className="text-gray-400 text-sm md:text-base">Diễn viên: </span>
//                                     <span className="text-white">{selectedMovie.actors}</span>
//                                 </div>
//                                 <div>
//                                     <span className="text-gray-400 text-sm md:text-base">Khởi chiếu: </span>
//                                     <span className="text-white">{selectedMovie.releaseDate || "Chưa xác định"}</span>
//                                 </div>
//                             </div>
//
//                             {/* Short Description */}
//                             <div className="mb-6">
//                                 <p className="text-gray-300 text-sm md:text-base leading-relaxed line-clamp-3">
//                                     {selectedMovie.description || "Chưa có mô tả phim."}
//                                 </p>
//                             </div>
//
//                             {/* Rating */}
//                             {/*<div className="mb-6 p-4 bg-red-900/20 border-l-4 border-red-500 rounded-r">*/}
//                                 <div className="flex items-center gap-3">
//                                     {/*<svg className="w-5 h-5 text-red-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">*/}
//                                     {/*    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />*/}
//                                     {/*</svg>*/}
//                                     <span className="text-red-400 font-bold text-sm md:text-base">
//                                         KIỂM DUYỆT: {selectedMovie.rated || "MAX"} – PHIM ĐƯỢC PHỔ BIẾN ĐẾN NGƯỜI XEM TỪ ĐỦ 13 TUỔI TRỞ LÊN (13+)
//                                     </span>
//                                 </div>
//                             {/*</div>*/}
//
//                             {/* Action Buttons */}
//                             <div className="flex mt-6 gap-3">
//                                 <button
//                                     onClick={() => setShowDetailsModal(true)}
//                                     className="cursor-pointer underline inline-flex items-center gap-2  transition-colors text-sm md:text-base"
//                                 >
//                                     {/*<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">*/}
//                                     {/*    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />*/}
//                                     {/*</svg>*/}
//                                     Chi tiết nội dung
//                                 </button>
//
//                                 {selectedMovie.trailer && (
//                                     <a
//                                         href={selectedMovie.trailer}
//                                         target="_blank"
//                                         className="inline-flex items-center gap-2 border border-yellow-100 text-yellow-100 hover:bg-yellow-400 hover:text-black px-4 py-2 rounded-3xl transition-colors duration-300 font-medium"
//                                     >
//                                         <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
//                                             <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
//                                         </svg>
//                                         Xem Trailer
//                                     </a>
//                                     // <a
//                                     //     href={selectedMovie.trailer}
//                                     //     target="_blank"
//                                     //     rel="noopener noreferrer"
//                                     //     className="hidden lg:inline-flex items-center gap-2 border border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black px-4 py-2 rounded-lg transition-colors duration-300 font-medium"
//                                     // >
//                                     //     <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
//                                     //         <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
//                                     //     </svg>
//                                     //     Xem Trailer
//                                     // </a>
//                                 )}
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </section>
//             {/*<div className="mt-15 bg-[#1e2026] mb-10 w-full">*/}
//                 <div className="flex justify-center bg-[#1e2026] w-full mt-15 mb-10">
//                     {selectedMovie.showDates.map((date) => (
//                         <button
//                             key={date}
//                             onClick={() => setSelectedDate(date)}
//                             className={`cursor-pointer flex-shrink-0 w-20 md:w-24 p-3 transition-all duration-300 ${
//                                 selectedDate === date
//                                     ? "bg-gradient-to-br from-red-600 to-red-700 transform shadow-lg"
//                                     : "bg-[#2a2d36] hover:bg-[#3a3d46]"
//                             }`}
//                         >
//                             <div className="text-xs md:text-sm text-gray-400 font-medium">
//                                 Tháng {new Date(date).getMonth() + 1}
//                             </div>
//                             <div className="text-2xl md:text-3xl font-bold text-white my-1">
//                                 {new Date(date).getDate()}
//                             </div>
//                             <div className="text-xs md:text-sm text-gray-300 capitalize">
//                                 {new Date(date).toLocaleDateString("vi-VN", { weekday: "short" })}
//                             </div>
//                         </button>
//                     ))}
//                 {/*</div>*/}
//             </div>
//             <div className="  bg-gradient-to-r from-red-900/20 to-orange-900/20 py-4 md:py-6">
//                 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//                     <div className="flex items-center justify-center gap-3">
//                         <svg className="w-5 h-5 text-red-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
//                             <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
//                         </svg>
//                         <p className="text-red-300 text-xs md:text-sm text-center">
//                             <strong>Lưu ý:</strong> Khán giả dưới 13 tuổi chỉ chọn suất chiếu trước 22h, khán giả dưới 16 tuổi chỉ chọn suất chiếu trước 23h
//                         </p>
//                     </div>
//                 </div>
//             </div>
//
//             <div className="py-8 md:py-12">
//                 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//                     {loadingSeats ? (
//                         <div className="bg-[#1a1c22] rounded-xl p-8 min-h-[400px] flex items-center justify-center">
//                             <LoadingSeats />
//                         </div>
//                     ) : !isSelectingSeats ? (
//                         <>
//                             {selectedDate && (
//                                 <div className="animate-fadeIn">
//                                     <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4">
//                                         {selectedMovie.timeSlots.map((time) => (
//                                             <button key={time} onClick={() => handleTimeSelect(time)} className="cursor-pointer w-30 py-2.5 rounded-full text-sm font-medium bg-[#2a2d36] border border-gray-600 text-white hover:border-[#1E293B] hover:bg-[#1F2937] transition-all duration-200">
//                                                 {time}
//                                             </button>
//
//                                     ))}
//                                     </div>
//                                 </div>
//                             )}
//                         </>
//                     ) : (
//                         <SeatSelection
//                             currentShowtime={selectedTime}
//                             selectedDate={selectedDate}
//                             selectedSeats={selectedSeats}
//                             onSeatToggle={toggleSeat}
//                             onBackClick={handleBackToShowtimes}
//                             onPayment={handlePayment}
//                             getTicketPrice={getTicketPrice}
//                         />
//                     )}
//                 </div>
//             </div>
//
//             <Footer />
//
//             {/* Movie Details Modal */}
//             {showDetailsModal && (
//                 <MovieDetailsModal
//                     movie={selectedMovie}
//                     onClose={() => setShowDetailsModal(false)}
//                 />
//             )}
//
//             <style>{`
//                 @keyframes fadeIn {
//                     from { opacity: 0; transform: translateY(10px); }
//                     to { opacity: 1; transform: translateY(0); }
//                 }
//                 .animate-fadeIn {
//                     animation: fadeIn 0.5s ease-out;
//                 }
//                 .scrollbar-hide {
//                     -ms-overflow-style: none;
//                     scrollbar-width: none;
//                 }
//                 .scrollbar-hide::-webkit-scrollbar {
//                     display: none;
//                 }
//                 .line-clamp-3 {
//                     display: -webkit-box;
//                     -webkit-line-clamp: 3;
//                     -webkit-box-orient: vertical;
//                     overflow: hidden;
//                 }
//             `}</style>
//         </div>
//     );
// };
//
// export default MovieTicketBooking;