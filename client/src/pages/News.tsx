import Header from "../components/Header";
import { Footer } from "../components/Footer";
import { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";
const News = () => {
  const [news, setNews] = useState([]);
  const navigate = useNavigate();
  // Gọi API JSON Server
  useEffect(() => {
    fetch("http://localhost:8080/news")
      .then((res) => res.json())
      .then((data) => setNews(data))
      .catch((err) => console.error("Lỗi tải dữ liệu:", err));
  }, []);

  return (
    <div className="bg-[#0d0d0d] min-h-screen text-white">
      <Header />

      {/* WRAPPER */}
      <div className="max-w-7xl mx-auto px-4 pt-28 pb-16 animate-fadeIn">
        
        {/* TITLE */}
        <h2 className="text-center text-2xl md:text-3xl font-semibold mb-10">
          Tin tức
        </h2>

        {/* GRID 1 cột mobile/tablet, 4 cột desktop */}
        <div className="
          grid 
          grid-cols-1 
          lg:grid-cols-4 
          gap-4
        ">
          {news.map((item: any, index) => (
            <div
              key={item.id}
              onClick={() => navigate(`/news/${item.id}`)}
              className="
                bg-[#151515] border border-gray-700 rounded-xl overflow-hidden
                hover:border-red-500 hover:shadow-lg hover:shadow-red-600/30
                transition-all duration-300 cursor-pointer animate-slideUp
              "
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* IMAGE */}
              <div className="w-full h-60 overflow-hidden">
                <img
                  src={item.img}
                  alt={item.title}
                  className="
                    w-full h-full object-cover 
                    transition-transform duration-300 
                    hover:scale-105
                  "
                />
              </div>

              {/* CONTENT */}
              <div className="p-4 flex flex-col gap-2">
                <p className="text-gray-400 text-sm">{item.date}</p>

                <h3 className="font-semibold text-base hover:text-red-500 transition-colors">
                  {item.title}
                </h3>

                
              </div>
            </div>
          ))}
        </div>

      </div>

      <Footer />
    </div>
  );
};

export default News;
