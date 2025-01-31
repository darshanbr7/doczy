import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CreatableSelect from 'react-select/creatable';
import { HiPencilSquare } from "react-icons/hi2";
import { createSpecializations, createDoctorDetails, updateDoctorDetails } from "../../slices/doctorDetailsSlice";
import Spinner from "../mutual/Spinner";
import SideNavbar from "../mutual/SideNavbar";
import { format } from "date-fns";


const Details = () => {
    const dispatch = useDispatch();
    const licenceImageRef = useRef(null)
    const { specializations, isLoading, details, serverError } = useSelector(state => state.doctorDetails);
    const [formData, setFormData] = useState({
        licenceNumber: "",
        licenceExpiryDate: "",
        licenceImage: null,
        file: null,
        yearsOfExperience: "",
        consultationFee: "",
        address: {
            buildingNo: "",
            street: "",
            city: "",
            state: "",
            country: "",
            pincode: ""
        },
    })  
    const [specialization, setSpecialization] = useState([]);
    useEffect(() => {
        if (details) {
            setFormData({
                ...formData,
                licenceNumber: details?.licenceNumber,
                licenceExpiryDate: format(details?.licenceExpiryDate, "yyyy-MM-dd"),
                licenceImage: details?.licenceImage,
                yearsOfExperience: details?.yearsOfExperience,
                consultationFee: details?.consultationFee,
                address: {
                    ...formData.address,
                    buildingNo: details?.address?.buildingNo,
                    street: details?.address?.street,
                    city: details?.address?.city,
                    state: details?.address?.state,
                    country: details?.address?.country,
                    pincode: details?.address?.pincode,
                }
            });
            const speArr = details?.specialization[0].split(",").map(ele => {
                return { value: ele, label: ele }
            })
            setSpecialization([...speArr]);
        }
    }, [details])

    const [clientErrors, setClientErrors] = useState(null);
    const errors = {};

    let options = specializations.map(ele => ({ value: ele.name, label: ele.name }));

    const handleSpecializationChange = (selectedOptions) => {
        setSpecialization(selectedOptions)
    }
    // function used to create the new Specialization 
    const handleCreate = async (newSpecialization) => {
        const exists = options.some(option => option.value.toLowerCase() === newSpecialization.toLowerCase());
        if (!exists) {
            const newSpec = {
                name: newSpecialization,
            };
            const newOption = { value: newSpecialization, label: newSpecialization };
            options = [...options, newOption];
            setSpecialization([...specialization, newOption ] );
            await dispatch(createSpecializations(newSpec))
        }
    }

    const handleImageChange = (e) => {
        const fileUrl = e.target.files[0]
        if (fileUrl) {
            const imageUrl = URL.createObjectURL(fileUrl)
            setFormData({
                ...formData,
                licenceImage: fileUrl,
                file: imageUrl
            })
        }
    }
    // handling the form validation field
    const formValidate = () => {
        if (formData.licenceNumber.trim().length === 0) {
            errors.licenceNumber = "Licence Number field con't be empty";
        }
        if (formData.licenceExpiryDate.trim().length === 0) {
            errors.licenceExpiryDate = "Licence ExpiryDate field con't be empty";
        } else if (new Date() > new Date(formData.licenceExpiryDate)) {
            errors.licenceExpiryDate = "Date con't be past";
        }
        if (!formData.yearsOfExperience) {
            errors.yearsOfExperience = "Years Of Experience cont't be empty";
        }
        if (!formData.licenceImage) {
            errors.licenceImage = "Licence image need to selected";
        }
        if (!formData.consultationFee) {
            errors.consultationFee = "Consultation Fee filed con't be empty"
        } else if (formData.consultationFee < 1) {
            errors.consultationFee = "Consultation Fee should be positive number"
        }
        if (specialization.length === 0) {
            errors.specialization = "Specialization can not be empty"
        }
        if (formData.address.buildingNo.trim().length === 0) {
            errors.buildingNo = "Building number con't be empty"
        } else if (formData.address.street.trim().length === 0) {
            errors.street = "Street con't be empty"
        } else if (formData.address.city.trim().length === 0) {
            errors.city = "City con't be empty"
        } else if (formData.address.state.trim().length === 0) {
            errors.state = "State con't be empty"
        } else if (formData.address.country.trim().length === 0) {
            errors.country = "Building number con't be empty"
        }
        if (!formData.address.pincode) {
            errors.pincode = "Pincode con't be empty"
        } else if (formData.address.pincode.length < 6 || formData.address.pincode.length > 6) {
            errors.pincode = "Pincodes are only 6 digits"
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        formValidate()
        if (Object.keys(errors).length > 0) {
            setClientErrors(errors)
        } else {
            setClientErrors(null);
            const specializationArray = specialization.map(ele => ele.value);
            const uploadData = new FormData();
            uploadData.append("specialization", specializationArray);
            uploadData.append("licenceNumber", formData.licenceNumber);
            uploadData.append("licenceExpiryDate", formData.licenceExpiryDate);
            uploadData.append("licenceImage", formData.licenceImage);
            uploadData.append("yearsOfExperience", formData.yearsOfExperience);
            uploadData.append("consultationFee", formData.consultationFee)
            Object.keys(formData.address).forEach(key => {
                uploadData.append(`address[${key}]`, formData.address[key]);
            });
            if (details) {
                dispatch(updateDoctorDetails(uploadData));
            } else {
                dispatch(createDoctorDetails(uploadData));
            }
        }
    }

    return (
        <div className="flex max-w-screen-lg min-h-screen">
            {isLoading && <Spinner />}
            <div className="w-auto  p-4">
                <SideNavbar />
            </div>
            <div className="flex  ml-auto  justify-center">
                <form onSubmit={handleSubmit} className="flex w-full justify-between">
                    <div className="flex flex-col w-1/2 p-4 space-y-6">
                        <div className="mb-1">
                            <label className="ml-1 block text-sm font-medium text-gray-700">
                                Licence Number:
                            </label>
                            <input
                                type="text"
                                value={formData.licenceNumber}
                                placeholder="Licence Number"
                                onChange={(e) => setFormData({ ...formData, licenceNumber: e.target.value })}
                                className={`${clientErrors?.licenceNumber ? "border-2 border-b-red-400" : "border"} p-1 w-80 m-auto mt-2 opacity-80 focus:outline-none focus:shadow-md rounded-md text-sm font-semibold focus:bg-slate-100`}
                            />
                            {clientErrors?.licenceNumber && <span className="text-sm text-red-400 font-semibold"> {clientErrors?.licenceNumber}</span>}
                        </div>
                        <div className="mb-7">
                            <label className="ml-1 block text-sm font-medium text-gray-700">
                                Specialization:
                            </label>
                            <CreatableSelect
                                isMulti
                                options={options}
                                value={specialization}
                                onChange={handleSpecializationChange}
                                onCreateOption={handleCreate}
                                isClearable
                                placeholder="Select your specializations"
                                className="w-80 mt-2 outline-none border-none"
                            />
                            {clientErrors?.specialization && <span className="text-sm text-red-400 font-semibold"> {clientErrors?.specialization}</span>}
                        </div>
                        <div className="mb-7">
                            <label className="ml-1 block text-sm font-medium text-gray-700">
                                Licence Expiry Date:
                            </label>
                            <input
                                type="date"
                                value={formData.licenceExpiryDate}
                                onChange={(e) => setFormData({ ...formData, licenceExpiryDate: e.target.value })}
                                className={`${clientErrors?.licenceExpiryDate ? "border-2 border-b-red-400" : "border"} p-1 w-80 m-auto mt-2 opacity-80 focus:outline-none focus:shadow-md rounded-md text-sm font-semibold focus:bg-slate-100`}
                            />
                            {clientErrors?.licenceExpiryDate && <span className="text-sm text-red-400 font-semibold"> {clientErrors?.licenceExpiryDate}</span>}
                        </div>
                        <div className="mb-7">
                            <label className="ml-1 block text-sm font-medium text-gray-700">
                                Years Of Experience:
                            </label>
                            <input
                                type="number"
                                value={formData.yearsOfExperience}
                                onChange={(e) => setFormData({ ...formData, yearsOfExperience: e.target.value })}
                                className={`${clientErrors?.yearsOfExperience ? "border-2 border-b-red-400" : "border"} p-1 w-80 m-auto mt-2 opacity-80 focus:outline-none focus:shadow-md rounded-md text-sm font-semibold focus:bg-slate-100`}
                            />
                            {clientErrors?.yearsOfExperience && <span className="text-sm text-red-400 font-semibold"> {clientErrors?.yearsOfExperience}</span>}
                        </div>
                        <div className="relative">
                            <label className="ml-1 mb-2 block text-sm font-medium text-gray-700">
                                Licence Image :
                            </label>
                            <img
                                src={formData.file ? formData.file : formData.licenceImage}
                                alt="Licence Avatar"
                                className=" relative h-32 w-80 bg-slate-200 rounded-sm"
                            />
                            <HiPencilSquare
                                size={20}
                                className="absolute bottom-0 right-6 mb-1 mr-2 cursor-pointer"
                                onClick={() => licenceImageRef.current.click()}
                            />

                        </div>
                        {clientErrors?.licenceImage && <span className="text-sm text-red-400 font-semibold"> {clientErrors?.licenceImage}</span>}
                        <div>
                            <input
                                type="file"
                                ref={licenceImageRef}
                                name="avatar"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="hidden"
                            />
                        </div>

                    </div>

                    <div className="flex flex-col w-1/2 p-4 space-y-6">
                        <div className="mb-7">
                            <label className="ml-1 block text-sm font-medium text-gray-700">
                                Consultation Fee :
                            </label>
                            <input
                                type="number"
                                value={formData.consultationFee}
                                onChange={(e) => setFormData({ ...formData, consultationFee: e.target.value })}
                                className={`${clientErrors?.consultationFee ? "border-2 border-b-red-400" : "border"} p-1 w-80 m-auto mt-2 opacity-80 focus:outline-none focus:shadow-md rounded-md text-sm font-semibold focus:bg-slate-100`}
                                placeholder="Enter your consultation fee"
                            />
                            {clientErrors?.consultationFee && <span className="text-sm text-red-400 font-semibold"> {clientErrors?.consultationFee}</span>}
                        </div>
                        <div className="mt-5 mb-1">
                            <label className="ml-1 block text-sm font-medium text-gray-700">
                                Working Address :
                            </label>
                        </div>

                        <div className="flex space-x-3">
                            <div className="w-1/2 ">
                                <label className="ml-1 block text-sm font-medium text-gray-700">Building:</label>
                                <input
                                    type="text"
                                    value={formData.address.buildingNo}
                                    onChange={(e) => setFormData({ ...formData, address: { ...formData.address, buildingNo: e.target.value } })}
                                    className={`${clientErrors?.buildingNo ? "border-2 border-b-red-400" : "border"} p-1 w-full mt-2 opacity-80 focus:outline-none focus:shadow-md rounded-md text-sm font-semibold focus:bg-slate-100`}
                                />
                                {clientErrors?.buildingNo && <span className="text-sm text-red-400 font-semibold"> {clientErrors?.buildingNo}</span>}
                            </div>

                            <div className="w-1/2 ml-3">
                                <label className="ml-1 block text-sm font-medium text-gray-700">Street:</label>
                                <input
                                    type="text"
                                    value={formData.address.street}
                                    onChange={(e) => setFormData({ ...formData, address: { ...formData.address, street: e.target.value } })}
                                    className={`${clientErrors?.street ? "border-2 border-b-red-400" : "border"} p-1 w-full mt-2 opacity-80 focus:outline-none focus:shadow-md rounded-md text-sm font-semibold focus:bg-slate-100`}
                                />
                                {clientErrors?.street && <span className="text-sm text-red-400 font-semibold"> {clientErrors?.street}</span>}
                            </div>
                        </div>

                        <div className="flex space-x-3">
                            <div className="w-1/2 ">
                                <label className="ml-1 block text-sm font-medium text-gray-700">City:</label>
                                <input
                                    type="text"
                                    value={formData.address.city}
                                    onChange={(e) => setFormData({ ...formData, address: { ...formData.address, city: e.target.value } })}
                                    className={`${clientErrors?.city ? "border-2 border-b-red-400" : "border"} p-1 w-full mt-2 opacity-80 focus:outline-none focus:shadow-md rounded-md text-sm font-semibold focus:bg-slate-100`}
                                />
                                {clientErrors?.city && <span className="text-sm text-red-400 font-semibold"> {clientErrors?.city}</span>}
                            </div>

                            <div className="w-1/2 ">
                                <label className="ml-1 block text-sm font-medium text-gray-700">State:</label>
                                <input
                                    type="text"
                                    value={formData.address.state}
                                    onChange={(e) => setFormData({ ...formData, address: { ...formData.address, state: e.target.value } })}
                                    className={`${clientErrors?.state ? "border-2 border-b-red-400" : "border"} p-1 w-full mt-2 opacity-80 focus:outline-none focus:shadow-md rounded-md text-sm font-semibold focus:bg-slate-100`}
                                />
                                {clientErrors?.state && <span className="text-sm text-red-400 font-semibold"> {clientErrors?.state}</span>}
                            </div>
                        </div>

                        {/* Final Address Fields */}
                        <div className="flex space-x-3">
                            <div className="w-1/2 mb-7">
                                <label className="ml-1 block text-sm font-medium text-gray-700">Country:</label>
                                <input
                                    type="text"
                                    value={formData.address.country}
                                    onChange={(e) => setFormData({ ...formData, address: { ...formData.address, country: e.target.value } })}
                                    className={`${clientErrors?.country ? "border-2 border-b-red-400" : "border"} p-1 w-full mt-2 opacity-80 focus:outline-none focus:shadow-md rounded-md text-sm font-semibold focus:bg-slate-100`}
                                />
                                {clientErrors?.country && <span className="text-sm text-red-400 font-semibold"> {clientErrors?.country}</span>}
                            </div>

                            <div className="w-1/2 mb-7">
                                <label className="ml-1 block text-sm font-medium text-gray-700">Pincode:</label>
                                <input
                                    type="number"
                                    value={formData.address.pincode}
                                    onChange={(e) => setFormData({ ...formData, address: { ...formData.address, pincode: e.target.value } })}
                                    className={`${clientErrors?.pincode ? "border-2 border-b-red-400" : "border"} p-1 w-full mt-2 opacity-80 focus:outline-none focus:shadow-md rounded-md text-sm font-semibold focus:bg-slate-100`}
                                />
                                {clientErrors?.pincode && <span className="text-sm text-red-400 font-semibold"> {clientErrors?.pincode}</span>}
                            </div>
                        </div>
                        <div>
                            {
                                serverError && serverError.map((ele, i) => {
                                    return <li key={i} className="text-sm font-semibold text-red-500 opacity-80"> {ele.msg}</li>
                                })
                            }
                        </div>
                        <div className="flex  justify-center items-center ">
                            {
                                details && <>
                                    <input
                                        type="submit"
                                        value="Edit"
                                        className="p-2 w-20 rounded-sm shadow-sm  font-semibold bg-green-400 cursor-pointer text-white  hover:bg-green-600"
                                    />
                                </>
                            }
                            {
                                !details && <>
                                    <input
                                        type="submit"
                                        className="p-2 w-20 rounded-sm shadow-sm  font-semibold bg-green-400 cursor-pointer text-white  hover:bg-green-600"
                                    />
                                </>
                            }
                        </div>
                    </div>
                </form>
            </div>
        </div>

    )
}

export default Details;