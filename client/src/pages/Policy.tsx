import Header from "../components/Header";

const Policy = () => {
    return (
        <>
            <Header/>
            <div className="mt-6 w-full bg-black text-gray-300 min-h-screen">
                <div className="rounded-xl relative overflow-hidden bg-[#2b2b2b]">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                        <div className= "text-center">
                            <h1 className="mt-5 text-4xl md:text-5xl font-bold mb-4 text-white tracking-tight">
                                CHÍNH SÁCH 
                            </h1>
                            <p className="text-xl max-w-3xl mx-auto text-gray-400">
                                Thông tin chi tiết về quy định sử dụng dịch vụ và bảo vệ thông tin cá nhân
                            </p>
                        </div>
                    </div>
                </div>

                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="flex flex-col lg:flex-row gap-8">
                        <div className="lg:w-1/4">
                            <div className="bg-[#2b2b2b] rounded-xl p-6 sticky top-6 border border-gray-600">
                                <h3 className="text-xl font-bold text-white mb-4">Nội dung</h3>
                                <nav className="space-y-2">
                                    <a href="#introduction" className="block py-2 px-4 rounded-lg hover:bg-[#333333] transition duration-200 text-gray-300 hover:text-white">
                                        Giới thiệu
                                    </a>
                                    <a href="#usage" className="block py-2 px-4 rounded-lg hover:bg-[#333333] transition duration-200 text-gray-300 hover:text-white">
                                        Điều khoản sử dụng
                                    </a>
                                    <a href="#booking" className="block py-2 px-4 rounded-lg hover:bg-[#333333] transition duration-200 text-gray-300 hover:text-white">
                                        Quy định đặt vé
                                    </a>
                                    <a href="#privacy" className="block py-2 px-4 rounded-lg hover:bg-[#333333] transition duration-200 text-gray-300 hover:text-white">
                                        Bảo mật thông tin
                                    </a>
                                    <a href="#cookies" className="block py-2 px-4 rounded-lg hover:bg-[#333333] transition duration-200 text-gray-300 hover:text-white">
                                        Cookies
                                    </a>
                                    <a href="#liability" className="block py-2 px-4 rounded-lg hover:bg-[#333333] transition duration-200 text-gray-300 hover:text-white">
                                        Giới hạn trách nhiệm
                                    </a>
                                </nav>

                                <div className="mt-8 pt-6 border-t border-gray-700">
                                    <h4 className="font-semibold text-white mb-2">Cần hỗ trợ?</h4>
                                    <p className="text-sm text-gray-400">Liên hệ với chúng tôi để được giải đáp thắc mắc</p>
                                    <div className="mt-4 space-y-2">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-10 h-10 bg-[#333333] rounded-full flex items-center justify-center">
                                                <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                                                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                                                </svg>
                                            </div>
                                            <span className="text-white">support@yourwebsite.com</span>
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <div className="w-10 h-10 bg-[#333333] rounded-full flex items-center justify-center">
                                                <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
                                                </svg>
                                            </div>
                                            <span className="text-white">1900 0000</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="lg:w-3/4 space-y-8" id="policy">
                            <div id="introduction" className={`bg-[#2b2b2b] rounded-xl p-8 border transition duration-300 ${"border-gray-600"}`}>
                                <div className="flex items-start space-x-4">
                                    <div className="flex-shrink-0 w-12 h-12 bg-[#333333] rounded-xl flex items-center justify-center">
                                        <span className="text-2xl font-bold text-white">1</span>
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-white mb-4">Giới thiệu</h2>
                                        <p className="text-lg leading-relaxed text-gray-300">
                                            Website này được xây dựng nhằm cung cấp dịch vụ tra cứu thông tin,
                                            đặt vé và các dịch vụ liên quan đến điện ảnh. Khi truy cập và sử
                                            dụng website, bạn mặc nhiên đồng ý với các điều khoản được quy định
                                            trong chính sách này.
                                        </p>
                                        <div className="mt-4 p-4 bg-[#333333] rounded-lg">
                                            <p className="text-gray-300 italic">"Bằng việc sử dụng dịch vụ, bạn đã đồng ý với tất cả các điều khoản được nêu trong tài liệu này."</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div id="usage" className={`bg-[#2b2b2b] rounded-xl p-8 border transition duration-300 ${"border-gray-600"}`}>
                                <div className="flex items-start space-x-4">
                                    <div className="flex-shrink-0 w-12 h-12 bg-[#333333] rounded-xl flex items-center justify-center">
                                        <span className="text-2xl font-bold text-white">2</span>
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-white mb-4">Điều khoản sử dụng</h2>
                                        <p className="text-lg leading-relaxed text-gray-300 mb-6">
                                            Người dùng cam kết cung cấp thông tin chính xác khi sử dụng dịch
                                            vụ. Website có quyền từ chối hoặc hủy giao dịch nếu phát hiện hành
                                            vi gian lận, giả mạo hoặc vi phạm pháp luật.
                                        </p>
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div className="bg-[#333333] p-5 rounded-lg">
                                                <h4 className="font-semibold text-white mb-2 flex items-center">
                                                    Được phép
                                                    <svg className="ml-2 w-5 h-5 text-gray-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                                    </svg>
                                                </h4>
                                                <div className="flex flex-col">
                                                   <div>
                                                       <span className="mr-3 ml-4 text-gray-400 text-lg">-</span>
                                                       Sử dụng dịch vụ đúng mục đích
                                                   </div>
                                                    <div>
                                                        <span className="mr-3 ml-4 text-gray-400 text-lg">-</span>
                                                        Cung cấp thông tin chính xác
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="bg-[#333333] p-5 rounded-lg">
                                                <h4 className="font-semibold text-white mb-2 flex items-center">
                                                    Không được phép
                                                    <svg className="ml-2 w-5 h-5 text-gray-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                                                    </svg>
                                                </h4>

                                                <div className="flex flex-col">
                                                    <div>
                                                        <span className="mr-3 ml-4 text-gray-400 text-lg">-</span>
                                                        Gian lận, giả mạo thông tin
                                                    </div>
                                                    <div>
                                                        <span className="mr-3 ml-4 text-gray-400 text-lg">-</span>
                                                        Sử dụng trái phép dịch vụ
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div id="booking" className={`bg-[#2b2b2b] rounded-xl p-8 border transition duration-300 cursor-pointer ${"border-gray-600"}`}>
                                <div className="flex items-start space-x-4">
                                    <div className="flex-shrink-0 w-12 h-12 bg-[#333333] rounded-xl flex items-center justify-center">
                                        <span className="text-2xl font-bold text-white">3</span>
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-white mb-4">Quy định đặt vé & thanh toán</h2>
                                        <div className="grid md:grid-cols-2 gap-8">
                                            <div>
                                                <h3 className="text-xl font-semibold text-white mb-4">Quy định chung</h3>
                                                <ul className="space-y-4">
                                                    <li className="flex items-start">
                                                        <span className="mr-1 ml-4 text-gray-400">-</span>
                                                        <span className="ml-3 text-gray-300">Vé đã thanh toán thành công không được hoàn hoặc đổi.</span>
                                                    </li>
                                                    <li className="flex items-start">
                                                        <span className="mr-1 ml-4 text-gray-400">-</span>
                                                        <span className="ml-3 text-gray-300">Vé chỉ có giá trị cho suất chiếu, thời gian và rạp đã chọn.</span>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-semibold text-white mb-4">Lưu ý đặc biệt</h3>
                                                <div className="bg-[#333333] p-5 rounded-lg">
                                                    <p className="text-gray-300">
                                                        Trường hợp lỗi hệ thống, số tiền sẽ được hoàn theo quy định của
                                                        cổng thanh toán. Vui lòng liên hệ hỗ trợ nếu gặp sự cố thanh toán.
                                                    </p>
                                                </div>
                                                <div className="mt-6 p-4 bg-[#333333] rounded-lg">
                                                    <div className="flex items-center">
                                                        <svg className="w-6 h-6 text-gray-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                                                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path>
                                                        </svg>
                                                        <span className="text-gray-300 font-medium">Kiểm tra kỹ thông tin trước khi thanh toán</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div id="privacy" className={`bg-[#2b2b2b] rounded-xl p-8 border transition duration-300 cursor-pointer ${"border-gray-600"}`}>
                                <div className="flex items-start space-x-4">
                                    <div className="flex-shrink-0 w-12 h-12 bg-[#333333] rounded-xl flex items-center justify-center">
                                        <span className="text-2xl font-bold text-white">4</span>
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-white mb-4">Chính sách bảo mật thông tin</h2>
                                        <p className="text-lg leading-relaxed text-gray-300 mb-6">
                                            Chúng tôi cam kết bảo mật tuyệt đối thông tin cá nhân của khách
                                            hàng. Các thông tin như họ tên, email, số điện thoại chỉ được sử
                                            dụng cho mục đích cung cấp dịch vụ và hỗ trợ khách hàng.
                                        </p>
                                        <div className="grid md:grid-cols-3 gap-6 mt-8">
                                            <div className="text-center p-5 bg-[#333333] rounded-xl">
                                                <div className="w-16 h-16 bg-[#333333] rounded-full flex items-center justify-center mx-auto mb-4">
                                                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                                                    </svg>
                                                </div>
                                                <h4 className="font-semibold text-white mb-2">Mã hóa dữ liệu</h4>
                                                <p className="text-sm text-gray-400">Thông tin được mã hóa để bảo vệ an toàn</p>
                                            </div>
                                            <div className="text-center p-5 bg-[#333333] rounded-xl">
                                                <div className="w-16 h-16 bg-[#333333] rounded-full flex items-center justify-center mx-auto mb-4">
                                                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                                                    </svg>
                                                </div>
                                                <h4 className="font-semibold text-white mb-2">Bảo vệ nghiêm ngặt</h4>
                                                <p className="text-sm text-gray-400">Không chia sẻ thông tin với bên thứ ba</p>
                                            </div>
                                            <div className="text-center p-5 bg-[#333333] rounded-xl">
                                                <div className="w-16 h-16 bg-[#333333] rounded-full flex items-center justify-center mx-auto mb-4">
                                                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                                    </svg>
                                                </div>
                                                <h4 className="font-semibold text-white mb-2">24/7 Giám sát</h4>
                                                <p className="text-sm text-gray-400">Hệ thống được giám sát liên tục</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div id="cookies" className={`bg-[#2b2b2b] rounded-xl p-8 border transition duration-300 cursor-pointer ${"border-gray-600"}`}>
                                <div className="flex items-start space-x-4">
                                    <div className="flex-shrink-0 w-12 h-12 bg-[#333333] rounded-xl flex items-center justify-center">
                                        <span className="text-2xl font-bold text-white">5</span>
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-white mb-4">Cookies</h2>
                                        <p className="text-lg leading-relaxed text-gray-300 mb-6">
                                            Website có thể sử dụng cookies nhằm ghi nhớ thông tin đăng nhập,
                                            cải thiện hiệu suất và cá nhân hóa trải nghiệm người dùng.
                                        </p>
                                        <div className="bg-[#333333] p-6 rounded-lg">
                                            <div className="flex items-center mb-4">
                                                <h4 className="text-xl font-semibold text-white">Bạn có thể quản lý Cookies</h4>
                                            </div>
                                            <p className="text-gray-300">
                                                Bạn có thể cài đặt trình duyệt để từ chối cookies, nhưng điều này có thể ảnh hưởng đến một số chức năng của website.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div id="liability" className={`bg-[#2b2b2b] rounded-xl p-8 border transition duration-300 cursor-pointer ${"border-gray-600"}`}>
                                <div className="flex items-start space-x-4">
                                    <div className="flex-shrink-0 w-12 h-12 bg-[#333333] rounded-xl flex items-center justify-center">
                                        <span className="text-2xl font-bold text-white">6</span>
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-white mb-4">Giới hạn trách nhiệm</h2>
                                        <p className="text-lg leading-relaxed text-gray-300">
                                            Website không chịu trách nhiệm cho các thiệt hại phát sinh do việc
                                            sử dụng dịch vụ ngoài tầm kiểm soát như lỗi đường truyền, thiết bị
                                            người dùng hoặc sự kiện bất khả kháng.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-[#2b2b2b] rounded-xl p-8 border cursor-pointer border-gray-600">
                                <div className="text-center">
                                    <h3 className="text-2xl font-bold text-white mb-4">Bạn có câu hỏi?</h3>
                                    <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                                        Nếu bạn có bất kỳ thắc mắc nào về chính sách hoặc điều khoản sử dụng,
                                        vui lòng liên hệ với chúng tôi qua thông tin bên dưới.
                                    </p>
                                    <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
                                        <a href="mailto:support@yourwebsite.com" className="px-6 py-3 bg-[#333333] hover:bg-[#2b2b2b] text-white font-medium rounded-lg transition duration-300 flex items-center">
                                            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                                                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                                            </svg>
                                            Gửi Email
                                        </a>
                                        <a href="tel:19000000" className="px-6 py-3 bg-[#2b2b2b] hover:bg-[#333333] text-white font-medium rounded-lg transition duration-300 flex items-center">
                                            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
                                            </svg>
                                            Gọi 1900 0000
                                        </a>
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

export default Policy;