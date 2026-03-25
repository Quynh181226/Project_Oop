// components/ModalDeleteTimeSlot.tsx
import { Button, Modal } from "antd";
import type { TimeSlot } from "../types/type";
import { useAppDispatch } from "../hooks/Hook";
import { deleteTimeSlot } from "../apis/TimeSlotApi";

interface ModalProps {
    open: boolean;
    onClose: () => void;
    slot?: TimeSlot;
}

const ModalDeleteTimeSlot = ({ open, onClose, slot }: ModalProps) => {
    const dispatch = useAppDispatch();

    const handleDelete = () => {
        if (slot) {
            dispatch(deleteTimeSlot(slot.id));
        }
        onClose();
    };

    return (
        <Modal
            open={open}
            onCancel={onClose}
            title="Xác nhận xóa"
            footer={[
                <Button key="cancel" onClick={onClose}>
                    Hủy
                </Button>,
                <Button key="delete" type="primary" className="!bg-red-700"  onClick={handleDelete}>
                    Xóa
                </Button>,
            ]}
        >
            <div className="-mx-6 mt-2.5 mb-5 border-t border-gray-300"></div>
            <p className="text-base my-10">
                Bạn có chắc chắn muốn xóa giờ chiếu <strong>{slot?.time}</strong> không?
            </p>
            <div className="-mx-6 mb-4 mt-5 border-b border-gray-300"></div>
        </Modal>
    );
};

export default ModalDeleteTimeSlot;