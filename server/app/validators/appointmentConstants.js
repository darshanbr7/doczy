const doctorId  = {
    in : ["body"],
    isMongoId :{
        errorMessage :" Doctor Id is invalid"
    },
    trim : true
}

export { doctorId }