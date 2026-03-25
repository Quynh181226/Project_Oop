// components/ModalAddEditTimeSlot.tsx
import { useState, useEffect } from "react";
import { Button, Modal, TimePicker, message } from "antd";
import dayjs from "dayjs";
import type { TimeSlot } from "../types/type";
import { useAppDispatch, useAppSelector } from "../hooks/Hook";
import { addTimeSlot, editTimeSlot } from "../apis/TimeSlotApi";

interface ModalProps {
    open: boolean;
    onClose: () => void;
    slot?: TimeSlot;
    code: "Add" | "Edit";
}

const ModalAddEditTimeSlot = ({ open, onClose, slot, code }: ModalProps) => {
    const dispatch = useAppDispatch();
    const { slots } = useAppSelector((state) => state.timeSlots);

    const [time, setTime] = useState<dayjs.Dayjs | null>(slot?.time ? dayjs(slot.time, "HH:mm") : null);
    const [loading, setLoading] = useState(false);
    const [hasDuplicate, setHasDuplicate] = useState(false);
    const [showWarning, setShowWarning] = useState(false); // Thêm state để quản lý hiển thị cảnh báo

    // Reset state khi mở modal
    useEffect(() => {
        if (open) {
            setTime(slot?.time ? dayjs(slot.time, "HH:mm") : null);
            setHasDuplicate(false);
            setShowWarning(false);
        }
    }, [open, slot]);

    // Kiểm tra trùng mỗi khi time thay đổi
    useEffect(() => {
        if (!time) {
            setHasDuplicate(false);
            setShowWarning(false);
            return;
        }

        const formattedTime = time.format("HH:mm");

        // Kiểm tra duplicate chỉ với các slots đã có trong danh sách
        // (không bao gồm slot hiện tại đang edit)
        const isDuplicate = slots.some((s) => {
            // Trong mode Edit: không tính slot hiện tại
            if (code === "Edit" && slot && s.id === slot.id) {
                return false;
            }
            return s.time === formattedTime;
        });

        setHasDuplicate(isDuplicate);
        setShowWarning(isDuplicate); // Chỉ hiển thị cảnh báo khi thực sự trùng
    }, [time, slots, code, slot]);

    const handleSubmit = async () => {
        if (!time) {
            message.error("Vui lòng chọn giờ chiếu");
            return;
        }

        if (hasDuplicate) {
            message.error("Không thể lưu vì giờ chiếu đã tồn tại");
            return;
        }

        setLoading(true);

        try {
            if (code === "Add") {
                await dispatch(addTimeSlot({ time: time.format("HH:mm") })).unwrap();
                message.success("Thêm giờ chiếu thành công!");
            } else if (code === "Edit" && slot) {
                await dispatch(editTimeSlot({ ...slot, time: time.format("HH:mm") })).unwrap();
                message.success("Cập nhật giờ chiếu thành công!");
            }
            onClose();
        } catch (error) {
            message.error("Có lỗi xảy ra khi lưu dữ liệu");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    // Xử lý khi người dùng thay đổi time
    const handleTimeChange = (newTime: dayjs.Dayjs | null) => {
        setTime(newTime);
        // Nếu có cảnh báo đang hiển thị, ẩn đi khi người dùng bắt đầu chọn lại
        if (showWarning) {
            setShowWarning(false);
        }
    };

    return (
        <Modal
            open={open}
            onCancel={onClose}
            title={code === "Add" ? "Thêm Giờ Chiếu" : "Sửa Giờ Chiếu"}
            footer={[
                <Button key="cancel" onClick={onClose} disabled={loading}>
                    Hủy
                </Button>,
                <Button
                    key="save"
                    type="primary"
                    loading={loading}
                    disabled={loading || hasDuplicate || !time}
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
                    Chọn giờ chiếu:
                </label>
                <TimePicker
                    value={time}
                    size="large"
                    onChange={handleTimeChange} // Sử dụng hàm xử lý mới
                    format="HH:mm"
                    placeholder="Chọn giờ (HH:mm)"
                    className="w-full cursor-pointer"
                    minuteStep={5}
                    showNow={false}
                    allowClear={false}
                />
                <p className="text-sm text-gray-500 mt-2">
                    {showWarning ? (
                        <span className="text-red-500 font-medium">
                            Giờ này đã tồn tại, vui lòng chọn giờ khác
                        </span>
                    ) : (
                        "Ví dụ: 09:00, 20:30"
                    )}
                </p>

                {/* Thêm thông báo chi tiết hơn */}
                {hasDuplicate && (
                    <div className="mt-2 text-sm text-red-600 bg-red-50 p-2 rounded">
                        <p>Giờ chiếu <strong>{time?.format("HH:mm")}</strong> đã tồn tại trong hệ thống.</p>
                        <p className="mt-1">Vui lòng chọn một giờ khác để tiếp tục.</p>
                    </div>
                )}
            </div>

            <div className="-mx-6 mb-4 mt-5 border-b border-gray-300"></div>
        </Modal>
    );
};

export default ModalAddEditTimeSlot;