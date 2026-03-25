import Header from '../components/Header'
import { Footer } from '../components/Footer'
import Star from "../assets/Start.svg";
import {Link} from "react-router-dom";

 export default function PaymentSuccess() {
  return (
    <div className="flex flex-col min-h-screen pt-10 bg-black">
      
      <Header /> 

      <main className="flex-grow text-white flex flex-col items-center justify-center px-4 text-center pt-24 pb-10">
         <img src={Star} className="mx-auto mb-4 mt-10" />

        <p className="text-2xl md:text-3xl font-bold mb-4">
          Đặt vé thành công!
        </p>

        <p className="text-base md:text-lg mb-6 leading-relaxed">
          <span className="font-semibold text-red-700">Lưu ý: </span>
          <span className="text-red-300">Hãy đến đúng giờ chiếu và tận hưởng bộ phim.</span>
        </p>

        <Link to="/homePage"
          className="text-white bg-red-700 hover:bg-red-800 rounded-2xl px-6 py-3 text-lg font-medium transition"
        >
          Về trang chủ
        </Link>
      </main>

      <Footer />

    </div>
  );
}

