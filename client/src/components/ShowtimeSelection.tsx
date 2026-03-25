// // src/pages/ShowtimeSelection.tsx
// import React from 'react';
// import type { CalendarDay, Showtime } from '../types/type';
//
// interface ShowtimeSelectionProps {
//     calendarDays: CalendarDay[];
//     selectedDate: string;
//     showtimesByDate: Showtime;
//     isShowtimeSelected: boolean;
//     onDateSelect: (date: string) => void;
//     onShowtimeSelect: (time: string) => void;
// }
//
// const ShowtimeSelection: React.FC<ShowtimeSelectionProps> = ({
//                                                                  calendarDays,
//                                                                  selectedDate,
//                                                                  showtimesByDate,
//                                                                  isShowtimeSelected,
//                                                                  onDateSelect,
//                                                                  onShowtimeSelect
//                                                              }) => {
//     const currentShowtimes = showtimesByDate[selectedDate] || [];
//
//     return (
//         <>
//             <div className="flex justify-center gap-4 flex-wrap mb-8">
//                 {calendarDays.map((day) => (
//                     <button
//                         key={day.date}
//                         onClick={() => !isShowtimeSelected && onDateSelect(day.date)}
//                         className={`bg-[#1e2026] p-4 rounded-lg text-center cursor-pointer w-24 transition-all ${
//                             selectedDate === day.date ? 'bg-red-600 shadow-md' : 'hover:bg-red-600/50'
//                         }`}
//                     >
//                         <div className="text-sm text-gray-400">{day.month}</div>
//                         <div className="text-3xl font-bold">{day.day}</div>
//                         <div className="text-sm text-gray-400">{day.weekday}</div>
//                     </button>
//                 ))}
//             </div>
//
//             <div className="flex flex-wrap justify-center gap-4 mb-8">
//                 {currentShowtimes.map((time) => (
//                     <button
//                         key={time}
//                         onClick={() => onShowtimeSelect(time)}
//                         disabled={isShowtimeSelected}
//                         className="border border-white rounded-full px-6 py-2 min-w-[100px] hover:bg-white hover:text-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//                     >
//                         {time}
//                     </button>
//                 ))}
//             </div>
//         </>
//     );
// };
//
// export default ShowtimeSelection;