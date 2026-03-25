
import { useEffect, useMemo, useState } from "react";
import "../styles/adm.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBars,
    faBell,
    faChevronRight,
    faFilm,
    faUsers,
    faPlus,
    faClock,
    faSignOutAlt,
    faCog,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { Dropdown } from "antd";
import { useAppSelector } from "../hooks/Hook";
import { getPromotions } from "../apis/PromotionApi";
import TablePromotion from "../components/TablePromotion";
import type { Promotion } from "../types/type";
import HandleLogout from "../components/HandleLogout";
import Avatar from "../assets/Avatar.svg";

// Modal Components
import ModalAddEditPromotion from "../components/ModalAddEditPromotion";
import ModalDeletePromotion from "../components/ModalDeletePromotion";

const PromotionManagement = () => {
    const { currentUser } = useAppSelector((state) => state.user);

    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [darkMode, setDarkMode] = useState(false);

    const [data, setData] = useState<Promotion[]>([]);
    const [filteredData, setFilteredData] = useState<Promotion[]>([]);
    const [searchText, setSearchText] = useState("");

    const [selectedPromotion, setSelectedPromotion] = useState<Promotion | undefined>(undefined);
    const [openAddEdit, setOpenAddEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [code, setCode] = useState<"Add" | "Edit">("Add");

    // Fetch data
    useEffect(() => {
        const fetchData = async () => {
            const res = await getPromotions();
            setData(res);
            setFilteredData(res);
        };
        fetchData();
    }, []);

    // Filter by search
    useEffect(() => {
        let temp = [...data];
        if (searchText.trim()) {
            const q = searchText.toLowerCase();
            temp = temp.filter(
                (item) =>
                    item.title?.toLowerCase().includes(q) ||
                    item.date?.toLowerCase().includes(q)
            );
        }
        setFilteredData(temp);
    }, [searchText, data]);

    // Handle Add/Edit submit with validation
    const handleAddEditSubmit = (promo: Promotion) => {
        if (code === "Add") {
            setData([promo, ...data]);
        } else {
            setData(data.map((i) => (i.id === promo.id ? promo : i)));
        }
        setOpenAddEdit(false);
    };

    // Handle delete confirm
    const handleDeleteConfirm = () => {
        if (selectedPromotion) {
            setData(data.filter((item) => item.id !== selectedPromotion.id));
            setOpenDelete(false);
        }
    };

    const userMenu = useMemo(
        () => [
            {
                key: "user-info",
                label: (
                    <div className="flex items-center gap-4">
                        <img
                            src={currentUser?.avatar || Avatar}
                            alt="Avatar"
                            className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                            <h3 className="text-base font-semibold text-gray-800">
                                {currentUser?.fullName || "Admin"}
                            </h3>
                            <span className="text-sm text-gray-500">{currentUser?.email}</span>
                        </div>
                    </div>
                ),
                disabled: true,
            },
            {
                key: "info",
                label: (
                    <Link
                        to="/profileAdmin"
                        className="text-gray-700 font-semibold hover:bg-gray-100 block px-2 py-1 rounded"
                    >
                        Thông Tin
                    </Link>
                ),
            },
            {
                key: "signout",
                label: (
                    <span
                        onClick={HandleLogout}
                        className="text-red-600 font-semibold hover:bg-gray-100 block px-2 py-1 rounded cursor-pointer"
                    >
            Đăng xuất
          </span>
                ),
            },
        ],
        [currentUser]
    );

    return (
        <div
            className={`font-[Poppins,sans-serif] m-0 p-0 box-border transition-colors duration-300 ${
                darkMode ? "bg-[#37353E] text-[#FBFBFB]" : "bg-[#eee] min-h-screen text-[#37353E]"
            }`}
        >
            {/* Sidebar */}
            <section
                className={`sidebar ${sidebarOpen ? "" : "hide"} ${darkMode ? "dark" : ""}`}

            >
                <Link
                    to="/dashboard"
                    className="flex items-center h-14 font-bold text-2xl sticky top-0 left-0 z-[500] pb-5 box-content text-[#6B7597]"
                >
                    <FontAwesomeIcon icon={faFilm} className="text-[28px] min-w-[60px] flex justify-center" />
                    {sidebarOpen && <span className="ml-2">Ncc Management</span>}
                </Link>
                <div className="menu top">

                    <div className="menu-item active">
                        <Link to="/dashboardManagement" className={`menu-link ${sidebarOpen ? "" : "hide"} text-[#6B7597]`}>
                            <i className="bx bxs-dashboard !ml-2.5 flex min-w-[30px]"></i>
                            {sidebarOpen && <span>Trang chủ</span>}
                        </Link>
                    </div>
                    <div className="menu-item">
                        <Link to="/festivalManagement" className={`menu-link ${sidebarOpen ? "" : "hide"} hover:text-[#7F88A8]`}>
                            <i className="bx bxs-shopping-bag-alt text-[18px] !ml-2.5 flex min-w-[30px]"></i>
                            {sidebarOpen && <span>Danh mục</span>}
                        </Link>
                    </div>
                    <div className="menu-item">
                        <Link to="/categoryManagement" className={`menu-link ${sidebarOpen ? "" : "hide"} hover:text-[#7F88A8]`}>
                            <svg className="min-w-[40px] flex justify-center fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M7 3a4 4 0 1 0 0 8 4 4 0 1 0 0-8M17 3a4 4 0 1 0 0 8 4 4 0 1 0 0-8M7 13a4 4 0 1 0 0 8 4 4 0 1 0 0-8M18 13h-2v3h-3v2h3v3h2v-3h3v-2h-3z"></path></svg>
                            {sidebarOpen && <span>Thể Loại</span>}
                        </Link>
                    </div>
                    <div className="menu-item">
                        <Link to="/timeSlotManagement" className={`menu-link ${sidebarOpen ? "" : "hide"} hover:text-[#7F88A8]`}>
                            <FontAwesomeIcon icon={faClock} className="min-w-[40px] flex justify-center" />
                            {sidebarOpen && <span>Giờ Chiếu</span>}
                        </Link>
                    </div>
                    <div className="menu-item">
                        <Link to="/showDateManagement" className={`menu-link ${sidebarOpen ? "" : "hide"} hover:text-[#7F88A8]`}>
                            <i className="bx bxs-calendar-week text-[18px] !ml-2.5 flex min-w-[30px]"></i>

                            {sidebarOpen && <span>Ngày Chiếu</span>}
                        </Link>
                    </div>
                    <div className="menu-item">
                        <Link to="/movieManagement" className={`menu-link ${sidebarOpen ? "" : "hide"} hover:text-[#7F88A8]`}>
                            <FontAwesomeIcon icon={faFilm} className="min-w-[40px] flex justify-center" />
                            {sidebarOpen && <span>Phim</span>}
                        </Link>
                    </div>
                    <div className="menu-item">
                        <Link to="/promotionManagement" className={`menu-link ${sidebarOpen ? "" : "hide"} hover:text-[#7F88A8]`}>
                            <FontAwesomeIcon icon={faUsers} className="min-w-[40px] flex justify-center" />
                            {sidebarOpen && <span>Người Dùng</span>}
                        </Link>
                    </div>
                    <div className="menu-item">
                        <Link to="/bookingHistoryManagement" className={`menu-link ${sidebarOpen ? "" : "hide"} hover:text-[#7F88A8]`}>
                            <svg className="min-w-[40px] flex justify-center fill-current group-hover:text-[#6B7597] transition-colors duration-200" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill={darkMode ? '#F9F9F9' : '#302E36'} viewBox="0 0 24 24">
                                <path d="M4 2H2v19c0 .55.45 1 1 1h19v-2H4z"></path>
                                <path d="M7 10h11c.55 0 1-.45 1-1V5c0-.55-.45-1-1-1H7c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1m10-2h-5V6h5zM8 6h2v2H8zM21 12H7c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1h14c.55 0 1-.45 1-1v-4c0-.55-.45-1-1-1M8 14h6v2H8zm12 2h-4v-2h4z"></path>
                            </svg>
                            <path d="M4 2H2v19c0 .55.45 1 1 1h19v-2H4z"></path>
                            <path d="M7 10h11c.55 0 1-.45 1-1V5c0-.55-.45-1-1-1H7c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1m10-2h-5V6h5zM8 6h2v2H8zM21 12H7c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1h14c.55 0 1-.45 1-1v-4c0-.55-.45-1-1-1M8 14h6v2H8zm12 2h-4v-2h4z"></path>

                            {sidebarOpen && <span>Lịch sử</span>}
                        </Link>
                    </div>
                    <div className="menu-item">
                        <Link to="/promotionManagement" className={`menu-link ${sidebarOpen ? "" : "hide"} hover:text-[#7F88A8]`}>
                            <i className="bx bxs-shopping-bag-alt text-[18px] !ml-2.5 flex min-w-[30px]"></i>
                            {sidebarOpen && <span>Khuyến mãi</span>}
                        </Link>
                    </div>
                </div>
                <div className="menu">
                    <div className="menu-item">
                        <Link
                            to="#"
                            className={`menu-link ${sidebarOpen ? "" : "hide"} hover:text-[#7F88A8]`}
                        >
                            <FontAwesomeIcon icon={faCog} className="min-w-[40px] flex justify-center" />
                            {sidebarOpen && <span>Cài Đặt</span>}
                        </Link>
                    </div>

                    <div className="menu-item">
                        <Link
                            to="/login"
                            onClick={HandleLogout}
                            className={`menu-link ${sidebarOpen ? "" : "hide"} text-red-700 hover:text-red-800`}
                        >
                            <FontAwesomeIcon icon={faSignOutAlt} className="min-w-[40px] flex justify-center" />
                            {sidebarOpen && <span>Đăng Xuất</span>}
                        </Link>
                    </div>
                </div>

            </section>

            {/* Main content */}
            <section
                className={`relative transition-all duration-300 ease-in-out ${
                    sidebarOpen ? "w-[calc(100%-280px)] left-[280px]" : "w-[calc(100%-60px)] left-[60px]"
                } max-[768px]:w-[calc(100%-60px)] max-[768px]:left-[60px]`}
            >
                <nav
                    className={`h-14 px-6 flex items-center gap-6 font-[Lato,sans-serif] sticky top-0 left-0 z-[1000] ${
                        darkMode ? "bg-[#111]" : "bg-[#F9F9F9]"
                    }`}
                >
                    <FontAwesomeIcon
                        icon={faBars}
                        className={`cursor-pointer text-2xl ${darkMode ? "text-[#FBFBFB]" : "text-[#342E37]"}`}
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                    />

                    <div className="flex items-center gap-[10px] ml-auto mr-5">
                        <input
                            type="checkbox"
                            id="switch-mode"
                            hidden
                            checked={darkMode}
                            onChange={() => setDarkMode(!darkMode)}
                        />
                        <label htmlFor="switch-mode" className={`switch-toggle ${darkMode ? "dark" : ""}`}></label>

                        <Link
                            to="#"
                            className={`text-xl relative ${darkMode ? "text-[#FBFBFB]" : "text-[#342E37]"}`}
                        >
                            <FontAwesomeIcon icon={faBell} />
                            <span
                                className={`absolute -top-[6px] -right-[6px] w-5 h-5 rounded-full border-2 font-bold text-xs flex justify-center items-center ${
                                    darkMode ? "border-[#111] bg-[#6B7597] text-[#F9F9F9]" : "border-[#F9F9F9] bg-[#6B7597] text-[#F9F9F9]"
                                }`}
                            >
                8
              </span>
                        </Link>

                        <Dropdown menu={{ items: userMenu }} trigger={["hover"]}>
                            <img
                                src={currentUser?.avatar || Avatar}
                                alt="Avatar"
                                className="w-10 h-10 rounded-full cursor-pointer object-cover"
                            />
                        </Dropdown>
                    </div>
                </nav>

                <main className="w-full min-h-screen p-[36px_24px] font-[Poppins,sans-serif] max-h-[calc(100vh-56px)] overflow-y-auto">
                    <h1 className="text-[36px] font-semibold mb-[10px]">Quản Lý Khuyến Mãi</h1>

                    {/* Breadcrumb */}
                    <div className="flex items-center gap-4">
                        <span className="text-[#AAAAAA] pointer-events-none">Khuyến Mãi</span>
                        <FontAwesomeIcon icon={faChevronRight} className="text-sm" />
                        <Link to="/dashboard" className="text-[#6B7597]">Dashboard</Link>
                    </div>

                    {/* Search + Add button */}
                    <div className="flex justify-between items-center mt-5 mb-4">
                        <input
                            type="search"
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            placeholder="Tìm kiếm khuyến mãi (mã / tên)..."
                            className={`flex-grow px-4 h-10 border-2 rounded-[36px] outline-none w-full transition-colors duration-300 ${
                                darkMode
                                    ? "bg-[#302E36] border-[#888] text-[#F9F9F9] placeholder-[#B0B0B0]"
                                    : "bg-[#eee] border-[#6B7597] text-[#302E36] placeholder-[#6B7597]"
                            }`}
                        />
                        <button
                            onClick={() => { setCode("Add"); setOpenAddEdit(true); }}
                            className="ml-4 px-4 py-2 bg-[#6B7597] text-white rounded hover:bg-[#565D7C]"
                        >
                            <FontAwesomeIcon icon={faPlus} /> Thêm
                        </button>
                    </div>

                    {/* Table */}
                    <TablePromotion
                        darkMode={darkMode}
                        promotions={filteredData}
                        setCode={setCode}
                        setSelectedPromotion={setSelectedPromotion}
                        setOpenAddEdit={setOpenAddEdit}
                        setOpenDelete={setOpenDelete}
                    />

                    {/* Modals */}
                    <ModalAddEditPromotion
                        open={openAddEdit}
                        code={code}
                        selected={selectedPromotion}
                        // darkMode={darkMode}
                        onClose={() => setOpenAddEdit(false)}
                        onSubmit={handleAddEditSubmit}
                    />

                    <ModalDeletePromotion
                        open={openDelete}
                        darkMode={darkMode}
                        onClose={() => setOpenDelete(false)}
                        onConfirm={handleDeleteConfirm}
                    />
                </main>
            </section>
        </div>
    );
};

export default PromotionManagement;

    