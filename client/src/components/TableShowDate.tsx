// components/TableShowDate.tsx
import Pagination from "../components/Pagination";
import type { ShowDate } from "../types/type";
import { useState } from "react";
import dayjs from "dayjs";

interface TableShowDateProps {
    dates: ShowDate[];
    setCode: (code: "Add" | "Edit") => void;
    setSelectedDate: (date: ShowDate | undefined) => void;
    setOpenAddEdit: (open: boolean) => void;
    setOpenDelete: (open: boolean) => void;
    darkMode: boolean;
}

const TableShowDate = ({
                           dates,
                           setCode,
                           setSelectedDate,
                           setOpenAddEdit,
                           setOpenDelete,
                           darkMode,
                       }: TableShowDateProps) => {
    const [currPage, setCurrPage] = useState(1);
    const perPage = 5;

    const totalPages = Math.ceil(dates.length / perPage);
    const start = (currPage - 1) * perPage;
    const end = start + perPage;
    const pagi = dates.slice(start, end);

    const handleEdit = (date: ShowDate) => {
        setSelectedDate(date);
        setCode("Edit");
        setOpenAddEdit(true);
    };

    const handleDelete = (date: ShowDate) => {
        setSelectedDate(date);
        setOpenDelete(true);
    };

    return (
        <>
            <div className={`overflow-hidden rounded-lg border ${darkMode ? "border-gray-600" : "border-gray-300"}`}>
                <table className="w-full border-collapse">
                    <thead>
                    <tr className={`${darkMode ? "bg-[#2D2B33] text-gray-200" : "bg-[#8B93AF] text-white"}`}>
                        <th className={`px-6 py-3 text-left border ${darkMode ? "border-gray-600" : "border-gray-300"}`}>ID</th>
                        <th className={`px-6 py-3 text-left border ${darkMode ? "border-gray-600" : "border-gray-300"}`}>Ngày Chiếu</th>
                        <th className={`px-6 py-3 text-center border ${darkMode ? "border-gray-600" : "border-gray-300"}`}>Hành Động</th>
                    </tr>
                    </thead>
                    <tbody>
                    {pagi.map((item, index) => (
                        <tr
                            key={item.id}
                            className={`${index % 2 === 0
                                ? darkMode ? "bg-[#2A282F]" : "bg-gray-50"
                                : darkMode ? "bg-[#242228]" : "bg-white"
                            } hover:${darkMode ? "bg-[#3A3740]" : "bg-blue-50"} transition`}
                        >
                            <td className={`px-6 py-4 border ${darkMode ? "border-gray-600 text-gray-300" : "border-gray-300"}`}>
                                {item.id}
                            </td>
                            <td className={`px-6 py-4 border ${darkMode ? "border-gray-600 text-gray-200" : "border-gray-300"}`}>
                                <span className="font-medium">{dayjs(item.date).format("DD/MM/YYYY")}</span>
                                <span className="text-sm text-gray-500 ml-2">({dayjs(item.date).format("dddd")})</span>
                            </td>
                            <td className={`px-6 py-4 text-center border ${darkMode ? "border-gray-600" : "border-gray-300"}`}>
                                <button
                                    onClick={() => handleEdit(item)}
                                    className={`px-4 py-1.5 rounded-3xl ${darkMode
                                        ? "bg-[#565D7C] text-gray-200 hover:bg-[#6B7597]"
                                        : "bg-[#6B7597] text-white hover:bg-[#565D7C]"
                                    } mr-3 cursor-pointer duration-300`}
                                >
                                    <i className="bx bxs-pencil text-lg"></i>
                                </button>
                                <button
                                    onClick={() => handleDelete(item)}
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

export default TableShowDate;