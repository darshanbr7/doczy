import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns"
import { getMyReviews, deleteReview } from "../../slices/reviewSlice";
import SideNavbar from "../mutual/SideNavbar";
import Spinner from "../mutual/Spinner";

const MyReviews = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { myReviews, isLoading, serverError } = useSelector(state => state.review);

    useEffect(() => {
        if (myReviews?.length === 0) {
            dispatch(getMyReviews());
        }
    }, []);
    const handleDelete = (id) => {
        const confirm = window.confirm("Are you sure");
        if (confirm) {
            dispatch(deleteReview(id));
        }
    }
    const handleEdit = (doctorId, reviewId) => {
       navigate(`/review?doctorId=${doctorId}&reviewId=${reviewId}`)
    }
    return (
        <div className="flex">
            {isLoading && <Spinner />}
            <div className="w-auto p-4">
                <SideNavbar />
            </div>
            <div className="reviews-container w-8/12  ml-10 mr-auto items-center p-4">
                {myReviews?.length > 0 ? (
                    myReviews.map((review) => (
                        <div key={review._id} className=" border p-4 mb-4 rounded-lg shadow-md">
                            <h3 >Doctor Name :<span className="text-xl font-bold"> {review.doctorId.name}</span></h3>
                            <div className="rating mb-2">
                                <span className="text-yellow-500">Rating : {review.rating} ★</span>
                            </div>
                            <p className="description mb-2">{review.description}</p>
                            <p className="created-at text-sm text-gray-600">
                                Posted on : {format(review.createdAt, "eee MMM,dd yyyy")}
                            </p>
                            <div className="buttons mt-4 pr-3 flex justify-end gap-5">
                                <button
                                    onClick={ () => handleEdit( review.doctorId._id, review._id )}
                                    className="bg-blue-400 text-white text-xs font-semibold px-4  py-2 rounded-md hover:bg-blue-500 hover:scale-105 ">
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(review._id)}
                                    className="bg-red-400 text-white text-xs font-semibold px-4 rounded-md hover:bg-red-500 hover:scale-105 ">
                                    Delete
                                </button>
                            </div>

                        </div>
                    ))
                ) : (
                    <p>No reviews found.</p>
                )}
            </div>
            <div >
                {
                    serverError && serverError.map((ele, i) => {
                        return <li key={i} className="text-sm font-semibold text-red-500 opacity-80"> {ele.msg}</li>
                    })
                }
            </div>

        </div>
    );
};

export default MyReviews;
