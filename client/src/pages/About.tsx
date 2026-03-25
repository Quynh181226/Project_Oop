import { motion } from "framer-motion";
import Header from "../components/Header";
import {
    Users,
    Film,
    Trophy,
    Star,
    Award,
    Calendar,
    Globe,
    Target,
    Heart,
    Quote
} from "lucide-react";
import Avatar from "../assets/Avatar.svg"
// import TestimonialCard from "../components/TestimonialCard";

const About = () => {
    const fadeInUp = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    const staggerChildren = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    return (
        <>
            <Header/>
            <div className="min-h-screen bg-black">
                {/* Hero Section */}
                <section className="relative pt-20 pb-10 px-4 overflow-hidden">
                    <div className="relative z-10 max-w-6xl mx-auto text-center">
                        <motion.p className="mt-5 text-2xl  font-bold text-white">
                            Giới thiệu
                        </motion.p>
                    </div>
                    {/*<motion.h1*/}
                    {/*    initial="hidden"*/}
                    {/*    animate="visible"*/}
                    {/*    variants={fadeInUp}*/}
                    {/*    transition={{ duration: 0.6 }}*/}
                    {/*    className="text-center text-md font-bold text-white mb-6"*/}
                    {/*>*/}
                        Trung Tâm Chiếu Phim Quốc Gia
                    {/*</motion.h1>*/}

                    <motion.p
                        initial="hidden"
                        animate="visible"
                        variants={fadeInUp}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-md text-center text-gray-400 max-w-4xl mx-auto leading-relaxed"
                    >
                        Thiết chế văn hóa điện ảnh hàng đầu Việt Nam, nơi phổ biến phim phục vụ nhiệm vụ chính trị - xã hội và mang đến trải nghiệm điện ảnh chất lượng cao cho công chúng <span className="text-xl text-white">-</span>  "<span className="text-white">Trung Tâm Chiếu Phim Quốc Gia</span>"
                    </motion.p>
                </section>

                {/* Testimonial Section */}
                <section className="px-4 bg-black">
                    <div className="max-w-6xl mx-auto">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeInUp}
                            className="text-center mb-16"
                        >
                            <h2 className="pt-5 text-xl md:text-2xl font-bold text-white mb-6">
                                Câu chuyện từ khán giả và đối tác
                            </h2>

                            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                                Những chia sẻ chân thực từ khán giả và đối tác đã đồng hành cùng Trung tâm Chiếu phim Quốc gia
                            </p>
                        </motion.div>

                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={staggerChildren}
                            className="grid md:grid-cols-3 gap-8"
                        >
                            {[
                                {
                                    quote: "Trung tâm Chiếu phim Quốc gia là nơi mang đến những bộ phim ý nghĩa, phục vụ tốt nhiệm vụ chính trị và giáo dục cộng đồng.",
                                    author: "Khán giả Nguyễn Thị Hương",
                                    position: "Giáo viên",
                                },
                                {
                                    quote: "Âm thanh và hình ảnh chất lượng cao, không gian hiện đại, là địa điểm lý tưởng cho các liên hoan phim quốc tế.",
                                    author: "Đạo diễn Trần Văn Minh",
                                    position: "Đạo diễn phim tài liệu",
                                },
                                {
                                    quote: "Hợp tác tổ chức sự kiện tại đây luôn chuyên nghiệp, góp phần lan tỏa giá trị điện ảnh Việt Nam.",
                                    author: "Đại diện Đại sứ quán Pháp",
                                    position: "Văn hóa - Hợp tác",
                                    company: "Đại sứ quán Pháp tại Việt Nam"
                                }
                            ].map((testimonial, index) => (
                                <motion.div
                                    key={index}
                                    variants={fadeInUp}
                                    whileHover={{ y: -5 }}
                                    className="bg-[#2b2b2b] p-6 rounded-xl border border-gray-800 relative"
                                >
                                    {/* Dấu ngoặc kép trên đầu */}
                                    <div className="absolute -top-3 -left-[-10] text-gray-400 opacity-50">
                                        <Quote className="w-8 h-8" />
                                    </div>

                                    <p className="text-gray-300 mb-6 italic pt-4">
                                        "{testimonial.quote}"
                                    </p>

                                    {/* Dấu ngoặc kép dưới chân */}
                                    <div className="absolute -bottom-3 right-6 text-gray-400 opacity-50 rotate-180">
                                        <Quote className="w-8 h-8" />
                                    </div>

                                    <div className="flex items-center gap-3 relative z-10">
                                        <div className="rounded-full">
                                            <img src={Avatar}/>
                                        </div>
                                        <div>
                                            <div className="font-semibold text-white">{testimonial.author}</div>
                                            <div className="text-sm text-gray-400">{testimonial.position}</div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* Mission & Vision */}
                <section className="pt-8 px-4 bg-black">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <motion.div
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={fadeInUp}
                            >
                                <div className="inline-flex items-center gap-2  text-white px-4  mb-6">
                                    <Target className="w-5 h-5" />
                                    <span className="font-semibold">Sứ mệnh & Tầm nhìn</span>
                                </div>

                                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                                    Phổ biến và lan tỏa giá trị điện ảnh
                                </h2>

                                <div className="space-y-4 text-gray-400">
                                    <p className="leading-relaxed">
                                        Là đơn vị sự nghiệp công lập trực thuộc Bộ Văn hóa, Thể thao và Du lịch, chúng tôi cam kết tổ chức phát hành, phổ biến phim phục vụ nhiệm vụ chính trị - xã hội, hợp tác quốc tế, đồng thời mang đến trải nghiệm điện ảnh đa dạng và chất lượng cao cho mọi tầng lớp khán giả.
                                    </p>

                                    <p className="leading-relaxed">
                                        Với hệ thống rạp chiếu hiện đại tại 87 Láng Hạ, Hà Nội, chúng tôi tiên phong trong việc giới thiệu điện ảnh Việt Nam ra thế giới và mang tinh hoa điện ảnh quốc tế về Việt Nam.
                                    </p>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                className="relative"
                            >
                                <div className="relative rounded-2xl overflow-hidden">
                                    {/* Hình nội thất rạp chiếu phim NCC */}
                                    <img
                                        src="https://vietnamteachingjobs-com.b-cdn.net/wp-content/uploads/2024/12/cinema-in-vietnam-national-cinema-center.jpg"
                                        alt="Rạp chiếu phim NCC"
                                        className="mt-10 w-full h-[400px] object-cover"
                                    />
                                    <div className="absolute inset-0 bg-[#2b2b2b]/60" />
                                    <div className="absolute bottom-6 left-6 text-white">
                                        <Film className="w-8 h-8 mb-2" />
                                        <h3 className="text-xl font-bold">Rạp chiếu hiện đại</h3>
                                        <p className="text-gray-400">Công nghệ Dolby 7.1 và màn hình lớn</p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Core Values */}
                <section className="px-4 bg-black">
                    <div className="max-w-6xl mx-auto">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeInUp}
                            className="text-center mb-16"
                        >
                            <div className="mt-10 inline-flex items-center gap-2  text-white px-4 mb-4">
                                <Heart className="w-5 h-5" />
                                <span className="font-semibold">Giá trị cốt lõi</span>
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                                Điều làm nên thương hiệu NCC
                            </h2>
                            <p className="text-gray-400 max-w-2xl mx-auto">
                                Chúng tôi xây dựng trên nền tảng phục vụ cộng đồng và phát triển văn hóa điện ảnh
                            </p>
                        </motion.div>

                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={staggerChildren}
                            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
                        >
                            {[
                                {
                                    icon: <Star className="w-8 h-8" />,
                                    title: "Chất lượng cao",
                                    description: "Công nghệ trình chiếu hiện đại, âm thanh Dolby 7.1"
                                },
                                {
                                    icon: <Users className="w-8 h-8" />,
                                    title: "Phục vụ cộng đồng",
                                    description: "Ưu tiên nhiệm vụ chính trị - xã hội và giáo dục qua điện ảnh"
                                },
                                {
                                    icon: <Trophy className="w-8 h-8" />,
                                    title: "Hợp tác quốc tế",
                                    description: "Tổ chức liên hoan phim và tuần phim các nước"
                                },
                                {
                                    icon: <Globe className="w-8 h-8" />,
                                    title: "Lan tỏa văn hóa",
                                    description: "Giới thiệu điện ảnh Việt Nam và thế giới"
                                }
                            ].map((value, index) => (
                                <motion.div
                                    key={index}
                                    variants={fadeInUp}
                                    whileHover={{ y: -5 }}
                                    className="bg-[#2b2b2b] p-6 rounded-xl border border-gray-800"
                                >
                                    <div className="inline-flex items-center justify-center w-14 h-14 bg-[#333333] rounded-lg mb-4 text-gray-400">
                                        {value.icon}
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-2">
                                        {value.title}
                                    </h3>
                                    <p className="text-gray-400">
                                        {value.description}
                                    </p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* Achievements */}
                <section className="py-20 px-4 bg-black">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                className="relative"
                            >
                                <div className="relative rounded-2xl overflow-hidden">
                                    {/* Hình sự kiện liên hoan phim tại NCC */}
                                    <img
                                        src="https://mediaen.vietnamplus.vn/images/f452454bbd6fc5e39be208129221a2f42691566f770697d106828f0b571109ff8005546dd15891b9d953fc3b3db1e519c1e5f4495d314dafc2d7d739e8cd1f1f/mua-do-golden-lotus-award.jpg"
                                        alt="Sự kiện điện ảnh tại NCC"
                                        className="w-full h-[400px] object-cover"
                                    />
                                    <div className="absolute inset-0 bg-[#2b2b2b]/60" />
                                    <div className="absolute bottom-6 left-6 text-white">
                                        <Calendar className="w-8 h-8 mb-2" />
                                        <h3 className="text-xl font-bold">Liên hoan phim</h3>
                                        <p className="text-gray-400">Tổ chức các sự kiện quốc tế</p>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={fadeInUp}
                            >
                                <div className="inline-flex items-center gap-2  text-white px-4 mb-6">
                                    <Award className="w-5 h-5" />
                                    <span className="font-semibold">Thành tựu</span>
                                </div>

                                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                                    Hành trình hơn 25 năm phát triển
                                </h2>

                                <div className="space-y-6">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="text-center p-4 bg-[#333333] rounded-lg">
                                            <div className="text-3xl font-bold text-white mb-2">27+</div>
                                            <div className="text-gray-400">Năm hoạt động</div>
                                        </div>
                                        <div className="text-center p-4 bg-[#333333] rounded-lg">
                                            <div className="text-3xl font-bold text-white mb-2">Hàng trăm</div>
                                            <div className="text-gray-400">Sự kiện & liên hoan phim</div>
                                        </div>
                                        <div className="text-center p-4 bg-[#333333] rounded-lg">
                                            <div className="text-3xl font-bold text-white mb-2">Hàng triệu</div>
                                            <div className="text-gray-400">Khán giả phục vụ</div>
                                        </div>
                                        <div className="text-center p-4 bg-[#333333] rounded-lg">
                                            <div className="text-3xl font-bold text-white mb-2">50+</div>
                                            <div className="text-gray-400">Đối tác quốc tế</div>
                                        </div>
                                    </div>

                                    <p className="text-gray-400 leading-relaxed">
                                        Thành lập năm 1997, Trung tâm Chiếu phim Quốc gia đã trở thành địa chỉ văn hóa điện ảnh uy tín, tổ chức thành công hàng loạt liên hoan phim quốc tế và phục vụ hàng triệu khán giả.
                                    </p>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Team Section */}
                <section className="px-4 bg-black">
                    <div className="max-w-6xl mx-auto">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeInUp}
                            className="text-center mb-16"
                        >
                            <div className="inline-flex items-center gap-2  text-white px-4  mb-4">
                                <Users className="w-5 h-5" />
                                <span className="font-semibold">Đội ngũ</span>
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                                Đội ngũ tận tâm với điện ảnh
                            </h2>
                            <p className="text-gray-400 max-w-2xl mx-auto">
                                Tập thể chuyên nghiệp, nhiệt huyết vì sứ mệnh phổ biến điện ảnh
                            </p>
                        </motion.div>

                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                            >
                                <div className="relative rounded-2xl overflow-hidden">
                                    {/* Hình đội ngũ hoặc sự kiện liên quan */}
                                    <img
                                        src="https://mediaen.vietnamplus.vn/images/f452454bbd6fc5e39be208129221a2f49dd8d2618d6e579d986beac422f0cacd9b270049476bf4f38d73e341148fa958/bac-kinh2-171225.jpg"
                                        alt="Đội ngũ NCC"
                                        className="w-full h-[400px] object-cover"
                                    />
                                </div>
                            </motion.div>

                            <motion.div
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={fadeInUp}
                            >
                                <h3 className="text-2xl font-bold text-white mb-4">
                                    Đồng hành vì văn hóa điện ảnh Việt Nam
                                </h3>

                                <div className="space-y-4 text-gray-400 mb-6">
                                    <p className="leading-relaxed">
                                        Đội ngũ cán bộ, nhân viên giàu kinh nghiệm, luôn nỗ lực phục vụ khán giả và hoàn thành tốt các nhiệm vụ được giao từ Bộ Văn hóa, Thể thao và Du lịch.
                                    </p>

                                    <p className="leading-relaxed">
                                        Với tinh thần trách nhiệm cao, chúng tôi không ngừng nâng cao chất lượng dịch vụ, tổ chức các chương trình ý nghĩa để lan tỏa giá trị điện ảnh đến cộng đồng.
                                    </p>
                                </div>

                                <div className="flex flex-wrap gap-3">
                                    <span className="px-4 py-2 bg-[#333333] text-white rounded-full text-sm font-medium">
                                        Chuyên nghiệp
                                    </span>
                                    <span className="px-4 py-2 bg-[#333333] text-white rounded-full text-sm font-medium">
                                        Tận tâm
                                    </span>
                                    <span className="px-4 py-2 bg-[#333333] text-white rounded-full text-sm font-medium">
                                        Sáng tạo
                                    </span>
                                    <span className="px-4 py-2 bg-[#333333] text-white rounded-full text-sm font-medium">
                                        Trách nhiệm
                                    </span>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
};

export default About;