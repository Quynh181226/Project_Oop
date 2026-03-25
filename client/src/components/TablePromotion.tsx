
import Pagination from "../components/Pagination";
import type { Promotion } from "../types/type";
import { useState } from "react";

interface TablePromotionProps {
  promotions?: Promotion[]
  setCode: (code: "Add" | "Edit") => void;
  setSelectedPromotion: (promotion: Promotion | undefined) => void;
  setOpenAddEdit: (open: boolean) => void;
  setOpenDelete: (open: boolean) => void;
  darkMode: boolean;
}

function splitDateTime(input: string): { date: string } {
  const raw = (input || "").trim();
  if (raw.includes(" ")) {
    const parts = raw.split(" ");
    return { date: parts.slice(1).join(" ") };
  }
  return {date: raw };
}

const TablePromotion = ({
                          promotions = [],
                          setCode,
                          setSelectedPromotion,
                          setOpenAddEdit,
                          setOpenDelete,
                          darkMode,
                        }: TablePromotionProps) => {
  const [currPage, setCurrPage] = useState(1);
  const perPage = 5;

  const totalPages = Math.ceil(promotions.length / perPage);
  const start = (currPage - 1) * perPage;
  const pagi = promotions.slice(start, start + perPage);

  const handleEdit = (item: Promotion) => {
    setSelectedPromotion(item);
    setCode("Edit");
    setOpenAddEdit(true);
  };

  const handleDelete = (item: Promotion) => {
    setSelectedPromotion(item);
    setOpenDelete(true);
  };

  return (
      <>
        <div className={`overflow-hidden rounded-lg border ${darkMode ? "border-gray-600" : "border-gray-300"}`}>
          <table className="w-full border-collapse table-fixed">
            <thead>
            <tr className={`${darkMode ? "bg-[#2D2B33] text-gray-200" : "bg-[#8B93AF] text-white"}`}>
              <th className="px-4 py-3 text-center border w-[70px]">ID</th>
              <th className="px-4 py-3 text-center border w-[110px]">Ảnh</th>
              <th className="px-4 py-3 text-left border">Tiêu đề</th>
              <th className="px-4 py-3 text-center border w-[140px]">Ngày</th>
              <th className="px-4 py-3 text-center border w-[210px]">Hành động</th>
            </tr>
            </thead>
            <tbody>
            {pagi.map((item, index) => {
              const { date } = splitDateTime(item.date);

              return (
                  <tr
                      key={item.id}
                      className={`${index % 2 === 0 ? (darkMode ? "bg-[#2A282F]" : "bg-gray-50") : darkMode ? "bg-[#242228]" : "bg-white"}`}
                  >
                    <td className="px-4 py-4 border text-center">{item.id}</td>
                    <td className="px-4 py-4 border text-center">
                      <img src={item.img} alt={item.title} className="w-16 h-10 object-cover rounded" />
                    </td>
                    <td className="px-4 py-4 border">
                      <span className="font-medium line-clamp-2">{item.title}</span>
                    </td>
                    <td className="px-4 py-4 border text-center">{date}</td>
                    <td className="px-4 py-4 border">
                      <div className="flex justify-center gap-2">
                        <button
                            onClick={() => handleEdit(item)}
                            className="w-10 h-9 rounded-3xl bg-[#6B7597] text-white hover:bg-[#565D7C]"
                        >
                          <i className="bx bxs-pencil" />
                        </button>
                        <button
                            onClick={() => handleDelete(item)}
                            className="w-10 h-9 rounded-3xl bg-red-700 text-white hover:bg-red-800"
                        >
                          <i className="bx bxs-trash" />
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
            <Pagination currPage={currPage} totalPages={totalPages} darkMode={darkMode} onChangePage={setCurrPage} />
        )}
      </>
  );
};

export default TablePromotion;

    