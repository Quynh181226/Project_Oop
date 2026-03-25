import { useState, useEffect } from "react";
import { Button, Input, Modal, message } from "antd";
import type { Category } from "../types/type";
import { useAppDispatch } from "../hooks/Hook";
import { addCategory, editCategory } from "../apis/GenreApi.ts";

interface ModalProps {
    open: boolean;
    onClose: () => void;
    category?: Category;
    code: "Add" | "Edit";
}

export const ModalAddEditGenre = ({ open, onClose, category, code }: ModalProps) => {
    const dispatch = useAppDispatch();

    const [name, setName] = useState(category?.name ?? "");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setName(category?.name ?? "");
        setError(null);
    }, [open, category, code]);

    const handleSubmit = async () => {
        if (!name.trim()) {
            setError("Tên danh mục không được để trống");
            return;
        }

        setLoading(true);
        setError(null);

        const categoryData = { name };

        try {
            if (code === "Add") {
                await dispatch(addCategory(categoryData));
                message.success("Thêm danh mục thành công");
            } else if (code === "Edit" && category) {
                await dispatch(editCategory({ ...category, name }));
                message.success("Cập nhật danh mục thành công");
            }
            onClose();
        } catch {
            message.error("Có lỗi xảy ra khi lưu danh mục");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            open={open}
            onCancel={onClose}
            title={code === "Add" ? "Thêm danh mục" : "Sửa danh mục"}
            footer={[
                <Button key="cancel" onClick={onClose}>
                    Hủy
                </Button>,
                <Button
                    key="save"
                    type="primary"
                    loading={loading}
                    onClick={handleSubmit}
                    className="btn-save-custom"
                >
                    Lưu
                </Button>,
            ]}
        >
            <div className="-mx-6 mt-2.5 mb-5 border-t border-gray-300"></div>

            <div className="mb-4">
                <label className="block font-medium text-[#344054] mb-2">
                    Tên danh mục:
                </label>
                <Input
                    value={name}
                    size="large"
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nhập tên danh mục"
                />
                {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
            </div>

            <div className="-mx-6 mb-4 mt-5 border-b border-gray-300"></div>
        </Modal>
    );
};