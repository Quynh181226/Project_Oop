// // src/pages/HeroSection.tsx
// import React from 'react';
// import { useParams } from "react-router-dom";
// import { useAppSelector } from "../hooks/Hook";
//
// const HeroSection = () => {
//     const { movieId } = useParams<{ movieId: string }>();
//     const movie = useAppSelector((state) => state.movies.movies.find(m => m.id === Number(movieId)));
//
//     if (!movie) return null;
//
//     return (
//         <section className="relative h-[600px]">
//             <div
//                 className="absolute inset-0 bg-cover bg-center blur-sm brightness-60"
//                 style={{ backgroundImage: `url('${movie.poster}')` }}
//             />
//             <div className="absolute inset-0 bg-black/50" />
//             <div className="relative z-10 max-w-6xl mx-auto flex items-center px-10 h-full gap-10">
//                 <div className="w-[300px]">
//                     <img
//                         src={movie.poster}
//                         alt="Movie poster"
//                         className="w-full rounded-lg shadow-lg"
//                     />
//                 </div>
//                 <div className="flex-1">
//                     <h1 className="text-4xl font-bold flex items-center mb-4">
//                         {movie.title} - {movie.rated}
//                         <span className="ml-2 border border-white rounded px-2 py-1 text-sm">2D</span>
//                     </h1>
//                     <div className="text-gray-300 mb-4 text-lg">
//                         <p className="mb-1">{movie.genres.join(" | ")} | {movie.country} | {movie.duration} phút | Đạo diễn: {movie.director}</p>
//                         <p className="mb-1">Diễn viên: {movie.actors}</p>
//                         <p>Khởi chiếu: {movie.releaseDate || "Chưa có"}</p>
//                     </div>
//                     <div className="text-gray-300 max-h-36 overflow-hidden mb-4 text-base leading-relaxed">
//                         <p>{movie.description || "Chưa có mô tả"}</p>
//                     </div>
//                     <div className="text-red-500 font-semibold mb-4 text-base">
//                         Kiểm duyệt: {movie.rated} – PHIM ĐƯỢC PHỔ BIẾN ĐẾN NGƯỜI XEM TỪ ĐỦ 13 TUỔI TRỞ LÊN (13+)
//                     </div>
//                     <div className="flex gap-4">
//                         <a href="#" className="underline hover:text-yellow-400 transition-colors text-lg">
//                             Chi tiết nội dung
//                         </a>
//                         <button className="border border-yellow-400 text-yellow-400 px-5 py-2 rounded-full hover:bg-yellow-400 hover:text-gray-900 transition-colors text-lg font-medium">
//                             Xem trailer
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// };
//
// export default HeroSection;