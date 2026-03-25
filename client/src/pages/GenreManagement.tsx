import { useState, useEffect } from "react";
import "../styles/adm.css";
import { useAppDispatch, useAppSelector } from "../hooks/Hook";
import { getAllCategories } from "../apis/GenreApi.ts";
import LoadingProcess from "../components/LoadingProcess.tsx";
import TableCategory from "../components/TableCategory.tsx";
import {ModalAddEditGenre} from "../components/ModalAddEditGenre.tsx";
import ModalDeleteGenre from "../components/ModalDeleteGenre.tsx";
import type { Category } from "../types/type.ts";
import Sidebar from "../components/Sidebar.tsx";
import Navbar from "../components/Navbar.tsx";
import Header from "../components/HeaderAdm.tsx";
import SearchBar from "../components/SearchBar.tsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faSearch } from "@fortawesome/free-solid-svg-icons";

const GenreManagement = () => {
    const dispatch = useAppDispatch();
    const { categories, loading, error } = useAppSelector((state) => state.categories);
    const { currentUser } = useAppSelector((state) => state.user);
    const [searchTerm, setSearchTerm] = useState("");
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
    const [darkMode, setDarkMode] = useState<boolean>(false);
    const [openAddEdit, setOpenAddEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [code, setCode] = useState<"Add" | "Edit">("Add");
    const [selectedCategory, setSelectedCategory] = useState<Category | undefined>(undefined);

    useEffect(() => {
        dispatch(getAllCategories());
    }, [dispatch]);

    const handleAddCategory = () => {
        setCode("Add");
        setSelectedCategory(undefined);
        setOpenAddEdit(true);
    };

    const handleSearch = (value: string) => {
        setSearchTerm(value);
    };

    const filteredCategories = categories.filter(category =>
        searchTerm.trim() === ""
            ? true
            : category.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className={`font-[Poppins,sans-serif] m-0 p-0 box-border transition-colors duration-300 ${darkMode ? "bg-[#37353E] text-[#FBFBFB]" : "bg-[#eee] min-h-screen text-[#37353E]"}`}>
            <Sidebar sidebarOpen={sidebarOpen} darkMode={darkMode} activePage="category" />

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
                    <Header
                        title="Thể Loại Phim"
                        cate="Genre"
                        // darkMode={darkMode}
                        onAdd={handleAddCategory}
                    />

                    <SearchBar
                        darkMode={darkMode}
                        placeholder="Tìm kiếm thể loại..."
                        onSearch={handleSearch}
                    />

                    <div className="flex gap-6 mt-6 w-full">
                        <div className={`flex-grow basis-[500px] rounded-[20px] p-6 ${darkMode ? "bg-[#302E36]" : "bg-[#F9F9F9]"}`}>
                            <div className="flex justify-end gap-4 mb-6 text-xl">
                                <FontAwesomeIcon icon={faSearch} className="cursor-pointer text-[#6B7597]" />
                                <FontAwesomeIcon icon={faFilter} className="cursor-pointer text-[#6B7597]" />
                            </div>

                            {loading && <LoadingProcess />}
                            {error && <div className="text-red-500 text-center">{error}</div>}

                            {!loading && !error && filteredCategories.length === 0 && (
                                <div className={`text-center py-8 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                                    Không có thể loại phù hợp !!
                                </div>
                            )}

                            {!loading && !error && filteredCategories.length > 0 && (
                                <TableCategory
                                    categories={filteredCategories}
                                    setCode={setCode}
                                    setSelectedCategory={setSelectedCategory}
                                    setOpenAddEdit={setOpenAddEdit}
                                    setOpenDelete={setOpenDelete}
                                    darkMode={darkMode}
                                />
                            )}

                            <ModalAddEditGenre
                                open={openAddEdit}
                                onClose={() => setOpenAddEdit(false)}
                                category={selectedCategory}
                                code={code}
                            />

                            <ModalDeleteGenre
                                open={openDelete}
                                onClose={() => setOpenDelete(false)}
                                category={selectedCategory}
                            />
                        </div>
                    </div>
                </main>
            </section>
        </div>
    );
};

export default GenreManagement;