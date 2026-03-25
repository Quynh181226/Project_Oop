import Header from "../components/Header";
import { Footer } from "../components/Footer";

const TicketPrice = () => {
    return (
        <div className="min-h-screen bg-[#0D0F17] text-white">
            <Header />

            <main className="max-w-6xl mx-auto px-4 pt-[100px]">
                <h1 className="text-3xl font-semibold text-center mb-1">Giá vé</h1>
                <p className="text-center text-gray-400 mb-10">
                    (Áp dụng từ ngày 01/06/2023)
                </p>

                <section className="mb-14">
                    <h2 className="text-xl font-semibold mb-4">1. GIÁ VÉ XEM PHIM 2D</h2>

                    <div className="overflow-x-auto">
                        <table className="w-full border border-gray-700 text-sm text-center">


                            <thead>
                                <tr className="bg-[#161920] text-white">
                                    <th rowSpan={2} className="p-3 border border-gray-700 w-40">
                                        Thời gian <br />
                                        <span className="text-gray-400 text-xs">Time</span>
                                    </th>


                                    <th colSpan={3} className="p-3 border border-gray-700">
                                        Từ thứ 2 đến thứ 5 <br />
                                        <span className="text-gray-400 text-xs">From Monday to Thursday</span>
                                    </th>


                                    <th colSpan={3} className="p-3 border border-gray-700">
                                        Thứ 6, 7, CN và ngày Lễ <br />
                                        <span className="text-gray-400 text-xs">
                                            Friday, Saturday, Sunday & public holiday
                                        </span>
                                    </th>
                                </tr>


                                <tr className="bg-[#161920] text-white">
                                    <th className="p-3 border border-gray-700">Ghế thường<br />Standard</th>
                                    <th className="p-3 border border-gray-700 text-yellow-400">Ghế VIP<br />VIP</th>
                                    <th className="p-3 border border-gray-700 text-red-400">Ghế đôi<br />Sweetbox</th>

                                    <th className="p-3 border border-gray-700">Ghế thường<br />Standard</th>
                                    <th className="p-3 border border-gray-700 text-yellow-400">Ghế VIP<br />VIP</th>
                                    <th className="p-3 border border-gray-700 text-red-400">Ghế đôi<br />Sweetbox</th>
                                </tr>
                            </thead>

                            <tbody className="[&>tr:nth-child(even)]:bg-[#151821]">
                                <tr>
                                    <td className="p-3 border border-gray-700">
                                        Trước 12h <br /><span className="text-gray-400 text-xs">Before 12PM</span>
                                    </td>
                                    <td className="p-3 border border-gray-700">55.000đ</td>
                                    <td className="p-3 border border-gray-700 text-yellow-400">65.000đ</td>
                                    <td className="p-3 border border-gray-700 text-red-400">140.000đ</td>

                                    <td className="p-3 border border-gray-700">70.000đ</td>
                                    <td className="p-3 border border-gray-700 text-yellow-400">80.000đ</td>
                                    <td className="p-3 border border-gray-700 text-red-400">170.000đ</td>
                                </tr>

                                <tr>
                                    <td className="p-3 border border-gray-700">
                                        Từ 12:00–17:00 <br />
                                        <span className="text-gray-400 text-xs">From 5PM to before 11:00PM</span>
                                    </td>
                                    <td className="p-3 border border-gray-700">70.000đ</td>
                                    <td className="p-3 border border-gray-700 text-yellow-400">75.000đ</td>
                                    <td className="p-3 border border-gray-700 text-red-400">160.000đ</td>

                                    <td className="p-3 border border-gray-700">80.000đ</td>
                                    <td className="p-3 border border-gray-700 text-yellow-400">85.000đ</td>
                                    <td className="p-3 border border-gray-700 text-red-400">180.000đ</td>
                                </tr>

                                <tr>
                                    <td className="p-3 border border-gray-700">
                                        Từ 17:00–23:00 <br />
                                        <span className="text-gray-400 text-xs">From 5PM to before 11:00PM</span>
                                    </td>
                                    <td className="p-3 border border-gray-700">80.000đ</td>
                                    <td className="p-3 border border-gray-700 text-yellow-400">85.000đ</td>
                                    <td className="p-3 border border-gray-700 text-red-400">180.000đ</td>

                                    <td className="p-3 border border-gray-700">90.000đ</td>
                                    <td className="p-3 border border-gray-700 text-yellow-400">95.000đ</td>
                                    <td className="p-3 border border-gray-700 text-red-400">200.000đ</td>
                                </tr>

                                <tr>
                                    <td className="p-3 border border-gray-700">
                                        Từ 23:00 <br />
                                        <span className="text-gray-400 text-xs">From 11:00PM</span>
                                    </td>
                                    <td className="p-3 border border-gray-700">65.000đ</td>
                                    <td className="p-3 border border-gray-700 text-yellow-400">70.000đ</td>
                                    <td className="p-3 border border-gray-700 text-red-400">150.000đ</td>

                                    <td className="p-3 border border-gray-700">75.000đ</td>
                                    <td className="p-3 border border-gray-700 text-yellow-400">80.000đ</td>
                                    <td className="p-3 border border-gray-700 text-red-400">170.000đ</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <p className="text-xs text-gray-400 mt-2">
                        * Đối với phim có thời lượng từ 150 phút trở lên: phụ thu 10.000 VND/vé
                    </p>
                </section>


                <section className="mb-14">
                    <h2 className="text-xl font-semibold mb-4">2. GIÁ VÉ XEM PHIM 3D</h2>

                    <div className="overflow-x-auto">
                        <table className="w-full border border-gray-700 text-sm text-center">
                            <thead>
                                <tr className="bg-[#161920] text-white">
                                    <th rowSpan={2} className="p-3 border border-gray-700 w-40">
                                        Thời gian
                                        <br />
                                        <span className="text-gray-400 text-xs">Time</span>
                                    </th>

                                    <th colSpan={3} className="p-3 border border-gray-700">
                                        Từ thứ 2 đến thứ 5
                                        <br />
                                        <span className="text-gray-400 text-xs">From Monday to Thursday</span>
                                    </th>

                                    <th colSpan={3} className="p-3 border border-gray-700">
                                        Thứ 6, 7, CN và ngày Lễ
                                        <br />
                                        <span className="text-gray-400 text-xs">
                                            Friday, Saturday, Sunday & public holiday
                                        </span>
                                    </th>
                                </tr>

                                <tr className="bg-[#161920] text-white">
                                    <th className="p-3 border border-gray-700">Ghế thường<br />Standard</th>
                                    <th className="p-3 border border-gray-700 text-yellow-400">Ghế VIP<br />VIP</th>
                                    <th className="p-3 border border-gray-700 text-red-400">Ghế đôi<br />Sweetbox</th>

                                    <th className="p-3 border border-gray-700">Ghế thường<br />Standard</th>
                                    <th className="p-3 border border-gray-700 text-yellow-400">Ghế VIP<br />VIP</th>
                                    <th className="p-3 border border-gray-700 text-red-400">Ghế đôi<br />Sweetbox</th>
                                </tr>
                            </thead>

                            <tbody className="[&>tr:nth-child(even)]:bg-[#151821]">
                                <tr>
                                    <td className="p-3 border border-gray-700">
                                        Trước 12h
                                        <br /><span className="text-gray-400 text-xs">Before 12PM</span>
                                    </td>

                                    <td className="p-3 border border-gray-700">60.000đ</td>
                                    <td className="p-3 border border-gray-700 text-yellow-400">80.000đ</td>
                                    <td className="p-3 border border-gray-700 text-red-400">160.000đ</td>

                                    <td className="p-3 border border-gray-700">80.000đ</td>
                                    <td className="p-3 border border-gray-700 text-yellow-400">100.000đ</td>
                                    <td className="p-3 border border-gray-700 text-red-400">200.000đ</td>
                                </tr>

                                <tr>
                                    <td className="p-3 border border-gray-700">
                                        Từ 12:00 đến trước 17:00
                                        <br /><span className="text-gray-400 text-xs">From 12PM to before 5PM</span>
                                    </td>

                                    <td className="p-3 border border-gray-700">80.000đ</td>
                                    <td className="p-3 border border-gray-700 text-yellow-400">90.000đ</td>
                                    <td className="p-3 border border-gray-700 text-red-400">180.000đ</td>

                                    <td className="p-3 border border-gray-700">100.000đ</td>
                                    <td className="p-3 border border-gray-700 text-yellow-400">110.000đ</td>
                                    <td className="p-3 border border-gray-700 text-red-400">220.000đ</td>
                                </tr>

                                <tr>
                                    <td className="p-3 border border-gray-700">
                                        Từ 17:00 đến trước 23:00
                                        <br /><span className="text-gray-400 text-xs">From 5PM to before 11PM</span>
                                    </td>

                                    <td className="p-3 border border-gray-700">100.000đ</td>
                                    <td className="p-3 border border-gray-700 text-yellow-400">110.000đ</td>
                                    <td className="p-3 border border-gray-700 text-red-400">220.000đ</td>

                                    <td className="p-3 border border-gray-700">130.000đ</td>
                                    <td className="p-3 border border-gray-700 text-yellow-400">140.000đ</td>
                                    <td className="p-3 border border-gray-700 text-red-400">280.000đ</td>
                                </tr>

                                <tr>
                                    <td className="p-3 border border-gray-700">
                                        Từ 23:00
                                        <br /><span className="text-gray-400 text-xs">From 11PM</span>
                                    </td>

                                    <td className="p-3 border border-gray-700">100.000đ</td>
                                    <td className="p-3 border border-gray-700 text-yellow-400">110.000đ</td>
                                    <td className="p-3 border border-gray-700 text-red-400">220.000đ</td>

                                    <td className="p-3 border border-gray-700">120.000đ</td>
                                    <td className="p-3 border border-gray-700 text-yellow-400">130.000đ</td>
                                    <td className="p-3 border border-gray-700 text-red-400">260.000đ</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <p className="text-xs text-gray-400 mt-2">
                        * Đối với phim có thời lượng từ 150 phút trở lên: phụ thu 10.000 VND/vé
                    </p>
                </section>


                {/* Tiếng Việt */}
                <p className="text-white font-semibold text-lg">
                    * Giá vé đối với các đối tượng khán giả ưu tiên (khi trực tiếp sử dụng dịch vụ xem phim tại rạp chiếu phim):
                </p>

                <ul className="space-y-2 ml-3 text-gray-300">
                    <li>• Giảm 20% giá vé theo qui định đối với: Trẻ em (người dưới 16 tuổi), người cao tuổi (công dân Việt Nam từ đủ 60 tuổi trở lên), người có công với cách mạng,
                        người có hoàn cảnh đặc biệt khó khăn.</li>
                    <li>• Giảm 50% giá vé theo qui định đối với: Người khuyết tật nặng.</li>
                    <li>• Giảm giá vé 100% đối với: Người khuyết tật đặc biệt nặng, trẻ em dưới 0.7m đi kèm với người lớn.</li>
                </ul>

                <p className="text-white font-semibold text-lg italic mt-4">Điều kiện:</p>
                <ul className="space-y-2 ml-3 text-gray-300">
                    <li>• Chỉ áp dụng khi mua vé tại quầy (không áp dụng khi mua online).</li>
                    <li>• Các đối tượng khán giả trên phải xuất trình giấy tờ chứng minh khi mua vé xem phim và trước khi vào phòng chiếu. Cụ thể:</li>
                    <ul className="space-y-2 ml-6 text-gray-300">
                        <li>- Trẻ em (trường hợp trẻ em từ 16 tuổi trở lên), người cao tuổi xuất trình “Căn cước công dân”.</li>
                        <li>- Người có công với cách mạng xuất trình giấy xác nhận theo quy định.</li>
                        <li>- Người có hoàn cảnh đặc biệt khó khăn xuất trình “Giấy chứng nhận hộ nghèo”.</li>
                        <li>- Người khuyết tật xuất trình “Giấy xác nhận khuyết tật”.</li>
                    </ul>
                </ul>

                <p className="text-white font-semibold text-lg my-4">
                    * Ưu đãi cho học sinh, sinh viên từ 12 tuổi trở lên: Đồng giá 55.000đ/vé 2D cho tất cả các suất chiếu phim từ thứ 2 đến thứ 6
                    (hình thức mua vé trực tiếp tại quầy, không áp dụng vé đặt chỗ).
                </p>

                <p className="text-white font-semibold text-lg my-4">
                    * Khán giả nghiêm túc thực hiện xem phim đúng độ tuổi theo phân loại phim: P, K, T13, T16, T18, C. (Trường hợp vi phạm sẽ xử phạt theo Quy định tại Nghị định 128/2022/NĐ-CP ngày 30/12/2022).
                </p>

                <p className="text-white font-semibold text-lg my-4">
                    * Không bán vé cho trẻ em dưới 13 tuổi đối với các suất chiếu phim kết thúc sau 22h00 và không bán vé cho trẻ em dưới 16 tuổi đối với các suất chiếu
                    phim kết thúc sau 23h00.
                </p>

                <ul className="text-white font-semibold text-lg">* Áp dụng giá vé ngày lễ, Tết cho các ngày:</ul>
                <ul className="space-y-2 ml-6">
                    <li>• Các ngày nghỉ lễ, Tết theo quy định của nhà nước: Tết Nguyên Đán, Tết Dương Lịch, ngày Giỗ Tổ Hùng Vương 10/3 AL, ngày 30/4, 1/5, 2/9.</li>
                    <li>• Các ngày: 1/4, 8/3, 24/12.</li>
                    <li>• Các ngày: Nghỉ bù do nghỉ Lễ, Tết trùng vào thứ 7, Chủ nhật.</li>
                </ul>

                <p className="text-white font-semibold text-lg my-4">
                    * Không áp dụng các chế độ ưu đãi, các chương trình khuyến mại khác vào các ngày 20/10, 20/11, Halloween 31/10, các ngày Lễ, Tết, suất chiếu sớm và
                    suất chiếu đặc biệt.
                </p>

                <p className="text-white font-semibold text-lg my-4">
                    * Mua vé xem phim tập thẻ, hợp đồng khoán gọn: Phòng chiếu phim - (024) 35148647.
                </p>

                <p className="text-white font-semibold text-lg my-4">
                    * Thuê phòng tổ chức Hội nghị, làm văn phòng, quảng cáo và các dịch vụ khác: Phòng Dịch vụ - (024) 35142856
                </p>

                <p className=" opacity-70">
                    ĐỀ NGHỊ QUÝ KHÁN GIẢ LƯU Ý KHI MUA VÉ XEM PHIM (ĐẶC BIỆT KHI MUA VÉ ONLINE). TTCPQG KHÔNG CHẤP NHẬN HOÀN TIỀN HOẶC ĐỔI VÉ ĐÃ THANH
                    TOÁN THÀNH CÔNG KHI MUA VÉ ONLINE VÀ VÉ MUA SAI QUY ĐỊNH TẠI QUẦY VÉ.
                </p>
                <p className=" opacity-70 mt-4">
                    Rất mong Quý khán giả phối hợp thực hiện.
                </p>
                <p className=" opacity-70">
                    Xin trân trọng cảm ơn!
                </p>

                {/* Tiếng Anh */}
                <p className="text-white font-semibold text-lg mt-10">
                    * Ticket pricing policy for priority audiences watching movies at the cinema:
                </p>

                <ul className="space-y-2 ml-3 text-gray-300">
                    <li>• 20% discount on ticket price for: Children and teenagers (under 16 years old), elderly people (Vietnamese citizens aged 60 and above), revolutionary contributors, and people with difficult living conditions.</li>
                    <li>• 50% discount on ticket price for: People with severe disabilities.</li>
                    <li>• 100% discount on ticket price for: People with particularly severe disabilities; Children under 0.7m accompanied by adults.</li>
                </ul>

                <p className="text-white font-semibold text-lg italic mt-4">Conditions:</p>

                <ul className="space-y-2 ml-3 text-gray-300">
                    <li>• Applicable only when buying tickets at the counter (not valid for online ticket purchases).</li>
                    <li>• Priority audiences must present valid identification documents when buying tickets and before entering the screening room. Specifically:</li>

                    <ul className="space-y-2 ml-6 text-gray-300">
                        <li>- Teenagers (14–16 years old) and elderly people must present their “ID card”.</li>
                        <li>- Revolutionary contributors must present required certification.</li>
                        <li>- People with difficult living conditions must present a “Certificate of Poor Household”.</li>
                        <li>- People with disabilities must present a “Certificate of Disability”.</li>
                    </ul>
                </ul>

                <p className="text-white font-semibold text-lg my-4">
                    * Special promotion for students aged 22 and under: From Monday to Friday, 2D tickets are priced at 55,000đ for all showtimes (only applicable for direct purchase at the ticket counter. One student card can purchase one ticket per day. Students must show both their U22 and student ID cards to receive this benefit).
                </p>

                <p className="text-white font-semibold text-lg my-4">
                    * Audiences must strictly follow the age classification system: P, K, T13, T16, T18, C.
                    (Violations will be handled according to Decree 128/2022/ND-CP issued on December 30, 2022).
                </p>

                <p className="text-white font-semibold text-lg my-4">
                    * Tickets for movies ending after 22:00 are not sold to children under 13 years old.
                    Tickets for movies ending after 23:00 are not sold to teenagers under 16 years old.
                </p>

                <ul className="text-white font-semibold text-lg">
                    * Holiday ticket pricing is applied on:
                </ul>

                <ul className="space-y-2 ml-6 text-gray-300">
                    <li>• National public holidays: New Year, Lunar New Year, Hung Kings’ Festival (March 10 — lunar calendar), April 30th, May 1st, September 2nd.</li>
                    <li>• Special days: Valentine’s Day, International Women’s Day, Christmas.</li>
                    <li>• Compensatory days off when holidays fall on weekends (Saturday or Sunday).</li>
                </ul>

                <p className="text-white font-semibold text-lg my-4">
                    * Preferential programs and other promotions do not apply on: October 20th, November 20th, Halloween (October 31st), public holidays, sneak shows, or special shows.
                </p>

                <p className="opacity-70">
                    VALUED AUDIENCES, PLEASE TAKE NOTE WHEN PURCHASING MOVIE TICKETS (ESPECIALLY ONLINE TICKETS).
                    THE NATIONAL CINEMA CENTER DOES NOT ACCEPT REFUNDS OR EXCHANGES FOR SUCCESSFULLY PAID TICKETS
                    (INCLUDING ONLINE TICKETS AND TICKETS PURCHASED INCORRECTLY AT THE COUNTER).
                </p>

                <p className="opacity-70 mt-4">
                    Thank you for your valued cooperation.
                </p>

                <p className="opacity-70">
                    Best regards!
                </p>
               <p className="my-6">------------------------------</p>

            </main>
            <Footer />
        </div>
    );
};

export default TicketPrice;