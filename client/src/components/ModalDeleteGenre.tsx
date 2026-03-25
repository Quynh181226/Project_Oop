import { Button, Modal } from "antd";
import type { Category } from '../types/type';
import { useAppDispatch } from "../hooks/Hook.ts";
import { deleteCategory } from "../apis/GenreApi.ts";

interface ModalProps {
    open: boolean;
    onClose: () => void;
    category?: Category;
}

const ModalDeleteGenre = ({ open, onClose, category }: ModalProps) => {
    const dispatch = useAppDispatch();

    const handleDelete = () => {
        if (category) {
            dispatch(deleteCategory(category.id));
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
                Bạn có chắc chắn muốn xóa danh mục "<strong>{category?.name}</strong>" không?
            </p>
            <div className="-mx-6 mb-4 mt-5 border-b border-gray-300"></div>
        </Modal>
    );
};

export default ModalDeleteGenre;