import Pagination from "../components/Pagination";
import type { Movie } from "../types/type";
import { useState } from "react";

interface TableMovieProps {
    movies: Movie[];
    setCode: (code: "Add" | "Edit") => void;
    setSelectedMovie: (movie: Movie | undefined) => void;
    setOpenAddEdit: (open: boolean) => void;
    setOpenDelete: (open: boolean) => void;
    darkMode: boolean;
}

const TableMovie = ({ movies, setCode, setSelectedMovie, setOpenAddEdit, setOpenDelete, darkMode }: TableMovieProps) => {
    const [currPage, setCurrPage] = useState(1);
    const perPage = 3;

    const totalPages = Math.ceil(movies.length / perPage);
    const start = (currPage - 1) * perPage;
    const end = start + perPage;
    const pagi = movies.slice(start, end);

    const handleEdit = (movie: Movie) => {
        setSelectedMovie(movie);
        setCode("Edit");
        setOpenAddEdit(true);
    };

    const handleDelete = (movie: Movie) => {
        setSelectedMovie(movie);
        setOpenDelete(true);
    };

    const getMovieStatusClass = (status: string) => {
        if (status === "showing") {
            return `w-[80%] text-center px-2 py-[4px] rounded-2xl border-2 cursor-default font-bold bg-[#e9f6ec] border-[#90a56a] text-[#90a56a]`;
        }
        if (status === "coming") {
            return `w-[80%] text-center px-2 py-[4px] rounded-2xl border-2 cursor-default font-bold bg-[#e8f4fd] border-[#64b5f6] text-[#2196f3]`;
        }
        return `w-[80%] text-center px-2 py-[4px] rounded-2xl border-2 cursor-default font-bold bg-[#f5f5f5] border-[#bdbdbd] text-[#757575]`;
    };

    const getMovieStatusText = (status: string) => {
        if (status === "showing") return "Đang chiếu";
        if (status === "coming") return "Sắp chiếu";
        return "Kết thúc";
    };

    return (
        <>
            <div className={`rounded-lg border ${darkMode ? "border-gray-600" : "border-gray-300"} overflow-hidden`}>
                <table className="w-full border-collapse">
                    <thead>
                    <tr className={`${darkMode ? "bg-[#2D2B33] text-gray-200" : "bg-[#8B93AF] text-white"}`}>
                        <th className="px-6 py-3 text-left border border-gray-300">ID</th>
                        <th className="px-6 py-3 text-left border border-gray-300">Poster</th>
                        <th className="px-6 py-3 text-left border border-gray-300">Tên phim</th>
                        <th className="px-6 py-3 text-center border border-gray-300">Thời lượng</th>
                        <th className="px-6 py-3 text-center border border-gray-300">Trạng thái</th>
                        <th className="px-6 py-3 text-center border border-gray-300">Hành động</th>
                    </tr>
                    </thead>
                    <tbody>
                    {pagi.map((movie, index) => (
                        <tr
                            key={movie.id}
                            className={`${index % 2 === 0
                                ? darkMode ? "bg-[#2A282F]" : "bg-gray-50"
                                : darkMode ? "bg-[#242228]" : "bg-white"
                            } hover:${darkMode ? "bg-[#3A3740]" : "bg-blue-50"} transition`}
                        >
                            <td className={`px-6 py-4 border ${darkMode ? "border-gray-600 text-gray-300" : "border-gray-300"}`}>{movie.id}</td>
                            <td className={`px-6 py-4 border ${darkMode ? "border-gray-600" : "border-gray-300"}`}>
                                <img src={movie.poster} alt={movie.title} className="w-16 h-24 object-cover rounded" />
                            </td>
                            <td className={`px-6 py-4 border ${darkMode ? "border-gray-600 text-gray-200" : "border-gray-300"} font-medium`}>
                                {movie.title}
                            </td>
                            <td className={`px-6 py-4 text-center border ${darkMode ? "border-gray-600 text-gray-200" : "border-gray-300"}`}>
                                {movie.duration} phút
                            </td>
                            <td className={`px-4 py-2 border ${darkMode ? "border-gray-600" : "border-gray-300"} text-center`}>
                                <div className={`${getMovieStatusClass(movie.status)} inline-block text-sm font-medium`}>
                                    {getMovieStatusText(movie.status)}
                                </div>
                            </td>
                            <td className={`px-6 py-4 text-center border ${darkMode ? "border-gray-600" : "border-gray-300"}`}>
                                <button onClick={() => handleEdit(movie)} className={`cursor-pointer px-4 py-1.5 rounded-3xl ${darkMode ? "bg-[#565D7C] text-gray-200 hover:bg-[#6B7597]" : "bg-[#6B7597] text-white hover:bg-[#565D7C]"} mr-3`}>
                                    <i className="bx bxs-pencil text-lg"></i>
                                </button>
                                <button onClick={() => handleDelete(movie)} className="cursor-pointer px-4 py-1.5 rounded-3xl bg-red-700 text-white hover:bg-red-800">
                                    <i className="bx bxs-trash text-lg"></i>
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {totalPages > 1 && (
                <Pagination currPage={currPage} totalPages={totalPages} darkMode={darkMode} onChangePage={(p) => setCurrPage(p)} />
            )}
        </>
    );
};

export default TableMovie;