import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { format } from "date-fns";
import { useLocation, useNavigate } from "react-router-dom";
import { getConsultationSummary } from "../../slices/summarySlice";
import SideNavbar from "../mutual/SideNavbar";
import Spinner from "../mutual/Spinner";

const ConsultationSummary = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const appointmentId = queryParams.get("appointmentId");
    const { appointmentSummary, isLoading, serverError } = useSelector(
        (state) => state.summary
    );
    const dispatch = useDispatch();
    if (!appointmentId) {
        navigate("/appointment-history")
    }
    useEffect(() => {
        if (appointmentId) {
            dispatch(getConsultationSummary(appointmentId));
        }
    }, [appointmentId, dispatch]);

    if( serverError.length > 0 ) {
        return(
            <div className="text-sm font-semibold text-red-400 flex justify-center ">
                { serverError.map( (ele ,i) => {
                    return <li key={i}> { ele.msg }</li>
                })}
            </div>
        )
    }

    return (
        <div className="flex bg-gradient-to-r from-blue-100 via-blue-50 to-blue-100 min-h-screen">
            {isLoading && <Spinner />}
            <div className="w-auto p-4">
                <SideNavbar />
            </div>

            <div className="flex-1 p-6">
                <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
                    <h2 className="text-xl font-semibold text-center text-gray-800 mb-8">
                        Consultation Summary
                    </h2>

                    <div className="space-y-6">
                        <div className="space-y-2">
                            {
                                appointmentSummary?.appointmentId?.appointmentDate && <p className="font-medium text-gray-800">
                                    <strong>Appointment Date:</strong>
                                    {format(appointmentSummary?.appointmentId?.appointmentDate, "eee MMM dd, yyyy")}
                                </p>
                            }
                            <p className="font-medium text-gray-800">
                                <strong>Appointment Time:</strong> {appointmentSummary?.appointmentId?.appointmentTime}
                            </p>
                            <p className="font-medium text-gray-800">
                                <strong>Doctor Name:</strong> {appointmentSummary?.doctorId?.name}
                            </p>
                            <p className="font-medium text-gray-800">
                                <strong>Consultation Fee:</strong> ₹{appointmentSummary?.appointmentId?.consultationFee}
                            </p>
                        </div>

                        <div>
                            <p className="font-medium text-gray-800">
                                <strong>Recommendations:</strong>
                            </p>
                            <p className="text-gray-700">{appointmentSummary?.recomandation}</p>
                        </div>

                        {appointmentSummary?.medicalReport && (
                            <div className=" items-center space-x-4">
                                <p className="font-medium text-gray-800">
                                    <strong>Medical Report:</strong>
                                </p>
                                <img
                                    src={appointmentSummary?.medicalReport}
                                    alt="Medical Report"
                                    className="w-40 h-32 object-cover rounded-md shadow-sm"
                                />
                            </div>
                        )}

                        <div>
                            <p className="font-medium text-gray-800">
                                <strong>Next Follow-Up:</strong>{" "}
                                {appointmentSummary?.nextFallowUp || "Not scheduled yet."}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConsultationSummary;
