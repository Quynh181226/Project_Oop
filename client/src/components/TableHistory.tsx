
import { useMemo, useState } from "react";
import Pagination from "../components/Pagination";
import type { BookingHistory } from "../types/type.ts";

export interface BookingHistoryTableProps {
    darkMode: boolean;
    data: BookingHistory[];
}

const BookingHistoryTable = ({ darkMode, data }: BookingHistoryTableProps) => {
    const [currPage, setCurrPage] = useState(1);
    const perPage = 5;

    const totalPages = useMemo(
        () => Math.ceil((data?.length ?? 0) / perPage),
        [data]
    );

    const safeCurrPage = Math.min(currPage, Math.max(totalPages, 1));
    const start = (safeCurrPage - 1) * perPage;
    const end = start + perPage;
    const pagi = (data ?? []).slice(start, end);

    const renderStatus = (status: string) => {
        const s = (status ?? "").toLowerCase();

        const base =
            "inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wide";

        const cls = darkMode
            ? s === "confirmed"
                ? "bg-green-900/40 text-green-200 border border-green-700/40"
                : s === "cancelled"
                    ? "bg-red-900/40 text-red-200 border border-red-700/40"
                    : "bg-yellow-900/40 text-yellow-200 border border-yellow-700/40"
            : s === "confirmed"
                ? "bg-green-100 text-green-700 border border-green-200"
                : s === "cancelled"
                    ? "bg-red-100 text-red-700 border border-red-200"
                    : "bg-yellow-100 text-yellow-700 border border-yellow-200";

        return (
            <span className={`${base} ${cls}`}>
        {String(status ?? "").toUpperCase()}
      </span>
        );
    };

    return (
        <>
            <div
                className={`overflow-hidden rounded-lg border ${
                    darkMode ? "border-gray-600" : "border-gray-300"
                }`}
            >
                <table className="w-full border-collapse text-sm">
                    <thead>
                    <tr
                        className={`${
                            darkMode
                                ? "bg-[#2D2B33] text-gray-200"
                                : "bg-[#8B93AF] text-white"
                        }`}
                    >
                        <th className="px-4 py-3 border">ID</th>
                        <th className="px-4 py-3 border">Email</th>
                        <th className="px-4 py-3 border">Movie</th>
                        <th className="px-4 py-3 border">Date / Time</th>
                        <th className="px-4 py-3 border">Seats</th>
                        <th className="px-4 py-3 border">Total</th>
                        <th className="px-4 py-3 border text-center">Status</th>
                    </tr>
                    </thead>

                    <tbody>
                    {pagi.map((item, index) => (
                        <tr
                            key={item.id}
                            className={`${
                                index % 2 === 0
                                    ? darkMode
                                        ? "bg-[#2A282F]"
                                        : "bg-gray-50"
                                    : darkMode
                                        ? "bg-[#242228]"
                                        : "bg-white"
                            } hover:${darkMode ? "bg-[#3A3740]" : "bg-blue-50"} transition`}
                        >
                            <td className="px-4 py-3 border">{item.id}</td>
                            <td className="px-4 py-3 border">
                                {item.customerEmail}
                            </td>
                            <td className="px-4 py-3 border font-medium">
                                {item.movieTitle}
                            </td>
                            <td className="px-4 py-3 border">
                                {item.date} • {item.time}
                            </td>
                            <td className="px-4 py-3 border">
                                {item.seats?.join(", ")}
                            </td>
                            <td className="px-4 py-3 border">
                                {item.totalPrice.toLocaleString()} đ
                            </td>
                            <td className="px-4 py-3 border text-center">
                                {renderStatus(item.status)}
                            </td>
                        </tr>
                    ))}

                    {pagi.length === 0 && (
                        <tr>
                            <td
                                colSpan={7}
                                className={`px-6 py-10 text-center border ${
                                    darkMode
                                        ? "border-gray-600 text-gray-300"
                                        : "border-gray-300 text-gray-600"
                                }`}
                            >
                                No booking history
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>

            {totalPages > 1 && (
                <Pagination
                    currPage={safeCurrPage}
                    totalPages={totalPages}
                    darkMode={darkMode}
                    onChangePage={(p) => setCurrPage(p)}
                />
            )}
        </>
    );
};

export default BookingHistoryTable;

    