// components/admin/UserMenu/UserMenu.tsx
import { Menu } from "antd";
import { Link } from "react-router-dom";
import HandleLogout from "../components/HandleLogout.tsx";
import Avatar from "../assets/Avatar.svg";

interface UserMenuProps {
    currentUser: any;
}

const UserMenu = ({ currentUser }: UserMenuProps) => {
    return (
        <Menu className="w-72 p-4 rounded-lg shadow-lg border border-gray-200">
            <Menu.Item key="user-info" disabled>
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
                        <span className="text-sm text-gray-500">
              {currentUser?.email}
            </span>
                    </div>
                </div>
            </Menu.Item>

            <Menu.Item key="info">
                <Link
                    to="/profileAdmin"
                    className="text-gray-700 font-semibold hover:bg-gray-100 block px-2 py-1 rounded"
                >
                    Thông Tin
                </Link>
            </Menu.Item>

            <Menu.Item key="signout">
        <span
            onClick={HandleLogout}
            className="text-red-600 font-semibold hover:bg-gray-100 block px-2 py-1 rounded cursor-pointer"
        >
          Đăng xuất
        </span>
            </Menu.Item>
        </Menu>
    );
};

export default UserMenu;