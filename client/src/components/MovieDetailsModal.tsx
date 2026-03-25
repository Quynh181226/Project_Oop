import React from "react";
import type { Movie } from "../types/type";

interface MovieDetailsModalProps {
    movie: Movie | null;
    onClose: () => void;
}

const MovieDetailsModal: React.FC<MovieDetailsModalProps> = ({ movie, onClose }) => {
    if (!movie) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div onClick={onClose} className="fixed inset-0 bg-black/70 transition-opacity"/>

            <div className="flex min-h-full items-center justify-center p-4">
                <div className="relative bg-[#1e2026] rounded-xl shadow-2xl w-[80%] md:w-[45%] max-h-[90vh] overflow-hidden">
                    <div className="sticky top-0 bg-[#1e2026] border-b border-gray-800 px-6 py-4 flex items-center justify-between z-10">
                        <h3 className="text-xl font-bold text-white">
                            {movie.title}
                        </h3>
                        <button
                            onClick={onClose}
                            className="cursor-pointer text-gray-400 hover:text-white transition-colors"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <div className="overflow-y-auto p-6">
                        <div className="flex flex-col lg:flex-row gap-8">
                            <div>
                                <h4 className="text-lg font-semibold text-white mb-2">Nội dung phim:</h4>
                                <div className="bg-[#2a2d36] rounded-lg p-4">
                                    <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                                        {movie.description || movie.description || "Chưa có mô tả chi tiết."}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieDetailsModal;