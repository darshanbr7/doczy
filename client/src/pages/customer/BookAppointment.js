import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { format } from "date-fns";
import SideNavbar from "../mutual/SideNavbar";
import { getSlots } from "../../slices/slotSlice"
const BookAppontment = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { state } = location;
    const { slots, serverError } = useSelector(state => state.slot);
    console.log("ss", slots)
    const [formData, setFormData] = useState({
        date: format(new Date(), "yyyy-MM-dd"),
        time: "",
    })
    const [clientError, setClientError] = useState(null);
    useEffect(() => {
        if (!state) {
            navigate("/find-doctors")
        }
    }, [state, slots])
    const hanldeGetSlots = (e) => {
        e.preventDefault();
        dispatch(getSlots({ doctorId: state, date: formData.date }));
    }
    console.log(formData)
    return (
        <div className="flex bg-gradient-to-r from-blue-100 to-gray-200 min-h-screen">
            <div className="w-auto p-4 ">
                <SideNavbar />
            </div>
            <div className="flex flex-row">
                <div className="w-full p-8 ">
                    <div className=" mb-8">
                        <h1 className="text-3xl font-semibold text-gray-800">Book your Appointment</h1>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <form onSubmit={hanldeGetSlots}>
                            <div className="mb-6">
                                <label htmlFor="date" className="text-sm font-medium text-gray-700 mb-2 block">
                                    Select Date:
                                </label>
                                <input
                                    type="date"
                                    id="date"
                                    value={formData.date}
                                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                    className={`${clientError?.date ? "border-2 border-red-400" : "border-gray-300"
                                        } w-full px-4 py-2 font-semibold rounded-lg shadow-sm focus:outline-none text-sm`}
                                    min={new Date(Date.now()).toISOString().split('T')[0]}
                                />
                                {clientError?.date && (
                                    <p className="text-red-400 text-xs mt-2">Please select a valid date.</p>
                                )}
                            </div>
                            <div className="mt-4">
                                <input
                                    type="submit"
                                    value="GetSlots"
                                    className="w-full bg-blue-500 text-white py-2  cursor-pointer rounded-lg font-semibold hover:bg-blue-600 focus:outline-none"
                                />
                            </div>
                        </form>
                    </div>
                </div>
                <div className="flex p-3 ml-20 mr-5 mt-5">
                    <div className="bg-white rounded-lg shadow-lg p-8  w-[400px] min-h-[300px] max-h-[500px] overflow-y-auto overflow-x-hidden">
                        <p className="text-lg font-semibold mb-4">Slots are :</p>
                        <div className="grid grid-cols-3 gap-4">
                            {slots?.map((ele, i) => {
                                if (ele.booked === false) {
                                    return (
                                        <div
                                            key={i}
                                            className={`${formData.time === ele.time ? "bg-green-500" : "bg-yellow-500"
                                                } relative flex text-sm justify-center items-center text-white font-semibold cursor-pointer rounded-lg py-3 px-4 text-center`}
                                            onClick={() => setFormData({ ...formData, time: ele.time })}
                                        >
                                            {ele.time}
                                        </div>

                                    );
                                }
                                return null;
                            })}
                        </div>

                        <div className="mt-2">
                            {
                                serverError && serverError.map((ele, i) => {
                                    return <li key={i} className="text-sm font-semibold text-red-500 opacity-80"> {ele.msg}</li>
                                })
                            }
                        </div>
                        <div className="flex justify-center items-center  mt-8">
                            <button
                                className={`${slots.length === 0 ? "bg-red-400" : "bg-cyan-600"} px-4 py-2 rounded-sm font-semibold text-white cursor-pointer hover:scale-110`}
                            >
                                Book Appointment
                            </button>
                        </div>
                    </div>

                </div>
            </div>


        </div>

    )
}
export default BookAppontment;