import { useState, useEffect } from 'react';
import Screen from "../assets/Screen.svg";

interface Seat {
    id: string;
    type: 'standard' | 'vip' | 'double';
    row: string;
    number: number;
}

interface SeatSelectionProps {
    currentShowtime: string;
    selectedDate: string;
    selectedSeats: string[];        // Danh sách ghế đã chọn (ví dụ: ['K3', 'K4'])
    onSeatToggle: (seatIds: string[]) => void;  // Đổi: truyền mảng ghế (1 hoặc 2)
    onBackClick: () => void;
    onPayment: () => void;
    getTicketPrice: (seatType: 'Standard' | 'VIP' | 'Sweetbox', time: string) => number;
    reservedSeats: string[];
}

const SeatSelection: React.FC<SeatSelectionProps> = ({
                                                         currentShowtime,
                                                         selectedDate,
                                                         selectedSeats,
                                                         onSeatToggle,
                                                         onBackClick,
                                                         onPayment,
                                                         getTicketPrice,
                                                         reservedSeats
                                                     }) => {
    const [countdown, setCountdown] = useState(600);

    useEffect(() => {
        if (countdown <= 0) {
            onBackClick();
            return;
        }

        const timer = setInterval(() => {
            setCountdown(prev => {
                if (prev <= 1) {
                    clearInterval(timer);
                    onBackClick();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [countdown, onBackClick]);

    const [seats] = useState<Seat[]>(() => {
        const seatArray: Seat[] = [];
        for (let row of 'ABCDEFGHIJK'.split('')) {
            for (let i = 1; i <= 14; i++) {
                let type: 'standard' | 'vip' | 'double' = 'standard';
                if ('DEFGHIJ'.includes(row) && i >= 3 && i <= 12) type = 'vip';
                if (row === 'K') type = 'double';
                seatArray.push({ id: `${row}${i}`, type, row, number: i });
            }
        }
        return seatArray;
    });

    // Hàm lấy cặp ghế đôi từ 1 ghế bất kỳ trong cặp
    const getDoubleSeatPair = (seatId: string): string[] | null => {
        const row = seatId[0];
        if (row !== 'K') return null;

        const num = parseInt(seatId.slice(1));
        if (num < 1 || num > 14) return null;

        // Ghế lẻ → cặp với ghế chẵn bên phải, ghế chẵn → cặp với ghế lẻ bên trái
        if (num % 2 === 1) {
            return [`K${num}`, `K${num + 1}`];
        } else {
            return [`K${num - 1}`, `K${num}`];
        }
    };

    // Kiểm tra xem một ghế có thuộc cặp đã reserved không
    const isSeatReserved = (seatId: string): boolean => {
        if (reservedSeats.includes(seatId)) return true;

        // Nếu là ghế đôi, kiểm tra xem ghế kia có reserved không
        const pair = getDoubleSeatPair(seatId);
        if (pair) {
            return pair.some(id => reservedSeats.includes(id));
        }
        return false;
    };

    // Kiểm tra xem một cặp ghế đôi có đang được chọn không
    const isPairSelected = (seatId: string): boolean => {
        const pair = getDoubleSeatPair(seatId);
        if (!pair) return selectedSeats.includes(seatId);
        return pair.every(id => selectedSeats.includes(id));
    };

    const calculateTotalPrice = () => {
        return selectedSeats.reduce((total, seatId) => {
            const seat = seats.find(s => s.id === seatId);
            if (!seat) return total;
            const seatType = seat.type === 'vip' ? 'VIP' : seat.type === 'double' ? 'Sweetbox' : 'Standard';
            return total + getTicketPrice(seatType, currentShowtime);
        }, 0);
    };

    const totalPrice = calculateTotalPrice();

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const handleSeatClick = (seatId: string) => {
        const pair = getDoubleSeatPair(seatId);

        if (pair) {
            // Đây là ghế đôi → toggle cả cặp
            const isCurrentlySelected = pair.every(id => selectedSeats.includes(id));
            if (isCurrentlySelected) {
                // Bỏ chọn cả cặp
                onSeatToggle(pair);
            } else {
                // Kiểm tra xem cặp có bị reserved không
                if (pair.some(id => reservedSeats.includes(id))) {
                    return; // Không cho chọn nếu có ghế bị đặt
                }
                // Chọn cả cặp
                onSeatToggle(pair);
            }
        } else {
            // Ghế thường/VIP → toggle từng ghế
            if (isSeatReserved(seatId)) return;
            onSeatToggle([seatId]);
        }
    };

    return (
        <div className="bg-[#1e2026] pb-8">
            <div className="flex flex-row justify-between w-11/12 md:w-4/5 max-w-3xl mx-auto my-4 md:my-8 px-4 md:px-0">
                <div className="text-left mb-4 md:mb-0">
                    <p className="text-gray-300"><span className="text-white text-lg font-semibold">Suất chiếu: </span>{currentShowtime}</p>
                    <p className="text-gray-300"><span className="text-white text-lg font-semibold">Ngày: </span>{selectedDate}</p>
                </div>
                <div className="border border-[#EF4444] rounded-2xl px-4 py-2 text-sm bg-red-600/10 self-start md:self-center">
                    Thời gian chọn ghế: <span className="font-bold">{formatTime(countdown)}</span>
                </div>
            </div>

            <div className="w-full max-w-4xl mx-auto flex justify-center my-4">
                <img src={Screen} alt="" className="w-full max-w-[1000px] object-contain"/>
            </div>

            <h2 className="text-center mb-4 text-lg md:text-xl font-semibold">Phòng chiếu số 1</h2>

            <div className="px-2 md:px-0">
                <div className="grid grid-cols-14 gap-1 md:gap-2 justify-center w-full max-w-3xl mx-auto">
                    {seats.map((seat) => {
                        const isReserved = isSeatReserved(seat.id);
                        const isSelected = isPairSelected(seat.id) || selectedSeats.includes(seat.id);

                        let seatClass = 'w-6 h-6 md:w-9 md:h-9 rounded flex items-center justify-center text-xs md:text-sm cursor-pointer transition-all duration-200 ';

                        if (isReserved) {
                            seatClass += 'bg-[#44475a] cursor-not-allowed ';
                        } else if (isSelected) {
                            seatClass += 'bg-blue-500 hover:bg-blue-600 ';
                        } else if (seat.type === 'vip') {
                            seatClass += 'bg-orange-500 hover:bg-orange-600 ';
                        } else if (seat.type === 'double') {
                            seatClass += 'bg-red-500 hover:bg-red-600 ';
                        } else {
                            seatClass += 'bg-[#2e3138] hover:bg-[#3a3d44] ';
                        }

                        return (
                            <div
                                key={seat.id}
                                className={seatClass}
                                onClick={() => !isReserved && handleSeatClick(seat.id)}
                                title={
                                    isReserved
                                        ? "Ghế đã được đặt"
                                        : seat.type === 'double'
                                            ? `Ghế đôi ${seat.id} (chọn cả 2 ghế)`
                                            : `Ghế ${seat.id}`
                                }
                            >
                                {isReserved ? '✗' : seat.id}
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="flex flex-wrap justify-center gap-3 md:gap-6 my-6 md:my-8 px-4">
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 md:w-5 md:h-5 rounded bg-[#44475a]" >✗</div>
                    <span className="text-xs md:text-sm">Đã đặt</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 md:w-5 md:h-5 rounded bg-blue-500" />
                    <span className="text-xs md:text-sm">Ghế bạn chọn</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 md:w-5 md:h-5 rounded bg-[#2e3138]" />
                    <span className="text-xs md:text-sm">Ghế thường</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 md:w-5 md:h-5 rounded bg-orange-500" />
                    <span className="text-xs md:text-sm">Ghế VIP</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 md:w-5 md:h-5 rounded bg-red-500" />
                    <span className="text-xs md:text-sm">Ghế đôi</span>
                </div>
            </div>

            <div className="w-11/12 md:w-4/5 max-w-3xl mx-auto mb-8 pt-4 flex md:flex-row justify-between items-center
 gap-4 md:gap-0 border-t border-[#2e3138] px-4 md:px-0">
                <div className="flex flex-col gap-1 md:gap-2">
                    <p className="text-sm md:text-base">Ghế đã chọn: <span className="font-semibold text-yellow-400">{selectedSeats.join(', ') || 'Chưa chọn ghế'}</span></p>
                    <p className="text-sm md:text-base">Tổng tiền: <span className="font-semibold text-green-400">{totalPrice.toLocaleString()}đ</span></p>
                </div>
                <div className="flex gap-3">
                    <button  onClick={onBackClick} className="cursor-pointer px-4 md:px-6 py-2 border border-white rounded-full bg-transparent text-white font-medium hover:bg-white/20 transition-colors text-sm md:text-base">
                        Quay lại
                    </button>
                    {/*disabled={selectedSeats.length === 0}*/}
                    <button  onClick={onPayment} className={`px-4 md:px-6 py-2 rounded-full text-white font-medium transition-colors text-sm md:text-base ${selectedSeats.length === 0 ? 'bg-gray-600 cursor-not-allowed' : 'cursor-pointer bg-red-500 hover:bg-red-600'}`}>
                        Thanh toán
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SeatSelection;