// components/ModalAddEditShowDate.tsx
import { useState, useEffect } from "react";
import { Button, Modal, DatePicker, message } from "antd";
import dayjs from "dayjs";
import type { ShowDate } from "../types/type";
import { useAppDispatch, useAppSelector } from "../hooks/Hook";
import { addShowDate, editShowDate } from "../apis/ShowDateApi";
import { getAllShowDates } from "../apis/ShowDateApi";

interface ModalProps {
    open: boolean;
    onClose: () => void;
    date?: ShowDate;
    code: "Add" | "Edit";
}

const ModalAddEditShowDate = ({ open, onClose, date, code }: ModalProps) => {
    const dispatch = useAppDispatch();
    const { dates } = useAppSelector((state) => state.showDates);

    const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(date?.date ? dayjs(date.date) : null);
    const [loading, setLoading] = useState(false);

    // Reset và load data mới khi mở modal
    useEffect(() => {
        if (open) {
            setSelectedDate(date?.date ? dayjs(date.date) : null);
            setLoading(false);
            dispatch(getAllShowDates()); // Đảm bảo data luôn mới nhất
        }
    }, [open, date, dispatch]);

    // Kiểm tra ngày đã qua
    const isPastDate = (current: dayjs.Dayjs) => {
        return current && current < dayjs().startOf("day");
    };

    // Kiểm tra trùng ngày
    const isDuplicate = (checkDate: dayjs.Dayjs) => {
        const formatted = checkDate.format("YYYY-MM-DD");
        return dates.some(
            (d) => d.date === formatted && (code === "Add" || d.id !== date?.id)
        );
    };

    const handleChange = (value: dayjs.Dayjs | null) => {
        if (!value) {
            setSelectedDate(null);
            message.info("Vui lòng chọn ngày chiếu");
            return;
        }

        if (isPastDate(value)) {
            message.error("Không thể chọn ngày đã qua!");
            setSelectedDate(null);
            return;
        }

        if (isDuplicate(value)) {
            message.warning("Ngày chiếu này đã tồn tại! Vui lòng chọn ngày khác.");
        }

        setSelectedDate(value);
    };

    const handleSubmit = async () => {
        if (!selectedDate) {
            message.error("Vui lòng chọn ngày chiếu hợp lệ");
            return;
        }

        if (isPastDate(selectedDate)) {
            message.error("Không thể lưu ngày đã qua");
            return;
        }

        if (isDuplicate(selectedDate)) {
            message.error("Ngày chiếu đã tồn tại, không thể lưu trùng");
            return;
        }

        setLoading(true);

        try {
            if (code === "Add") {
                await dispatch(addShowDate({ date: selectedDate.format("YYYY-MM-DD") })).unwrap();
                message.success("Thêm ngày chiếu thành công!");
            } else if (code === "Edit" && date) {
                await dispatch(editShowDate({ ...date, date: selectedDate.format("YYYY-MM-DD") })).unwrap();
                message.success("Cập nhật ngày chiếu thành công!");
            }
            onClose();
        } catch {
            message.error("Lưu thất bại. Vui lòng thử lại.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            open={open}
            onCancel={onClose}
            title={code === "Add" ? "Thêm Ngày Chiếu" : "Sửa Ngày Chiếu"}
            footer={[
                <Button key="cancel" onClick={onClose} disabled={loading}>
                    Hủy
                </Button>,
                <Button
                    key="save"
                    type="primary"
                    loading={loading}
                    disabled={
                        loading ||
                        !selectedDate ||
                        isPastDate(selectedDate) ||
                        isDuplicate(selectedDate)
                    }
                    onClick={handleSubmit}
                    className="btn-save-custom"
                >
                    Lưu
                </Button>,
            ]}
        >
            <div className="-mx-6 mt-2.5 mb-5 border-t border-gray-300"></div>

            <div className="mb-6">
                <label className="block font-medium text-[#344054] mb-2">
                    Chọn ngày chiếu:
                </label>
                <DatePicker
                    size="large"
                    value={selectedDate}
                    onChange={handleChange}
                    format="DD/MM/YYYY"
                    placeholder="Chọn ngày"
                    className="w-full"
                    allowClear={false}
                    disabledDate={isPastDate}
                />
                <p className="text-sm text-gray-500 mt-2">
                    Chỉ được chọn từ hôm nay ({dayjs().format("DD/MM/YYYY")}) trở đi
                </p>
            </div>

            <div className="-mx-6 mb-4 mt-5 border-b border-gray-300"></div>
        </Modal>
    );
};

export default ModalAddEditShowDate;