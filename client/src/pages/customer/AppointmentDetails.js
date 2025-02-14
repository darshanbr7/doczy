import { useLocation, useNavigate } from "react-router-dom";
import { MdOutlineCalendarMonth, MdAccessTime } from "react-icons/md";
import { format } from "date-fns";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCustomerSecret, bookAppointment } from "../../slices/paymentSlice";
import { paymentPageOpen } from "../../slices/slotSlice";
import { toast } from "react-toastify";
import Payment from "../mutual/Payment";
import Spinner from "../mutual/Spinner";

const AppointmentDetails = ({ formData, amount }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { paymentPageIsOpen } = useSelector(state => state.slot);
    const { isLoading, serverError } = useSelector(state => state.payment)
    const [paymentOption, setPaymentOption] = useState("cash")
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const doctorId = queryParams.get("doctorId");
    const handleOnlinePayment = () => {
        if (formData.time) {
            dispatch(createCustomerSecret({ amount: amount * 100 }));
            dispatch(paymentPageOpen());
        } else {
            toast.warning("Appointment time need to Selected")
        }
    }
    const hanldeBookAppointment = async(e) => {
        const actionResult = await dispatch(bookAppointment({ doctorId, appointmentDate: formData.date, appointmentTime: formData.time, consultationFee: amount, paymentMethod: paymentOption }));
        if( actionResult.type === bookAppointment.fulfilled.type ){
            navigate("/find-doctors")
        }
    }
    return (
        <div className="ml-8 mt-2 flex  flex-col p-3 w-10/12 h-auto bg-slate-100">
            {isLoading && <Spinner />}
            <div className="px-4 ml-auto mr-auto">
                <p className="font-semibold opacity-80"> Appointment Details </p>

            </div>
            <div className="flex justify-between p-10">
                <span className="flex items-center space-x-2 ">
                    <MdOutlineCalendarMonth size={20} />
                    <span className="text-sm font-semibold">{format(formData?.date, "dd-MMM-yyyy")}</span>
                </span>
                <span className="flex items-center space-x-2  mr-4">
                    <MdAccessTime size={20} />
                    <span className="text-sm font-semibold">{formData?.time}</span>
                </span>
            </div>
            <div className="pl-10">
                <p className="font-semibold"> Choose a payment option to Book Appointment</p>
                <div className="mt-5 bg-white w-52 p-3 font-semibold">
                    <label > <input
                        type="radio"
                        name="payment"
                        value="online"
                        id="payment"
                        className="mr-2"
                        onChange={(e) => setPaymentOption(e.target.value)}
                        checked={paymentOption === "online"}
                    />  ₹ {amount}  <span className="text-xs ml-3"> Pay Online</span></label>
                </div>
                <div className="mt-5 bg-white w-52 p-3 font-semibold">
                    <label > <input
                        type="radio"
                        name="payment"
                        id="payment"
                        value="cash"
                        className="mr-2"
                        onChange={(e) => setPaymentOption(e.target.value)}
                        checked={paymentOption === "cash"}
                    />  ₹ {amount}  <span className="text-xs ml-3"> Pay later at clinic</span></label>
                </div>
                <div className=" flex justify-center mt-10 mb-5 ">
                    {
                        paymentOption === "cash" && <button
                            onClick={hanldeBookAppointment}
                            className="text-sm px-4 py-2 font-semibold bg-blue-400 cursor-pointer shadow-sm rounded-sm text-white hover:scale-110"> Book Appointment</button>
                    }
                    {
                        paymentOption === "online" && <button
                            onClick={handleOnlinePayment}
                            className="text-sm px-4 py-2 font-semibold bg-blue-400 cursor-pointer shadow-sm rounded-sm text-white hover:scale-110"> Pay Now</button>
                    }
                </div>
                {
                    serverError && serverError.map((ele, i) => {
                        return <li key={i} className="text-sm font-semibold text-red-500 opacity-80"> {ele.msg}</li>
                    })
                }
                <div className="mt-8">
                    <p className=""> Safe and secure payments.</p>
                    <li className="text-sm mt-2"> No more billing queues, go cashless!</li>
                    <li className="text-sm mt-2" >  Instant appointment confirmation </li>
                    <li className="text-sm mt-2"> Easy appointment management </li>
                </div>
            </div>
            {
                paymentPageIsOpen && <Payment amount={amount} formData={formData} doctorId={doctorId} />
            }
        </div>
    )
}
export default AppointmentDetails;