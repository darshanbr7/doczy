import { useLocation } from "react-router-dom";
import { MdOutlineCalendarMonth, MdAccessTime } from "react-icons/md";
import { format } from "date-fns";

const AppointmentDetails = ({ formData, amount }) => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const doctorId = queryParams.get("doctorId");
    console.log(formData);
    console.log(doctorId);
    return (
        <div className="ml-8 mt-2 flex  flex-col p-3 w-10/12 h-auto bg-slate-100">
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
                                    id="payment"
                                    className="mr-2"
                                />  ₹ {amount}  <span className="text-xs ml-3"> Pay Online</span></label>
                </div>
                <div className="mt-5 bg-white w-52 p-3 font-semibold">
                    <label > <input 
                                    type="radio" 
                                    name="payment"
                                    id="payment"
                                    className="mr-2"
                                />  ₹ {amount}  <span className="text-xs ml-3"> Pay later at clinic</span></label>
                </div>
                <div className=" flex justify-center mt-10">
                    <button className="text-sm px-4 py-2 font-semibold bg-blue-400 cursor-pointer shadow-sm rounded-sm text-white hover:scale-110"> Confirm Appointment</button>
                </div>
                <div className="mt-8">
                    <p className=""> Safe and secure payments.</p>
                    <li className="text-sm mt-2"> No more billing queues, go cashless!</li>
                    <li className="text-sm mt-2" >  Instant appointment confirmation </li>
                    <li className="text-sm mt-2"> Easy appointment management </li>
                </div>
            </div>

        </div>
    )
}
export default AppointmentDetails;