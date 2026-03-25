// components/ModalDeleteMovie.tsx
import { Button, Modal } from "antd";
import type { Movie } from "../types/type";
import { useAppDispatch } from "../hooks/Hook";
import { deleteMovie } from "../apis/MovieApi";

interface ModalProps {
    open: boolean;
    onClose: () => void;
    movie?: Movie;
}

const ModalDeleteMovie = ({ open, onClose, movie }: ModalProps) => {
    const dispatch = useAppDispatch();

    const handleDelete = () => {
        if (movie) {
            dispatch(deleteMovie(movie.id));
        }
        onClose();
    };

    return (
        <Modal
            open={open}
            onCancel={onClose}
            title="Xác nhận xóa phim"
            footer={[
                <Button key="cancel" onClick={onClose}>Hủy</Button>,
                <Button key="delete" type="primary" className="!bg-red-700" onClick={handleDelete}>
                    Xóa
                </Button>
            ]}
        >
            <div className="-mx-6 mt-2.5 mb-5 border-t border-gray-300"></div>
            <p className="text-base font-normal my-10">
                {/*(ID: {movie?.id})*/}
                Bạn có chắc chắn muốn xóa phim <strong>{movie?.title}</strong>không?
            </p>
            <div className="-mx-6 mb-4 mt-5 border-b border-gray-300"></div>
        </Modal>
        );
};

export default ModalDeleteMovie;