// import { Button } from 'antd';
//
// interface HeroSectionProps {
//     onRandomQuiz: () => void;
// }
// const HeroSection1 = ({onRandomQuiz}: HeroSectionProps) => {
//     return (
//         <section className="bg-[#4A3DB5] text-center pt-8 pb-6">
//             <h2 className="text-white text-2xl sm:text-3xl font-bold mb-5">
//                 Let's try a random puzzle 🎲
//             </h2>
//             <Button type="primary" onClick={onRandomQuiz} className="!bg-yellow-400 !text-black hover:!bg-yellow-500">
//                 Play
//             </Button>
//         </section>
//     );
// };
//
// export default HeroSection1;

import React from 'react';

const HeroSection1: React.FC = () => {
    return (
        <section className="relative h-[600px]  ">
            <div
                className="absolute inset-0 bg-[url('/assets/Đang%20chiếu/image.png')] bg-cover bg-center blur-sm brightness-60"
            />
            <div className="absolute inset-0 bg-black/50" />

            <div className="relative z-10 max-w-6xl mx-auto flex items-center px-10 h-full gap-10">
                <div className="w-65">
                    <img
                        src="/assets/Đang chiếu/image.png"
                        alt="Movie poster"
                        className="w-full rounded-lg"
                    />
                </div>

                <div className="flex-1">
                    <h1 className="text-2xl font-bold flex items-center mb-4">
                        CƯỜI XUYÊN BIÊN GIỚI - T13
                        <span className="ml-2 border border-white rounded px-2 py-1 text-sm">2D</span>
                    </h1>

                    <div className="text-gray-300 mb-4">
                        <p className="mb-1">Hài | Hàn Quốc | 113 phút | Đạo diễn: KIM Chang-ju</p>
                        <p className="mb-1">Diễn viên: Ryu Seung-ryong, Jin Sun-kyu, Igor Rafael PEDROSO…</p>
                        <p>Khởi chiếu: 15/11/2024</p>
                    </div>

                    <div className="text-gray-300 max-h-36 overflow-hidden mb-4">
                        <p>
                            Cười Xuyên Biên Giới kể về hành trình của Jin-bong (Ryu Seung-ryong) – cựu vô địch bắn cung quốc gia, sau
                            khi nghỉ hưu, anh đã trở thành một nhân viên văn phòng bình thường. Đứng trước nguy cơ bị sa thải, Jin-bong
                            phải nhận một nhiệm vụ bất khả thi là bay đến nửa kia của trái đất trong nỗ lực tuyệt vọng để sinh tồn. Sống
                            sót sau một sự cố đe doạ tính mạng, Jin-bong đã "hạ cánh" xuống khu rừng Amazon, nơi anh gặp bộ ba thổ dân
                            bản địa có kỹ năng bắn cung thượng thừa: Sika, Eeba và Walbu. Tin rằng đã tìm ra cách để tự cứu mình,
                            Jin-bong hợp tác với phiên dịch ngáo ngơ Bbang-sik (Jin Sun-kyu) và đưa ba chiến thần cung thủ đến Hàn Quốc
                            cho một nhiệm vụ táo bạo.
                        </p>
                    </div>

                    <div className="text-red-500 font-semibold mb-4">
                        Kiểm duyệt: T13 – PHIM ĐƯỢC PHỔ BIẾN ĐẾN NGƯỜI XEM TỪ ĐỦ 13 TUỔI TRỞ LÊN (13+)
                    </div>

                    <div className="flex gap-4">
                        <a href="#" className="underline hover:text-yellow-400 transition-colors">
                            Chi tiết nội dung
                        </a>
                        <button className="border border-yellow-400 text-yellow-400 px-5 py-2 rounded-full hover:bg-yellow-400 hover:text-gray-900 transition-colors">
                            Xem trailer
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection1;