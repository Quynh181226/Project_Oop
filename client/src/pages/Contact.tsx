import { motion } from "framer-motion";
import Header from "../components/Header";

const Contact = () => {
    const fadeInUp = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <>
            <Header/>
            <section className="py-20 px-4 bg-black">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="text-center mb-12"
                    >
                        <h2 className="mt-5 text-3xl md:text-4xl font-bold text-white mb-4">
                            Hãy đến với chúng tôi
                        </h2>

                        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                            Luôn sẵn sàng đón tiếp và hợp tác cùng các đối tác, khách hàng
                        </p>

                        <div className="items-center gap-2  text-white px-6 py-3 mb-6">
                            <span className="font-semibold text-lg"> Liên hệ & Hợp tác</span>
                        </div>
                    </motion.div>

                    <div className="grid lg:grid-cols-2 gap-12 items-start">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeInUp}
                            className="space-y-8"
                        >
                            <div className="bg-[#2b2b2b] rounded-2xl p-8 border border-gray-600 cursor-pointer">
                                <div className="flex items-start gap-4 mb-6">
                                    <div className="flex-shrink-0 w-12 h-12 bg-[#333333] rounded-lg flex items-center justify-center">
                                        <i className='bx bx-building text-2xl text-white'></i>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white mb-2">Trụ sở chính</h3>
                                        <p className="text-gray-400">
                                            Số 87 Láng Hạ, Phường Ô Chợ Dừa,<br />
                                            Quận Đống Đa, TP. Hà Nội
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-[#2b2b2b] rounded-2xl p-8 border border-gray-600 cursor-pointer">
                                <div className="flex items-start gap-4 mb-6">
                                    <div className="flex-shrink-0 w-12 h-12 bg-[#333333] rounded-lg flex items-center justify-center">
                                        <i className='bx bx-phone text-2xl text-white'></i>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white mb-2">Thông tin liên hệ</h3>
                                        <div className="space-y-3">
                                            <div>
                                                <div className="font-medium text-gray-400">Điện thoại:</div>
                                                <div className="text-gray-300">024.3514.1791</div>
                                            </div>
                                            <div>
                                                <div className="font-medium text-gray-400">Email:</div>
                                                <div className="text-gray-300">info@chieuphimquocgia.com.vn</div>
                                            </div>
                                            <div>
                                                <div className="font-medium text-gray-400">Hotline đặt vé:</div>
                                                <div className="text-gray-300">1900.636.999</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-[#2b2b2b] rounded-2xl p-8 border border-gray-600 cursor-pointer">
                                <div className="flex items-start gap-4 mb-6">
                                    <div className="flex-shrink-0 w-12 h-12 bg-[#333333] rounded-lg flex items-center justify-center">
                                        <i className='bx bx-time text-2xl text-white'></i>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white mb-2">Giờ làm việc</h3>
                                        <div className="space-y-2">
                                            <div className="flex justify-between">
                                                <span className="text-gray-400">Văn phòng:</span>
                                                <span className="font-medium text-white">8:00 - 17:00</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-400">Rạp chiếu phim:</span>
                                                <span className="font-medium text-white">8:00 - 22:00</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-400">Thứ 2 - Chủ nhật</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeInUp}
                            transition={{ delay: 0.2 }}
                            className="relative"
                        >
                            <div className="bg-[#2b2b2b] rounded-2xl p-6 border border-gray-600 cursor-pointer">
                                <h3 className="text-xl font-bold text-white mb-4">Vị trí trên bản đồ</h3>

                                <div className="relative h-96 rounded-xl overflow-hidden">
                                    <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.486331877853!2d105.816367!3d21.013532!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab86d5e9b8b7%3A0x6d7e3f3c3e3e3e3e!2zVHJ1bmcgdMOibSBDaGlldSBwaGltIFF14buRYyBn4bq5YQ!5e0!3m2!1svi!2s!4v1700000000000"
                                        width="100%"
                                        height="100%"
                                        style={{ border: 0 }}
                                        allowFullScreen
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                        title="Bản đồ Trung tâm Chiếu phim Quốc gia"
                                    ></iframe>
                                </div>

                                <div className="mt-6 grid grid-cols-3 gap-4">
                                    <div className="text-center p-3 bg-[#333333] rounded-lg">
                                        <div className="text-2xl mb-2 text-white">
                                            <i className='bx bx-train'></i>                                         </div>
                                        <div className="text-sm font-medium text-gray-300">Ga tàu điện</div>
                                        <div className="text-xs text-gray-400">500m</div>
                                    </div>
                                    <div className="text-center p-3 bg-[#333333] rounded-lg">
                                        <div className="text-2xl mb-2 text-white">
                                            <i className='bx bx-bus'></i>
                                        </div>
                                        <div className="text-sm font-medium text-gray-300">Trạm xe buýt</div>
                                        <div className="text-xs text-gray-400">300m</div>
                                    </div>
                                    <div className="text-center p-3 bg-[#333333] rounded-lg">
                                        <div className="text-2xl mb-2 text-white">
                                            <i className='bx bx-car'></i>                                        </div>
                                        <div className="text-sm font-medium text-gray-300">Bãi đỗ xe</div>
                                        <div className="text-xs text-gray-400">Có sẵn</div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6">
                                <a
                                    href="https://maps.google.com/?q=Trung+tâm+Chiếu+phim+Quốc+gia+Số+87+Láng+Hạ+Hà+Nội"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center gap-2 w-full py-3 px-6 bg-[#333333] text-white rounded-xl font-semibold hover:bg-gray-700 transition-colors duration-300"
                                >
                                    <span>Chỉ đường với Google Maps</span>
                                </a>
                            </div>
                        </motion.div>
                    </div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        transition={{ delay: 0.3 }}
                        className="mt-16 text-center"
                    >
                        <div className="bg-[#2b2b2b] rounded-2xl p-8 md:p-12 border border-gray-600 cursor-pointer">
                            <h3 className="text-2xl font-bold text-white mb-4">
                                Quan tâm đến hợp tác kinh doanh?
                            </h3>
                            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                                Chúng tôi luôn tìm kiếm các đối tác tiềm năng cho các dự án điện ảnh,
                                tổ chức sự kiện và phát triển nội dung. Hãy liên hệ để cùng tạo ra
                                những giá trị mới trong ngành điện ảnh.
                            </p>
                            <div className="flex flex-wrap gap-4 justify-center">
                                <a href="mailto:partnership@chieuphimquocgia.com.vn" className="px-6 py-3 bg-[#333333] text-white rounded-lg font-semibold hover:bg-gray-700 transition-colors duration-300">
                                    <i className='bx bx-envelope mr-2'></i> Gửi email hợp tác
                                </a>

                                <a href="tel:+842435141791" className="px-6 py-3 bg-[#2b2b2b] text-white border border-gray-700 cursor-pointer rounded-lg font-semibold hover:bg-[#333333] transition-colors duration-300">
                                    <i className='bx bx-phone mr-2'></i> Gọi ngay cho chúng tôi
                                </a>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </>
    );
};

export default Contact;