import { useLocation } from "react-router-dom";
import { useState } from "react";
import { isNumeric, isEmail } from "validator";
const OptionLogin = ( ) => {
    const location = useLocation();
    const  { state } = location;
    const  [ formData, setFormData ] = useState( {
        [state] : "",
        otp : ""
    })
    const [ clientError , setClientErrors ] = useState("")
    const [ otpSent, setOtpSent ] =  useState ( false );
    const errors = {}
    /**
     * This function is used to validate the Email or Phone Number
    */
    const validateEmailOrPhone = ( ) => {
        if(  formData[state].trim().length === 0){
            errors.input = `${ state } field can not be empty`
        } else if( state === "email" && !isEmail( formData[state])){
            errors.input = "Enter the Proper Email Format"
        } else if( state === "phoneNumber" && !isNumeric( formData[ state ] ) ){
            errors.input = "Phone Number only contain degits"
        } else if( state === "phoneNumber" && ( formData[state].trim().length < 10 || formData[state].trim().length > 10)){
            errors.input = "Phone Number should be 10 degits"
        }
    }
    /**
     * This function is used to Send the OTP and invoking the FormValidator and dispatching reducers
     * @param {*} e  - This Function takes Event Object as a argument
     */
    const handleSendOTP =  async ( e ) => {
        e.preventDefault();
        validateEmailOrPhone();  
        if( Object.keys( errors ).length > 0){
            setClientErrors( errors )
        }else {
            setClientErrors( null )
            setOtpSent( prevState => !prevState )
        }
    } 
    /**
     * This function is used to Validate the OTP
     */
    const validateOTP = ( ) => {
        if( formData.otp.trim().length === 0 ){
            errors.otp = "OTP field can not be empty"
        }else if( !isNumeric( formData.otp)){
            errors.otp = "OTP should be degits only"
        }else if( formData.otp.trim().length <6 || formData.otp.trim().length > 6 ){
            errors.otp = "OTP should be 6 degits"
        } 
    }
    /**
     * This Fuynction invokes the `validateOTP` function to validate the OTP input, and handles any validation errors and dispatches the reducers
     */
    const handleSubmit = ( e ) => {
        e.preventDefault();
        validateOTP();
        if( Object.keys( errors ).length > 0 ){
            setClientErrors( errors );
        }else {
            setClientErrors(null )
        }
    }
    return (
        <div className="flex justify-center items-center">
            <div  className = " bg-slate-100   mt-40  rounded-sm" >
                <form onSubmit={handleSubmit}>
                    { ! otpSent && <div>
                        <div className=" w-80 h-auto mt-3 mb-7 block  rounded-sm">
                                    <label className="   ml-4 block text-sm font-semibold text-gray-700"> {state === "email" ? "Email" : "Phone Number"} : </label>
                                    <input   
                                        type="text"
                                        value={ formData[state] }
                                        placeholder = {state === "email" ? "Enter your Email" : "Enter your Phone Number"}
                                        autoFocus 
                                        onChange={ ( e ) => {
                                           setFormData({ ...formData, [state] : e.target.value} );
                                        }}
                                        className={
                                            `${ clientError?.input ? " block border-2 border-b-red-400" : "border"}  p-1 w-72  ml-3 mt-2 opacity-80 focus:outline-none   focus : shadow-md  rounded-md text-sm font-semibold focus:bg-slate-100`
                                        }
                                        />
                                        { clientError?.input && <span  className="text-sm ml-3 text-red-400 font-semibold"> {clientError?.input}</span>}
                                </div>
                                <div className="w-20 h-auto p-1 mb-5 bg-green-400 ml-28 rounded-sm flex justify-center items-center hover:bg-green-500 hover:shadow-sm">
                                    <input 
                                        type="submit" 
                                        value = "Send OTP" 
                                        className="text-sm font-semibold  text-white"
                                        onClick={ handleSendOTP}
                                    />
                                </div>
                        </div>}
                        {
                            otpSent && 
                                <div  className=" w-80  p-3 flex h-auto flex-col justify-center items-center rounded-sm ">
                                    <p className=" block font-bold opacity-70 text-xl"> OTP Verification</p>
                                    <div className="block p-3 mt-2 bg-green-200 rounded-sm">
                                        <p className="text-sm font-semibold opacity-60"> We have sent the One-Time-Password       ( OTP ) for your { state } - { formData[state] } </p>
                                    </div>
                                    <div>
                                        <input  
                                            type = "text"
                                            placeholder="Enter OTP here"
                                            value={formData.otp}
                                            onChange={ ( e ) => {
                                                setFormData({...formData, otp : e.target.value })
                                            }}
                                            className = {
                                                `${ clientError?.otp ? " block border-2 border-b-red-400" : "border"}  p-1 w-72   mt-4 opacity-80 focus:outline-none   focus : shadow-md  rounded-md text-sm font-semibold focus:bg-slate-100`
                                            }
                                        />
                                        { clientError?.otp && <span  className="text-sm  text-red-400 font-semibold"> {clientError?.otp}</span>}
                                    </div>
                                    <div className="w-20 h-auto p-1 bg-green-400  mt-5 mb-4 rounded-sm flex justify-center items-center hover:bg-green-500 hover:shadow-sm">
                                    <input 
                                        type="submit" 
                                        value = "Submit" 
                                        className="text-sm font-semibold  text-white"
                                    />
                                </div>
                                </div>
                        }
                </form>
            </div>
        </div>
    )
}
export default OptionLogin;