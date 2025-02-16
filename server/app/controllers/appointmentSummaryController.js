import _ from "lodash";
import { format } from "date-fns";

import AppointmentSummary from "../models/appointmentSummaryModel.js";
import Appointment from "../models/appointmentModel.js"
import uploadMedia from "../helpers/profileControllerHelper/uploadMedia.js";
import mailSender from "../helpers/userControllerHelpers/mailSender.js";
import { POST_CONSULTATION_EMAIL_TEMPLATE } from "../helpers/appointmentControllerHelper/mailTemplets.js";

const appointmentSummaryController = {};

appointmentSummaryController.createSummary = async (req, res) => {
    try {
        const file = req.file;
        const { userId } = _.pick(req.currentUser, ["userId"])
        const { customerId, appointmentId, recomandation, nextFallowUp } = _.pick(req.body, ["customerId", "appointmentId", "recomandation", "nextFallowUp"]);
        let result;
        if (file) {
            result = await uploadMedia(file);
        }
        const appointment = await Appointment.findByIdAndUpdate(appointmentId, { $set: { status: 'completed' } }, {
            runValidators: true, new: true
        }).populate("doctorId", "name")
            .populate("userId", "name  email")
        const summary = new AppointmentSummary({ doctorId: userId, appointmentId,  customerId, recomandation, nextFallowUp, medicalReport: result?.secure_url || "N/A" });
        const baseUrl = process.env.BASE_URL;
        const url = `${baseUrl}/review?doctorId=${userId}`;
        let templet = POST_CONSULTATION_EMAIL_TEMPLATE
            .replace("{customerName}", appointment.userId.name)
            .replace("{doctorName}", appointment.doctorId.name)
            .replace("{appointmentDate}", format(new Date(appointment.appointmentDate), 'eee MMM dd yyyy'))
            .replace("{appointmentTime}", appointment.appointmentTime)
            .replace("{doctorName}", appointment.doctorId.name)
            .replace("{reviewLink}", url);
        await mailSender(appointment.userEmail, "Thank You for Your Consultation", templet);
        await summary.save();
        res.json(appointment)

    } catch (error) {
        return res.status(500).json({ error: [{ msg: error.message }] })
    }
}

appointmentSummaryController.summaryforUser = async (req, res) => {
    try {
        const { userId } = _.pick( req.currentUser, ["userId"] );
        const { appointmentId } = _.pick( req.query, ["appointmentId"]);
        const summary = await AppointmentSummary.findOne({ appointmentId, customerId : userId })
            .populate("doctorId", "name")
            .populate("appointmentId");
        res.json( summary );
    } catch (error) {
        return res.status(500).json({ error: [{ msg: error.message }] })
    }
}

export default appointmentSummaryController;