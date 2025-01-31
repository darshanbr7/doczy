import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoRemoveCircleOutline, IoAddCircleOutline } from "react-icons/io5";
import { TbXboxX } from "react-icons/tb";
import { addMinutes, format, isBefore, parseISO } from "date-fns";
import { useDispatch, useSelector } from "react-redux"
import { createSlots } from "../../slices/slotSlice";
import SideNavbar from "../mutual/SideNavbar";
import Spinner from "../mutual/Spinner";


const GenerateSlots = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isLoading, serverError } = useSelector(state => state.slot)
    const { details } = useSelector(state => state.doctorDetails);
    const [date, setDate] = useState("");
    const [timeSlots, setTimeSlots] = useState([{ startTime: '', endTime: '' }]);
    const [slots, setSlots] = useState([]);
    const [clientError, setClientError] = useState(null);
    const handleDateChange = (e) => {
        setDate(e.target.value);
    };
    const handleTimeChange = (index, field, value) => {
        const updatedSlots = [...timeSlots];
        updatedSlots[index][field] = value;
        setTimeSlots(updatedSlots);
    };
    const addTimeSlot = () => {
        setTimeSlots([...timeSlots, { startTime: '', endTime: '' }]);
    };
    const removeTimeSlot = (index) => {
        if (timeSlots.length > 1) {
            const newTimeSlots = timeSlots.filter((_, i) => i !== index);
            setTimeSlots(newTimeSlots);
        }
    }

    const errors = {};
    const validateForm = () => {
        if (!date) {
            errors.date = "Date con't be empty"
        } else if (new Date() > new Date(date)) {
            errors.date = "Date con't be past"
        }

        let prevEnd;
        timeSlots.forEach((slot, index) => {
            if (!slot.startTime || !slot.endTime) {
                errors[`time-${index}`] = "Start and End time are required.";
            } else {
                const start = parseISO(`${date}T${slot.startTime}:00`);
                const end = parseISO(`${date}T${slot.endTime}:00`);
                //isBefore- is date-fns method to  compare the start and end time
                if (isBefore(start, prevEnd)) {
                    errors[`time-${index}`] = "New StartTime should greter than last EndTime.";
                }
                if (isBefore(end, start)) {
                    errors[`time-${index}`] = "Start time can't be greater than end time.";
                }
                prevEnd = end;
            }
        });
    }
    const generateSlots = (e) => {
        e.preventDefault();
        validateForm()
        if (Object.keys(errors).length > 0) {
            setClientError(errors);
        } else {
            setClientError(null);
            const newSlots = [];
            timeSlots.forEach(({ startTime, endTime }) => {
                if (startTime && endTime) {
                    const start = parseISO(`${date}T${startTime}:00`);
                    const end = parseISO(`${date}T${endTime}:00`);
                    let current = start;
                    //looping  through the duration until condition fails using while loop
                    while (isBefore(current, end)) {
                        const next = addMinutes(current, 10);
                        newSlots.push({
                            time: `${format(current, 'hh:mm a')}`,
                            isChecked: false,
                            booked: false,
                        });
                        current = next;
                    }
                }
            });
            setSlots(newSlots);
        }
    }
    const handleRemoveSlot = (index) => {
        const newSlots = slots.filter((_, i) => i !== index);
        setSlots(newSlots);
    }
    const handleSubmit = (e) => {
        const updatedSlotes = slots.map((ele, i) => ({ ...ele, id: parseFloat(i) + 1 }));
        dispatch(createSlots({ slots: updatedSlotes, date }))
    }

    return (
        <div className="flex bg-gradient-to-r from-blue-100 to-gray-200 min-h-screen">
            {isLoading && <Spinner />}
            <div className="p-4 w-auto">
                <SideNavbar />
            </div>

            <div className=" flex  flex-col h-auto w-11/12">
                {
                    !details?.isVerified && (
                        <div className="p-3 flex  justify-center items-center  mt-20 ">
                            <div className="bg-white p-6 rounded-lg shadow-xl h-44 text-center">
                                <p className="text-2xl font-bold text-red-600 mb-4">
                                    Account Not Verified
                                </p>
                                <p className="text-sm text-gray-600 mb-6">
                                    Your account is not verified. Please contact the admin to resolve this issue.
                                </p>
                                <button
                                    className="px-6 py-2 bg-red-500 font-semibold text-white rounded-lg hover:bg-red-600 transition"
                                    onClick={() => navigate("/contact")}
                                >
                                    Contact Admin
                                </button>
                            </div>
                        </div>
                    )
                }

                {
                    details?.isVerified && (
                        <div className="flex flex-row">
                            {/* First Div: Schedule Your Slots */}
                            <div className="flex p-3 ml-20 mr-5 mt-5 h-auto">
                                <div className="bg-white rounded-sm shadow-lg p-8 w-full max-w-md">
                                    <h2 className="text-2xl font-semibold text-center text-indigo-600 mb-6">
                                        Schedule Your Slots
                                    </h2>
                                    <form onSubmit={generateSlots} className="space-y-4">
                                        <div>
                                            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                                                Select Date:
                                            </label>
                                            <input
                                                type="date"
                                                id="date"
                                                value={date}
                                                onChange={handleDateChange}
                                                className={`${clientError?.date ? "border-2 border-b-red-400" : "border"
                                                    } w-full px-4 py-2 font-semibold opacity-80 border-gray-300 rounded-lg shadow-sm focus:outline-none text-sm`}
                                                min={new Date(Date.now())}
                                            />
                                        </div>
                                        {clientError?.date && (
                                            <span className="text-sm text-red-500 ml-2 font-semibold opacity-80">
                                                {clientError?.date}
                                            </span>
                                        )}
                                        {timeSlots.map((slot, index) => (
                                            <div key={index} className="flex flex-col space-y-1">
                                                <div className="flex space-x-4">
                                                    <div className="flex-1">
                                                        <label
                                                            htmlFor={`startTime-${index}`}
                                                            className="block text-sm font-medium text-gray-700 mb-1"
                                                        >
                                                            Start Time:
                                                        </label>
                                                        <input
                                                            type="time"
                                                            id={`startTime-${index}`}
                                                            value={slot.startTime}
                                                            onChange={(e) => handleTimeChange(index, "startTime", e.target.value)}
                                                            className={`${clientError?.[`time-${index}`] ? "border-2 border-b-red-400" : "border"
                                                                } w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none font-semibold text-sm`}
                                                        />
                                                    </div>

                                                    <div className="flex-1">
                                                        <label
                                                            htmlFor={`endTime-${index}`}
                                                            className="block text-sm font-medium text-gray-700 mb-1"
                                                        >
                                                            End Time:
                                                        </label>
                                                        <input
                                                            type="time"
                                                            id={`endTime-${index}`}
                                                            value={slot.endTime}
                                                            onChange={(e) => handleTimeChange(index, "endTime", e.target.value)}
                                                            className={`${clientError?.[`time-${index}`] ? "border-2 border-b-red-400" : "border"
                                                                } w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none font-semibold text-sm`}
                                                        />
                                                    </div>
                                                    <div className="mt-7">
                                                        <button
                                                            type="button"
                                                            onClick={() => removeTimeSlot(index)}
                                                            className="p-2"
                                                        >
                                                            <IoRemoveCircleOutline color="black" size={20} />
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={addTimeSlot}
                                                            className="p-2"
                                                        >
                                                            <IoAddCircleOutline size={20} />
                                                        </button>
                                                    </div>
                                                </div>
                                                {clientError?.[`time-${index}`] && (
                                                    <span className="block text-red-600 text-sm font-semibold opacity-80 ">
                                                        {clientError?.[`time-${index}`]}
                                                    </span>
                                                )}
                                            </div>
                                        ))}
                                        <div className="flex justify-center">
                                            <input
                                                type="submit"
                                                value="Generate Slots"
                                                className="w-full py-2 px-4 text-sm font-semibold text-white bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 transition duration-200 transform hover:scale-105 focus:outline-none focus:ring-indigo-500 focus:ring-opacity-50 mt-6"
                                            />

                                        </div>
                                    </form>
                                </div>
                            </div>

                            <div className="flex p-3 ml-20 mr-5 mt-5">
                                <div className="bg-white rounded-sm shadow-lg p-8  w-[400px] min-h-[300px] max-h-[500px] overflow-y-auto overflow-x-hidden">
                                    <p className="text-lg font-semibold mb-4">Generated Slots:</p>
                                    <div className="grid grid-cols-3 gap-4 ">
                                        {slots.map((ele, i) => {
                                            return (
                                                <div key={i} className="relative flex text-sm justify-center items-center bg-yellow-500 text-white font-semibold rounded-lg py-3 px-4 text-center">
                                                    {ele.time}
                                                    <TbXboxX
                                                        size={22}
                                                        color="white"
                                                        onClick={() => handleRemoveSlot(i)}
                                                        className="absolute top-0 right-0 p-1 cursor-pointer text-gray-800 transition-transform transform hover:scale-125" />
                                                </div>
                                            );
                                        })}
                                    </div>
                                    <div  className="mt-2">
                                        {
                                            serverError && serverError.map((ele, i) => {
                                                return <li key={i} className="text-sm font-semibold text-red-500 opacity-80"> {ele.msg}</li>
                                            })
                                        }
                                    </div>
                                    <div className="flex justify-center items-center  mt-8">
                                        <button
                                            className={`${slots.length === 0 ? "bg-red-400" : "bg-green-400"} px-4 py-2 rounded-sm font-semibold text-white cursor-pointer hover:scale-110`}
                                            disabled={slots.length === 0}
                                            onClick={handleSubmit}
                                        >
                                            Submit
                                        </button>
                                    </div>
                                </div>

                            </div>
                        </div>


                    )
                }
            </div>
        </div>


    )
}

export default GenerateSlots;
