import { userId } from "./queryConstants.js"
export const date = {
    in: ["body"],
    exists: {
        errorMessage: "Date field is required"
    },
    notEmpty: {
        errorMessage: "Date field should not be empty"
    },
    trim: true,
    isISO8601: {
        errorMessage: "Date should be in the format of yyyy-MM-dd"
    }
}

export const slotValidator = {
    date:{
        ...date,
        custom: {
            options: (value) => {
                const date = new Date(value);
                if (isNaN(date)) {
                    throw new Error("Invalid date format");
                }
                if (date < new Date()) {
                    throw new Error("Cannot generate a slot for a past date");
                }
                return true;
            }
        }
    },
    slots: {
        in: ["body"],
        exists: {
            errorMessage: "Slots field is required"
        },
        notEmpty: {
            errorMessage: "Slots field should not be empty"
        },
        custom: {
            options: (value) => {
                if (!Array.isArray(value) || value.length === 0) {
                    throw new Error("Slots must be an array and cannot be empty");
                }

                const isValid = value.every((slot) => {
                    if (typeof slot.time !== 'string' || !/^[0-9]{2}:[0-9]{2} (AM|PM)$/.test(slot.time)) {
                        throw new Error('Each slot must have a valid "time" field in the format hh:mm AM/PM');
                    }

                    if (typeof slot.isChecked !== 'boolean') {
                        throw new Error('Each slot must have a valid "isChecked" field of type boolean');
                    }

                    if (typeof slot.booked !== 'boolean') {
                        throw new Error('Each slot must have a valid "booked" field of type boolean');
                    }

                    if (typeof slot.id !== 'number') {
                        throw new Error('Each slot must have a valid "id" field of type number');
                    }

                    return true; 
                });
                return isValid; 
            }
        }
    }
};
export const  reviverValidate = {
    doctor : {
        ...userId
    },
    date : {
        ...date,
        in: [ "query"],
        custom: {
            options: (value) => {
                const date = new Date(value);
                if (isNaN(date)) {
                    throw new Error("Invalid date format");
                }
                if (date < new Date().setHours( 0, 0 , 0 , 0)) {
                    throw new Error("Can not able to get slots for past dates");
                }
                return true;
            }
        }
    }
}

