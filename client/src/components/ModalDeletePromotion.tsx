
interface Props {
  open: boolean;
  darkMode: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ModalDeletePromotion = ({
                                open,
                                darkMode,
                                onClose,
                                onConfirm,
                              }: Props) => {
  if (!open) return null;

  return (
      <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
        <div
            className={`w-[360px] p-6 rounded-xl ${
                darkMode ? "bg-[#302E36] text-white" : "bg-white"
            }`}
        >
          <h3 className="text-lg font-semibold mb-4">
            Bạn chắc chắn muốn xoá?
          </h3>

          <div className="flex justify-end gap-2">
            <button onClick={onClose} className="px-4 py-2 border rounded">
              Huỷ
            </button>
            <button
                onClick={onConfirm}
                className="px-4 py-2 bg-red-600 text-white rounded"
            >
              Xoá
            </button>
          </div>
        </div>
      </div>
  );
};

export default ModalDeletePromotion;

    