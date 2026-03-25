import { useState, useEffect } from "react";
import "../styles/adm.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faBell,
  faChevronRight,
  faPlusSquare,
  faSearch,
  faFilter,
  faSignOutAlt,
  faUsers,
  faCog,
  faFilm,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { Dropdown, Menu } from "antd";
import { useAppDispatch, useAppSelector } from "../hooks/Hook";
import { getAllFestivals } from "../apis/festivalApi.ts";
import LoadingProcess from "../components/LoadingProcess.tsx";

import TableFestival from "../components/TableFestival.tsx";
import ModalAddEditFestival from "../components/ModalAddEditFestival";
import ModalDeleteFestival from "../components/ModalDeleteFestival";

import HandleLogout from "../components/HandleLogout.tsx";

import type { Festival } from "../types/type.ts";
import Avatar from "../assets/Avatar.svg";
import ModalEditFestivalDetail from "../components/ModalEditFestivalDetail.tsx";

const FestivalManagement = () => {
  const dispatch = useAppDispatch();

  const { festivals, loading, error } = useAppSelector((state) => state.festivals);
  const { currentUser } = useAppSelector((state) => state.user);

  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const [darkMode, setDarkMode] = useState<boolean>(false);

  const [openAddEdit, setOpenAddEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openDetail, setOpenDetail]= useState(false)
  const [code, setCode] = useState<"Add" | "Edit">("Add");
  const [selectedFestival, setSelectedFestival] = useState<Festival | undefined>(undefined);


  const [keyword, setKeyword] = useState("");
  const filteredFestivals = festivals.filter((f) => {
    const key = keyword.trim().toLowerCase();
    if (!key) return true;

    return (
        f.title.toLowerCase().includes(key) ||
        (f.description || "").toLowerCase().includes(key)
    );
  });

  useEffect(() => {
    dispatch(getAllFestivals());
  }, [dispatch]);



  const userMenu = (
      <Menu className="w-72 p-4 rounded-lg shadow-lg border border-gray-200">
        <Menu.Item key="user-info" disabled>
          <div className="flex items-center gap-4">
            <img src={currentUser?.avatar || Avatar} alt="Avatar" className="w-10 h-10 rounded-full object-cover"/>
            <div>
              <h3 className="text-base font-semibold text-gray-800">{currentUser?.fullName || "Admin"}</h3>
              <span className="text-sm text-gray-500">{currentUser?.email}</span>
            </div>
          </div>
        </Menu.Item>
        <Menu.Item key="info">
          <Link to="/profileAdmin" className="text-gray-700 font-semibold hover:bg-gray-100 block px-2 py-1 rounded">
            Thông Tin
          </Link>
        </Menu.Item>
        <Menu.Item key="signout">
        <span onClick={HandleLogout} className="text-red-600 font-semibold hover:bg-gray-100 block px-2 py-1 rounded">
          Đăng xuất
        </span>
        </Menu.Item>
      </Menu>
  );

  return (
      <div className={`font-[Poppins,sans-serif] m-0 p-0 box-border transition-colors duration-300 ${darkMode ? "bg-[#37353E] text-[#FBFBFB]" : "bg-[#eee] min-h-screen text-[#37353E]"}`}>
        <section className={`sidebar ${sidebarOpen ? "" : "hide"} ${darkMode ? "dark" : ""} before:content-[''] before:absolute before:w-10 before:h-10 before:-top-10 before:right-0 before:rounded-full ${darkMode ? "before:shadow-[20px_20px_0_#111]" : "before:shadow-[20px_20px_0_#F9F9F9]"}`}>
          <Link to="/dashboard" className="flex items-center h-14 font-bold text-2xl sticky top-0 left-0 z-[500] pb-5 box-content text-[#6B7597]">
            <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="60px" fill="#6a7698">
              <path d="m160-800 80 160h120l-80-160h80l80 160h120l-80-160h80l80 160h120l-80-160h120q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800Zm0 240v320h640v-320H160Zm0 0v320-320Z"/>
            </svg>
            {sidebarOpen && <span className="ml-2">Ncc Management</span>}
          </Link>

          <div className="menu top">
            <div className="menu-item">
              <Link to="/dashboardManagement" className={`menu-link ${sidebarOpen ? "" : "hide"} hover:text-[#6B7597]`}>
                <i className="bx bxs-dashboard !ml-2.5 flex min-w-[30px]"></i>
                {sidebarOpen && <span>Trang chủ</span>}
              </Link>
            </div>
            <div className="menu-item active">
              <Link to="/festivalManagement" className={`menu-link ${sidebarOpen ? "" : "hide"} text-[#7F88A8]`}>
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
                {/*<FontAwesomeIcon icon={faCalendarAlt} className="min-w-[40px] flex justify-center" />*/}
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
              <Link to="/userManagement" className={`menu-link ${sidebarOpen ? "" : "hide"} hover:text-[#7F88A8]`}>
                <FontAwesomeIcon icon={faUsers} className="min-w-[40px] flex justify-center" />
                {sidebarOpen && <span>Người Dùng</span>}
              </Link>
            </div>
            <div className="menu-item">
              <Link to="/bookingHistoryManagement" className={`menu-link ${sidebarOpen ? "" : "hide"} hover:text-[#7F88A8]`}>
                {/*<FontAwesomeIcon icon={faUsers} className="min-w-[40px] flex justify-center" />*/}
                <svg className="min-w-[40px] flex justify-center fill-current group-hover:text-[#6B7597] transition-colors duration-200" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill={darkMode ? '#F9F9F9' : '#302E36'} viewBox="0 0 24 24">
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

        {/* MAIN CONTENT */}
        <section
            className={`relative transition-all duration-300 ease-in-out ${
                sidebarOpen ? "w-[calc(100%-280px)] left-[280px]" : "w-[calc(100%-60px)] left-[60px]"
            } max-[768px]:w-[calc(100%-60px)] max-[768px]:left-[60px]`}
        >
          <nav
              className={`h-14 px-6 flex items-center gap-6 font-[Lato,sans-serif] sticky top-0 left-0 z-[1000] ${
                  darkMode ? "bg-[#111]" : "bg-[#F9F9F9]"
              } before:content-[''] before:absolute before:w-10 before:h-10 before:-bottom-10 before:left-0 before:rounded-full ${
                  darkMode ? "before:shadow-[-20px_-20px_0_#111]" : "before:shadow-[-20px_-20px_0_#F9F9F9]"
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

              <Link to="#" className={`text-xl relative ${darkMode ? "text-[#FBFBFB]" : "text-[#342E37]"}`}>
                <FontAwesomeIcon icon={faBell} />
                <span
                    className={`absolute -top-[6px] -right-[6px] w-5 h-5 rounded-full border-2 font-bold text-xs flex justify-center items-center ${
                        darkMode ? "border-[#111] bg-[#6B7597] text-[#F9F9F9]" : "border-[#F9F9F9] bg-[#6B7597] text-[#F9F9F9]"
                    }`}
                >
                8
              </span>
              </Link>

              <Dropdown overlay={userMenu} trigger={["hover"]}>
                <img
                    src={(currentUser as any)?.avatar || Avatar}
                    alt="Avatar"
                    className="w-10 h-10 rounded-full cursor-pointer object-cover"
                />
              </Dropdown>
            </div>
          </nav>

          <main className="w-full min-h-screen p-[36px_24px] font-[Poppins,sans-serif] max-h-[calc(100vh-56px)] overflow-y-auto">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h1 className="text-[36px] font-semibold mb-[10px]">Liên Hoan Phim</h1>
                <div className="flex items-center gap-4">
                  <span className="text-[#AAAAAA] pointer-events-none">Liên Hoan Phim</span>
                  <FontAwesomeIcon icon={faChevronRight} className="text-sm" />
                  <Link to="/dashboard" className="text-[#6B7597]">
                    Dashboard
                  </Link>
                </div>
              </div>

              <div>
                <button
                    onClick={() => {
                      setCode("Add");
                      setSelectedFestival(undefined);
                      setOpenAddEdit(true);
                    }}
                    className="px-5 py-[10px] rounded-[5px] cursor-pointer text-base bg-[#6B7597] text-[#F9F9F9] transition-all duration-300 hover:bg-[#565D7C] flex items-center gap-2"
                >
                  <FontAwesomeIcon icon={faPlusSquare} />
                  Thêm mới
                </button>
              </div>
            </div>

            {/* search */}
            <form
                className="w-full mr-auto mt-5"
                onSubmit={(e) => e.preventDefault()}
            >
              <div className="flex items-center h-9">
                <input
                    type="search"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder="Tìm kiếm festival..."
                    className={`flex-grow px-4 h-full border-2 rounded-[36px_0_0_36px] outline-none w-full transition-colors duration-300 ${
                        darkMode
                            ? "bg-[#302E36] border-[#888] text-[#F9F9F9] placeholder-[#B0B0B0]"
                            : "bg-[#eee] border-[#6B7597] text-[#302E36] placeholder-[#6B7597]"
                    }`}
                />
                <button
                    type="submit"
                    className="w-9 h-full flex justify-center items-center text-lg border-none outline-none rounded-[0_36px_36px_0] cursor-pointer bg-[#6B7597] text-[#F9F9F9]"
                    title="Tìm"
                >
                  <FontAwesomeIcon icon={faSearch} />
                </button>
              </div>
            </form>


            <div className="flex gap-6 mt-6 w-full">
              <div className={`flex-grow basis-[500px] rounded-[20px] p-6 ${darkMode ? "bg-[#302E36]" : "bg-[#F9F9F9]"}`}>
                <div className="flex justify-end gap-4 mb-6 text-xl">
                  <FontAwesomeIcon icon={faSearch} className="cursor-pointer text-[#6B7597]" />
                  <FontAwesomeIcon icon={faFilter} className="cursor-pointer text-[#6B7597]" />
                </div>

                {loading && <LoadingProcess />}
                {error && <div className="text-red-500 text-center">{error}</div>}

                <TableFestival
                    festivals={filteredFestivals}
                    setCode={setCode}
                    setSelectedFestival={setSelectedFestival}
                    setOpenAddEdit={setOpenAddEdit}
                    setOpenDelete={setOpenDelete}
                    darkMode={darkMode}
                    onEditDetail={(festival)=>{
                      setSelectedFestival(festival)
                      setOpenDetail(true)
                    }}
                />

                <ModalAddEditFestival
                    open={openAddEdit}
                    onClose={() => setOpenAddEdit(false)}
                    festival={selectedFestival}
                    code={code}
                    darkMode={darkMode}
                />

                <ModalDeleteFestival
                    open={openDelete}
                    onClose={() => setOpenDelete(false)}
                    festival={selectedFestival}
                    // darkMode={darkMode}
                />

                <ModalEditFestivalDetail
                    open={openDetail}
                    onClose={() => setOpenDetail(false)}
                    festival={selectedFestival}
                    darkMode={darkMode}
                />


              </div>
            </div>
          </main>
        </section>
      </div>
  );
};

export default FestivalManagement;

    