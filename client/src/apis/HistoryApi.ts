import axios from "axios"
import type { BookingHistory } from "../types/type"

export const getBookingHistory = async (): Promise<BookingHistory[]> => {
  const res = await axios.get("http://localhost:8080/bookings");

  const mapped = res.data.map((item: BookingHistory) => ({
    ...item,
    email: `user${item.id}@gmail.com`,
  }));

  return mapped;
};

