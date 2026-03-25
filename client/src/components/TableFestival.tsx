import Pagination from "../components/Pagination";
import type { Festival } from "../types/type.ts";
import { useState } from "react";

interface TableFestivalProps {
  festivals: Festival[];
  setCode: (code: "Add" | "Edit") => void;
  setSelectedFestival: (festival: Festival | undefined) => void;
  setOpenAddEdit: (open: boolean) => void;
  setOpenDelete: (open: boolean) => void;
  darkMode: boolean;
  onEditDetail: (festival: Festival) => void;
}

function splitDateTime(input: string): { time: string; date: string } {
  // expect: "HH:mm DD/MM/YYYY"
  const raw = (input || "").trim();
  const parts = raw.split(" ");
  const time = parts[0] || "--:--";
  const date = parts.slice(1).join(" ") || "--/--/----";
  return { time, date };
}

const TableFestival = ({
  festivals,
  setCode,
  setSelectedFestival,
  setOpenAddEdit,
  setOpenDelete,
  darkMode,
  onEditDetail,
}: TableFestivalProps) => {
  const [currPage, setCurrPage] = useState(1);
  const perPage = 5;

  const totalPages = Math.ceil(festivals.length / perPage);
  const start = (currPage - 1) * perPage;
  const end = start + perPage;
  const pagi = festivals.slice(start, end);

  const handleEdit = (festival: Festival) => {
    setSelectedFestival(festival);
    setCode("Edit");
    setOpenAddEdit(true);
  };

  const handleDelete = (festival: Festival) => {
    setSelectedFestival(festival);
    setOpenDelete(true);
  };

  return (
    <>
      <div
        className={`overflow-hidden rounded-lg border ${
          darkMode ? "border-gray-600" : "border-gray-300"
        }`}
      >
        <table className="w-full border-collapse table-fixed">
          <thead>
            <tr
              className={`${
                darkMode ? "bg-[#2D2B33] text-gray-200" : "bg-[#8B93AF] text-white"
              }`}
            >
              <th className={`px-4 py-3 text-center border w-[70px] ${darkMode ? "border-gray-600" : "border-gray-300"}`}>
                ID
              </th>

              <th className={`px-4 py-3 text-center border w-[110px] ${darkMode ? "border-gray-600" : "border-gray-300"}`}>
                Ảnh
              </th>

              <th className={`px-4 py-3 text-left border ${darkMode ? "border-gray-600" : "border-gray-300"}`}>
                Tiêu đề
              </th>

              {/*  tách giờ / ngày */}
              <th className={`px-4 py-3 text-center border w-[90px] ${darkMode ? "border-gray-600" : "border-gray-300"}`}>
                Giờ
              </th>
              <th className={`px-4 py-3 text-center border w-[140px] ${darkMode ? "border-gray-600" : "border-gray-300"}`}>
                Ngày
              </th>

              <th className={`px-4 py-3 text-center border w-[210px] ${darkMode ? "border-gray-600" : "border-gray-300"}`}>
                Hành động
              </th>
            </tr>
          </thead>

          <tbody>
            {pagi.map((item, index) => {
              const { time, date } = splitDateTime(item.date);

              return (
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
                  <td className={`px-4 py-4 border ${darkMode ? "border-gray-600 text-gray-300" : "border-gray-300"} text-center`}>
                    {item.id}
                  </td>

                  <td className={`px-4 py-4 border ${darkMode ? "border-gray-600" : "border-gray-300"} text-center`}>
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-16 h-10 object-cover rounded"
                      onError={(e) => {
                        e.currentTarget.src = "/assets/images/fallback.png";
                      }}
                    />
                  </td>

                  <td className={`px-4 py-4 border ${darkMode ? "border-gray-600 text-gray-200" : "border-gray-300"}`}>
                    <span className="font-medium line-clamp-2">{item.title}</span>
                  </td>

                  {/* giờ / ngày */}
                  <td className={`px-4 py-4 border ${darkMode ? "border-gray-600 text-gray-200" : "border-gray-300"} text-center`}>
                    {time}
                  </td>
                  <td className={`px-4 py-4 border ${darkMode ? "border-gray-600 text-gray-200" : "border-gray-300"} text-center`}>
                    {date}
                  </td>

                  <td className={`px-4 py-4 border ${darkMode ? "border-gray-600" : "border-gray-300"}`}>
                    <div className="flex items-center justify-center gap-2 whitespace-nowrap">
                      {/* Sửa detail */}
                      <button
                        onClick={() => onEditDetail(item)}
                        className={`w-10 h-9 inline-flex items-center justify-center rounded-3xl ${
                          darkMode
                            ? "bg-[#374151] text-gray-200 hover:bg-[#111827]"
                            : "bg-[#374151] text-white hover:bg-[#111827]"
                        } cursor-pointer duration-300`}
                        title="Sửa nội dung chi tiết"
                      >
                        <i className="bx bx-detail text-lg"></i>
                      </button>

                      {/* Sửa festival */}
                      <button
                        onClick={() => handleEdit(item)}
                        className={`w-10 h-9 inline-flex items-center justify-center rounded-3xl ${
                          darkMode
                            ? "bg-[#565D7C] text-gray-200 hover:bg-[#6B7597]"
                            : "bg-[#6B7597] text-white hover:bg-[#565D7C]"
                        } cursor-pointer duration-300`}
                        title="Sửa"
                      >
                        <i className="bx bxs-pencil text-lg"></i>
                      </button>

                      {/* Xóa */}
                      <button
                        onClick={() => handleDelete(item)}
                        className="w-10 h-9 inline-flex items-center justify-center rounded-3xl bg-red-700 text-white hover:bg-red-800 cursor-pointer duration-300"
                        title="Xoá"
                      >
                        <i className="bx bxs-trash text-lg"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
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

export default TableFestival;
