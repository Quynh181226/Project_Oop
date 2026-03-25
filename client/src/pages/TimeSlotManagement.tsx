import { useState, useEffect } from "react";
import "../styles/adm.css";
import { useAppDispatch, useAppSelector } from "../hooks/Hook";
import { getAllTimeSlots } from "../apis/TimeSlotApi";
import LoadingProcess from "../components/LoadingProcess.tsx";
import TableTimeSlot from "../components/TableTimeSlot.tsx";
import ModalAddEditTimeSlot from "../components/ModalAddEditTimeSlot";
import ModalDeleteTimeSlot from "../components/ModalDeleteTimeSlot";
import Sidebar from "../components/Sidebar.tsx";
import Navbar from "../components/Navbar.tsx";
import HeaderAdm from "../components/HeaderAdm.tsx";
import SearchBar from "../components/SearchBar.tsx";
import type { TimeSlot } from "../types/type.ts";

const TimeSlotManagement = () => {
    const dispatch = useAppDispatch();
    const { slots, loading, error } = useAppSelector((state) => state.timeSlots);
    const { currentUser } = useAppSelector((state) => state.user);

    const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
    const [darkMode, setDarkMode] = useState<boolean>(false);
    const [searchTerm, setSearchTerm] = useState("");

    const [openAddEdit, setOpenAddEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [code, setCode] = useState<"Add" | "Edit">("Add");
    const [selectedSlot, setSelectedSlot] = useState<TimeSlot | undefined>(undefined);

    useEffect(() => {
        dispatch(getAllTimeSlots());
    }, [dispatch]);

    const handleAddTimeSlot = () => {
        setCode("Add");
        setSelectedSlot(undefined);
        setOpenAddEdit(true);
    };

    const handleSearch = (value: string) => {
        setSearchTerm(value);
    };

    const filteredSlots = slots.filter((slot) => {
        if (searchTerm.trim() === "") return true;

        const slotTime = slot.time?.toLowerCase() || "";
        const query = searchTerm.toLowerCase();

        return (
            slotTime.includes(query) ||
            slotTime.replace(":", "").includes(query.replace(":", ""))
        );
    });

    return (
        <div
            className={`font-[Poppins,sans-serif] m-0 p-0 box-border transition-colors duration-300 ${
                darkMode ? "bg-[#37353E] text-[#FBFBFB]" : "bg-[#eee] min-h-screen text-[#37353E]"
            }`}
        >
            <Sidebar sidebarOpen={sidebarOpen} darkMode={darkMode} activePage="timeSlot" />

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
                    <HeaderAdm
                        title="Quản Lý Giờ Chiếu"
                        cate="Giờ Chiếu"
                        onAdd={handleAddTimeSlot}
                    />

                    <SearchBar
                        darkMode={darkMode}
                        placeholder="Tìm kiếm giờ chiếu..."
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

                            {!loading && !error && filteredSlots.length === 0 && (
                                <div
                                    className={`text-center py-8 ${
                                        darkMode ? "text-gray-400" : "text-gray-600"
                                    }`}
                                >
                                    {searchTerm.trim() !== ""
                                        ? `Không tìm thấy giờ chiếu nào cho "${searchTerm}"`
                                        : "Không có giờ chiếu nào"}
                                </div>
                            )}

                            {!loading && !error && filteredSlots.length > 0 && (
                                <TableTimeSlot
                                    slots={filteredSlots}
                                    setCode={setCode}
                                    setSelectedSlot={setSelectedSlot}
                                    setOpenAddEdit={setOpenAddEdit}
                                    setOpenDelete={setOpenDelete}
                                    darkMode={darkMode}
                                />
                            )}

                            <ModalAddEditTimeSlot
                                open={openAddEdit}
                                onClose={() => setOpenAddEdit(false)}
                                slot={selectedSlot}
                                code={code}
                            />

                            <ModalDeleteTimeSlot
                                open={openDelete}
                                onClose={() => setOpenDelete(false)}
                                slot={selectedSlot}
                            />
                        </div>
                    </div>
                </main>
            </section>
        </div>
    );
};

export default TimeSlotManagement;