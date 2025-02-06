import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { format, addDays } from "date-fns";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import SideNavbar from "../mutual/SideNavbar";
import { getSlots, paymentPageOpen, setDetailsPageOpen } from "../../slices/slotSlice";
import { createCustomerSecret } from "../../slices/paymentSlice";
import { doctorInfo } from "../../slices/customerSlice";
import Spinner from "../mutual/Spinner";
import AppointmentDetails from "./AppointmentDetails";

const BookAppointment = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const { slots, serverError, isLoading, detailsPageOpen } = useSelector(state => state.slot);
    const { doctorDetails } = useSelector(state => state.customer);

    const [formData, setFormData] = useState({
        date: format(new Date(), "yyyy-MM-dd"),
        time: "",
    });

    const [dates, setDates] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const queryParams = new URLSearchParams(location.search);
    const doctorId = queryParams.get("doctorId");
    useEffect(() => {
        if (doctorId) {
            dispatch(doctorInfo(doctorId));
            dispatch(getSlots({ doctorId, date: formData.date }));
        } else {
            navigate("/find-doctors");
        }

        const generateDates = () => {
            const today = new Date();
            const endOfMonthDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
            const datesArray = [];
            let currentDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
            while (currentDate <= endOfMonthDate) {
                datesArray.push(currentDate);
                currentDate = addDays(currentDate, 1);
            }
            setDates(datesArray);
        };
        generateDates();

    }, [location.search, formData.date,]);

    const handleNext = () => {
        if (currentIndex + 3 < dates.length) {
            setCurrentIndex(currentIndex + 3);
        }
    };

    const handlePrev = () => {
        if (currentIndex - 3 >= 0) {
            setCurrentIndex(currentIndex - 3);
        }
    };

    const handleDateChange = (selectedDate) => {
        setFormData({ ...formData, date: format(selectedDate, "yyyy-MM-dd") });
        dispatch(getSlots({ doctorId, date: format(selectedDate, "yyyy-MM-dd") }));
    };

    const handleSlotSelection = (time) => {
        dispatch( setDetailsPageOpen() );
        setFormData({ ...formData, time });
    };
    const handleBookAppointment = () => {
        if (formData.time) {
            dispatch(createCustomerSecret({ amount: doctorDetails.consultationFee })); 
            dispatch(paymentPageOpen());
        } else {
            toast.warning("Please select a slot.");
        }
    };

    return (
        <div className="flex min-h-screen from-blue-50 to-blue-200">
            {isLoading && <Spinner />}
            <div className="w-auto p-4">
                <SideNavbar />
            </div>
            <div className="flex w-full justify-center">
                <div className="flex flex-col w-1/2 space-y-6">
                    <div className="flex flex-col bg-slate-100 mt-4 rounded-sm w-full p-8">
                        <div className="flex border-b border-black">
                            <img src={doctorDetails?.profileId?.avatar} alt="Profile" className="mt-6 h-32 w-32 rounded-full p-2" />
                            <div className="p-3">
                                <p className="font-semibold my-3 mx-3">{doctorDetails?.userId?.name}</p>
                                <p className="text-sm m-1 font-semibold mt-3">
                                    <span className="ml-2 opacity-80">{doctorDetails?.yearsOfExperience} years experience overall</span>
                                </p>
                                {doctorDetails?.specialization[0].split(",").map((ele, i) => (
                                    <p key={i} className="ml-3 text-sm font-semibold opacity-85">{ele}</p>
                                ))}
                                <p className="text-sm m-1 font-semibold mt-1">
                                    <span className="ml-2 opacity-80">{doctorDetails?.address?.street} {doctorDetails?.address?.city}</span>
                                </p>
                                <p className="text-sm m-1 font-semibold mt-3">
                                    <span className="ml-2 opacity-80">₹ {doctorDetails?.consultationFee} Consultation fee at clinic</span>
                                </p>
                            </div>
                        </div>
                        <div className="flex justify-end mt-3 mb-4">
                            <p className="cursor-pointer hover:underline hover:text-blue-500">Patient Stories</p>
                        </div>
                    </div>

                    <div className="flex flex-col bg-slate-100 mt-4 rounded-sm w-full p-4">
                        <div className="flex items-center justify-center mt-2">
                            <FaAngleLeft className="cursor-pointer" onClick={handlePrev} />
                            <div className="flex space-x-4 mx-4">
                                {dates.slice(currentIndex, currentIndex + 3).map((date, index) => (
                                    <div
                                        key={index}
                                        onClick={() => handleDateChange(date)}
                                        className="flex flex-col items-center px-4 py-2 bg-white rounded shadow text-gray-700 cursor-pointer">
                                        <span className=" text-sm font-semibold">
                                            {format(date, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd')
                                                ? "Today"
                                                : format(date, 'yyyy-MM-dd') === format(addDays(new Date(), 1), 'yyyy-MM-dd')
                                                    ? "Tomorrow"
                                                    : format(date, 'dd MMM')
                                            }
                                        </span>
                                    </div>
                                ))}
                            </div>
                            <FaAngleRight className="cursor-pointer" onClick={handleNext} />
                        </div>

                        <div className="flex flex-wrap justify-center mx-4 mt-5">
                            {slots.length > 0 &&
                                slots.map((ele, i) => {
                                    if (ele.booked) return null;
                                    return (
                                        <div
                                            key={i}
                                            onClick={ ()=>handleSlotSelection( ele.time)}
                                            className="w-28 ml-3 px-2 py-3 bg-white rounded-sm font-semibold text-xs mb-2 text-center cursor-pointer">
                                            {ele.time}
                                        </div>
                                    );
                                })
                            }
                            {
                                slots.length === 0 &&
                                <div className="flex justify-center items-center mt-4">
                                    <p className="text-red-500 text-sm">Slots are not created</p>
                                </div>
                            }

                        </div>
                    </div>
                </div>

                <div className="w-1/2 flex mt-2">
                    { detailsPageOpen && <AppointmentDetails formData = { formData } amount = { doctorDetails?.consultationFee}/> }
                </div>
            </div>
        </div>



    );
};

export default BookAppointment;
