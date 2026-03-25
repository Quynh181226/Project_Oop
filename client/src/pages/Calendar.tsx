
import { useEffect, useState } from "react";
import Header from "../components/Header";
import { Footer } from "../components/Footer";
import { useNavigate } from "react-router-dom";

// Hàm lấy 7 ngày tiếp theo (bao gồm hôm nay) định dạng YYYY-MM-DD
const getNext7Days = () => {
  const result: string[] = [];
  const today = new Date();
  for (let i = 0; i < 7; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    result.push(`${year}-${month}-${day}`);
  }
  return result;
};

const Calendar = () => {
  const navigate = useNavigate();
  const [dates, setDates] = useState<string[]>([]);
  const [selected, setSelected] = useState<string>("");
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Tạo 7 ngày và chọn ngày đầu tiên
  useEffect(() => {
    const newDates = getNext7Days();
    setDates(newDates);
    setSelected(newDates[0]);
  }, []);

  // Fetch movies khi chọn ngày mới
  useEffect(() => {
    if (!selected) return;

    const fetchMovies = async () => {
      try {
        setLoading(true);
        const res = await fetch("http://localhost:8080/movies");
        if (!res.ok) throw new Error("Failed to fetch movies");
        const data = await res.json();

        // Lọc phim ĐANG CHIẾU + có ngày chiếu trùng với selected
        const showingMovies = data.filter((movie: any) => {
          const isShowing = movie.status === "showing" || movie.status === "now-showing";
          const hasShowDate = movie.showDates && movie.showDates.includes(selected);
          const hasTimeSlots = movie.timeSlots && movie.timeSlots.length > 0;
          return isShowing && hasShowDate && hasTimeSlots;
        });

        setMovies(showingMovies);
      } catch (error) {
        console.error("Lỗi load movies:", error);
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [selected]);

  const handleGoToBooking = (movieId: number) => {
    navigate(`/ticketBooking/${movieId}`);
  };

  const formatDisplayDate = (dateStr: string) => {
    const [year, month, day] = dateStr.split("-");
    return `${day}/${month}/${year}`;
  };



  return (
      <div className="bg-[#0d0d0d] min-h-screen text-white">
        <Header />

        <div className="max-w-6xl mx-auto px-4 py-10 pt-28 animate-fadeIn">
          {/* TITLE */}
          <div className="flex justify-center items-center gap-2 mb-6">
            <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
            <h2 className="text-xl md:text-2xl font-semibold text-center">
              Phim đang chiếu
            </h2>
          </div>

          {/* DATE SELECTOR */}
          <div className="flex justify-center flex-wrap gap-3 mb-8">
            {dates.map((d) => (
                <button
                    key={d}
                    onClick={() => setSelected(d)}
                    className={`cursor-pointer px-6 py-3 rounded-lg border text-base font-medium transition-all duration-300 ${
                        selected === d
                            ? "bg-red-600 border-red-600 scale-105"
                            : "border-gray-600 hover:bg-gray-800 hover:border-gray-500"
                    }`}
                >
                  {formatDisplayDate(d)}
                </button>
            ))}
          </div>

          {/* NOTICE */}
          <p className="text-xs md:text-sm text-red-400 mb-8 text-center max-w-3xl mx-auto">
            Lưu ý: Khán giả dưới 13 tuổi chỉ chọn suất chiếu kết thúc trước 22h và khán giả dưới 16 tuổi chỉ chọn suất chiếu kết thúc trước 23h.
          </p>

          {/* LOADING */}
          {loading && (
              <div className="text-center py-10">
                <p className="text-gray-400">Đang tải phim...</p>
              </div>
          )}

          {/* MOVIE GRID */}
          {!loading && movies.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {movies.map((movie, index) => (
                    <div
                        key={movie.id}
                        onClick={() => handleGoToBooking(movie.id)}
                        className="group cursor-pointer bg-[#151515] rounded-xl overflow-hidden border border-gray-800 hover:border-red-600 transition-all duration-500 hover:shadow-2xl hover:shadow-red-600/30 hover:-translate-y-2"
                        style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      {/* Poster */}
                      <div className="relative overflow-hidden">
                        <img
                            src={movie.poster}
                            alt={movie.title}
                            className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                        <span className="absolute top-3 left-3 bg-red-600 text-xs px-3 py-1 rounded-full font-bold">
                    {movie.rated || "P"}
                  </span>
                      </div>

                      {/* Info */}
                      <div className="p-5">
                        <h3 className="font-bold text-lg mb-2 group-hover:text-red-500 transition-colors">
                          {movie.title}
                        </h3>
                        <p className="text-sm text-gray-400 mb-3">
                          {movie.genres?.join(", ") || "Chưa có thể loại"} • {movie.duration} phút
                        </p>
                        <p className="text-xs text-gray-500 mb-4">
                          Khởi chiếu: {movie.releaseDate}
                        </p>

                        {/* Lịch chiếu trong ngày được chọn */}
                        <div className="flex flex-wrap gap-2">
                          {(movie.timeSlots || []).map((time: string) => (
                              <span
                                  key={time}
                                  className="px-4 py-2 bg-gray-800 rounded-md text-sm border border-gray-700 hover:bg-red-600 hover:border-red-600 transition-all duration-200"
                              >
                        {time}
                      </span>
                          ))}
                        </div>
                      </div>
                    </div>
                ))}
              </div>
          ) : (
              !loading && (
                  <div className="text-center py-20">
                    <p className="text-gray-500 text-lg">
                      Không có phim nào chiếu vào ngày {formatDisplayDate(selected)}
                    </p>
                  </div>
              )
          )}
        </div>

        <Footer />
      </div>
  );
};

export default Calendar;