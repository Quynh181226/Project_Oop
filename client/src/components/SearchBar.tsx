import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

interface SearchBarProps {
    darkMode: boolean;
    placeholder?: string;
    onSearch?: (value: string) => void;
    className?: string;
}

const SearchBar = ({
                       darkMode,
                       placeholder = "Tìm kiếm...",
                       onSearch,
                       className = ""
                   }: SearchBarProps) => {
    const [searchValue, setSearchValue] = useState("");

    // Thêm: gọi onSearch ngay khi gõ
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchValue(value);
        if (onSearch) {
            onSearch(value); // QUAN TRỌNG: gọi onSearch real-time
        }
    };

    // Giữ nguyên handleSubmit
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (onSearch) {
            onSearch(searchValue);
        }
    };

    return (
        <form className={`w-full mr-auto mt-5 ${className}`} onSubmit={handleSubmit}>
            <div className="flex items-center h-9">
                <input
                    type="search"
                    value={searchValue}
                    onChange={handleInputChange} // ĐÃ SỬA: thêm onChange
                    placeholder={placeholder}
                    className={`flex-grow px-4 h-full border-2 rounded-l-[36px] outline-none w-full transition-colors duration-300 ${
                        darkMode
                            ? "bg-[#302E36] border-[#888] text-[#F9F9F9] placeholder-[#B0B0B0]"
                            : "bg-[#eee] border-[#6B7597] text-[#302E36] placeholder-[#6B7597]"
                    }`}
                />
                <button
                    type="submit"
                    className={`w-9 h-full flex justify-center items-center text-lg border-2 border-l-0 rounded-r-[36px] outline-none cursor-pointer transition-colors duration-300 ${
                        darkMode
                            ? "bg-[#6B7597] border-[#888] text-[#F9F9F9] hover:bg-[#565D7C]"
                            : "bg-[#6B7597] border-[#6B7597] text-[#F9F9F9] hover:bg-[#565D7C]"
                    }`}
                >
                    <FontAwesomeIcon icon={faSearch} />
                </button>
            </div>
        </form>
    );
};

export default SearchBar;