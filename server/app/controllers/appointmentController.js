import Appointment from "../models/appointmentModel.js";
import _ from "lodash";
import { parse, differenceInMilliseconds, format, startOfWeek, endOfWeek, startOfMonth, endOfMonth, startOfDay, endOfDay } from "date-fns"
import mailSender from "../helpers/userControllerHelpers/mailSender.js";
import { APPOINTMENT_CONFIRMATION_TEMPLATE, APPOINTMENT_CANCELLATION_TEMPLATE } from "../helpers/appointmentControllerHelper/mailTemplets.js"
import findDoctorSlots from "../helpers/appointmentControllerHelper/findDoctorSlots.js";

const appointmentController = {};

/**
 *  This function is used to creates a new appointment for a user with a specific doctor, appointment date, and time.
 * 
 * @param {Object} req - The request object containing appointment data (doctorId, appointmentDate, appointmentTime).
 * @param {Object} res - The response object used to send the result or error response.
 * @returns {Object} - A JSON response containing the created appointment details or an error message.
 */
appointmentController.createAppointment = async (req, res) => {
    try {
        const { doctorId, appointmentDate, appointmentTime, consultationFee, paymentMethod } = _.pick(req.body, ["doctorId", "appointmentDate", "appointmentTime", "consultationFee", "paymentMethod"]);
        const { userId, name, email } = _.pick(req.currentUser, ["userId", "name", "email"]);
        await findDoctorSlots(doctorId, appointmentDate, appointmentTime, true)
        const appointment = new Appointment({ userId, doctorId, appointmentDate, appointmentTime, userEmail: email, consultationFee, paymentMethod });
        let templet = APPOINTMENT_CONFIRMATION_TEMPLATE
            .replace("{customerName}", name)
            .replace("{appointmentDate}", format(new Date(appointmentDate), 'eee MMM dd yyyy'))
            .replace("{appointmentTime}", appointmentTime);
        await mailSender(email, "Appointment Booking Confirmation", templet);
        await appointment.save();
        res.json(appointment)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: [{ msg: error.message }] })
    }
}

/**
 *  This function is used retrieves all appointments for the customer.
 * 
 * @param {Object} req - The request object containing the current user's data in `req.currentUser`.
 * @param {Object} res - The response object used to send the list of appointments or error response.
 * @returns {Object} - A JSON response containing the user's appointments or an error message.
 */
appointmentController.myAppointments = async (req, res) => {
    try {
        const { userId } = _.pick(req.currentUser, ["userId"]);
        const appointments = await Appointment.find({ userId })
            .sort({ updatedAt: -1 })
            .populate("doctorId", "name");
        res.json(appointments);
    } catch (error) {
        return res.status(500).json({ error: [{ msg: "Something went wrong while getting yours Appointments " }] })
    }
}

/**
 *  This function is used to cancels an existing appointment and sends a cancellation confirmation email to the customer.
 * 
 * @param {Object} req - The request object containing the current user's data in `req.currentUser` and the `appointmentId` in `req.query`.
 * @param {Object} res - The response object used to send the cancellation confirmation or error response.
 * @returns {Object} - A JSON response confirming the cancellation or an error message.
 */
appointmentController.cancelAppointment = async (req, res) => {
    try {
        const { name, email } = _.pick(req.currentUser, ["name", "email"])
        const { appointmentId } = _.pick(req.query, ["appointmentId"])
        const appointment = await Appointment.findOne({ _id: appointmentId });
        if (!appointment) {
            return res.status(404).json({ error: [{ msg: "Appointment not found" }] });
        }
        const appointmentDate = new Date(appointment.appointmentDate);
        const appointmentTime = parse(`${appointment.appointmentTime}`, 'h:mm a', new Date())
        appointmentDate.setHours(appointmentTime.getHours(), appointmentTime.getMinutes(), 0, 0);
        const currentTime = new Date();
        const timeDifference = differenceInMilliseconds(appointmentDate, currentTime);
        if (timeDifference < 12 * 60 * 60 * 1000) {
            return res.status(400).json({ error: [{ msg: "Cancellation can only be done at least 12 hours before the appointment" }] });
        }
        await findDoctorSlots(appointment.doctorId, appointment.appointmentDate, appointment.appointmentTime, false);
        let templet = APPOINTMENT_CANCELLATION_TEMPLATE
            .replace("{customerName}", name)
            .replace("{appointmentDate}", format(appointment.appointmentDate, 'eee MMM dd yyyy'))
            .replace("{appointmentTime}", appointment.appointmentTime);
        await mailSender(email, "Appointment Cancellation Confirmation", templet);
        const updatedAppointment = await Appointment.findOneAndUpdate(
            { _id: appointmentId },
            { $set: { status: "cancelled" } },
            { new: true, runValidators: true }
        );
        res.json(updatedAppointment);
    } catch (error) {
        return res.status(500).json({ error: [{ msg: error.message }] })
    }
}

appointmentController.doctorSpecificAppointments = async (req, res) => {
    try {
        const { doctorId, dateRange } = _.pick(req.query, ["doctorId", "dateRange"]);
        let startDate;
        let endDate;

        if (dateRange === "today") {
            startDate = startOfDay(new Date());
            endDate = endOfDay(new Date());
        } else if (dateRange === "week") {
            startDate = startOfWeek(new Date());
            endDate = endOfWeek(new Date());
        } else if (dateRange === "month") {
            startDate = startOfMonth(new Date());
            endDate = endOfMonth(new Date());
        } else {
            return res.status(400).json({ error: [{ msg: "Invalid date range provided." }] });
        }
        const appointments = await Appointment.find({
            doctorId,
            appointmentDate: { $gte: startDate, $lte: endDate },
            status: 'pending'
        }).populate( "userId", "name");
        console.log( appointments.length );
        res.json(appointments);
    } catch (error) {
        return res.status(500).json({ error: [{ msg: error.message }] });
    }
}

export default appointmentController;
