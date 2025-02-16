import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import { getDoctorAppointments } from "../../slices/appointmentSlice";
import SideNavbar from "../mutual/SideNavbar";
import { parse, addMinutes, format } from "date-fns";

const DoctorCalender = () => {
    const dispatch = useDispatch();
    const { userInfo } = useSelector((state) => state.auth);
    const { doctorAppointments } = useSelector((state) => state.appointment);
    const [events, setEvents] = useState([]);
    const [ dateRange, setDateRange ] = useState("today")
    console.log( doctorAppointments );
    useEffect(() => {
        if (userInfo?.userId) {
            dispatch(getDoctorAppointments({ doctorId: userInfo.userId , dateRange}));
        }
    }, [userInfo?.userId,  dateRange ]);

    useEffect(() => {
        if (!doctorAppointments?.length) return;
        const formattedEvents = doctorAppointments.map(({ appointmentTime, appointmentDate, userId }) => {
            const startDate = parse(appointmentTime, "hh:mm a", new Date(appointmentDate));
            const endDate = addMinutes(startDate, 10);
            
            return {
                title: `${userId.name} (${format(startDate, "hh:mm a")} - ${format(endDate, "hh:mm a")})`,
                start: startDate,
                end: endDate,
                backgroundColor: "#4F46E5",
                textColor: "#FFFFFF",
            };
        });

        setEvents(formattedEvents);
    }, [doctorAppointments]);

    const handleViewChange = (view) => {
        if (view.type === "timeGridDay") setDateRange("today");
        else if (view.type === "timeGridWeek") setDateRange("week");
        else if (view.type === "dayGridMonth") setDateRange("month");
        else if (view.type === "listWeek") setDateRange("today");
    };

    console.log( dateRange )
    return (
        <div className="flex bg-gradient-to-r from-blue-100 via-blue-50 to-blue-100 min-h-screen">
            <div className="flex p-4 w-auto">
                <SideNavbar />
            </div>

            <div className="w-3/4 p-8 bg-white shadow-lg rounded-xl ml-4 mt-4">
                <h2 className="text-xl font-semibold text-center mb-4 text-gray-800">Your Schedules</h2>

                <div className="p-4 bg-gray-50 rounded-lg shadow-md">
                    <FullCalendar
                        plugins={[timeGridPlugin, dayGridPlugin, listPlugin, interactionPlugin]}
                        initialView="listWeek"
                        height="80vh"
                        events={events}
                        nowIndicator={true}
                        slotMinTime="00:00:00"
                        slotMaxTime="24:00:00"
                        headerToolbar={{
                            left: "prev,next today",
                            center: "title",
                            right: "timeGridDay,timeGridWeek,dayGridMonth,listWeek",
                        }}
                        dayHeaderClassNames={() => "text-gray-800 font-semibold"}
                        viewDidMount={({ view }) => handleViewChange(view)}
                    />
                </div>
            </div>
        </div>
    );
};

export default DoctorCalender;
