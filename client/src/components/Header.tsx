import { MenuIcon} from "lucide-react";
import { useState } from "react";
import { LoginModal } from "../pages/LoginModal";
import { RegisterModal } from "../pages/RegisterModal";
import { useAppSelector, useAppDispatch } from "../hooks/Hook";
import { logout } from "../slices/UserSlice";
import NccLogo from "../assets/NccLogo.svg";
import AvatarDefault from "../assets/Avatar.svg";
import { Dropdown, Menu } from "antd";
import { NavLink } from "react-router-dom";
import { ForgotPasswordModal } from "./ForgotPasswordModal.tsx";

const navItemClass = ({ isActive }: { isActive: boolean }) =>
    `relative cursor-pointer transition duration-300 ${
        isActive
            ? "text-red-400 font-medium"
            : "text-white hover:text-red-300"
    }`;

const mobileNavClass = ({ isActive }: { isActive: boolean }) =>
    `transition ${
        isActive
            ? "text-red-400 font-medium"
            : "text-white hover:text-red-300"
    }`;

const Header = () => {
    const [open, setOpen] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const [showForgot, setShowForgot] = useState(false);

    const { currentUser, isLoggedIn } = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();

    const handleLogout = () => {
        dispatch(logout());
        localStorage.removeItem("currentUser");
        sessionStorage.removeItem("currentUser");
        sessionStorage.removeItem("isLoggedIn");
    };

    const displayUser = currentUser;
    const isDisplayLoggedIn = isLoggedIn;

    const userDropdownMenu = (
        <Menu className="w-72 p-4 rounded-lg shadow-lg border border-gray-200 bg-white">
            <Menu.Item key="info" disabled>
                <div className="flex items-center gap-4">
                    <img
                        src={displayUser?.avatar || AvatarDefault}
                        alt="avatar"
                        className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="min-w-0">
                        <h3 className="text-base font-semibold text-gray-800 truncate">
                            {displayUser?.fullName}
                        </h3>
                        <span className="text-sm text-gray-500 truncate block">
                            {displayUser?.email}
                        </span>
                    </div>
                </div>
            </Menu.Item>

            <Menu.Divider />

            <Menu.Item key="profile">
                <NavLink
                    to="/profilePage"
                    className="block px-3 py-2 rounded hover:bg-gray-100"
                >
                    Thông tin cá nhân
                </NavLink>
            </Menu.Item>

            <Menu.Item key="logout">
                <span
                    onClick={handleLogout}
                    className="block px-3 py-2 rounded text-red-600 hover:bg-gray-100 cursor-pointer"
                >
                    Đăng xuất
                </span>
            </Menu.Item>
        </Menu>
    );

    const ActiveUnderline = () => (
        <span
            className="
                absolute left-0 -bottom-1
                w-full h-[1.5px]
                bg-red-400/70
                rounded-full
                transition-all duration-300
            "
        />
    );

    return (
        <>
            <header className="w-full fixed top-0 left-0 z-50 bg-black/30 backdrop-blur-xl font-mont">
                <div className="max-w-[1400px] mx-auto flex items-center justify-between px-6 py-3.5">
                    {/* LOGO */}
                    <div className="flex items-center gap-3">
                        <img src={NccLogo} className="h-12 select-none" alt="NCC Logo" />
                    </div>

                    {/* ===== DESKTOP MENU ===== */}
                    <ul className="hidden lg:flex items-center gap-10 text-[15px]">
                        <NavLink to="/homePage" end className={navItemClass}>
                            {({ isActive }) => (
                                <li>
                                    Trang chủ
                                    {isActive && <ActiveUnderline />}
                                </li>
                            )}
                        </NavLink>

                        <NavLink to="/calendar" className={navItemClass}>
                            {({ isActive }) => (
                                <li>
                                    Lịch chiếu
                                    {isActive && <ActiveUnderline />}
                                </li>
                            )}
                        </NavLink>

                        <NavLink to="/news" className={navItemClass}>
                            {({ isActive }) => (
                                <li>
                                    Tin tức
                                    {isActive && <ActiveUnderline />}
                                </li>
                            )}
                        </NavLink>

                        <NavLink to="/promotion" className={navItemClass}>
                            {({ isActive }) => (
                                <li>
                                    Khuyến mãi
                                    {isActive && <ActiveUnderline />}
                                </li>
                            )}
                        </NavLink>

                        <NavLink to="/TicketPrice" className={navItemClass}>
                            {({ isActive }) => (
                                <li>
                                    Giá vé
                                    {isActive && <ActiveUnderline />}
                                </li>
                            )}
                        </NavLink>

                        <NavLink to="/festivals" className={navItemClass}>
                            {({ isActive }) => (
                                <li>
                                    Liên hoan phim, Tuần phim
                                    {isActive && <ActiveUnderline />}
                                </li>
                            )}
                        </NavLink>

                        <NavLink to="/about" className={navItemClass}>
                            {({ isActive }) => (
                                <li>
                                    Giới thiệu
                                    {isActive && <ActiveUnderline />}
                                </li>
                            )}
                        </NavLink>
                    </ul>

                    {/* ===== DESKTOP RIGHT ===== */}
                    <div className="hidden lg:flex items-center gap-6">
                        {isDisplayLoggedIn && displayUser ? (
                            <Dropdown overlay={userDropdownMenu} trigger={["hover"]}>
                                <div className="flex items-center gap-3 cursor-pointer">
                                    <img
                                        src={displayUser.avatar || AvatarDefault}
                                        alt="avatar"
                                        className="w-10 h-10 rounded-full object-cover"
                                    />
                                    <span className="text-white font-medium">
                                        {displayUser.fullName}
                                    </span>
                                </div>
                            </Dropdown>
                        ) : (
                            <>
                                <button
                                    onClick={() => setShowRegister(true)}
                                    className="cursor-pointer px-5 py-1.5 rounded-full border border-white text-white hover:bg-white/10 transition"
                                >
                                    Đăng ký
                                </button>
                                <button
                                    onClick={() => setShowLogin(true)}
                                    className="cursor-pointer px-6 py-1.5 rounded-full text-white font-semibold bg-gradient-to-r from-[#d52b1e] to-[#ff4d47]"
                                >
                                    Đăng nhập
                                </button>
                            </>
                        )}
                    </div>

                    <button onClick={() => setOpen(!open)} className="cursor-pointer lg:hidden text-white hover:text-red-300 transition-all duration-300">
                            <MenuIcon size={28} className="transform transition-transform duration-300 rotate-0"/>
                    </button>
                </div>

                <div className={` lg:hidden fixed top-full left-0 right-0 z-40  transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]  bg-gradient-to-b from-black/95 via-black/90 to-black/80 backdrop-blur-xl text-white overflow-hidden ${open ? 'max-h-screen' : 'max-h-0'} `}>
                    <div className="px-6 py-4 overflow-y-auto">
                        <ul className="flex flex-col gap-1">
                            <NavLink to="/homePage" end className={mobileNavClass} onClick={() => setOpen(false)}>
                                <li className="py-4 px-4 border-b border-white/10 hover:bg-white/5 transition-all duration-300 hover:pl-6">
                                    Trang chủ
                                </li>
                            </NavLink>
                            <NavLink to="/calendar" className={mobileNavClass} onClick={() => setOpen(false)}>
                                <li className="py-4 px-4 border-b border-white/10 hover:bg-white/5 transition-all duration-300 hover:pl-6">
                                    Lịch chiếu
                                </li>
                            </NavLink>
                            <NavLink to="/news" className={mobileNavClass} onClick={() => setOpen(false)}>
                                <li className="py-4 px-4 border-b border-white/10 hover:bg-white/5 transition-all duration-300 hover:pl-6">
                                    Tin tức
                                </li>
                            </NavLink>
                            <NavLink to="/promotion" className={mobileNavClass} onClick={() => setOpen(false)}>
                                <li className="py-4 px-4 border-b border-white/10 hover:bg-white/5 transition-all duration-300 hover:pl-6">
                                    Khuyến mãi
                                </li>
                            </NavLink>
                            <NavLink to="/TicketPrice" className={mobileNavClass} onClick={() => setOpen(false)}>
                                <li className="py-4 px-4 border-b border-white/10 hover:bg-white/5 transition-all duration-300 hover:pl-6">
                                    Giá vé
                                </li>
                            </NavLink>
                            <NavLink to="/festivals" className={mobileNavClass} onClick={() => setOpen(false)}>
                                <li className="py-4 px-4 border-b border-white/10 hover:bg-white/5 transition-all duration-300 hover:pl-6">
                                    Liên hoan phim, Tuần phim
                                </li>
                            </NavLink>
                            <NavLink to="/about" className={mobileNavClass} onClick={() => setOpen(false)}>
                                <li className="py-4 px-4 border-b border-white/10 hover:bg-white/5 transition-all duration-300 hover:pl-6">
                                    Giới thiệu
                                </li>
                            </NavLink>
                            {/*<NavLink to="/profilePage" className={mobileNavClass} onClick={() => setOpen(false)}>*/}
                            {/*    <li className="py-4 px-4 border-b border-white/10 hover:bg-white/5 transition-all duration-300 hover:pl-6">*/}
                            {/*        Thông tin cá nhân*/}
                            {/*    </li>*/}
                            {/*</NavLink>*/}
                            {isDisplayLoggedIn && displayUser ?
                                (
                                    <>
                                        <NavLink to="/profilePage" className={mobileNavClass} onClick={() => setOpen(false)}>
                                            <li className="py-4 px-4 border-b border-white/10 hover:bg-white/5 transition-all duration-300 hover:pl-6">
                                                Thông tin cá nhân
                                            </li>
                                        </NavLink>
                                    </>
                                ) : ""
                            }
                        </ul>

                        <div className="flex flex-col gap-3 mt-6 pt-6 border-t border-white/20">
                            {isDisplayLoggedIn && displayUser ? (
                                <>
                                    <button
                                        onClick={() => {
                                            handleLogout();
                                            setOpen(false);
                                        }}
                                        className="cursor-pointer px-5 py-3 rounded-lg border border-white/30 hover:bg-white/10 transition-all duration-300 hover:pl-7"
                                    >
                                        Đăng xuất
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button
                                        onClick={() => {
                                            setShowRegister(true);
                                            setOpen(false);
                                        }}
                                        className="cursor-pointer px-5 py-3 rounded-lg border border-white/30 hover:bg-white/10 transition-all duration-300 hover:pl-7"
                                    >
                                        Đăng ký
                                    </button>
                                    <button
                                        onClick={() => {
                                            setShowLogin(true);
                                            setOpen(false);
                                        }}
                                        className="cursor-pointer px-5 py-3 rounded-lg bg-gradient-to-r from-[#d52b1e] to-[#ff4d47] hover:opacity-90 transition-all duration-300 hover:pl-7"
                                    >
                                        Đăng nhập
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            {showLogin && (
                <LoginModal
                    onClose={() => setShowLogin(false)}
                    onOpenRegister={() => setShowRegister(true)}
                    onOpenForgot={() => setShowForgot(true)}
                />
            )}

            {showForgot && <ForgotPasswordModal onClose={() => setShowForgot(false)} />}

            {showRegister && (
                <RegisterModal
                    onClose={() => setShowRegister(false)}
                    onOpenLogin={() => {
                        setShowRegister(false);
                        setShowLogin(true);
                    }}
                />
            )}
        </>
    );
};

export default Header;