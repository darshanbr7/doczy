import { useSelector, useDispatch } from "react-redux"
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";
import { setPage } from "../../slices/doctorVerifySlice";

const Pagination = ( ) => {
    const dispatch = useDispatch();
    const { currentPage, totalPages } = useSelector( state => state.VerifyDoctors );
    const handlePageChange = ( page ) => {
        dispatch( setPage( page ) )
    }
    return (
        <div className="h-12 w-auto flex items-center  bg-slate-200  p-2 rounded-sm">
            <button className="inline cursor-pointer"  
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={ currentPage === 1}
        > <FaAngleDoubleLeft  size = {20}/></button>
            <span className="mx-2 text-sm ml-4 mr-4"> { `page ${currentPage} of ${ totalPages }`}</span>
            <button className="inline cursor-pointer "
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            > <FaAngleDoubleRight  size = {20}/></button>
        </div>
    )
}

export default Pagination