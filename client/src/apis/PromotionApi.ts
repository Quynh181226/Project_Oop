import axios from "axios";
import type { Promotion } from "../types/type";

// Tạo instance axios chung
const api = axios.create({
  baseURL: "http://localhost:8080",
  timeout: 5000,
});

// Lấy danh sách khuyến mãi
export const getPromotions = async (): Promise<Promotion[]> => {
  try {
    const res = await api.get<Promotion[]>("/promotion");
    return res.data || [];
  } catch (error) {
    console.error("Lỗi khi lấy promotions:", error);
    return []; // Trả về mảng rỗng nếu có lỗi
  }
};
