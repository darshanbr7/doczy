import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { allCustomerReviews } from "../../slices/reviewSlice";
import SideNavbar from "../mutual/SideNavbar";
import Spinner from "../mutual/Spinner";


const CustomerReviews = () => {
    const dispatch = useDispatch();
    const { customerReviews, isLoading } = useSelector(state => state.review);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const doctorId = queryParams.get("doctorId");
    
    useEffect(() => {
        dispatch(allCustomerReviews(doctorId));
    }, [])

    return (
        <div className="flex h-auto">
            {isLoading && <Spinner />}
            <div className="flex w-auto p-4">
                <SideNavbar />
            </div>
            <div className="flex w-8/12 ml-auto mr-auto py-8 flex-col">
                {customerReviews.length === 0 ? (
                    <div className="text-gray-600 font-semibold text-lg">
                        No reviews available.
                    </div>
                ) : (
                    customerReviews.map((review) => {
                        return (
                            <div key={review._id} className="w-full bg-slate-100 mb-4 p-8 rounded-lg">
                                <div className="flex justify-between items-center mb-4 border-b border-gray-200 pb-2">
                                    <div className="text-lg font-semibold text-blue-600">{review?.userId?.name}</div>
                                    <div className="max-w-32">
                                        <Rating
                                            readOnly
                                            value={review.rating}
                                        />
                                    </div>
                                </div>
                                <div className="text-gray-700">{review.description}</div>
                                <div className="border-b border-gray-200 mb-4"></div>
                                <div className=" flex justify-end text-sm text-gray-500">
                                Reviewed on {format(review.createdAt, "MMM dd, yyyy")}
                            </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>

    )
}
export default CustomerReviews

/* 
<div
                            key={review._id}
                            className="bg-white p-6 w-full rounded-lg shadow-lg  border border-gray-200 hover:shadow-xl"
                        >
                            <div className="flex justify-between items-center mb-4 border-b border-gray-200 pb-2">
                                <div className="text-lg font-semibold text-blue-600">{review.userId.name}</div>
                                <div className="flex">
                                    {renderStars(review.rating)}
                                </div>
                            </div>

                            <div className="mb-4">
                                <p className="text-gray-700">{review.description}</p>
                            </div>
                            <div className="border-b border-gray-200 mb-4"></div>
                            <div className=" flex justify-end text-sm text-gray-500">
                                Reviewed on {format(review.createdAt, "MMM dd, yyyy")}
                            </div>
                        </div>
*/
