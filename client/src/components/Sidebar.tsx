// src/components/Sidebar.tsx
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faClock,
    faFilm,
    faUsers,
    faCog,
    faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import HandleLogout from "./HandleLogout.tsx";

interface SidebarProps {
    sidebarOpen: boolean;
    darkMode: boolean;
    activePage?: string;  // "dashboard" | "festival" | "category" | "timeSlot" | "showDate" | "movie" | "user" | "booking"
}

const Sidebar = ({ sidebarOpen, darkMode, activePage }: SidebarProps) => {
    // Hàm kiểm tra menu item có đang active không
    const isActive = (page: string) => activePage === page;

    return (
        <section className={`sidebar ${sidebarOpen ? "" : "hide"} ${darkMode ? "dark" : ""} before:content-[''] before:absolute before:w-10 before:h-10 before:-top-10 before:right-0 before:rounded-full ${darkMode ? "before:shadow-[20px_20px_0_#111]" : "before:shadow-[20px_20px_0_#F9F9F9]"}`}>
            <Link to="/dashboardManagement" className="flex items-center h-14 font-bold text-2xl sticky top-0 left-0 z-[500] pb-5 box-content text-[#6B7597]">
                <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="60px" fill="#6a7698">
                    <path d="m160-800 80 160h120l-80-160h80l80 160h120l-80-160h80l80 160h120l-80-160h120q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800Zm0 240v320h640v-320H160Zm0 0v320-320Z"/>
                </svg>
                {sidebarOpen && <span className="ml-2">Ncc Management</span>}
            </Link>

            <div className="menu top">
                <div className={`menu-item ${isActive("dashboard") ? "active" : ""}`}>
                    <Link to="/dashboardManagement" className={`menu-link ${sidebarOpen ? "" : "hide"} hover:text-[#6B7597]`}>
                        <i className="bx bxs-dashboard !ml-2.5 flex min-w-[30px]"></i>
                        {sidebarOpen && <span>Trang chủ</span>}
                    </Link>
                </div>

                <div className={`menu-item ${isActive("festival") ? "active" : ""}`}>
                    <Link to="/festivalManagement" className={`menu-link ${sidebarOpen ? "" : "hide"} hover:text-[#7F88A8]`}>
                        <i className="bx bxs-shopping-bag-alt text-[18px] !ml-2.5 flex min-w-[30px]"></i>
                        {sidebarOpen && <span>Danh mục</span>}
                    </Link>
                </div>

                <div className={`menu-item ${isActive("category") ? "active" : ""}`}>
                    <Link to="/categoryManagement" className={`menu-link ${sidebarOpen ? "" : "hide"}`}>
                        <svg className="min-w-[40px] flex justify-center fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                            <path d="M7 3a4 4 0 1 0 0 8 4 4 0 1 0 0-8M17 3a4 4 0 1 0 0 8 4 4 0 1 0 0-8M7 13a4 4 0 1 0 0 8 4 4 0 1 0 0-8M18 13h-2v3h-3v2h3v3h2v-3h3v-2h-3z"></path>
                        </svg>
                        {sidebarOpen && <span>Thể Loại</span>}
                    </Link>
                </div>

                <div className={`menu-item ${isActive("timeSlot") ? "active" : ""}`}>
                    <Link to="/timeSlotManagement" className={`menu-link ${sidebarOpen ? "" : "hide"} hover:text-[#7F88A8]`}>
                        <FontAwesomeIcon icon={faClock} className="min-w-[40px] flex justify-center" />
                        {sidebarOpen && <span>Giờ Chiếu</span>}
                    </Link>
                </div>

                <div className={`menu-item ${isActive("showDate") ? "active" : ""}`}>
                    <Link to="/showDateManagement" className={`menu-link ${sidebarOpen ? "" : "hide"} hover:text-[#7F88A8]`}>
                        <i className="bx bxs-calendar-week text-[18px] !ml-2.5 flex min-w-[30px]"></i>
                        {sidebarOpen && <span>Ngày Chiếu</span>}
                    </Link>
                </div>

                <div className={`menu-item ${isActive("movie") ? "active" : ""}`}>
                    <Link to="/movieManagement" className={`menu-link ${sidebarOpen ? "" : "hide"} hover:text-[#7F88A8]`}>
                        <FontAwesomeIcon icon={faFilm} className="min-w-[40px] flex justify-center" />
                        {sidebarOpen && <span>Phim</span>}
                    </Link>
                </div>

                <div className={`menu-item ${isActive("user") ? "active" : ""}`}>
                    <Link to="/userManagement" className={`menu-link ${sidebarOpen ? "" : "hide"} hover:text-[#7F88A8]`}>
                        <FontAwesomeIcon icon={faUsers} className="min-w-[40px] flex justify-center" />
                        {sidebarOpen && <span>Người Dùng</span>}
                    </Link>
                </div>

                <div className={`menu-item ${isActive("booking") ? "active" : ""}`}>
                    <Link to="/bookingHistoryManagement" className={`menu-link ${sidebarOpen ? "" : "hide"} hover:text-[#7F88A8]`}>
                        <svg className="min-w-[40px] flex justify-center fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                            <path d="M4 2H2v19c0 .55.45 1 1 1h19v-2H4z"></path>
                            <path d="M7 10h11c.55 0 1-.45 1-1V5c0-.55-.45-1-1-1H7c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1m10-2h-5V6h5zM8 6h2v2H8zM21 12H7c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1h14c.55 0 1-.45 1-1v-4c0-.55-.45-1-1-1M8 14h6v2H8zm12 2h-4v-2h4z"></path>
                        </svg>
                        {sidebarOpen && <span>Lịch sử</span>}
                    </Link>
                </div>
            </div>

            <div className="menu">
                <div className="menu-item">
                    <Link to="#" className={`menu-link ${sidebarOpen ? "" : "hide"} hover:text-[#7F88A8]`}>
                        <FontAwesomeIcon icon={faCog} className="min-w-[40px] flex justify-center" />
                        {sidebarOpen && <span>Cài Đặt</span>}
                    </Link>
                </div>
                <div className="menu-item">
                    <Link to="/login" onClick={HandleLogout} className={`menu-link ${sidebarOpen ? "" : "hide"} text-red-700 hover:text-red-800`}>
                        <FontAwesomeIcon icon={faSignOutAlt} className="min-w-[40px] flex justify-center" />
                        {sidebarOpen && <span>Đăng Xuất</span>}
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Sidebar;