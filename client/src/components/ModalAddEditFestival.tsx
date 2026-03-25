import { useEffect, useMemo, useState } from "react";
import { Button, Modal, Input, DatePicker, TimePicker, message } from "antd";
import dayjs, { Dayjs } from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import type { Festival } from "../types/type.ts";
import { useAppDispatch, useAppSelector } from "../hooks/Hook";
import { addFestival, editFestival } from "../apis/festivalApi.ts";

dayjs.extend(customParseFormat);

const { TextArea } = Input;

interface ModalProps {
  open: boolean;
  onClose: () => void;
  festival?: Festival;
  code: "Add" | "Edit";
  darkMode: boolean;
}

// parse "HH:mm DD/MM/YYYY"
function parseFestivalDateTime(input?: string): { time: Dayjs | null; date: Dayjs | null } {
  if (!input) return { time: null, date: null };
  const t = dayjs(input, "HH:mm DD/MM/YYYY", true);
  if (!t.isValid()) return { time: null, date: null };
  return { time: t, date: t };
}

const ModalAddEditFestival = ({ open, onClose, festival, code, darkMode }: ModalProps) => {
  const dispatch = useAppDispatch();
  const { festivals } = useAppSelector((state) => state.festivals);

  const [title, setTitle] = useState("");
  const [dateValue, setDateValue] = useState<Dayjs | null>(null);
  const [timeValue, setTimeValue] = useState<Dayjs | null>(null);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open) return;

    setTitle(festival?.title || "");
    setDescription(festival?.description || "");
    setImage(festival?.image || "");

    const parsed = parseFestivalDateTime(festival?.date);
    setDateValue(parsed.date);
    setTimeValue(parsed.time);
  }, [open, festival]);

  const hasDuplicateTitle = useMemo(() => {
    const t = title.trim().toLowerCase();
    if (!t) return false;

    return festivals.some(
      (f) =>
        f.title.trim().toLowerCase() === t &&
        (code === "Add" || f.id !== festival?.id)
    );
  }, [title, festivals, code, festival?.id]);

  const handleSubmit = async () => {
    const t = title.trim();
    const img = image.trim();
    const desc = description.trim();

    if (!t) return message.error("Vui lòng nhập tiêu đề");
    if (!dateValue) return message.error("Vui lòng chọn ngày");
    if (!timeValue) return message.error("Vui lòng chọn giờ");
    if (!img) return message.error("Vui lòng nhập link ảnh");

    if (hasDuplicateTitle) {
      return message.error("Tiêu đề festival đã tồn tại, vui lòng đổi tiêu đề khác");
    }

    const dateTime = `${timeValue.format("HH:mm")} ${dateValue.format("DD/MM/YYYY")}`;

    setLoading(true);
    try {
      if (code === "Add") {
        await dispatch(addFestival({ title: t, date: dateTime, description: desc, image: img })).unwrap();
        message.success("Thêm festival thành công!");
      } else if (festival) {
        await dispatch(editFestival({ ...festival, title: t, date: dateTime, description: desc, image: img })).unwrap();
        message.success("Cập nhật festival thành công!");
      }

      onClose();
    } catch {
      message.error("Có lỗi xảy ra khi lưu dữ liệu");
    } finally {
      setLoading(false);
    }
  };

  const modalBg = darkMode ? "#2b2f36" : "#fff";

  return (
    <Modal
      open={open}
      onCancel={onClose}
      title={<span className={darkMode ? "text-white" : ""}>{code === "Add" ? "Thêm Festival" : "Sửa Festival"}</span>}
      styles={{
        content: { background: modalBg },
        header: { background: modalBg },
        body: { background: modalBg },
        footer: { background: modalBg },
      }}
      footer={[
        <Button key="cancel" onClick={onClose} disabled={loading}>
          Hủy
        </Button>,
        <Button
          key="save"
          loading={loading}
          onClick={handleSubmit}
          className="!bg-[#6B7597] hover:!bg-[#565D7C] !border-[#6B7597] hover:!border-[#565D7C] !text-white"
        >
          Lưu
        </Button>,
      ]}
    >
      <div className={`-mx-6 mt-2.5 mb-5 border-t ${darkMode ? "border-gray-600" : "border-gray-300"}`} />

      <div className="space-y-4">
        <div>
          <label className={`block font-medium mb-2 ${darkMode ? "text-gray-100" : "text-[#344054]"}`}>Tiêu đề</label>
          <Input size="large" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Nhập tiêu đề festival" />
          <p className={`text-sm mt-2 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
            {hasDuplicateTitle ? <span className="text-red-500 font-medium">⚠ Tiêu đề đã tồn tại, vui lòng đổi</span> : "Ví dụ: Liên hoan phim Châu Âu..."}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className={`block font-medium mb-2 ${darkMode ? "text-gray-100" : "text-[#344054]"}`}>Ngày</label>
            <DatePicker size="large" value={dateValue} onChange={setDateValue} format="DD/MM/YYYY" className="w-full" />
          </div>

          <div>
            <label className={`block font-medium mb-2 ${darkMode ? "text-gray-100" : "text-[#344054]"}`}>Giờ</label>
            <TimePicker size="large" value={timeValue} onChange={setTimeValue} format="HH:mm" minuteStep={5} showNow={false} className="w-full" />
          </div>
        </div>

        <div>
          <label className={`block font-medium mb-2 ${darkMode ? "text-gray-100" : "text-[#344054]"}`}>Ảnh (URL)</label>
          <Input size="large" value={image} onChange={(e) => setImage(e.target.value)} />
        </div>

        <div>
          <label className={`block font-medium mb-2 ${darkMode ? "text-gray-100" : "text-[#344054]"}`}>Mô tả</label>
          <TextArea rows={4} value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
      </div>

      <div className={`-mx-6 mb-4 mt-5 border-b ${darkMode ? "border-gray-600" : "border-gray-300"}`} />
    </Modal>
  );
};

export default ModalAddEditFestival;
