import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getDoctorAppointments } from "../../slices/appointmentSlice";
import SideNavbar from "../mutual/SideNavbar";
import Spinner from "../mutual/Spinner";
import { format } from "date-fns";
import { Link } from "react-router-dom"; // Assuming the button will navigate to a summary page

const DoctorSheules = () => {
    const { doctorAppointments, isLoading, serverError } = useSelector(
        (state) => state.appointment
    );
    const { userInfo } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        if (userInfo?.userId) {
            dispatch(getDoctorAppointments({ doctorId: userInfo.userId, dateRange: "today" }));
        }
    }, [userInfo, dispatch]);

    if (serverError?.length > 0) {
        return (
            <div className="text-sm  text-red-400 flex justify-center ">
                {serverError.map((ele, i) => {
                    return <li key={i}> {ele.msg}</li>
                })}
            </div>
        )
    }

    return (
        <div className="flex min-h-screen bg-gradient-to-r from-blue-50 via-blue-100 to-blue-50">
            { isLoading && <Spinner/> }
            <div className="w-auto p-4">
                <SideNavbar />
            </div>

            {/* Appointment Cards Section */}
            <div className="flex-1 p-6">
                {/* Changed flex to flex-col to stack appointments vertically */}
                <div className="flex flex-col w-1/2 space-y-6">
                    {doctorAppointments?.map((appointment) => (
                        <div
                            key={appointment?._id}
                            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300"
                        >
                            <div className="mb-2">
                                <p className=" text-sm  text-gray-800">
                                    <strong>Customer Name : </strong> {appointment?.userId?.name}
                                </p>
                                <p className="  text-sm  text-gray-800">
                                    <strong>Appointment Date : </strong>
                                    {format(new Date(appointment.appointmentDate), "eee MMM dd, yyyy")}
                                </p>
                                <p className=" text-sm  text-gray-800">
                                    <strong>Appointment Time:</strong> {appointment.appointmentTime}
                                </p>
                            </div>

                            <div className="mb-4">
                                <p className=" text-sm  text-gray-800">
                                    <strong>Payment Method:</strong>{" "}
                                    {appointment.paymentMethod ? appointment.paymentMethod : "N/A"}
                                </p>
                            </div>
                            <div className=" flex justify-end ">
                                <Link
                                    to={`/appointment-summary?appointmentId=${appointment._id}&customerId=${appointment?.userId?._id}`}
                                    className=" text-center py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300"
                                >
                                    Provide Summary
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
};

export default DoctorSheules;
