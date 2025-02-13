import Slot from "../../models/slotModel.js";

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
