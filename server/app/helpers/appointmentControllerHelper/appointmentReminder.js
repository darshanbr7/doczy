import { format, startOfDay, addDays } from 'date-fns';
import Appointment from '../../models/appointmentModel.js';
import { REMINDER_EMAIL_TEMPLATE } from './mailTemplets.js';
import mailSender from '../userControllerHelpers/mailSender.js';

/**
 *  This function is used to sends appointment reminder emails to customers for appointments scheduled on the next day.
 * @returns {Promise<void>} Resolves when all emails have been sent or logs any errors.
*/

const appointmentReminder = async () => {
    try {
        const todayStart = startOfDay(new Date());
        const tomorrowStart = startOfDay(addDays(new Date(), 1));
        const appointments = await Appointment.find({
            appointmentDate: { $gte: todayStart, $lt: tomorrowStart },
            status: 'pending'
        }).populate("userId doctorId", "name");

        appointments.forEach(async (appointment) => {
            const customerEmail = appointment.userEmail;
            const appointmentDate = format(new Date(appointment.appointmentDate), 'MMMM dd, yyyy');
            const appointmentTime = appointment.appointmentTime;
            const customerName = appointment.userId.name;
            const doctorName = appointment.doctorId.name;

            let templet = REMINDER_EMAIL_TEMPLATE
                .replace("{customerName}", customerName)
                .replace("{doctorName}", doctorName)
                .replace("{appointmentDate}", appointmentDate)
                .replace("{appointmentTime}", appointmentTime);
            await mailSender(customerEmail, "Appointment Reminder", templet);
        })

    } catch (error) {
        console.log(error)
    }
}
export default appointmentReminder