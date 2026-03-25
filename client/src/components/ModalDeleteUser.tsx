// components/ModalDeleteUser.tsx
import { Button, Modal } from "antd";
import type { User } from "../types/type";
import { useAppDispatch } from "../hooks/Hook";
import { deleteUser } from "../apis/UserApi.ts";

interface ModalProps {
    open: boolean;
    onClose: () => void;
    user?: User;
}

const ModalDeleteUser = ({ open, onClose, user }: ModalProps) => {
    const dispatch = useAppDispatch();

    const handleDelete = () => {
        if (user) {
            dispatch(deleteUser(user.id));
        }
        onClose();
    };

    return (
        <Modal
            open={open}
            onCancel={onClose}
            title="Xác nhận xóa"
            footer={[
                <Button key="cancel" onClick={onClose}>Hủy</Button>,
                <Button key="delete" type="primary" className="!bg-red-700" onClick={handleDelete}>
                    Xóa
                </Button>
            ]}
        >
            <div className="-mx-6 mt-2.5 mb-5 border-t border-gray-300"></div>
            <p className="text-base font-normal my-10">
                Bạn có chắc chắn muốn xóa người dùng <strong>{user?.fullName}</strong> không?        </p>
            <div className="-mx-6 mb-4 mt-5 border-b border-gray-300"></div>
        </Modal>
    );
};

export default ModalDeleteUser;