// ! bản hoàn chỉnh nhất
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import { Footer } from "../components/Footer";
import type { Festival } from "../types/type.ts";
import { getFestivals } from "../apis/festivalApi.ts";

const ITEMS = 5;

export default function Festival() {
  const [data, setData] = useState<Festival[]>([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    getFestivals().then(setData);
  }, []);

  const start = (page - 1) * ITEMS;
  const list = data.slice(start, start + ITEMS);
  const total = Math.ceil(data.length / ITEMS);

  return (
    <div className="min-h-screen bg-[#1e1e1e] text-white">
      <Header />

      {/* Banner */}
      <div className="pt-20">
        <img
          src="https://res.cloudinary.com/drnolvz6g/image/upload/v1765501272/image_yhavps.png"
          className="w-full"
          alt="Festival banner"
        />
      </div>

      {/* Content */}
      <div className="max-w-[1400px] mx-auto px-6 my-8">
        <div className="w-full my-8 sm:my-10 lg:my-[50px] flex flex-col gap-6">
          {list.map((item) => (
            <div
              key={item.id}
              className="
                flex flex-col sm:flex-row
                gap-4 sm:gap-5
                border-b border-[#4a4a4a]
                pb-6
              "
            >
              {/* Image */}
              <Link
                to={`/festivals/${item.id}`}
                className="w-full sm:w-[200px] flex-shrink-0"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="
                    w-full
                    rounded-md
                    hover:scale-105 sm:hover:scale-110
                    transform transition
                    cursor-pointer
                  "
                  onError={(e) =>
                    (e.currentTarget.src = "/assets/images/fallback.png")
                  }
                />
              </Link>

              {/* Text */}
              <div className="flex-1">
                {/* Title + Date */}
                <div
                  className="
                    flex flex-col
                    lg:flex-row lg:items-center
                    gap-1 lg:gap-2
                    mb-2
                  "
                >
                  <Link
                    to={`/festivals/${item.id}`}
                    className="
                      text-base sm:text-lg
                      font-semibold
                      flex-1
                      hover:text-[#e50914]
                      cursor-pointer
                    "
                  >
                    {item.title}
                  </Link>

                  <p
                    className="
                      text-xs sm:text-sm text-[#D1D5DB]
                      lg:text-right
                    "
                  >
                    {item.date}
                  </p>
                </div>

                {/* Description */}
                <p className="text-sm sm:text-[15px] leading-relaxed text-[#E5E7EB]">
                  {item.description || "Thông tin chi tiết sẽ được cập nhật sau."}
                </p>

              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-end gap-3">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-5 sm:px-6 py-2 border rounded disabled:opacity-50 cursor-pointer"
          >
            Quay lại
          </button>

          <button
            disabled={page === total}
            onClick={() => setPage(page + 1)}
            className="px-5 sm:px-6 py-2 border rounded disabled:opacity-50 cursor-pointer"
          >
            Tiếp theo
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}
