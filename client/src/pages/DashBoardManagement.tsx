import { useState, useEffect } from "react";
import "../styles/adm.css";
import { Card, Statistic, Row, Col } from "antd";
import { useAppDispatch, useAppSelector } from "../hooks/Hook";
import { getAllMovies } from "../apis/MovieApi";
import { getAllTimeSlots } from "../apis/TimeSlotApi";
import { getAllShowDates } from "../apis/ShowDateApi";
import { getAllUsers } from "../apis/UserApi.ts";

import Sidebar from "../components/Sidebar.tsx";
import Navbar from "../components/Navbar.tsx";

const DashboardManagement = () => {
    const dispatch = useAppDispatch();
    const { currentUser } = useAppSelector((state) => state.user);
    const { movies } = useAppSelector((state) => state.movies);
    const { slots } = useAppSelector((state) => state.timeSlots);
    const { dates } = useAppSelector((state) => state.showDates);
    const { users } = useAppSelector((state) => state.user);

    const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
    const [darkMode, setDarkMode] = useState<boolean>(false);

    useEffect(() => {
        dispatch(getAllMovies());
        dispatch(getAllTimeSlots());
        dispatch(getAllShowDates());
        dispatch(getAllUsers());
    }, [dispatch]);

    const totalRevenue = 125000000;
    const totalBookings = 3420;

    return (
        <div className={`font-[Poppins,sans-serif] m-0 p-0 box-border transition-colors duration-300 ${darkMode ? "bg-[#37353E] text-[#FBFBFB]" : "bg-[#eee] min-h-screen text-[#37353E]"}`}>
            <Sidebar sidebarOpen={sidebarOpen} darkMode={darkMode} activePage="dashboard" />

            <section className={`relative transition-all duration-300 ease-in-out ${sidebarOpen ? "w-[calc(100%-280px)] left-[280px]" : "w-[calc(100%-60px)] left-[60px]"} max-[768px]:w-[calc(100%-60px)] max-[768px]:left-[60px]`}>
                <Navbar
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                    darkMode={darkMode}
                    setDarkMode={setDarkMode}
                    currentUser={currentUser}
                />

                <main className="w-full min-h-screen p-[36px_24px] font-[Poppins,sans-serif] overflow-y-auto">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h1 className="text-[36px] font-bold">Dashboard</h1>
                            <p className="text-lg text-gray-500 mt-2">Chào mừng quay trở lại, {currentUser?.fullName || "Admin"}!!</p>
                        </div>
                    </div>

                    <Row gutter={[24, 24]} className="mb-10">
                        <Col xs={24} sm={12} lg={6}>
                            <Card
                                hoverable
                                className={`shadow-lg rounded-2xl overflow-hidden relative transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl ${darkMode ? "!bg-[#302E36] !border-gray-700" : "bg-gradient-to-br from-white to-[#f8f9fa]"} ${darkMode ? "border-t-4 border-t-[#c42b2b]" : "border-t-4 border-t-[#FF6B6B]"}`}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex flex-row">
                                        <p className={`text-sm mb-1 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                                            Tổng Phim:
                                            <span className={`ml-2 text-3xl font-bold ${darkMode ? "!text-[#FBFBFB]" : "text-gray-800"}`}>
                            {movies.length}
                        </span>
                                        </p>
                                    </div>
                                    <div className="w-16 h-16 rounded-lg bg-[#FFD6D6] flex items-center justify-center shadow-md">
                                        <i className="bx bxs-film text-[#FF6B6B] text-3xl"></i>
                                    </div>
                                </div>
                                <div className={`mt-4 pt-4 border-t ${darkMode ? "border-gray-700" : "border-gray-100"}`}></div>
                            </Card>
                        </Col>

                        <Col xs={24} sm={12} lg={6}>
                            <Card
                                hoverable
                                className={`shadow-lg rounded-2xl overflow-hidden relative transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl ${darkMode ? "!bg-[#302E36] !border-gray-700" : "bg-gradient-to-br from-white to-[#f8f9fa]"} ${darkMode ? "border-t-4 border-t-[#b89b4e]" : "border-t-4 border-t-[#E3C872]"}`}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex flex-row">
                                        <p className={`text-sm mb-1 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                                            Giờ Chiếu:
                                            <span className={`ml-2 text-3xl font-bold ${darkMode ? "!text-[#FBFBFB]" : "text-gray-800"}`}>
                            {slots.length}
                        </span>
                                        </p>
                                    </div>
                                    <div className="w-16 h-16 rounded-lg bg-[#FFF2C6] flex items-center justify-center shadow-md">
                                        <i className="bx bxs-time-five text-[#E3C872] text-3xl"></i>
                                    </div>
                                </div>
                                <div className={`mt-4 pt-4 border-t ${darkMode ? "border-gray-700" : "border-gray-100"}`}></div>
                            </Card>
                        </Col>

                        <Col xs={24} sm={12} lg={6}>
                            <Card
                                hoverable
                                className={`shadow-lg rounded-2xl overflow-hidden relative transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl ${darkMode ? "!bg-[#302E36] !border-gray-700" : "bg-gradient-to-br from-white to-[#f8f9fa]"} ${darkMode ? "border-t-4 border-t-[#1a6bc0]" : "border-t-4 border-t-[#3C91E6]"}`}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex flex-row">
                                        <p className={`text-sm mb-1 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                                            Ngày Chiếu:
                                            <span className={`ml-2 text-3xl font-bold ${darkMode ? "!text-[#FBFBFB]" : "text-gray-800"}`}>
                            {dates.length}
                        </span>
                                        </p>
                                    </div>
                                    <div className="w-16 h-16 rounded-lg bg-[#CFE8FF] flex items-center justify-center shadow-md">
                                        <i className="bx bxs-calendar-week text-[#3C91E6] text-4xl"></i>
                                    </div>
                                </div>
                                <div className={`mt-4 pt-4 border-t ${darkMode ? "border-gray-700" : "border-gray-100"}`}></div>
                            </Card>
                        </Col>

                        <Col xs={24} sm={12} lg={6}>
                            <Card
                                hoverable
                                className={`shadow-lg rounded-2xl overflow-hidden relative transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl ${darkMode ? "!bg-[#302E36] !border-gray-700" : "bg-gradient-to-br from-white to-[#f8f9fa]"} ${darkMode ? "border-t-4 border-t-[#7c5ed6]" : "border-t-4 border-t-[#A78BFA]"}`}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex flex-row">
                                        <p className={`text-sm mb-1 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                                            Người Dùng:
                                            <span className={`ml-2 text-3xl font-bold ${darkMode ? "!text-[#FBFBFB]" : "text-gray-800"}`}>
                            {users.filter(u => u.role === "user").length}
                        </span>
                                        </p>
                                    </div>
                                    <div className="w-16 h-16 rounded-lg bg-[#E9E6FF] flex items-center justify-center shadow-md">
                                        <i className="bx bxs-user text-[#A78BFA] text-3xl"></i>
                                    </div>
                                </div>
                                <div className={`mt-4 pt-4 border-t ${darkMode ? "border-gray-700" : "border-gray-100"}`}></div>
                            </Card>
                        </Col>
                    </Row>

                    <Row gutter={[24, 24]}>
                        <Col xs={24} lg={12}>
                            <Card
                                title="Doanh Thu Tháng Này"
                                hoverable
                                className={`shadow-lg rounded-2xl transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl ${darkMode ? "!bg-[#302E36] !border-gray-700" : "bg-white border-gray-200"}`}
                                headStyle={{
                                    color: darkMode ? "#d1d5db" : "#374151",  // title dịu ở dark
                                    borderBottom: darkMode ? "1px solid #444" : "1px solid #f0f0f0"
                                }}
                            >
                                <Statistic
                                    value={totalRevenue.toLocaleString("vi-VN")}
                                    precision={0}
                                    prefix="₫"
                                    valueStyle={{ color: "#cf1322", fontSize: "32px", fontWeight: "bold" }}
                                />
                            </Card>
                        </Col>

                        <Col xs={24} lg={12}>
                            <Card
                                title="Lượt Đặt Vé Tháng Này"
                                hoverable
                                className={`shadow-lg rounded-2xl transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl ${darkMode ? "!bg-[#302E36] !border-gray-700" : "bg-white border-gray-200"}`}
                                headStyle={{
                                    color: darkMode ? "#d1d5db" : "#374151",
                                    borderBottom: darkMode ? "1px solid #444" : "1px solid #f0f0f0"
                                }}
                            >
                                <Statistic
                                    value={totalBookings}
                                    prefix={<i className="bx bxs-ticket text-[#faad14] text-2xl mr-2"></i>}
                                    valueStyle={{ color: "#faad14", fontSize: "32px", fontWeight: "bold" }}
                                />
                            </Card>
                        </Col>
                    </Row>
                </main>
            </section>
        </div>
    );
};

export default DashboardManagement;