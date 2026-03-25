import { useState, useEffect } from "react";
import "../styles/adm.css";
import { useAppDispatch, useAppSelector } from "../hooks/Hook";
import { getAllMovies } from "../apis/MovieApi";
import LoadingProcess from "../components/LoadingProcess.tsx";
import TableMovie from "../components/TableMovie.tsx";
import ModalAddEditMovie from "../components/ModalAddEditMovie";
import ModalDeleteMovie from "../components/ModalDeleteMovie";
import Sidebar from "../components/Sidebar.tsx";
import Navbar from "../components/Navbar.tsx";
import HeaderAdm from "../components/HeaderAdm.tsx";
import SearchBar from "../components/SearchBar.tsx";
import type { Movie } from "../types/type.ts";

const MovieManagement = () => {
    const dispatch = useAppDispatch();
    const { movies, loading, error } = useAppSelector((state) => state.movies);
    const { currentUser } = useAppSelector((state) => state.user);

    const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
    const [darkMode, setDarkMode] = useState<boolean>(false);
    const [searchTerm, setSearchTerm] = useState("");

    const [openAddEdit, setOpenAddEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [code, setCode] = useState<"Add" | "Edit">("Add");
    const [selectedMovie, setSelectedMovie] = useState<Movie | undefined>(undefined);

    useEffect(() => {
        dispatch(getAllMovies());
    }, [dispatch]);

    const handleAddMovie = () => {
        setCode("Add");
        setSelectedMovie(undefined);
        setOpenAddEdit(true);
    };

    const handleSearch = (value: string) => {
        setSearchTerm(value);
    };

    const filteredMovies = movies.filter((movie) =>
        searchTerm.trim() === ""
            ? true
            : movie.title?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div
            className={`font-[Poppins,sans-serif] m-0 p-0 box-border transition-colors duration-300 ${
                darkMode ? "bg-[#37353E] text-[#FBFBFB]" : "bg-[#eee] min-h-screen text-[#37353E]"
            }`}
        >
            <Sidebar sidebarOpen={sidebarOpen} darkMode={darkMode} activePage="movie" />

            <section
                className={`relative transition-all duration-300 ease-in-out ${
                    sidebarOpen ? "w-[calc(100%-280px)] left-[280px]" : "w-[calc(100%-60px)] left-[60px]"
                } max-[768px]:w-[calc(100%-60px)] max-[768px]:left-[60px]`}
            >
                <Navbar
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                    darkMode={darkMode}
                    setDarkMode={setDarkMode}
                    currentUser={currentUser}
                />

                <main className="w-full min-h-screen p-[36px_24px] font-[Poppins,sans-serif] max-h-[calc(100vh-56px)] overflow-y-auto">
                    {/* Header */}
                    <HeaderAdm
                        title="Quản Lý Phim"
                        cate="Phim"
                        onAdd={handleAddMovie}
                    />

                    <SearchBar
                        darkMode={darkMode}
                        placeholder="Tìm kiếm phim theo tên..."
                        onSearch={handleSearch}
                    />

                    <div className="flex gap-6 mt-6 w-full">
                        <div
                            className={`flex-grow basis-[500px] rounded-[20px] p-6 ${
                                darkMode ? "bg-[#302E36]" : "bg-[#F9F9F9]"
                            }`}
                        >
                            <div className="flex justify-end gap-4 mb-6 text-xl">
                                <i className="bx bx-search cursor-pointer text-[#6B7597]" />
                                <i className="bx bx-filter cursor-pointer text-[#6B7597]" />
                            </div>

                            {loading && <LoadingProcess />}
                            {error && <div className="text-red-500 text-center">{error}</div>}

                            {!loading && !error && filteredMovies.length === 0 && (
                                <div
                                    className={`text-center py-8 ${
                                        darkMode ? "text-gray-400" : "text-gray-600"
                                    }`}
                                >
                                    {searchTerm.trim() !== ""
                                        ? `Không tìm thấy phim nào cho "${searchTerm}"`
                                        : "Không có phim nào"}
                                </div>
                            )}

                            {!loading && !error && filteredMovies.length > 0 && (
                                <TableMovie
                                    movies={filteredMovies}
                                    setCode={setCode}
                                    setSelectedMovie={setSelectedMovie}
                                    setOpenAddEdit={setOpenAddEdit}
                                    setOpenDelete={setOpenDelete}
                                    darkMode={darkMode}
                                />
                            )}

                            <ModalAddEditMovie
                                open={openAddEdit}
                                onClose={() => setOpenAddEdit(false)}
                                movie={selectedMovie}
                                code={code}
                            />

                            <ModalDeleteMovie
                                open={openDelete}
                                onClose={() => setOpenDelete(false)}
                                movie={selectedMovie}
                            />
                        </div>
                    </div>
                </main>
            </section>
        </div>
    );
};

export default MovieManagement;