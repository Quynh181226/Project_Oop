// components/admin/Navbar/Navbar.tsx
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faBell } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { Dropdown } from "antd";
import DarkModeToggle from "./DarkModeToggle.tsx";
import UserMenu from "../components/UserMenu.tsx";
import Avatar from "../assets/Avatar.svg";

interface NavbarProps {
    sidebarOpen: boolean;
    setSidebarOpen: (open: boolean) => void;
    darkMode: boolean;
    setDarkMode: (mode: boolean) => void;
    currentUser: any;
}

const Navbar = ({
                    sidebarOpen,
                    setSidebarOpen,
                    darkMode,
                    setDarkMode,
                    currentUser
                }: NavbarProps) => {
    return (
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
                <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} />

                <Link to="#" className={`text-xl relative ${darkMode ? "text-[#FBFBFB]" : "text-[#342E37]"}`}>
                    <FontAwesomeIcon
                        icon={faBell}
                        className={`${
                            darkMode
                                ? "text-gray-200 hover:bg-[#6B7597]"
                                : "text-black hover:bg-[#565D7C]"
                        }`}
                    />
                    <span
                        className={`absolute -top-[6px] -right-[6px] w-5 h-5 rounded-full border-2 font-bold text-xs flex justify-center items-center ${
                            darkMode ? "border-[#111] bg-[#6B7597] text-[#F9F9F9]" : "border-[#F9F9F9] bg-[#6B7597] text-[#F9F9F9]"
                        }`}
                    >
                        8
                    </span>
                </Link>

                <Dropdown
                    overlay={<UserMenu currentUser={currentUser} />}
                    trigger={["hover"]}
                >
                    <img
                        src={currentUser?.avatar || Avatar}
                        alt="Avatar"
                        className="w-10 h-10 rounded-full cursor-pointer object-cover"
                    />
                </Dropdown>
            </div>
        </nav>
    );
};

export default Navbar;