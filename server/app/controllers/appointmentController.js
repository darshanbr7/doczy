import Appointment from "../models/appointmentModel.js";
import _ from "lodash";
import Slot from "../models/slotModel.js";
import mailSender from "../helpers/userControllerHelpers/mailSender.js";
import { APPOINTMENT_CONFIRMATION_TEMPLATE } from "../helpers/appointmentControllerHelper/mailTemplets.js"
import findDoctorSlots from "../helpers/appointmentControllerHelper/findDoctorSlots.js";

const appointmentController = {};

appointmentController.createAppointment = async (req, res) => {
    try {
        const { doctorId, appointmentDate, appointmentTime } = _.pick(req.body, ["doctorId", "appointmentDate", "appointmentTime"]);
        const { userId, name, email } = _.pick(req.currentUser, ["userId", "name", "email"]);
        await findDoctorSlots( doctorId, appointmentDate, appointmentTime,  true )
        const appointment = new Appointment({ userId, doctorId, appointmentDate, appointmentTime, userEmail: email });
        let templet = APPOINTMENT_CONFIRMATION_TEMPLATE
            .replace("{customerName}", name)
            .replace("{appointmentDate}", appointmentDate)
            .replace("{appointmentTime}", appointmentTime);
        await mailSender(email, "Appointment Booking Confirmation", templet);
        await appointment.save();
        res.json(appointment)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: [{ msg: "Something went wrong while creating doctor Appointment " }] })
    }
}

appointmentController.myAppointments = async (req, res) => {
    try {
        const { userId } = _.pick(req.currentUser, ["userId"]);
        const appointments = await Appointment.find({ userId });
        res.json(appointments);
    } catch (error) {
        return res.status(500).json({ error: [{ msg: "Something went wrong while getting yours Appointments " }] })
    }
}

appointmentController.cancelAppointment = async (req, res) => {
    try {
        const { appointmentId } = _.pick(req.params, ["appointmentId"])
        console.log( appointmentId );
        const appointment = await Appointment.findById(appointmentId);
        if (!appointment) {
            return res.status(404).json({ error: [{ msg: "Appointment not found" }] });
        }
        const appointmentTime = new Date(`${appointment.appointmentDate} ${appointment.appointmentTime}`);
        const currentTime = new Date();
        const timeDifference = appointmentTime - currentTime;
        if (timeDifference < 12 * 60 * 60 * 1000) {
            return res.status(400).json({ error: [{ msg: "Cancellation can only be done at least 12 hours before the appointment" }] });
        }
        await findDoctorSlots( appointment.doctorId, appointment.appointmentDate, appointment.appointmentTime, false );
        await doctorSlots.save();
    } catch (error) {
        return res.status(500).json({ error: [{ msg: "Something went wrong while cancelling yours Appointment " }] })
    }
}

export default appointmentController;
