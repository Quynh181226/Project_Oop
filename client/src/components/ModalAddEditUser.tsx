// components/ModalAddEditUser.tsx
import { useState, useEffect, type ChangeEvent } from "react";
import { Button, Modal, Input, Select, message } from "antd";
import axios from "axios";
import type { User, NewUser } from "../types/type";
import { useAppDispatch, useAppSelector } from "../hooks/Hook";
import { addUser, editUser } from "../apis/UserApi.ts";

const { Option } = Select;

interface ModalProps {
    open: boolean;
    onClose: () => void;
    user?: User;
    code: "Add" | "Edit";
}

const ModalAddEditUser = ({ open, onClose, user, code }: ModalProps) => {
    const dispatch = useAppDispatch();
    const { users } = useAppSelector((state) => state.user);

    const [fullName, setFullName] = useState(user?.fullName || "");
    const [email, setEmail] = useState(user?.email || "");
    const [phone, setPhone] = useState(user?.phone || "");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [role, setRole] = useState<"user" | "admin">(user?.role || "user");
    const [status, setStatus] = useState<"active" | "blocked">(user?.status || "active");

    const [avatar, setAvatar] = useState<string>(user?.avatar || "");
    const [file, setFile] = useState<File | null>(null);
    const [displayFileName, setDisplayFileName] = useState<string | null>(null);

    const [previewVisible, setPreviewVisible] = useState(false); // Modal xem ảnh lớn

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setFullName(user?.fullName || "");
        setEmail(user?.email || "");
        setPhone(user?.phone || "");
        setPassword("");
        setConfirmPassword("");
        setRole(user?.role || "user");
        setStatus(user?.status || "active");
        setAvatar(user?.avatar || "");
        setFile(null);

        if (user?.avatar && code === "Edit") {
            const fileName = user.avatar.split("/").pop()?.split("?")[0] || "avatar.jpg";
            setDisplayFileName(fileName);
        } else {
            setDisplayFileName(null);
        }
    }, [open, user, code]);

    const handleInputFile = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0];
            setFile(selectedFile);
            setAvatar(URL.createObjectURL(selectedFile));
            setDisplayFileName(selectedFile.name);
        }
    };

    const uploadToCloudinary = async () => {
        if (!file) return avatar;

        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "React_Ra");

        try {
            const res = await axios.post(
                "https://api.cloudinary.com/v1_1/dtxlzevgb/image/upload",
                formData
            );
            return res.data.secure_url as string;
        } catch (err) {
            message.error("Upload avatar thất bại");
            return null;
        }
    };

    const checkEmailDuplicate = () => {
        return users.some((u) => u.email === email && u.id !== user?.id);
    };

    const handleSubmit = async () => {
        if (!fullName.trim() || !email.trim()) {
            message.error("Vui lòng nhập đầy đủ họ tên và email");
            return;
        }

        if (code === "Add" && (!password || password !== confirmPassword)) {
            message.error("Mật khẩu không khớp hoặc để trống");
            return;
        }

        if (checkEmailDuplicate()) {
            message.error("Email đã tồn tại");
            return;
        }

        setLoading(true);

        const avatarUrl = await uploadToCloudinary();
        if (file && !avatarUrl) {
            setLoading(false);
            return;
        }

        const userData: any = {
            fullName: fullName.trim(),
            email: email.trim(),
            phone: phone.trim() || null,
            role,
            status,
            avatar: avatarUrl || avatar || null,
        };

        if (code === "Add") {
            userData.password = password;
        }

        try {
            if (code === "Add") {
                await dispatch(addUser(userData as NewUser)).unwrap();
                message.success("Thêm người dùng thành công!");
            } else if (user) {
                await dispatch(editUser({ ...user, ...userData })).unwrap();
                message.success("Cập nhật người dùng thành công!");
            }
            onClose();
        } catch {
            message.error("Lưu thất bại");
        } finally {
            setLoading(false);
        }
    };

    const handlePreview = () => {
        if (avatar) {
            setPreviewVisible(true);
        }
    };

    const handleClosePreview = (e?: React.MouseEvent) => {
        if (e) e.stopPropagation();
        setPreviewVisible(false);
    };

    return (
        <>
            <Modal
                open={open}
                onCancel={onClose}
                title={code === "Add" ? "Thêm Người Dùng" : "Sửa Người Dùng"}
                width={600}
                footer={[
                    <Button key="cancel" onClick={onClose} disabled={loading}>
                        Hủy
                    </Button>,
                    <Button key="save" type="primary" loading={loading} onClick={handleSubmit}>
                        Lưu
                    </Button>,
                ]}
                zIndex={1000} // Đảm bảo modal chính có z-index chuẩn
            >
                <div className="space-y-4">
                    <div>
                        <label className="block font-medium mb-1">Họ tên</label>
                        <Input value={fullName} onChange={(e) => setFullName(e.target.value)} />
                    </div>

                    <div>
                        <label className="block font-medium mb-1">Email</label>
                        <Input value={email} onChange={(e) => setEmail(e.target.value)} type="email" />
                    </div>

                    <div>
                        <label className="block font-medium mb-1">Số điện thoại</label>
                        <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
                    </div>

                    {code === "Add" && (
                        <>
                            <div>
                                <label className="block font-medium mb-1">Mật khẩu</label>
                                <Input.Password value={password} onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <div>
                                <label className="block font-medium mb-1">Xác nhận mật khẩu</label>
                                <Input.Password
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>
                        </>
                    )}

                    <div>
                        <label className="block font-medium mb-1">Vai trò</label>
                        <Select value={role} onChange={setRole} className="w-full">
                            <Option value="user">User</Option>
                            <Option value="admin">Admin</Option>
                        </Select>
                    </div>

                    <div>
                        <label className="block font-medium mb-1">Trạng thái</label>
                        <Select value={status} onChange={setStatus} className="w-full">
                            <Option value="active">Active</Option>
                            <Option value="blocked">Blocked</Option>
                        </Select>
                    </div>

                    {/* Avatar: Input + Choose file + Xem */}
                    <div>
                        <label className="block font-medium mb-1">Avatar</label>
                        <div className="flex flex-row">
                            <Input
                                addonBefore={
                                    <span
                                        className="cursor-pointer text-blue-600 hover:text-blue-800 px-3 py-1"
                                        onClick={() => document.getElementById("avatarFileInput")?.click()}
                                    >
                                        Choose file
                                    </span>
                                }
                                addonAfter={
                                    <span
                                        onClick={handlePreview}
                                        className={`px-3 py-1 select-none ${
                                            avatar
                                                ? "text-blue-600 hover:text-blue-800 cursor-pointer"
                                                : "text-gray-400 cursor-not-allowed"
                                        }`}
                                    >
                                        Xem
                                    </span>
                                }
                                placeholder={displayFileName || "No file selected"}
                                readOnly
                                className="cursor-default"
                            />
                            <input
                                id="avatarFileInput"
                                type="file"
                                accept="image/*"
                                onChange={handleInputFile}
                                className="hidden"
                            />
                        </div>
                    </div>
                </div>
            </Modal>

            {previewVisible && avatar && (
                <>
                    <div onClick={handleClosePreview} className="fixed inset-0 bg-[rgba(0,0,0,0.45)] z-[1100] duration-300"></div>
                    <div className="cursor-pointer fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2   bg-white rounded-xl p-6 z-[1101] w-[240px] h-[280px] flex flex-col items-center justify-center shadow-[0_2px_8px_rgba(0,0,0,0.05)]  transition-transform duration-300">
                        <div className="flex flex-col items-center justify-center w-full h-full rounded-xl border border-[#E5E5E5] bg-[#FAFAFA] p-4">
                            <img src={avatar} alt="Avatar" className="max-w-full max-h-full object-contain rounded-lg"/>
                        </div>
                        <div className="flex gap-6 mt-6">
                            <button onClick={handleClosePreview} className="cursor-pointer flex items-center justify-center bg-blue-50 w-10 h-10 rounded-full hover:bg-blue-100 transition-colors">
                                <svg  xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#000000" viewBox="0 0 24 24" >
                                    <path d="M8.71 18.71 15.41 12 8.71 5.29 7.29 6.71 11.59 11 2 11 2 13 11.59 13 7.29 17.29 8.71 18.71z"></path><path d="m13,3v2c3.86,0,7,3.14,7,7s-3.14,7-7,7v2c4.96,0,9-4.04,9-9S17.96,3,13,3Z"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default ModalAddEditUser;