import { Link } from "react-router-dom";

import Facebook from "../assets/Facebook.svg";
import Copyright from "../assets/Copyright.svg";
import AppStore from "../assets/AppStore.svg";
import GgPlay from "../assets/GgPlay.svg";
import Zalo from "../assets/Zalo.svg";
import Youtube from "../assets/Youtube.svg";

export const Footer = () => {
    return (
        <footer className="w-full bg-[#0B0B0B] text-[#D6D6D6] font-mulish pt-10 pb-6 text-center mt-40">
            <div className="flex flex-wrap px-10 justify-center gap-x-10 gap-y-4 text-sm font-semibold mb-6">
                <Link to="/policy" className="hover:text-white transition">Chính sách</Link>
                <Link to="/calendar" className="hover:text-white transition">Lịch chiếu</Link>
                <Link to="/news" className="hover:text-white transition">Tin tức</Link>
                <Link to="/ticketPrice" className="hover:text-white transition">Giá vé</Link>
                <Link to="/feedBack" className="hover:text-white transition">Đánh giá</Link>
                {/*<Link to="/" className="hover:text-white transition">Đặt vé nhóm, tập thể</Link>*/}
                <Link to="/contact" className="hover:text-white transition">Liên hệ</Link>
            </div>


            <div className="flex flex-wrap px-10  justify-center items-center gap-6 mb-8">
                <img src={Facebook} className="h-7 cursor-pointer" />
                <img src={Zalo} className="h-7 cursor-pointer" />
                <img src={Youtube} className="h-7 cursor-pointer" />
                <img src={GgPlay} className="h-10 cursor-pointer" />
                <img src={AppStore} className="h-10 cursor-pointer" />
                <img src={Copyright} className="h-10 w-30 cursor-pointer" />
            </div>

            <p className="text-sm mb-2">
                Cơ quan chủ quản: BỘ VĂN HÓA, THỂ THAO VÀ DU LỊCH
            </p>
            <p className="text-sm mb-2">
                Bản quyền thuộc Trung tâm Chiếu phim Quốc gia.
            </p>
            <p className="text-sm mb-2 px-4">
                Giấy phép số: 224/GP-TTĐT ngày 31/8/2010 - Chịu trách nhiệm: Vũ Đức Tùng – Giám đốc.
            </p>
            <p className="text-sm mb-6 px-4">
                Địa chỉ: Số 87 Láng Hạ, Phường Ô Chợ Dừa, TP.Hà Nội - Điện thoại: 024.35141791
            </p>

            <p className="text-sm text-[#9c9c9c]">
                Copyright 2023. NCC All Rights Reserved. Dev by Anvui.vn
            </p>
        </footer>
    );
};
