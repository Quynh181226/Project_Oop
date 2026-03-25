import { Button, Modal } from "antd";
import type { Festival } from "../types/type.ts";
import { useAppDispatch } from "../hooks/Hook";
import { deleteFestival } from "../apis/festivalApi.ts";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  festival?: Festival;
  // darkMode: boolean;
}

const ModalDeleteFestival = ({ open, onClose, festival }: ModalProps) => {
  const dispatch = useAppDispatch();

  const handleDelete = () => {
    if (festival) dispatch(deleteFestival(festival.id));
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
        Bạn có chắc chắn muốn xóa festival "<strong>{festival?.title}</strong>" không?
      </p>
      <div className="-mx-6 mb-4 mt-5 border-b border-gray-300"></div>
    </Modal>
  );
};

export default ModalDeleteFestival;
