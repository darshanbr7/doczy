import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { isNumeric, isEmail } from "validator";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "./Spinner";
import InfoPage from "../../images/InfoPage.jpg"
import { otherLoginOptions, otpVerify, getUser, setBack } from "../../slices/authSlice";

const OptionLogin = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoading, serverError, otpSent } = useSelector(state => state.auth);
    const { state } = location;
    const [formData, setFormData] = useState({
        [state]: "",
        otp: ""
    });
    const [clientError, setClientErrors] = useState("");
    const [timer, setTimer] = useState(60);

    const errors = {};

    useEffect(() => {
        let interval;
        if (otpSent && timer > 0) {
            interval = setInterval(() => {
                setTimer(prevTimer => prevTimer - 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [otpSent, timer]);

    /**
     * This function is used to validate the Email or Phone Number
     */
    const validateEmailOrPhone = () => {
        if (formData[state].trim().length === 0) {
            errors.input = `${state} field can not be empty`;
        } else if (state === "email" && !isEmail(formData[state])) {
            errors.input = "Enter the Proper Email Format";
        } else if (state === "phoneNumber" && !isNumeric(formData[state])) {
            errors.input = "Phone Number only contains digits";
        } else if (state === "phoneNumber" && (formData[state].trim().length < 10 || formData[state].trim().length > 10)) {
            errors.input = "Phone Number should be 10 digits";
        }
    };
    const handleBack = () => {
        dispatch( setBack() )
    }
    /**
     * This function is used to Send the OTP and invoke the FormValidator and dispatch reducers
     * @param {*} e  - This Function takes Event Object as a parameter
     */
    const handleSendOTP = (e) => {
        e.preventDefault();
        validateEmailOrPhone();
        if (Object.keys(errors).length > 0) {
            setClientErrors(errors);
        } else {
            setClientErrors(null);
            const inputData = { [state]: formData[state] };
            dispatch(otherLoginOptions({ inputData, state }));
            setTimer(60);
        }
    };

    /**
     * This function is used to Validate the OTP
     */
    const validateOTP = () => {
        if (formData.otp.trim().length === 0) {
            errors.otp = "OTP field cannot be empty";
        } else if (!isNumeric(formData.otp)) {
            errors.otp = "OTP should be digits only";
        } else if (formData.otp.trim().length < 6 || formData.otp.trim().length > 6) {
            errors.otp = "OTP should be 6 digits";
        }
    };

    /**
     * This function invokes the `validateOTP` function to validate the OTP input,
     * and handles any validation errors and dispatches the reducers
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        validateOTP();
        if (Object.keys(errors).length > 0) {
            setClientErrors(errors);
        } else {
            setClientErrors(null);
            const actionResult = await dispatch(otpVerify(formData));
            if (actionResult.type === otpVerify.fulfilled.type) {
                dispatch(getUser());
                const redirectTo = location.state?.from || "/";
                navigate(redirectTo);
            } else {
                console.error("Login failed", actionResult.error);
            }
        }
    };

    return (
        <div className="flex justify-center min-h-screen  bg-gradient-to-r from-blue-100 via-blue-50 to-blue-100">
            {isLoading && <Spinner />}
            <div className="flex w-full h-full">
                <div className="w-1/2 h-full flex justify-center ">
                    <img
                        src={InfoPage}
                        alt="application Info page"
                        className="rounded-lg mt-24"
                        height="350"
                        width="350"
                        style={{
                            backgroundColor: 'transparent'
                        }}
                    />
                </div>

                <div className="w-full md:w-1/2 p-8 flex flex-col justify-between  rounded-md">
                    <form  onSubmit ={ handleSubmit } className="w-full max-w-md mx-auto">
                        {!otpSent && (
                            <div className="flex flex-col  mt-24 items-center">
                                <div className="w-8/12 mt-3 mb-7">
                                    <label htmlFor="email" className="ml-4 block text-sm font-semibold text-gray-700">
                                        {state === "email" ? "Email" : "Phone Number"} :
                                    </label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="text"
                                        value={formData[state]}
                                        placeholder={state === "email" ? "Enter your Email" : "Enter your Phone Number"}
                                        autoFocus
                                        onChange={(e) => setFormData({ ...formData, [state]: e.target.value })}
                                        className={`${clientError?.input ? "block border-2 border-b-red-400" : "border"} p-2 w-full mt-2 opacity-80 focus:outline-none  rounded-md text-sm font-semibold`}
                                    />
                                    {clientError?.input && <span className="text-sm ml-3 text-red-400 font-semibold">{clientError?.input}</span>}
                                </div>
                                <div className="mb-4 ml-2">
                                    {serverError && serverError.map((ele, i) => {
                                        return <li key={i} className="text-sm font-semibold text-red-500 opacity-80">{ele.msg}</li>;
                                    })}
                                </div>
                                <div
                                    className="w-8/12 py-2 bg-blue-500   outline-none omt-5 rounded-sm text-center hover:bg-blue-600 cursor-pointer"
                                    onClick={handleSendOTP}
                                >
                                    <span className="text-sm font-semibold text-white">Send OTP</span>
                                </div>

                            </div>
                        )}
                        {otpSent && (
                            <div className=" mt-4  p-3 flex flex-col justify-center items-center rounded-sm">
                                <p className=" font-bold opacity-70 text-xl">OTP Verification</p>
                                <div className=" p-3 mt-2  flex  flex-col  justify-center items-center rounded-sm">
                                    <p className="text-sm w-8/12 font-semibold opacity-60">We have sent the One-Time-Password (OTP) for your {state} - {formData[state]}</p>
                                    <p className="text-sm w-8/12  mt-3 font-semibold opacity-60"> OTP will expire after 5 minutes </p>
                                    <p className="text-sm w-8/12  mt-3 font-semibold opacity-60">You can resend OTP after 60 seconds  </p>
                                </div>
                                <div className="w-8/12">
                                    <input
                                        type="text"
                                        placeholder="Enter OTP here"
                                        value={formData.otp}
                                        onChange={(e) => setFormData({ ...formData, otp: e.target.value })}
                                        className={`${clientError?.otp ? "block border-2 border-b-red-400" : "border"} p-1 w-full  mt-4 opacity-80 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md text-sm font-semibold`}
                                    />
                                    {clientError?.otp && <span className="text-sm text-red-400 font-semibold">{clientError?.otp}</span>}
                                </div>
                                <div className="mt-2">
                                    {serverError && serverError.map((ele, i) => {
                                        return <li key={i} className="text-sm font-semibold text-red-500 opacity-80">{ele.msg}</li>;
                                    })}
                                </div>
                                <div className="w-8/12 py-2 bg-green-500 rounded-sm text-center hover:bg-green-600 cursor-pointer mt-5">
                                    <input
                                        type="submit"
                                        value="Submit"
                                        className="text-sm font-semibold text-white"
                                    />
                                </div>
                                {timer > 0 && (
                                    <div className="mt-4 text-sm text-gray-700">
                                        Send OTP again after {timer} seconds
                                    </div>
                                )}
                                {timer === 0 && (
                                    <div
                                        className="w-8/12 py-2 bg-blue-500  mt-5 rounded-sm text-center hover:bg-blue-600 cursor-pointer"
                                        onClick={handleSendOTP}
                                    >
                                        <span className="text-sm font-semibold text-white">Resend OTP</span>
                                    </div>
                                )}
                                <div
                                    className="w-8/12 py-2 bg-orange-400  mt-5 rounded-sm text-center hover:bg-orange-600 cursor-pointer"
                                    onClick={handleBack}
                                >
                                    <button className="text-sm font-semibold text-white">Back</button>
                                </div>
                            </div>

                        )}
                    </form>

                </div>
            </div>
        </div>
    );
};

export default OptionLogin;
