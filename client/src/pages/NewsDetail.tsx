import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import { Footer } from "../components/Footer";

const NewsDetail = () => {
  const { id } = useParams();
  const [news, setNews] = useState<any>(null);

  useEffect(() => {
    fetch(`http://localhost:8080/news/${id}`)
      .then(res => res.json())
      .then(data => setNews(data))
      .catch(err => console.error(err));
  }, [id]);

  if (!news) return null;

  return (
    <div className="bg-[#0d0d0d] min-h-screen text-white">
      <Header />

      <div className="max-w-6xl mx-auto px-4 pt-28 pb-16">

        {/* TITLE  */}
        <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold leading-relaxed mb-6">
          {news.title}
        </h1>

        {/*TEXT CONTENT */}
        <div
          className="
            text-gray-300 
            leading-relaxed 
            space-y-4 
            mb-10
          "
          dangerouslySetInnerHTML={{ __html: news.content }}
        />

        {/*IMAGE */}
        <img
          src={news.img}
          alt={news.title}
          className="
            w-full 
            rounded-xl 
            border border-gray-700
          "
        />

      </div>

      <Footer />
    </div>
  );
};

export default NewsDetail;
