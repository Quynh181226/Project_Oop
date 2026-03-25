import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faPlusSquare } from "@fortawesome/free-solid-svg-icons";

interface HeaderProps {
    // darkMode: boolean;
    onAdd: () => void;
    title?: string;
    cate?: string;
    addButtonText?: string;
}

const HeaderAdm = ({
                       // darkMode,
                       onAdd,
                       title = "",
                       cate = "",
                       // addButtonText = "Thêm Mới"
                   }: HeaderProps) => {
    return (
        <div className="flex items-center justify-between gap-4">
            <div>
                <h1 className="text-[36px] font-semibold mb-[10px]">{title}</h1>
                <div className="flex items-center gap-4">
                    <span className="text-[#AAAAAA] pointer-events-none">{cate}</span>
                    <FontAwesomeIcon icon={faChevronRight} className="text-sm" />
                    <Link to="/dashboardManagement" className="text-[#6B7597]">
                        Dashboard
                    </Link>
                </div>
            </div>
            <div>
                <button
                    onClick={onAdd}
                    className="px-5 py-[10px] rounded-[5px] cursor-pointer text-base bg-[#6B7597] text-[#F9F9F9] transition-all duration-300 hover:bg-[#565D7C] hover:text-[#F9F9F9] flex items-center gap-2"
                >
                    <FontAwesomeIcon icon={faPlusSquare} />
                    {/*{addButtonText}*/}
                    Thêm Mới
                </button>
            </div>
        </div>
    );
};

export default HeaderAdm;