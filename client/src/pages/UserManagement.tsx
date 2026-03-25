import { useState, useEffect } from "react";
import "../styles/adm.css";
import { useAppDispatch, useAppSelector } from "../hooks/Hook";
import { getAllUsers } from "../apis/UserApi.ts";
import LoadingProcess from "../components/LoadingProcess.tsx";
import TableUser from "../components/TableUser.tsx";
import ModalAddEditUser from "../components/ModalAddEditUser";
import ModalDeleteUser from "../components/ModalDeleteUser";
import Sidebar from "../components/Sidebar.tsx";
import Navbar from "../components/Navbar.tsx";
import HeaderAdm from "../components/HeaderAdm.tsx";
import SearchBar from "../components/SearchBar.tsx";
import type { User } from "../types/type.ts";

const UserManagement = () => {
    const dispatch = useAppDispatch();
    const { users: allUsers, loading, error } = useAppSelector((state) => state.user);
    const { currentUser } = useAppSelector((state) => state.user);

    const users = allUsers.filter((user) => user.role !== "admin");

    const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
    const [darkMode, setDarkMode] = useState<boolean>(false);
    const [searchTerm, setSearchTerm] = useState("");

    const [openAddEdit, setOpenAddEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [code, setCode] = useState<"Add" | "Edit">("Add");
    const [selectedUser, setSelectedUser] = useState<User | undefined>(undefined);

    useEffect(() => {
        dispatch(getAllUsers());
    }, [dispatch]);

    const handleAddUser = () => {
        setCode("Add");
        setSelectedUser(undefined);
        setOpenAddEdit(true);
    };

    const handleSearch = (value: string) => {
        setSearchTerm(value);
    };

    const filteredUsers = users.filter((user) =>
        searchTerm.trim() === ""
            ? true
            : user.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div
            className={`font-[Poppins,sans-serif] m-0 p-0 box-border transition-colors duration-300 ${
                darkMode ? "bg-[#37353E] text-[#FBFBFB]" : "bg-[#eee] min-h-screen text-[#37353E]"
            }`}
        >
            <Sidebar sidebarOpen={sidebarOpen} darkMode={darkMode} activePage="user" />

            <section
                className={`relative transition-all duration-300 ease-in-out ${
                    sidebarOpen ? "w-[calc(100%-280px)] left-[280px]" : "w-[calc(100%-60px)] left-[60px]"
                } max-[768px]:w-[calc(100%-60px)] max-[768px]:left-[60px]`}
            >
                <Navbar
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                    darkMode={darkMode}
                    setDarkMode={setDarkMode}
                    currentUser={currentUser}
                />

                <main className="w-full min-h-screen p-[36px_24px] font-[Poppins,sans-serif] max-h-[calc(100vh-56px)] overflow-y-auto">
                    <HeaderAdm
                        title="Quản Lý Người Dùng"
                        cate="Người Dùng"
                        onAdd={handleAddUser}
                    />

                    <SearchBar
                        darkMode={darkMode}
                        placeholder="Tìm kiếm người dùng..."
                        onSearch={handleSearch}
                    />

                    {/* Content Area */}
                    <div className="flex gap-6 mt-6 w-full">
                        <div
                            className={`flex-grow basis-[500px] rounded-[20px] p-6 ${
                                darkMode ? "bg-[#302E36]" : "bg-[#F9F9F9]"
                            }`}
                        >
                            {loading && <LoadingProcess />}
                            {error && <div className="text-red-500 text-center">{error}</div>}

                            {!loading && !error && filteredUsers.length === 0 && (
                                <div
                                    className={`text-center py-8 ${
                                        darkMode ? "text-gray-400" : "text-gray-600"
                                    }`}
                                >
                                    {searchTerm.trim() !== ""
                                        ? `Không tìm thấy người dùng nào cho "${searchTerm}"`
                                        : "Không có người dùng nào"}
                                </div>
                            )}

                            {!loading && !error && filteredUsers.length > 0 && (
                                <TableUser
                                    users={filteredUsers}
                                    setCode={setCode}
                                    setSelectedUser={setSelectedUser}
                                    setOpenAddEdit={setOpenAddEdit}
                                    setOpenDelete={setOpenDelete}
                                    darkMode={darkMode}
                                />
                            )}

                            {/* Modals */}
                            <ModalAddEditUser
                                open={openAddEdit}
                                onClose={() => setOpenAddEdit(false)}
                                user={selectedUser}
                                code={code}
                            />

                            <ModalDeleteUser
                                open={openDelete}
                                onClose={() => setOpenDelete(false)}
                                user={selectedUser}
                            />
                        </div>
                    </div>
                </main>
            </section>
        </div>
    );
};

export default UserManagement;