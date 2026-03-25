import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "../components/Header";
import { Footer } from "../components/Footer";
import type { FestivalDetail } from "../types/type.ts";
import { getFestivalDetailById } from "../apis/festivalApi.ts";

export default function FestivalDetail() {
  const { id } = useParams<{ id: string }>();
  const [detail, setDetail] = useState<FestivalDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      try {
        const data = await getFestivalDetailById(Number(id));
        setDetail(data);
      } catch (error) {
        console.error("Không tìm thấy festival detail:", error);
        setDetail(null);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#1e1e1e] text-white">
        <Header />
        <div className="min-h-screen flex items-center justify-center text-white">
          Đang tải dữ liệu...
        </div>
        <Footer />
      </div>
    );
  }

  if (!detail) {
    return (
      <div className="min-h-screen bg-[#1e1e1e] text-white">
        <Header />
        <div className="min-h-screen flex flex-col items-center justify-center text-white gap-4">
          <p>Không tìm thấy thông tin liên hoan phim.</p>
          <Link
            to="/festivals"
            className="px-5 py-2 rounded-md bg-red-500 hover:bg-red-600 cursor-pointer"
          >
            Quay lại danh sách
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1e1e1e] text-white">
      <Header />

      <main className="pt-24 pb-10 text-white">
        <div className="max-w-[1400px] mx-auto px-6 flex flex-col gap-8">
          <div className="text-xs sm:text-sm text-slate-300">
            <Link to="/festivals" className="hover:text-red-400">
              Liên hoan phim
            </Link>{" "}
            / <span>{detail.title}</span>
          </div>

          {/* TEXT BLOCK */}
          <section className="space-y-4">
            <h1 className="text-2xl md:text-3xl font-bold">
              {detail.title}
            </h1>

            {detail.subtitle && (
              <p className="font-semibold text-slate-100 text-sm md:text-base">
                {detail.subtitle}
              </p>
            )}

            {/* paragraphs */}
            <div className="space-y-4 text-xs md:text-sm font-light text-slate-100 leading-relaxed">
              {detail.paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            {/* ticket info */}
            {detail.ticketInfo && detail.ticketInfo.length > 0 && (
              <div className="mt-5 space-y-2 text-xs md:text-sm font-bold text-white">
                {detail.ticketInfo.map((t, idx) => (
                  <p key={idx}>{t}</p>
                ))}
              </div>
            )}

            {/* extra info + link */}
            {(detail.extraInfo && detail.extraInfo.length > 0) || detail.link ? (
              <div className="mt-4 space-y-2 text-xs md:text-sm font-light text-slate-100">
                {detail.extraInfo?.map((e, idx) => <p key={idx}>{e}</p>)}

                {detail.link && (
                  <p>
                    Thông tin chi tiết xem tại:&nbsp;
                    <a
                      href={detail.link}
                      className="underline text-blue-400 break-all"
                      target="_blank"
                      rel="noreferrer"
                    >
                      {detail.link}
                    </a>
                  </p>
                )}
              </div>
            ) : null}
          </section>

          <section className="flex flex-col gap-6 mt-4">
            <img
              src={detail.banner}
              className="w-full rounded-md"
              alt={detail.title}
            />

            {detail.scheduleImage && (
              <img
                src={detail.scheduleImage}
                className="w-full rounded-md"
                alt={`${detail.title} schedule`}
              />
            )}
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
