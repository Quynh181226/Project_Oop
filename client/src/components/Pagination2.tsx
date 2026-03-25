interface PagiProps {
    currPage: number;
    totalPages: number;
    onChangePage: (page: number) => void;
}

const Pagination2 = ({ currPage, totalPages, onChangePage }: PagiProps) => {
    return (
        <div className="flex justify-end my-2 gap-2">
            <button disabled={currPage === 1} onClick={() => onChangePage(currPage - 1)} className={`cursor-pointer w-6 h-6 font-medium border border-gray-300 bg-white rounded-lg transition-all    hover:bg-gray-100 disabled:text-gray-400 disabled:bg-gray-100 disabled:cursor-not-allowed   active:translate-y-[2px]`}>
                <i className="fa fa-chevron-left" style={{color: currPage === 1 ? "rgb(156 163 175)" : "#6B7597",}}></i>
            </button>

            <button disabled={currPage === totalPages} onClick={() => onChangePage(currPage + 1)} className={`cursor-pointer w-6 h-6 font-medium border border-gray-300 bg-white rounded-lg transition-all  hover:bg-gray-100 disabled:text-gray-400 disabled:bg-gray-100 disabled:cursor-not-allowed   active:translate-y-[2px]`}>
                <i className="fa fa-chevron-right" style={{color: currPage === totalPages ? "rgb(156 163 175)" : "#6B7597",}}></i>
            </button>
        </div>
    );
};

export default Pagination2;