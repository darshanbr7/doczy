const doctorId = {
    in: ["body"],
    isMongoId: {
        errorMessage: " Doctor Id is invalid"
    },
    trim: true
}

const paymentMethod = {
    in: ["body"],
    exists: {
        errorMessage: "Payment method need to required"
    },
    notEmpty: {
        errorMessage: "Payment method should not be empty"
    },
    trim: true,
    isIn: {
        options: [["online", "cash"]],
        errorMessage: "Payment method should be online or cash"
    }
}
export { doctorId, paymentMethod }