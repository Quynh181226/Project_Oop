import { useEffect, useState } from "react";
import { Button, Input, Modal, message } from "antd";
import type { Festival, FestivalDetail } from "../types/type";
import axiosConfig from "../utils/axiosConfig";

const { TextArea } = Input;

type Props = {
  open: boolean;
  onClose: () => void;
  festival?: Festival;
  darkMode: boolean;
};

function buildDefaultDetail(festivalItem: Festival): FestivalDetail {
  const desc = (festivalItem.description || "").trim();
  return {
    id: festivalItem.id,
    title: festivalItem.title,
    subtitle: festivalItem.title,
    paragraphs: desc ? [desc] : [],
    ticketInfo: [],
    extraInfo: [],
    link: "",
    banner: festivalItem.image,
    scheduleImage: "",
  };
}

export default function ModalEditFestivalDetail({ open, onClose, festival, darkMode }: Props) {
  const [loading, setLoading] = useState(false);
  const [detail, setDetail] = useState<FestivalDetail | null>(null);

  useEffect(() => {
    const run = async () => {
      if (!open || !festival) return;

      setLoading(true);
      try {
        const res = await axiosConfig.get<FestivalDetail>(`/festivalDetails/${festival.id}`);
        setDetail(res.data);
      } catch {
        setDetail(buildDefaultDetail(festival));
      } finally {
        setLoading(false);
      }
    };

    run();
  }, [open, festival]);

  const setField = <K extends keyof FestivalDetail>(key: K, value: FestivalDetail[K]) => {
    setDetail((prev) => (prev ? { ...prev, [key]: value } : prev));
  };

  const updateArrayItem = (key: "paragraphs" | "ticketInfo" | "extraInfo", index: number, value: string) => {
    setDetail((prev) => {
      if (!prev) return prev;
      const next = [...(prev[key] || [])];
      next[index] = value;
      return { ...prev, [key]: next };
    });
  };

  const addArrayItem = (key: "paragraphs" | "ticketInfo" | "extraInfo") => {
    setDetail((prev) => {
      if (!prev) return prev;
      return { ...prev, [key]: [...(prev[key] || []), ""] };
    });
  };

  const removeArrayItem = (key: "paragraphs" | "ticketInfo" | "extraInfo", index: number) => {
    setDetail((prev) => {
      if (!prev) return prev;
      const next = [...(prev[key] || [])];
      next.splice(index, 1);
      return { ...prev, [key]: next };
    });
  };

  const handleSave = async () => {
    if (!festival || !detail) return;

    if (!detail.title.trim()) return message.error("Thiếu tiêu đề");
    if (!detail.banner.trim()) return message.error("Thiếu ảnh banner");

    setLoading(true);
    try {
      try {
        await axiosConfig.put(`/festivalDetails/${festival.id}`, { ...detail, id: festival.id });
      } catch {
        await axiosConfig.post(`/festivalDetails`, { ...detail, id: festival.id });
      }

      message.success("Lưu chi tiết liên hoan phim thành công!");
      onClose();
    } catch (e) {
      console.error(e);
      message.error("Lưu thất bại");
    } finally {
      setLoading(false);
    }
  };

  const modalBg = darkMode ? "#2b2f36" : "#fff";

  return (
    <Modal
      open={open}
      onCancel={onClose}
      title={<span className={darkMode ? "text-white" : ""}>{`Chỉnh sửa chi tiết liên hoan phim (ID: ${festival?.id ?? ""})`}</span>}
      width={900}
      styles={{
        content: { background: modalBg },
        header: { background: modalBg },
        body: { background: modalBg },
        footer: { background: modalBg },
      }}
      footer={[
        <Button key="cancel" onClick={onClose} disabled={loading}>
          Hủy
        </Button>,
        <Button
          key="save"
          loading={loading}
          onClick={handleSave}
          className="!bg-[#6B7597] hover:!bg-[#565D7C] !border-[#6B7597] hover:!border-[#565D7C] !text-white"
        >
          Lưu
        </Button>,
      ]}
    >
      <div className={`-mx-6 mt-2.5 mb-5 border-t ${darkMode ? "border-gray-600" : "border-gray-200"}`} />

      {!detail ? (
        <div className={`py-10 text-center ${darkMode ? "text-gray-200" : ""}`}>{loading ? "Đang tải..." : "Không có dữ liệu"}</div>
      ) : (
        <div className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={`block font-medium mb-2 ${darkMode ? "text-gray-100" : "text-[#344054]"}`}>Tiêu đề</label>
              <Input size="large" value={detail.title} onChange={(e) => setField("title", e.target.value)} />
            </div>

            <div>
              <label className={`block font-medium mb-2 ${darkMode ? "text-gray-100" : "text-[#344054]"}`}>Tiêu đề phụ</label>
              <Input size="large" value={detail.subtitle || ""} onChange={(e) => setField("subtitle", e.target.value)} />
            </div>

            <div>
              <label className={`block font-medium mb-2 ${darkMode ? "text-gray-100" : "text-[#344054]"}`}>Ảnh banner (URL)</label>
              <Input size="large" value={detail.banner} onChange={(e) => setField("banner", e.target.value)} />
            </div>

            <div>
              <label className={`block font-medium mb-2 ${darkMode ? "text-gray-100" : "text-[#344054]"}`}>Ảnh lịch chiếu (URL)</label>
              <Input size="large" value={detail.scheduleImage || ""} onChange={(e) => setField("scheduleImage", e.target.value)} />
            </div>

            <div className="md:col-span-2">
              <label className={`block font-medium mb-2 ${darkMode ? "text-gray-100" : "text-[#344054]"}`}>Đường dẫn tham khảo</label>
              <Input size="large" value={detail.link || ""} onChange={(e) => setField("link", e.target.value)} />
            </div>
          </div>

          <div className={`rounded-lg border p-4 ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
            <div className="flex items-center justify-between mb-3">
              <h3 className={`font-semibold ${darkMode ? "text-gray-100" : "text-[#344054]"}`}>Nội dung bài viết</h3>
              <Button onClick={() => addArrayItem("paragraphs")}>+ Thêm đoạn</Button>
            </div>

            <div className="space-y-3">
              {(detail.paragraphs || []).map((p, idx) => (
                <div key={idx} className="flex gap-2">
                  <TextArea value={p} onChange={(e) => updateArrayItem("paragraphs", idx, e.target.value)} rows={3} placeholder={`Đoạn ${idx + 1}`} />
                  <Button danger onClick={() => removeArrayItem("paragraphs", idx)}>Xóa</Button>
                </div>
              ))}
            </div>
          </div>

          <div className={`rounded-lg border p-4 ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
            <div className="flex items-center justify-between mb-3">
              <h3 className={`font-semibold ${darkMode ? "text-gray-100" : "text-[#344054]"}`}>Thông tin vé</h3>
              <Button onClick={() => addArrayItem("ticketInfo")}>+ Thêm dòng</Button>
            </div>

            <div className="space-y-2">
              {(detail.ticketInfo || []).map((t, idx) => (
                <div key={idx} className="flex gap-2">
                  <Input size="large" value={t} onChange={(e) => updateArrayItem("ticketInfo", idx, e.target.value)} placeholder={`Dòng ${idx + 1}`} />
                  <Button danger onClick={() => removeArrayItem("ticketInfo", idx)}>Xóa</Button>
                </div>
              ))}
            </div>
          </div>

          <div className={`rounded-lg border p-4 ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
            <div className="flex items-center justify-between mb-3">
              <h3 className={`font-semibold ${darkMode ? "text-gray-100" : "text-[#344054]"}`}>Thông tin bổ sung</h3>
              <Button onClick={() => addArrayItem("extraInfo")}>+ Thêm dòng</Button>
            </div>

            <div className="space-y-2">
              {(detail.extraInfo || []).map((t, idx) => (
                <div key={idx} className="flex gap-2">
                  <Input size="large" value={t} onChange={(e) => updateArrayItem("extraInfo", idx, e.target.value)} placeholder={`Dòng ${idx + 1}`} />
                  <Button danger onClick={() => removeArrayItem("extraInfo", idx)}>Xóa</Button>
                </div>
              ))}
            </div>
          </div>

          <div className={`rounded-lg border p-4 ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
            <h3 className={`font-semibold mb-3 ${darkMode ? "text-gray-100" : "text-[#344054]"}`}>Xem trước ảnh</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <img src={detail.banner} alt="banner" className="w-full h-48 object-cover rounded" />
              {detail.scheduleImage ? (
                <img src={detail.scheduleImage} alt="schedule" className="w-full h-48 object-cover rounded" />
              ) : (
                <div className={`w-full h-48 rounded flex items-center justify-center ${darkMode ? "bg-[#0B1220] text-gray-400" : "bg-gray-50 text-gray-400"}`}>
                  Chưa có ảnh lịch chiếu
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <div className={`-mx-6 mb-2 mt-5 border-b ${darkMode ? "border-gray-600" : "border-gray-200"}`} />
    </Modal>
  );
}
