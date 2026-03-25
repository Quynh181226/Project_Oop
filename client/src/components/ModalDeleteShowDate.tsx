// components/ModalDeleteShowDate.tsx
import { Button, Modal } from "antd";
import dayjs from "dayjs";
import type { ShowDate } from "../types/type";
import { useAppDispatch } from "../hooks/Hook";
import { deleteShowDate } from "../apis/ShowDateApi";

interface ModalProps {
    open: boolean;
    onClose: () => void;
    date?: ShowDate;
}

const ModalDeleteShowDate = ({ open, onClose, date }: ModalProps) => {
    const dispatch = useAppDispatch();

    const handleDelete = () => {
        if (date) {
            dispatch(deleteShowDate(date.id));
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
                <Button key="delete"  type="primary" className="!bg-red-700"  onClick={handleDelete}>
                    Xóa
                </Button>,
            ]}
        >
            <div className="-mx-6 mt-2.5 mb-5 border-t border-gray-300"></div>
            <p className="text-base my-10">
                Bạn có chắc chắn muốn xóa ngày chiếu{" "}
                <strong>{date ? dayjs(date.date).format("DD/MM/YYYY") : ""}</strong> không?
            </p>
            <div className="-mx-6 mb-4 mt-5 border-b border-gray-300"></div>
        </Modal>
    );
};

export default ModalDeleteShowDate;