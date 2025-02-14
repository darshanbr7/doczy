import Slot from "../../models/slotModel.js";

/**
 * This function is used finds and updates the booking status of a specific time slot for a doctor on a given date.
 * This function is responsible for either booking or cancelling an appointment for a specific time slot.
 * @param {ObjectId} doctorId - The ID of the doctor for whom the slot is being booked or cancelled.
 * @param {Date} date - The date for which the slot needs to be booked or cancelled.
 * @param {string} appointmentTime - The time of the appointment to be booked or cancelled.
 * @param {boolean} status - `true` if booking the appointment, `false` if cancelling the appointment.
 * @returns {Promise<boolean>} Resolves to `true` if the slot is successfully updated; otherwise, throws an error.
 * @throws {Error} Throws an error if no slots are found, if the time slot is not available, or if the status can't be updated.
 */

const findDoctorSlots = async (doctorId, date, appointmentTime, status) => {
    try {
        const targettedDate = new Date(date);
        targettedDate.setUTCHours(0, 0, 0, 0);
        const doctorSlots = await Slot.findOne({ doctorId, date: targettedDate });
        if (!doctorSlots) {
            throw new Error("Slots are not present");
        }

        const slotToBook = doctorSlots.slots.find(slot => slot.time === appointmentTime);
        if (!slotToBook) {
            throw new Error("Slot not found for the specified time");
        }
        // if status is true means we are booking appointment / false - cancelling appointment
        if (status) {
            if (slotToBook.booked) {
                throw new Error("The requested time slot is already booked");
            }
            slotToBook.booked = true; 
        } else {
            if (!slotToBook.booked) {
                throw new Error("The requested time slot is not booked yet");
            }
            slotToBook.booked = false; 
        }

        doctorSlots.markModified('slots');
        await doctorSlots.save();

        return true ; 

    } catch (error) {
        throw new Error(error.message); 
    }
};

export default findDoctorSlots;
