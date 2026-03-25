import {useState} from "react";
import Header from "../components/Header";

const Terms = () => {
    const [activeSection, setActiveSection] = useState("acceptance");

    const sections = [
        { id: "acceptance", title: "Chấp nhận điều khoản" },
        { id: "user-rights", title: "Quyền và trách nhiệm người dùng" },
        { id: "website-rights", title: "Quyền và trách nhiệm website" },
        { id: "accounts", title: "Tài khoản người dùng" },
        { id: "booking-payment", title: "Đặt vé và thanh toán" },
        { id: "intellectual", title: "Sở hữu trí tuệ" },
        { id: "liability", title: "Giới hạn trách nhiệm" },
        { id: "termination", title: "Chấm dứt sử dụng" },
        { id: "changes", title: "Thay đổi điều khoản" },
        { id: "contact", title: "Liên hệ" },
    ];

    return (
        <>
            <Header/>
            <div className="mt-6 w-full bg-[#333333] text-gray-300 min-h-screen">
                <div className="relative overflow-hidden bg-[#2B2B2B] rounded-xl">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                        <div className="text-center">
                            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white tracking-tight">
                                ĐIỀU KHOẢN SỬ DỤNG DỊCH VỤ
                            </h1>
                            <p className="text-xl max-w-3xl mx-auto text-gray-400">
                                Các quy định và điều kiện áp dụng khi sử dụng dịch vụ của chúng tôi
                            </p>
                            <div className="mt-8 inline-flex items-center justify-center px-6 py-3 text-white font-medium">
                                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"></path>
                                </svg>
                                Cập nhật lần cuối: 20/12/2025
                            </div>
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="flex flex-col lg:flex-row gap-8">
                        <div className="lg:w-1/4">
                            <div className="bg-[#252525] rounded-xl p-6 sticky top-6 border border-gray-700">
                                <h3 className="text-xl font-bold text-white mb-4">Mục lục</h3>
                                <nav className="space-y-2">
                                    {sections.map((section) => (
                                        <button
                                            key={section.id}
                                            onClick={() => setActiveSection(section.id)}
                                            className={`cursor-pointer block w-full text-left py-3 px-4 rounded-lg transition duration-200 ${
                                                activeSection === section.id
                                                    ? "bg-[#333333] text-white"
                                                    : "hover:bg-[#333333] text-gray-300 hover:text-white"
                                            }`}
                                        >
                                            {section.title}
                                        </button>
                                    ))}
                                </nav>
                                <div className="mt-8 pt-6 border-t border-gray-600">
                                    <div className="flex items-center space-x-3 p-4 bg-[#333333] rounded-lg">
                                        <div className="w-12 h-12 bg-[#333333] rounded-full flex items-center justify-center">
                                            <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
                                            </svg>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-white">Hỗ trợ 24/7</h4>
                                            <p className="text-sm text-gray-400">1900 0000</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="lg:w-3/4 space-y-8">
                            <div id="acceptance" className={`bg-[#2b2b2b] rounded-xl p-8 border transition duration-300 ${activeSection === "acceptance" ?  "border-[#333333]" : "border-gray-600 hover:border-[#333333]"} hover:cursor-pointer`}>
                                <div className="flex items-start space-x-4">
                                    <div className="flex-shrink-0">
                                        <div className="w-14 h-14 bg-[#333333] rounded-xl flex items-center justify-center shadow-lg">
                                            <span className="text-2xl font-bold text-white">1</span>
                                        </div>
                                    </div>
                                    <div className="flex-grow">
                                        <h2 className="text-2xl font-bold text-white mb-4">Chấp nhận điều khoản</h2>
                                        <p className="text-lg leading-relaxed text-gray-300 mb-6">
                                            Khi truy cập và sử dụng website, bạn xác nhận đã đọc, hiểu và đồng ý tuân thủ toàn bộ nội dung điều khoản sử dụng này.
                                        </p>
                                        <div className="bg-[#333333] p-5 rounded-lg">
                                            <div className="flex items-center">
                                                <svg className="w-6 h-6 text-gray-400 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path>
                                                </svg>
                                                <p className="text-gray-300">
                                                    <span className="font-semibold text-white">Lưu ý quan trọng:</span> Việc tiếp tục sử dụng dịch vụ sau khi có bất kỳ thay đổi nào đối với các điều khoản này có nghĩa là bạn chấp nhận những thay đổi đó.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div id="user-rights" className={`bg-[#2b2b2b] rounded-xl p-8 border transition duration-300 ${activeSection === "user-rights" ?  "border-[#333333]" : "border-gray-600 hover:border-[#333333]"} hover:cursor-pointer`}>
                                <div className="flex items-start space-x-4">
                                    <div className="flex-shrink-0">
                                        <div className="w-14 h-14 bg-[#333333] rounded-xl flex items-center justify-center shadow-lg">
                                            <span className="text-2xl font-bold text-white">2</span>
                                        </div>
                                    </div>
                                    <div className="flex-grow">
                                        <h2 className="text-2xl font-bold text-white mb-4">Quyền và trách nhiệm của người dùng</h2>
                                        <div className="grid md:grid-cols-2 gap-8">
                                            <div>
                                                <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                                                    <span className="mr-2 text-gray-400">-</span> Trách nhiệm
                                                </h3>
                                                <ul className="space-y-4">
                                                    <li className="flex items-start">
                                                        <span className="ml-3 text-gray-300">Cung cấp thông tin cá nhân chính xác khi sử dụng dịch vụ.</span>
                                                    </li>
                                                    <li className="flex items-start">
                                                        <span className="ml-3 text-gray-300">Không sử dụng website cho các mục đích trái pháp luật.</span>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                                                    <span className="mr-2 text-gray-400">-</span> Cấm
                                                </h3>
                                                <ul className="space-y-4">
                                                    <li className="flex items-start">
                                                        <span className="ml-3 text-gray-300">Không can thiệp, phá hoại hệ thống hoặc dữ liệu của website.</span>
                                                    </li>
                                                    <li className="flex items-start">
                                                        <span className="ml-3 text-gray-300">Không thực hiện hành vi lừa đảo, gian lận trong giao dịch.</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div id="website-rights" className={`bg-[#2b2b2b] rounded-xl p-8 border transition duration-300 ${activeSection === "website-rights" ? "border-[#333333]" : "border-gray-600 hover:border-[#333333]"} hover:cursor-pointer`}>
                                <div className="flex items-start space-x-4">
                                    <div className="flex-shrink-0">
                                        <div className="w-14 h-14 bg-[#333333] rounded-xl flex items-center justify-center shadow-lg">
                                            <span className="text-2xl font-bold text-white">3</span>
                                        </div>
                                    </div>
                                    <div className="flex-grow">
                                        <h2 className="text-2xl font-bold text-white mb-4">Quyền và trách nhiệm của website</h2>
                                        <ul className="space-y-6">
                                            <li className="flex items-start">
                                                <div className="ml-4">
                                                    <h4 className="font-semibold text-white">Cung cấp thông tin chính xác</h4>
                                                    <p className="text-gray-300">Cung cấp thông tin phim, lịch chiếu và giá vé chính xác nhất có thể.</p>
                                                </div>
                                            </li>
                                            <li className="flex items-start">
                                                <div className="ml-4">
                                                    <h4 className="font-semibold text-white">Quyền bảo trì hệ thống</h4>
                                                    <p className="text-gray-300">Tạm ngưng hoặc thay đổi dịch vụ mà không cần thông báo trước.</p>
                                                </div>
                                            </li>
                                            <li className="flex items-start">
                                                <div className="ml-4">
                                                    <h4 className="font-semibold text-white">Bảo mật thông tin</h4>
                                                    <p className="text-gray-300">Bảo mật thông tin người dùng theo chính sách bảo mật.</p>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div id="accounts" className={`bg-[#2b2b2b] rounded-xl p-8 border transition duration-300 ${activeSection === "accounts" ? "border-[#333333]" : "border-gray-600 hover:border-[#333333]"} hover:cursor-pointer`}>
                                <div className="flex items-start space-x-4">
                                    <div className="flex-shrink-0">
                                        <div className="w-14 h-14 bg-[#333333] rounded-xl flex items-center justify-center shadow-lg">
                                            <span className="text-2xl font-bold text-white">4</span>
                                        </div>
                                    </div>
                                    <div className="flex-grow">
                                        <h2 className="text-2xl font-bold text-white mb-4">Tài khoản người dùng</h2>
                                        <p className="text-lg leading-relaxed text-gray-300 mb-6">
                                            Người dùng chịu trách nhiệm bảo mật thông tin đăng nhập. Website không chịu trách nhiệm cho các thiệt hại phát sinh do việc tiết lộ thông tin tài khoản.
                                        </p>
                                        <div className="bg-[#333333] p-6 rounded-lg">
                                            <div>
                                                <h4 className="font-semibold text-lg text-white mb-2">Khuyến nghị bảo mật</h4>
                                                <p className="text-gray-300">
                                                    Chúng tôi khuyến nghị bạn sử dụng mật khẩu mạnh, không chia sẻ thông tin đăng nhập với người khác và đăng xuất sau khi sử dụng dịch vụ, đặc biệt khi sử dụng trên thiết bị công cộng.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div id="booking-payment" className={`bg-[#2b2b2b] rounded-xl p-8 border transition duration-300 ${activeSection === "booking-payment" ? "border-[#333333]" : "border-gray-600 hover:border-[#333333]"} hover:cursor-pointer`}>
                                <div className="flex items-start space-x-4">
                                    <div className="flex-shrink-0">
                                        <div className="w-14 h-14 bg-[#333333] rounded-xl flex items-center justify-center shadow-lg">
                                            <span className="text-2xl font-bold text-white">5</span>
                                        </div>
                                    </div>
                                    <div className="flex-grow">
                                        <h2 className="text-2xl font-bold text-white mb-4">Đặt vé và thanh toán</h2>
                                        <ul className="space-y-4 mb-6">
                                            <li className="flex items-start">
                                                <span className="ml-3 text-gray-300">Vé đã thanh toán không được đổi hoặc hoàn.</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="ml-3 text-gray-300">Website không chịu trách nhiệm trong trường hợp giao dịch bị gián đoạn do lỗi kỹ thuật từ bên thứ ba.</span>
                                            </li>
                                        </ul>
                                        <div className="grid md:grid-cols-3 gap-6 mt-8">
                                            <div className="text-center p-5 bg-[#333333] rounded-xl">
                                                <div className="w-12 h-12 bg-[#333333] rounded-full flex items-center justify-center mx-auto mb-4">
                                                    <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M5 2a2 2 0 00-2 2v14l3.5-2 3.5 2 3.5-2 3.5 2V4a2 2 0 00-2-2H5zm4.707 3.707a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L8.414 9H10a3 3 0 013 3v1a1 1 0 102 0v-1a5 5 0 00-5-5H8.414l1.293-1.293z" clipRule="evenodd"></path>
                                                    </svg>
                                                </div>
                                                <h4 className="font-semibold text-white mb-2">Không hoàn vé</h4>
                                                <p className="text-sm text-gray-400">Vé đã mua không thể hoàn trả</p>
                                            </div>
                                            <div className="text-center p-5 bg-[#333333] rounded-xl">
                                                <div className="w-12 h-12 bg-[#333333] rounded-full flex items-center justify-center mx-auto mb-4">
                                                    <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                                        <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"></path>
                                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd"></path>
                                                    </svg>
                                                </div>
                                                <h4 className="font-semibold text-white mb-2">Rủi ro thanh toán</h4>
                                                <p className="text-sm text-gray-400">Không chịu trách nhiệm lỗi bên thứ ba</p>
                                            </div>
                                            <div className="text-center p-5 bg-[#333333] rounded-xl">
                                                <div className="w-12 h-12 bg-[#333333] rounded-full flex items-center justify-center mx-auto mb-4">
                                                    <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2h6a2 2 0 002-2V6a2 2 0 00-2-2H4zm2 6a2 2 0 114 0 2 2 0 01-4 0zm-2-4a1 1 0 100 2h4a1 1 0 100-2H4zm10 6a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1z" clipRule="evenodd"></path>
                                                        <path d="M12 14h2a1 1 0 011 1v2a1 1 0 11-2 0v-2a1 1 0 00-1-1z"></path>
                                                    </svg>
                                                </div>
                                                <h4 className="font-semibold text-white mb-2">Kiểm tra kỹ</h4>
                                                <p className="text-sm text-gray-400">Xác nhận thông tin trước thanh toán</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div id="intellectual" className={`bg-[#2b2b2b] rounded-xl p-8 border transition duration-300 ${activeSection === "intellectual" ?  "border-[#333333]" : "border-gray-600 hover:border-[#333333]"} hover:cursor-pointer`}>
                                <div className="flex items-start space-x-4">
                                    <div className="flex-shrink-0">
                                        <div className="w-14 h-14 bg-[#333333] rounded-xl flex items-center justify-center shadow-lg">
                                            <span className="text-2xl font-bold text-white">6</span>
                                        </div>
                                    </div>
                                    <div className="flex-grow">
                                        <h2 className="text-2xl font-bold text-white mb-4">Sở hữu trí tuệ</h2>
                                        <p className="text-lg leading-relaxed text-gray-300">
                                            Toàn bộ nội dung, hình ảnh, logo trên website thuộc quyền sở hữu của website hoặc đối tác liên quan. Nghiêm cấm sao chép khi chưa được cho phép.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div id="liability" className={`bg-[#2b2b2b] rounded-xl p-8 border transition duration-300 ${activeSection === "liability" ?  "border-[#333333]" : "border-gray-600 hover:border-[#333333]"} hover:cursor-pointer`}>
                                <div className="flex items-start space-x-4">
                                    <div className="flex-shrink-0">
                                        <div className="w-14 h-14 bg-[#333333] rounded-xl flex items-center justify-center shadow-lg">
                                            <span className="text-2xl font-bold text-white">7</span>
                                        </div>
                                    </div>
                                    <div className="flex-grow">
                                        <h2 className="text-2xl font-bold text-white mb-4">Giới hạn trách nhiệm</h2>
                                        <p className="text-lg leading-relaxed text-gray-300">
                                            Website không chịu trách nhiệm với bất kỳ thiệt hại gián tiếp nào phát sinh trong quá trình sử dụng dịch vụ.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div id="termination" className={`bg-[#2b2b2b] rounded-xl p-8 border transition duration-300 ${activeSection === "termination" ?  "border-[#333333]" : "border-gray-600 hover:border-[#333333]"} hover:cursor-pointer`}>
                                <div className="flex items-start space-x-4">
                                    <div className="flex-shrink-0">
                                        <div className="w-14 h-14 bg-[#333333] rounded-xl flex items-center justify-center shadow-lg">
                                            <span className="text-2xl font-bold text-white">8</span>
                                        </div>
                                    </div>
                                    <div className="flex-grow">
                                        <h2 className="text-2xl font-bold text-white mb-4">Chấm dứt sử dụng dịch vụ</h2>
                                        <p className="text-lg leading-relaxed text-gray-300">
                                            Website có quyền chấm dứt hoặc khóa tài khoản người dùng nếu phát hiện vi phạm điều khoản sử dụng.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div id="changes" className={`bg-[#2b2b2b] rounded-xl p-8 border transition duration-300 ${activeSection === "changes" ?  "border-[#333333]" : "border-gray-600 hover:border-[#333333]"} hover:cursor-pointer`}>
                                <div className="flex items-start space-x-4">
                                    <div className="flex-shrink-0">
                                        <div className="w-14 h-14 bg-[#333333] rounded-xl flex items-center justify-center shadow-lg">
                                            <span className="text-2xl font-bold text-white">9</span>
                                        </div>
                                    </div>
                                    <div className="flex-grow">
                                        <h2 className="text-2xl font-bold text-white mb-4">Thay đổi điều khoản</h2>
                                        <p className="text-lg leading-relaxed text-gray-300">
                                            Điều khoản sử dụng có thể được cập nhật bất kỳ lúc nào và có hiệu lực ngay khi được đăng tải.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div id="contact" className={`bg-[#2b2b2b] rounded-xl p-8 border transition duration-300 ${activeSection === "contact" ?   "border-[#333333]" : "border-gray-600 hover:border-[#333333]"} hover:cursor-pointer`}>
                                <div className="flex items-start space-x-4">
                                    <div className="flex-shrink-0">
                                        <div className="w-14 h-14 bg-[#333333] rounded-xl flex items-center justify-center shadow-lg">
                                            <span className="text-2xl font-bold text-white">10</span>
                                        </div>
                                    </div>
                                    <div className="flex-grow">
                                        <h2 className="text-2xl font-bold text-white mb-4">Liên hệ</h2>
                                        <div className="grid md:grid-cols-2 gap-8">
                                            <div className="bg-[#333333] p-6 rounded-xl">
                                                <div className="flex items-center mb-4">
                                                    <div className="w-12 h-12 bg-[#333333] rounded-full flex items-center justify-center mr-4">
                                                        <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                                                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                                                        </svg>
                                                    </div>
                                                    <div>
                                                        <h4 className="font-semibold text-white">Email hỗ trợ</h4>
                                                        <p className="text-gray-300">phamhuongquynh2k6@gmail.com</p>
                                                    </div>
                                                </div>
                                                <p className="text-gray-400 text-sm">Phản hồi trong vòng 24 giờ làm việc</p>
                                            </div>
                                            <div className="bg-[#333333] p-6 rounded-xl">
                                                <div className="flex items-center mb-4">
                                                    <div className="w-12 h-12 bg-[#333333] rounded-full flex items-center justify-center mr-4">
                                                        <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                                            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
                                                        </svg>
                                                    </div>
                                                    <div>
                                                        <h4 className="font-semibold text-white">Hotline</h4>
                                                        <p className="text-gray-300">1900 0000</p>
                                                    </div>
                                                </div>
                                                <p className="text-gray-400 text-sm">Hoạt động 24/7, kể cả ngày lễ</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Terms;