// components/TableUser.tsx
import Pagination from "../components/Pagination";
import type { User } from "../types/type";
import { useState } from "react";
import { useAppDispatch } from "../hooks/Hook";
import { editUser } from "../apis/UserApi.ts";

interface TableUserProps {
    users: User[];
    setCode: (code: "Add" | "Edit") => void;
    setSelectedUser: (user: User | undefined) => void;
    setOpenAddEdit: (open: boolean) => void;
    setOpenDelete: (open: boolean) => void;
    darkMode: boolean;
}

const TableUser = ({
                       users,
                       setCode,
                       setSelectedUser,
                       setOpenAddEdit,
                       setOpenDelete,
                       darkMode,
                   }: TableUserProps) => {
    const dispatch = useAppDispatch();
    const [currPage, setCurrPage] = useState(1);
    const perPage = 3;

    const totalPages = Math.ceil(users.length / perPage);
    const start = (currPage - 1) * perPage;
    const end = start + perPage;
    const pagi = users.slice(start, end);

    const handleEdit = (user: User) => {
        setSelectedUser(user);
        setCode("Edit");
        setOpenAddEdit(true);
    };

    const handleDelete = (user: User) => {
        setSelectedUser(user);
        setOpenDelete(true);
    };

    const handleToggleStatus = (user: User) => {
        const newStatus = user.status === "active" ? "blocked" : "active";
        dispatch(editUser({ ...user, status: newStatus }));
    };

    const getStatusClass = (user: User) => {
        if (user.status === "active") {
            return `w-[80%] text-center px-2 py-[2px] rounded-2xl border-2 cursor-pointer font-bold bg-[#e9f6ec] border-[#90a56a] text-[#90a56a] hover:bg-[#6f8a47] hover:text-white transition duration-200`;
        } else {
            return `w-[80%] text-center px-2 py-[2px] rounded-2xl border-2 cursor-pointer font-bold bg-[#fbeaea] border-[#e57373] text-[#d04444] hover:bg-[#d04444] hover:text-white transition duration-200`;
        }
    };

    const getStatusText = (user: User) => {
        return user.status === "active" ? "Active" : "Blocked";
    };
    return (
        <>
            <div className={`overflow-hidden rounded-lg border ${darkMode ? "border-gray-600" : "border-gray-300"}`}>
                <table className="w-full border-collapse">
                    <thead>
                    <tr className={`${darkMode ? "bg-[#2D2B33] text-gray-200" : "bg-[#8B93AF] text-white"}`}>
                        <th className={`px-6 py-3 text-left border ${darkMode ? "border-gray-600" : "border-gray-300"}`}>ID</th>
                        <th className={`px-6 py-3 text-left border ${darkMode ? "border-gray-600" : "border-gray-300"}`}>Avatar</th>
                        <th className={`px-6 py-3 text-left border ${darkMode ? "border-gray-600" : "border-gray-300"}`}>Họ tên</th>
                        <th className={`px-6 py-3 text-left border ${darkMode ? "border-gray-600" : "border-gray-300"}`}>Email</th>
                        {/*<th className={`px-6 py-3 text-left border ${darkMode ? "border-gray-600" : "border-gray-300"}`}>SĐT</th>*/}
                        {/*<th className={`px-6 py-3 text-center border ${darkMode ? "border-gray-600" : "border-gray-300"}`}>Vai trò</th>*/}
                        <th className={`px-6 py-3 text-center border ${darkMode ? "border-gray-600" : "border-gray-300"}`}>Trạng thái</th>
                        <th className={`px-6 py-3 text-center border ${darkMode ? "border-gray-600" : "border-gray-300"}`}>Hành động</th>
                    </tr>
                    </thead>
                    <tbody>
                    {pagi.map((user, index) => (
                        <tr
                            key={user.id}
                            className={`${index % 2 === 0
                                ? darkMode ? "bg-[#2A282F]" : "bg-gray-50"
                                : darkMode ? "bg-[#242228]" : "bg-white"
                            } hover:${darkMode ? "bg-[#3A3740]" : "bg-blue-50"} transition`}
                        >
                            <td className={`px-6 py-4 border ${darkMode ? "border-gray-600 text-gray-300" : "border-gray-300"}`}>
                                {user.id}
                            </td>
                            <td className={`px-6 py-4 border ${darkMode ? "border-gray-600" : "border-gray-300"}`}>
                                <img
                                    src={user.avatar || "/default-avatar.png"}
                                    alt="avatar"
                                    className="w-10 h-10 rounded-full object-cover"
                                />
                            </td>
                            <td className={`px-6 py-4 border ${darkMode ? "border-gray-600 text-gray-200" : "border-gray-300"}`}>
                                <span className="font-medium">{user.fullName}</span>
                            </td>
                            <td className={`px-6 py-4 border ${darkMode ? "border-gray-600 text-gray-200" : "border-gray-300"}`}>
                                {user.email}
                            </td>
                  {/*          <td className={`px-6 py-4 border ${darkMode ? "border-gray-600 text-gray-200" : "border-gray-300"}`}>*/}
                  {/*              {user.phone || "-"}*/}
                  {/*          </td>*/}
                  {/*          <td className={`px-6 py-4 text-center border ${darkMode ? "border-gray-600" : "border-gray-300"}`}>*/}
                  {/*<span className={`px-3 py-1 rounded-full text-xs font-medium ${user.role === "admin" ? "bg-purple-600 text-white" : "bg-blue-600 text-white"}`}>*/}
                  {/*  {user.role.toUpperCase()}*/}
                  {/*</span>*/}
                  {/*          </td>*/}
                  {/*          <td className={`px-6 py-4 text-center border ${darkMode ? "border-gray-600" : "border-gray-300"}`}>*/}
                  {/*              <Switch*/}
                  {/*                  checked={user.status === "active"}*/}
                  {/*                  onChange={() => handleToggleStatus(user)}*/}
                  {/*                  checkedChildren="Active"*/}
                  {/*                  unCheckedChildren="Blocked"*/}
                  {/*                  className={user.status === "active" ? "bg-green-600" : "bg-red-600"}*/}
                  {/*              />*/}
                  {/*          </td>*/}
                            <td className={`px-4 py-2 border ${darkMode ? "border-gray-600" : "border-gray-300"} text-center`}>
                                <div
                                    onClick={() => handleToggleStatus(user)}
                                    className={`${getStatusClass(user)} inline-block text-sm font-medium`}
                                >
                                    {getStatusText(user)}
                                </div>
                            </td>
                            <td className={`px-6 py-4 text-center border ${darkMode ? "border-gray-600" : "border-gray-300"}`}>
                                <button
                                    onClick={() => handleEdit(user)}
                                    className={`px-4 py-1.5 rounded-3xl ${darkMode
                                        ? "bg-[#565D7C] text-gray-200 hover:bg-[#6B7597]"
                                        : "bg-[#6B7597] text-white hover:bg-[#565D7C]"
                                    } mr-2 cursor-pointer duration-300`}
                                >
                                    <i className="bx bxs-pencil text-lg"></i>
                                </button>
                                <button
                                    onClick={() => handleDelete(user)}
                                    className="px-4 py-1.5 rounded-3xl bg-red-700 text-white hover:bg-red-800 cursor-pointer duration-300"
                                >
                                    <i className="bx bxs-trash text-lg"></i>
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {totalPages > 1 && (
                <Pagination
                    currPage={currPage}
                    totalPages={totalPages}
                    darkMode={darkMode}
                    onChangePage={(p) => setCurrPage(p)}
                />
            )}
        </>
    );
};

export default TableUser;