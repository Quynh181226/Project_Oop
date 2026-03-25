import type { Promotion } from "../types/type";
import { useEffect, useState } from "react";

interface Props {
  open: boolean;
  code: "Add" | "Edit";
  selected?: Promotion;
  onClose: () => void;
  onSubmit: (data: Promotion) => void;
}

const ModalAddEditPromotion = ({ open, code, selected, onClose, onSubmit }: Props) => {
  const [title, setTitle] = useState("");
  const [img, setImg] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    if (code === "Edit" && selected) {
      setTitle(selected.title);
      setImg(selected.img);
      setDate(selected.date);
    } else {
      setTitle("");
      setImg("");
      setDate("");
    }
  }, [code, selected]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-[420px]">
        <h2 className="text-xl font-semibold mb-4">
          {code === "Add" ? "Thêm khuyến mãi" : "Sửa khuyến mãi"}
        </h2>

        <input
          className="w-full border p-2 mb-3"
          placeholder="Tiêu đề"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          className="w-full border p-2 mb-3"
          placeholder="Image URL"
          value={img}
          onChange={(e) => setImg(e.target.value)}
        />

        <input
          className="w-full border p-2 mb-4"
          placeholder="Ngày / giờ"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 border rounded">
            Huỷ
          </button>
          <button
            onClick={() =>
              onSubmit({
                id: selected?.id || Date.now(),
                title,
                img,
                date,
              })
            }
            className="px-4 py-2 bg-[#6B7597] text-white rounded"
          >
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalAddEditPromotion;
