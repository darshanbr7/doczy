import { useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { format, parse, differenceInMilliseconds } from "date-fns";
import SideNavbar from "../mutual/SideNavbar";
import Spinner from "../mutual/Spinner";
import { getAppointments, cancelAppointment } from "../../slices/appointmentSlice";


const AppointmentHistory = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoading, serverError, appointments } = useSelector(state => state.appointment)
    useEffect(() => {
        dispatch(getAppointments());
    }, [])
    const handleCancel = (id, date, time) => {
        const appointmentDate = new Date(date);
        const appointmentTime = parse(`${time}`, 'h:mm a', new Date())
        appointmentDate.setHours(appointmentTime.getHours(), appointmentTime.getMinutes(), 0, 0);
        const currentTime = new Date();
        const timeDifference = differenceInMilliseconds(appointmentDate, currentTime);
        if (timeDifference < 12 * 60 * 60 * 1000) {
            return toast.warning('Cancellation not allowed within 12 hours of appointment.');
        }
        dispatch( cancelAppointment( id ) )
    }
    return (
        <div className="flex bg-gradient-to-r from-blue-100 via-blue-50 to-blue-100 ">
            {isLoading && <Spinner />}
            <div className="p-4 w-auto">
                <SideNavbar />
            </div>
            <div className="flex justify-center py-8 flex-1">
                <div className="shadow-lg rounded-lg w-full max-w-3xl p-6 bg-white">
                    <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">Your Appointments</h2>
                    {appointments?.map((ele) => {
                        return (
                            <div key={ele._id} className="bg-white border border-gray-200 rounded-lg p-6 mb-4 shadow-sm hover:shadow-lg transition-all">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-xl font-semibold text-blue-600">{ele.doctorId.name}</h3>
                                    <span className={`px-4 py-1 text-sm rounded-lg ${ele.status === 'completed' ? 'bg-green-100 text-green-600' : ele.status === 'pending' ? 'bg-yellow-100 text-yellow-600' : 'bg-red-100 text-red-600'}`}>
                                        {ele.status}
                                    </span>
                                </div>

                                <div className="grid grid-cols-3 gap-2">
                                    <div>
                                        <p className="font-medium text-gray-600">Appointment Date:</p>
                                        <p className="text-gray-800">{format(ele.appointmentDate, "eee MMM dd yyyy")}</p>
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-600">Appointment Time:</p>
                                        <p className="text-gray-800">{ele.appointmentTime}</p>
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-600">Payment Method:</p>
                                        <p className="text-gray-800">{ele.paymentMethod}</p>
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-600">Consultation Fee:</p>
                                        <p className="text-gray-800">{ele.consultationFee}</p>
                                    </div>
                                </div>

                                <div className="mt-4 text-left text-sm text-gray-600">
                                    {ele.status === 'completed' && (
                                        <p 
                                        onClick={ () => navigate(`/consultation-summary?appointmentId=${ele._id}`)}
                                        className="text-blue-600 cursor-pointer hover:text-blue-800 hover:underline hover:font-semibold">
                                            Consultation Recap
                                        </p>
                                    )}
                                    {ele.status === 'pending' && (
                                        <li>The doctor will summarize the consultation and provide any necessary recommendations.</li>
                                    )}
                                    {ele.status === 'cancelled' && (
                                        <p>The Appointment has been cancelled.</p>
                                    )}
                                </div>

                                <div className="mt-4 flex justify-end space-x-4">
                                    {ele.status === 'pending' && (
                                        <button
                                            onClick={() => handleCancel(ele._id, ele.appointmentDate, ele.appointmentTime)}
                                            className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors">
                                            Cancel Appointment
                                        </button>
                                    )}
                                    {ele.status === 'completed' && (
                                        <button 
                                        onClick={ () =>  navigate(`/review?doctorId=${ele.doctorId._id}`)}
                                        className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors">
                                            Give Review
                                        </button>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
                {
                    serverError && serverError.map((ele, i) => {
                        return <li key={i} className="text-sm font-semibold text-red-500 opacity-80"> {ele.msg}</li>
                    })
                }
            </div>
        </div>



    )
}
export default AppointmentHistory;