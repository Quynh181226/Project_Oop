// src/components/ModalAddEditMovie.tsx
import {useState, useEffect, type ChangeEvent} from "react";
import { Button, Modal, Input, Select, message, InputNumber } from "antd";
// import { CloseOutlined } from "@ant-design/icons";
import axios from "axios";
import type { Movie, NewMovie } from "../types/type";
import { useAppDispatch, useAppSelector } from "../hooks/Hook";
import { addMovie, editMovie } from "../apis/MovieApi";
import { getAllCategories } from "../apis/GenreApi.ts";
import { getAllShowDates } from "../apis/ShowDateApi";
import { getAllTimeSlots } from "../apis/TimeSlotApi";

const { TextArea } = Input;
const { Option } = Select;

interface ModalProps {
    open: boolean;
    onClose: () => void;
    movie?: Movie;
    code: "Add" | "Edit";
}

const ModalAddEditMovie = ({ open, onClose, movie, code }: ModalProps) => {
    const dispatch = useAppDispatch();
    const { categories } = useAppSelector((state) => state.categories);
    const { dates } = useAppSelector((state) => state.showDates);
    const { slots } = useAppSelector((state) => state.timeSlots);

    const [title, setTitle] = useState(movie?.title || "");
    const [country, setCountry] = useState(movie?.country || "");
    const [director, setDirector] = useState(movie?.director || "");
    const [actors, setActors] = useState(movie?.actors || "");
    const [genres, setGenres] = useState<string[]>(movie?.genres || []);
    const [duration, setDuration] = useState(movie?.duration || 0);
    const [rated, setRated] = useState(movie?.rated || "2D");
    const [releaseDate, setReleaseDate] = useState(movie?.releaseDate || "");
    const [description, setDescription] = useState(movie?.description || "");
    const [trailer, setTrailer] = useState(movie?.trailer || "");
    const [status, setStatus] = useState<"showing" | "coming" | "ended">(movie?.status || "coming");
    const [showDates, setShowDates] = useState<string[]>(movie?.showDates || []);
    const [timeSlots, setTimeSlots] = useState<string[]>(movie?.timeSlots || []);

    const [poster, setPoster] = useState<string>(movie?.poster || "");
    const [posterFile, setPosterFile] = useState<File | null>(null);
    const [displayFileName, setDisplayFileName] = useState<string | null>(null);
    const [previewVisible, setPreviewVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    // const [selectedChar, setSelectedChar] = useState<poster | null>(null);
    //
    // const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        if (open) {
            dispatch(getAllCategories());
            dispatch(getAllShowDates());
            dispatch(getAllTimeSlots());

            setTitle(movie?.title || "");
            setCountry(movie?.country || "");
            setDirector(movie?.director || "");
            setActors(movie?.actors || "");
            setGenres(movie?.genres || []);
            setDuration(movie?.duration || 0);
            setRated(movie?.rated || "2D");
            setReleaseDate(movie?.releaseDate || "");
            setDescription(movie?.description || "");
            setTrailer(movie?.trailer || "");
            setStatus(movie?.status || "coming");
            setShowDates(movie?.showDates || []);
            setTimeSlots(movie?.timeSlots || []);
            setPoster(movie?.poster || "");
            setPosterFile(null);

            if (movie?.poster && code === "Edit") {
                const fileName = movie.poster.split("/").pop()?.split("?")[0] || "poster.jpg";
                setDisplayFileName(fileName);
            } else {
                setDisplayFileName(null);
            }
        }
    }, [open, movie, code, dispatch]);

    // const overlayRef = useRef<HTMLDivElement>(null);

    // const handleClosePopup = () => {
    //     setShowPopup(false);
    //     setSelectedChar(null);
    // };
    //
    // const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    //     if (e.target === e.currentTarget) handleClosePopup();
    // };

    const handleClosePreview = () => setPreviewVisible(false);

    const handlePreviewOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) handleClosePreview();
    };

    const handleInputFile = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
            const file = e.target.files[0];
            setPosterFile(file);
            setPoster(URL.createObjectURL(file));
            setDisplayFileName(file.name);
        }
    };

    const uploadToCloudinary = async () => {
        if (!posterFile) return poster;
        const formData = new FormData();
        formData.append("file", posterFile);
        formData.append("upload_preset", "React_Ra");

        try {
            const res = await axios.post(
                "https://api.cloudinary.com/v1_1/dtxlzevgb/image/upload",
                formData
            );
            return res.data.secure_url;
        } catch {
            message.error("Upload poster thất bại");
            return null;
        }
    };

    const handleSubmit = async () => {
        if (!title.trim() || !director.trim() || duration <= 0 || !poster || genres.length === 0 || showDates.length === 0 || timeSlots.length === 0) {
            message.error("Vui lòng nhập đầy đủ các trường bắt buộc!");
            return;
        }

        setLoading(true);
        const newPoster = await uploadToCloudinary();
        if (posterFile && !newPoster) {
            setLoading(false);
            return;
        }

        const movieData = {
            title: title.trim(),
            country: country.trim(),
            director: director.trim(),
            actors: actors.trim(),
            genres,
            duration,
            rated,
            releaseDate: releaseDate || undefined,     // ← Sửa null → undefined
            description: description.trim() || undefined, // ← Sửa null → undefined
            trailer: trailer.trim() || undefined,         // ← Sửa null → undefined
            status,
            poster: newPoster || poster,
            showDates,
            timeSlots,
        };

        try {
            if (code === "Add") {
                await dispatch(addMovie(movieData as NewMovie)).unwrap();
                message.success("Thêm phim thành công!");
            } else if (movie) {
                await dispatch(editMovie({ ...movie, ...movieData })).unwrap();
                message.success("Cập nhật phim thành công!");
            }
            onClose();
        } catch {
            message.error("Lưu thất bại");
        } finally {
            setLoading(false);
        }
    };
    const handlePreview = () => poster && setPreviewVisible(true);
    // const handleClosePreview = () => setPreviewVisible(false);

    return (
        <>
            <Modal
                open={open}
                onCancel={onClose}
                title={code === "Add" ? "Thêm Phim Mới" : "Sửa Phim"}
                width="80%"
                style={{ maxWidth: 550 }}
                footer={[
                    <Button key="cancel" onClick={onClose} disabled={loading}>Hủy</Button>,
                    <Button key="save" type="primary" loading={loading} onClick={handleSubmit} className="btn-save-custom">Lưu</Button>,
                ]}
                zIndex={1000}
            >
                <div className="-mx-6 mt-2.5 mb-5 border-t border-gray-300"></div>

                <div className="space-y-5 max-h-[65vh] overflow-y-auto pr-3">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block font-medium mb-1">Tên phim <span className="text-red-600">*</span></label>
                            <Input value={title} onChange={(e) => setTitle(e.target.value)} />
                        </div>
                        <div>
                            <label className="block font-medium mb-1">Quốc gia</label>
                            <Input value={country} onChange={(e) => setCountry(e.target.value)} />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block font-medium mb-1">Đạo diễn <span className="text-red-600">*</span></label>
                            <Input value={director} onChange={(e) => setDirector(e.target.value)} />
                        </div>
                        <div>
                            <label className="block font-medium mb-1">Diễn viên</label>
                            <Input value={actors} onChange={(e) => setActors(e.target.value)} />
                        </div>
                    </div>

                    <div>
                        <label className="block font-medium mb-1">Thể loại <span className="text-red-600">*</span></label>
                        <Select mode="multiple" value={genres} onChange={setGenres} className="w-full">
                            {categories.map((cat) => (
                                <Option key={cat.id} value={cat.name}>{cat.name}</Option>
                            ))}
                        </Select>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <label className="block font-medium mb-1">Thời lượng (phút) <span className="text-red-600">*</span></label>
                            <InputNumber min={1} value={duration} onChange={(v) => setDuration(v || 0)} className="w-full" />
                        </div>
                        <div>
                            <label className="block font-medium mb-1">Phân loại</label>
                            <Select value={rated} onChange={setRated} className="w-full">
                                <Option value="2D">2D</Option>
                                <Option value="3D">3D</Option>
                                <Option value="IMAX">IMAX</Option>
                                <Option value="4DX">4DX</Option>
                            </Select>
                        </div>
                        <div>
                            <label className="block font-medium mb-1">Trạng thái</label>
                            <Select value={status} onChange={setStatus} className="w-full">
                                <Option value="coming">Sắp chiếu</Option>
                                <Option value="showing">Đang chiếu</Option>
                                <Option value="ended">Kết thúc</Option>
                            </Select>
                        </div>
                    </div>

                    <div>
                        <label className="block font-medium mb-1">Ngày phát hành</label>
                        <Input type="date" value={releaseDate} onChange={(e) => setReleaseDate(e.target.value)} />
                    </div>

                    <div>
                        <label className="block font-medium mb-1">Mô tả phim</label>
                        <TextArea rows={4} value={description} onChange={(e) => setDescription(e.target.value)} />
                    </div>

                    <div>
                        <label className="block font-medium mb-1">Link trailer YouTube</label>
                        <Input value={trailer} onChange={(e) => setTrailer(e.target.value)} />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block font-medium mb-1">Ngày chiếu <span className="text-red-600">*</span></label>
                            <Select mode="multiple" value={showDates} onChange={setShowDates} className="w-full">
                                {dates.map((d) => (
                                    <Option key={d.id} value={d.date}>{d.date}</Option>
                                ))}
                            </Select>
                        </div>
                        <div>
                            <label className="block font-medium mb-1">Giờ chiếu <span className="text-red-600">*</span></label>
                            <Select mode="multiple" value={timeSlots} onChange={setTimeSlots} className="w-full">
                                {slots.map((s) => (
                                    <Option key={s.id} value={s.time}>{s.time}</Option>
                                ))}
                            </Select>
                        </div>
                    </div>

                    <div>
                        <label className="block font-medium mb-1">Poster phim <span className="text-red-600">*</span></label>
                        <div className="flex flex-row">
                            <Input
                                addonBefore={
                                    <span className="cursor-pointer  hover:text-gray-600 px-3 py-1" onClick={() => document.getElementById("posterFileInput")?.click()}>
                                        Choose file
                                    </span>
                                }
                                addonAfter={
                                    <span onClick={handlePreview} className={`px-3 py-1 select-none ${poster ? "hover:text-gray-600 cursor-pointer" : "text-gray-400 cursor-not-allowed"}`}>
                                        Xem
                                    </span>
                                }
                                placeholder={displayFileName || "No file selected"}
                                readOnly
                                className="cursor-default"
                            />
                            <input id="posterFileInput" type="file" accept="image/*" onChange={handleInputFile} className="hidden" />
                        </div>
                    </div>
                </div>

                <div className="-mx-6 mb-4 mt-5 border-b border-gray-300"></div>
            </Modal>

            {previewVisible && poster && (
                <>
                    <div
                        onClick={handlePreviewOverlayClick}
                        className="fixed inset-0 bg-[rgba(0,0,0,0.45)] z-[1100] duration-300"
                    ></div>
                    <div
                        className="cursor-pointer fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                 bg-white rounded-xl p-6 z-[1101]
                 w-[240px] h-[280px]
                 flex flex-col items-center justify-center
                 shadow-[0_2px_8px_rgba(0,0,0,0.05)]
                 transition-transform duration-300"
                    >
                        <div className="flex flex-col items-center justify-center w-full h-full rounded-xl border border-[#E5E5E5] bg-[#FAFAFA] p-4">
                            <img
                                src={poster}
                                alt="Poster"
                                className="max-w-full max-h-full object-contain rounded-lg"
                            />
                        </div>
                        <div className="flex gap-6 mt-6">
                            <button
                                onClick={handleClosePreview}
                                className="cursor-pointer flex items-center justify-center bg-blue-50 w-10 h-10 rounded-full hover:bg-blue-100 transition-colors"
                            >
                                <svg  xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                      fill="#000000" viewBox="0 0 24 24" >
                                    <path d="M8.71 18.71 15.41 12 8.71 5.29 7.29 6.71 11.59 11 2 11 2 13 11.59 13 7.29 17.29 8.71 18.71z"></path><path d="m13,3v2c3.86,0,7,3.14,7,7s-3.14,7-7,7v2c4.96,0,9-4.04,9-9S17.96,3,13,3Z"></path>
                                </svg>                            </button>
                        </div>
                    </div>
                </>
            )}



        </>
    );
};

export default ModalAddEditMovie;