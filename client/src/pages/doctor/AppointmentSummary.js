import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import SideNavbar from "../mutual/SideNavbar";
import Spinner from "../mutual/Spinner";
import { createSummary } from "../../slices/summarySlice";

const AppointmentSummary = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const queryParams = new URLSearchParams(location.search);
    const appointmentId = queryParams.get("appointmentId");
    const customerId = queryParams.get("customerId");
    const { isLoading, serverError } = useSelector(
        (state) => state.appointment
    );
    const [formData, setFormData] = useState({
        recomandation: "",
        medicalReport: null,
        nextFallowUp: "",
    });
    const [filePreview, setFilePreview] = useState(null);

    if (!appointmentId || !customerId) {
        return navigate("/doctor-shedules")
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData((prevData) => ({
            ...prevData,
            medicalReport: file,
        }));
        if (file && file.type.startsWith("image")) {
            setFilePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit =  async (e) => {
        e.preventDefault();
        const uploadData = new FormData();
        uploadData.append("appointmentId", appointmentId);
        uploadData.append("customerId", customerId);
        uploadData.append("recomandation", formData.recomandation);
        uploadData.append("medicalReport", formData.medicalReport);
        uploadData.append("nextFallowUp", formData.nextFallowUp);
        const actionResult = await dispatch( createSummary( uploadData ) );
        if( actionResult.type === createSummary.fulfilled.type ){
            navigate("/doctor-shedules")
        }
    };

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
        <div className="flex">
            {
                isLoading && <Spinner />
            }
            <div className="flex w-auto p-4">
                <SideNavbar />
            </div>

            <div className="flex-1 p-6">
                <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
                    <h2 className="text-xl font-semibold text-center text-gray-800 mb-8">
                        Appointment Summary Form
                    </h2>

                    <form onSubmit={handleSubmit}>
                        <div className="space-y-6">
                            <div>
                                <label
                                    htmlFor="recomandation"
                                    className="block  font-medium text-gray-800"
                                >
                                    Recommendation :
                                </label>
                                <textarea
                                    id="recomandation"
                                    name="recomandation"
                                    value={formData.recomandation}
                                    onChange={(e) => setFormData({ ...formData, recomandation: e.target.value })}
                                    className="w-full p-3 border border-gray-300 rounded-md"
                                    rows="4"
                                    placeholder="Enter recommendations here"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="medicalReport"
                                    className="block  font-medium text-gray-800"
                                >
                                    Medical Report (Upload file) :
                                </label>
                                <input
                                    type="file"
                                    id="medicalReport"
                                    name="medicalReport"
                                    accept="image/*,application/pdf"
                                    onChange={handleFileChange}
                                    className="w-full p-3 border border-gray-300 rounded-md"
                                />
                                {filePreview && (
                                    <div className="mt-4">
                                        <h3 className=" font-medium text-gray-800">File Preview:</h3>
                                        <img
                                            src={filePreview}
                                            alt="Preview"
                                            className="w-40 h-32 object-cover mt-2"
                                        />
                                    </div>
                                )}
                            </div>

                            <div>
                                <label
                                    htmlFor="nextFallowUp"
                                    className="block  font-medium text-gray-800"
                                >
                                    Next Follow-Up
                                </label>
                                <input
                                    type="text"
                                    id="nextFallowUp"
                                    name="nextFallowUp"
                                    value={formData.nextFallowUp}
                                    onChange={(e) => setFormData({ ...formData, nextFallowUp: e.target.value })}
                                    className="w-full p-3 border border-gray-300 rounded-md"
                                    placeholder="Enter follow-up details"
                                />
                            </div>

                            <div className="text-center">
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
                                >
                                    Submit Summary
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AppointmentSummary;
