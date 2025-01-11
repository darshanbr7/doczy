import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { isEmail, isNumeric } from "validator";
import { FiEye, FiEyeOff } from "react-icons/fi";
import {ToastContainer, toast } from "react-toastify"
import InfoPage from "../images/InfoPage.jpg"
const Login = ( ) => {
    const location = useLocation();
    const [ loginInput, setLoginInput ] = useState("");
    const [ password, setPassword ] = useState("")
    const [ click, setClick ] = useState( false );
    const [ clientErrors, setClientErrors ] = useState( null );
    const errors = {}
    const validateInput = ( ) => {
        
        if( loginInput.trim().length === 0 ) {
            errors.loginInput = "Email / Phone Number field can not be empty"
        } else  if( isNumeric( loginInput ) ){
            if( loginInput.length < 10 || loginInput.length > 10){
                errors.loginInput = " Phone Number should be 10 degits "
            }
        } else if(!isEmail( loginInput ) ){
            errors.loginInput = "Enter the Proper Email Format"
        }
        
        if( password.trim().length === 0 ) {
            errors.password = "Password field can not be empty"
        } 
    } 
    const handleSubmit = ( e ) => {
        e.preventDefault()
        validateInput();
        if( Object.keys( errors).length > 0){
            setClientErrors( errors );
            
        } else {
            setClientErrors( {} );
           ( ( ) => toast.success( "Login Succesfully!"))()
        }
    }
    return (
        <div className="max-w-screen-xl h-auto   ">
            <div className="flex items-center justify-center h-auto">
                <div className="w-2/3  font-bold opacity-70 bg-inherit  shadow-lg flex justify-center ">
                    <span className = "p-3 mr-10"> <Link to = "/register" > Register </Link></span>
                    <span className={ 
                         `${ location.pathname === "/login" ?  " text-blue-600 border-b-2 border-blue-600" : ""}  p-3  ml-10 `
                    } > <Link to = "/login" > Login </Link></span>
                </div>
            </div>
            <div className="flex justify-between items-center h-96 mb-24 ">
                <div className="w-1/2 h-full flex justify-center items-center">
                    <img
                    src={InfoPage}
                    alt="application Info page"
                    className="rounded-lg mt-12"
                    height="350"
                    width="350"
                    style={ {
                        backgroundColor :'transparent'
                    }}
                    />
                </div>
                <div className="w-1/2 h-full flex max-w-screen-sm ">
                    <div className= " bg-inherit  mt-4" >
                        <div className="bg-white p-8 rounded-lg shadow-md w-96  mt-10   mb-20">
                            <form onSubmit={handleSubmit}>
                                <div className=" mb-7 block ">
                                    <label className="   ml-1 block   text-sm font-medium text-gray-700"> Phone Number / Email ID  : </label>
                                    <input   
                                        type="text"
                                        value={ loginInput }
                                        placeholder = "Phone Number / Email ID"
                                        onChange={ ( e ) => {
                                           setLoginInput( e.target.value );
                                        }}
                                        className={
                                            `${ clientErrors?.loginInput ? "border-2 border-b-red-400" : "border"}  p-1 w-80 m-auto mt-2 opacity-80 focus:outline-none   focus : shadow-md  rounded-md text-sm font-semibold focus:bg-slate-100`
                                        }
                                        />
                                        { clientErrors?.loginInput && <span  className="text-sm text-red-400 font-semibold"> {clientErrors?.loginInput}</span>}
                                </div>  
                                <div className = " mb-4 block ">
                                    <label className ="ml-1 block text-sm font-medium text-gray-700"> Password  : </label>
                                    <div className="relative">
                                        <input   
                                            type = { click ? "text" : "password"}
                                            value={ password }
                                            onChange={ ( e ) => {
                                                setPassword (  e.target.value  )
                                            }}
                                            placeholder="Password"
                                            className = { `flex p-1 w-80 m-auto mt-2 opacity-80 focus:outline-none   focus : shadow-md  rounded-md text-sm font-semibold focus:bg-slate-100 pr-10 ${ clientErrors?.password ? "border-2 border-b-red-400" : "border"}`}
                                            />
                                        { click ? <>
                                                    <FiEyeOff className="absolute  right-2  top-1/2 transform -translate-y-1/2"
                                                        onClick={ (  )=>{
                                                            setClick(!click )
                                                        }}
                                                     />
                                                 </>: <>
                                                    <FiEye className="absolute  right-2  top-1/2 transform -translate-y-1/2" 
                                                    onClick={ (  )=>{
                                                        setClick(!click )
                                                    }}
                                                    />
                                                 </>}
                                    </div>
                                        { clientErrors?.password && <span  className="text-sm text-red-400 font-semibold"> {clientErrors?.password}</span>}
                                </div>
                                <div className=" mb-2 flex justify-center items-center ">
                                    <input type = "submit" 
                                        value= "Login"
                                        className="border rounded-md  bg-blue-400  text-white font-semibold  w-24 p-1 hover:bg-blue-600 focus:outline-none active:bg-blue-800"
                                        /> 
                                </div>
                                <div className="text-sm font-semibold text-gray-600">
                                        <p className="hover:text-gray-800 hover:underline cursor-pointer"> Login with Email OTP</p>
                                        <p className="hover:text-gray-800 hover:underline cursor-pointer"> Login with Phone Number OTP</p>
                                </div>
                                <div className="text-sm  mt-2   flex justify-end font-semibold text-blue-600 ">
                                    <p className="hover:underline cursor-pointer" > Forgot password ?</p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                />
        </div>
    )
}
export default Login;