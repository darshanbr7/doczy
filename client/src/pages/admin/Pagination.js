import { useSelector, useDispatch } from "react-redux"
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";
import { setPage, getDoctors } from "../../slices/doctorVerifySlice";

const Pagination = ( { formData }) => {
    const dispatch = useDispatch();
    const { currentPage, totalPages } = useSelector(state => state.VerifyDoctors);
    const handlePageChange = (page) => {
        dispatch(setPage(page))
        dispatch(getDoctors({...formData, page :  page  } ));
    }
    return (
        <div className="h-10 w-auto flex items-center  bg-slate-200   rounded-sm">
            <button className="inline cursor-pointer" disabled={currentPage === 1} >
                <FaAngleDoubleLeft
                    onClick={() => handlePageChange(currentPage - 1)}
                    size={20}
                />
            </button>
            <span className="mx-2 text-sm ml-4 mr-4"> {`page ${currentPage} of ${totalPages}`}</span>
            <button
                className="inline cursor-pointer "
                disabled={currentPage === totalPages}
            >
                <FaAngleDoubleRight
                    size={20}
                    onClick={() => handlePageChange(currentPage + 1)}

                />
            </button>
        </div>
    )
}

export default Pagination