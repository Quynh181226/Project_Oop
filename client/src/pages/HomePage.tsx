
import { useEffect, useState } from "react";
import Header from "../components/Header";
import { Footer } from "../components/Footer";
// import Herobanner from "../../../../../Downloads/Dat/src/assets/Herobanner.jpg";
import { getNowShowing, getComingSoon } from "../apis/HomeApi";
import { Link } from "react-router-dom"
import type {Movie} from "../types/type"
import Dot from "../assets/Dot.svg"



const banners = [
    // "https://media.lottecinemavn.com/Media/WebAdmin/6b9a6c2bfc3647a7a8f8b62b2aebcaa2.jpg",
    // "https://media.lottecinemavn.com/Media/WebAdmin/7fa8828a3122402381988acb8de4d741.jpg",
    "https://chieuphimquocgia.com.vn/_next/image?url=http%3A%2F%2Fapiv2.chieuphimquocgia.com.vn%2FContent%2FImages%2FBanner%2F0019497.png&w=1920&q=75",
    "https://chieuphimquocgia.com.vn/_next/image?url=http%3A%2F%2Fapiv2.chieuphimquocgia.com.vn%2FContent%2FImages%2FBanner%2F0019571.jpg&w=1920&q=75",
    "https://chieuphimquocgia.com.vn/_next/image?url=http%3A%2F%2Fapiv2.chieuphimquocgia.com.vn%2FContent%2FImages%2FBanner%2F0019589.jpg&w=1920&q=75",
    "https://media.lottecinemavn.com/Media/WebAdmin/aed50ed878854babb7fa8287f21d6326.jpg",
];



const HomePage = () => {
    const [nowShowing, setNowShowing] = useState<Movie[]>([]);
    const [comingSoon, setComingSoon] = useState<Movie[]>([]);
    const [currentBanner, setCurrentBanner] = useState(0);

    // API
    useEffect(() => {
        const fetchData = async () => {
            try {
                const now = await getNowShowing();
                const soon = await getComingSoon();

                setNowShowing(now.data);
                setComingSoon(soon.data);
            } catch (err) {
                console.log("API Error:", err);
            }
        };

        fetchData();
    }, []);

    //  Thẻ phim
    // const MovieCard = (m: Movie) => (
    //     <Link to={`/ticketBooking/${m.id}`}>
    //
    //         <img
    //             src={m.poster}
    //             alt={m.title}
    //             className="w-full aspect-[2/3] object-cover rounded"
    //         />
    //         <p className="text-xs mt-2 opacity-60 whitespace-nowrap">
    //             {m.genres} · {m.showDates}
    //         </p>
    //         <p className="text-sm mt-2 text-white line-clamp-2">
    //             {m.title}
    //         </p>
    //     </Link>
    // );

    const MovieCard = (m: Movie) => (
        <Link
            to={`/ticketBooking/${m.id}`}
            className="group block"
        >
            {/* Poster */}
            <div className="relative overflow-hidden rounded-lg">
                <img
                    src={m.poster}
                    alt={m.title}
                    className="
                    w-full aspect-[2/3] object-cover
                    transition-transform duration-300
                    group-hover:scale-105
                "
                />

                {/* Overlay khi hover */}
                <div
                    className="
                    absolute inset-0
                    bg-black/40 opacity-0
                    group-hover:opacity-100
                    transition-opacity duration-300
                "
                />
            </div>

            {/* Info */}
            <div className="mt-2">
                <p className="text-[11px] text-gray-400 truncate">
                    {Array.isArray(m.genres) ? m.genres.join(", ") : m.genres}
                </p>

                <p
                    className="
                    mt-1 text-sm font-medium text-white
                    line-clamp-2
                    group-hover:text-red-400
                    transition-colors
                "
                >
                    {m.title}
                </p>
            </div>
        </Link>
    );



    return (
        <div className="flex flex-col min-h-screen bg-[#0D0F17]">
            <Header />

            <main className="flex-grow text-white">

                {/* banner */}
                <div className="relative w-full h-[700px] overflow-hidden">
                    {banners.map((img, index) => (
                        <img
                            key={index}
                            src={img}
                            alt="banner"
                            className={`
                absolute inset-0 w-full h-full object-cover
                transition-opacity duration-1000
                ${index === currentBanner ? "opacity-100" : "opacity-0"}
              `}
                        />
                    ))}

                    {/* layout */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0D0F17] via-transparent to-transparent"></div>


                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                        {banners.map((_, index) => (
                            <span
                                key={index}
                                onClick={() => setCurrentBanner(index)}
                                className={`w-3 h-3 rounded-full cursor-pointer
                  ${index === currentBanner ? "bg-white" : "bg-white/40"}`}
                            />
                        ))}
                    </div>
                </div>


                <div
                    className="max-w-7xl mx-auto
          px-3 sm:px-4 lg:px-6
          grid grid-cols-1 lg:grid-cols-12
          gap-6 mt-6"
                >

                    <div className="lg:col-span-9">


                        <section>
                            <div className="flex flex-rows justify-between items-center">

                                <h2 className="flex items-center gap-2 text-xl font-bold">
                                    <img src={Dot} alt="" className="w-5 h-5" />
                                    Phim đang chiếu
                                </h2>

                                <Link to="/calendar" className="text-gray-300 cursor-pointer hover:underline hover:text-gray-100">
                  Xem tất cả
                </Link>
                            </div>

                            <div
                                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4
                gap-4 sm:gap-5 md:gap-6 mt-4"
                            >
                                {nowShowing.map((m) => (
                                    <MovieCard key={m.id} {...m} />
                                ))}
                            </div>
                        </section>

                        {/* COMING SOON */}
                        <section className="mt-12">
                            <h2 className="flex items-center gap-2 text-xl font-bold">
                                <img src={Dot} alt="" className="w-5 h-5" />
                                Phim sắp chiếu
                            </h2>
                            {/*<h2 className="text-xl font-bold">Phim sắp chiếu</h2>*/}

                            <div
                                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4
                gap-4 sm:gap-5 md:gap-6 mt-4"
                            >
                                {comingSoon.map((m) => (
                                    <MovieCard key={m.id} {...m} />
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* RIGHT SIDEBAR */}
                    <aside className="lg:col-span-3 space-y-6">

                        {/* PROMO */}
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <h3 className="text-lg font-semibold">Khuyến mãi</h3>
                                <Link to="/promotion" className="text-gray-300 text-sm hover:underline hover:text-gray-100 cursor-pointer">
                  Xem tất cả
                </Link>
                            </div>
                            <div className="space-y-3">
                                <img
                                    src="https://homepage.momocdn.net/blogscontents/momo-upload-api-230823110745-638283856651319290.jpg"
                                    className="w-full rounded"
                                />
                                <img
                                    src="https://static.mservice.io/blogscontents/momo-upload-api-220610155910-637904735506568522.jpg"
                                    className="w-full rounded"
                                />
                            </div>
                        </div>

                        {/* EVENTS */}
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <h3 className="text-lg font-semibold">Sự kiện</h3>
                                <Link to="/news" className="text-gray-300 text-sm underline cursor-pointer">
                  Xem tất cả
                </Link>
                            </div>
                            <div className="space-y-3">
                                <img
                                    src="https://media.lottecinemavn.com/Media/WebAdmin/aed50ed878854babb7fa8287f21d6326.jpg"
                                    className="w-full rounded"
                                />
                                <img
                                    src="https://media.lottecinemavn.com/Media/WebAdmin/7fa8828a3122402381988acb8de4d741.jpg"
                                    className="w-full rounded"
                                />
                            </div>
                        </div>
                    </aside>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default HomePage;

