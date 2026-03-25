import React from "react";

interface TrailerModalProps {
    trailerUrl: string;
    onClose: () => void;
}

const TrailerModal: React.FC<TrailerModalProps> = ({ trailerUrl, onClose }) => {
        const getYoutubeEmbedUrl = (url: string) => {
        const regExp = /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/;
        const match = url.match(regExp);
        const videoId = match ? match[1] : null;

        if (videoId) {
            return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&showinfo=0&modestbranding=1`;
        }
        return null;
    };

    const embedUrl = getYoutubeEmbedUrl(trailerUrl);

    if (!embedUrl) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div
                className="fixed inset-0 bg-black/70 transition-opacity"
                onClick={onClose}
            />

            <div className="flex min-h-full items-center justify-center p-4">
                <div className="relative bg-[#1e2026] rounded-xl shadow-2xl w-[90%] md:w-[70%] lg:w-[60%] max-w-3xl">
                    <div className="rounded-lg sticky top-0 bg-[#1e2026] border-b border-gray-800 px-6 py-4 flex items-center justify-between z-10">
                        <h3 className="text-xl font-bold text-white">Trailer</h3>
                        <button onClick={onClose} className="cursor-pointer text-gray-400 hover:text-white transition-colors">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <div className="overflow-hidden">
                        <div className="relative w-full pt-[56.25%] bg-black"> {/* 16:9 aspect ratio */}
                            <iframe src={embedUrl} title="Trailer phim" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen" allowFullScreen className="absolute inset-0 w-full h-full rounded-b-xl"></iframe>
                        </div>
                    </div>

                    <div className="rounded-lg sticky top-0 bg-[#1e2026] border-b border-gray-800 px-6 py-4 flex items-center justify-between z-10"/>
                </div>
            </div>

        </div>
    );
};

export default TrailerModal;