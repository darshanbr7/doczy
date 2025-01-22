import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Link, useLocation, useNavigate } from "react-router-dom";
import InfoPage from "../images/InfoPage.jpg"
import { userRegister } from "../slices/authSlice";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { isEmail,isNumeric,isStrongPassword } from "validator";
import {toast, ToastContainer  } from "react-toastify"
import Spinner from "./Spinner";

const Register = ( ) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    /*  getting the current  location using useLocation hook that has a property pathname using that we are compring the current page  */
    const location = useLocation();
    const  { isLoading, serverError }  = useSelector(  state  => state.auth );
    const [ formData, setFormData ] = useState ( {
        name : "",
        email : "",
        phoneNumber : "",
        role: "customer",
        password : "",
        confirmPassword : ""
    } );
    const [ click, setClick ]= useState( false );
    const [ isChecked, setIsChecked ] = useState( false );
    /**
     * This Function is Used to check the checkbox
    */
    const handleCheckBoxChange = () => {
        setIsChecked( prevState => !prevState )
    }
    /**
     * This Function is Used to Change the Role 
    */
    const handleRoleChange = () => {
        setFormData(prevState => ({
          ...prevState, 
          role: prevState.role === "customer" ? "doctor" : "customer"
        }));
    };
      
    const [ clientErrors, setClientErrors ] = useState( null );
    const errors ={};
    /**
     * This Funnction is used to validate the inputs
    */
    const validateInput = ( ) => {
        if( formData.name.trim().length === 0 ) {
            errors.name = "Name field can not be empty"
        } 
        if( formData.email.trim().length === 0 ) {
            errors.email = "Email field can not be empty"
        } else if( !isEmail( formData.email ) ) {
            errors.email = "Enter the Proper Email Format"
        }  
        if (formData.phoneNumber.trim().length === 0 ) {
            errors.phoneNumber = "Phone Number field can not be empty "
        } else if( isNumeric( formData.phoneNumber ) ){
            if( formData.phoneNumber.trim().length < 10 || formData.phoneNumber.trim().length > 10){
                errors.phoneNumber = " Phone Number should be 10 degits "
            }
        } else{
            errors.phoneNumber = "Phone Number Should be degits only"
        }
        
        if( formData.password.trim().length === 0 ) {
            errors.password = "Password field can not be empty"
        }  else  if( !isStrongPassword( formData.password )){
            errors.password = "Password should atleast contain One UppeerCase one LowerCase one Number and One Symbol with minimum 8 character";
        }
        if( formData.confirmPassword.trim().length === 0 ){
            console.log( "filed is emapty")
            errors.confirmPassword = " Confirm Password field can not be empty";
        }else if( !(formData.password.trim() === formData.confirmPassword.trim()) ){
            errors.confirmPassword = "Password and Confirm Password should be same";
        } 
        if( ! isChecked ){
            errors.isChecked = "Check box should be ckecked"
        }
    }
    /**
     * This function handles the registration process when the user submits the registration form.
     * @param {*} e  It takes event as a argument
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        validateInput();
        if( Object.keys( errors ).length !== 0 ){
            setClientErrors( errors )
        } else{
            setClientErrors ({})
            try {
               const actionResult = await dispatch( userRegister( formData ) );
               if( userRegister.fulfilled.match( actionResult ) ) {
                toast.success( "User Register Succesfull ")
                navigate("/login")
               }
            } catch (error) {
                console.log( " Registaration form ", error );
            }
        }
    }
    return (
        <div className="max-w-screen-xl h-auto mb-24">
            { isLoading && <Spinner/> }
            <div className="flex items-center justify-center h-auto">
                <div className="w-2/3  font-bold opacity-70 bg-inherit  shadow-lg flex justify-center ">
                    <span className={ 
                         `${ location.pathname === "/register" ?  " text-blue-600 border-b-2 border-blue-600" : ""}  p-3  mr-10 `
                    } > <Link to = "/register" > Register </Link></span>
                    <span className =  "p-3 ml-10"> <Link to = "/login" > Login </Link></span>
                </div>
            </div>
            <div className="flex justify-between items-center h-96">
                <div className="w-1/2 h-full flex justify-center items-center">
                    <img
                        src={InfoPage}
                        alt="application Info page"
                        className="rounded-lg mt-24"
                        height="350"
                        width="350"
                        style={ {
                            backgroundColor :'transparent'
                        }}
                    />
                </div>
                <div className="w-1/2 h-full flex max-w-screen-sm ">
                    <div className= "bg-inherit  " >
                        <div className="bg-white p-7 rounded-lg shadow-md w-96 h-96 ml-auto mr-auto  mt-10 overflow-y-auto">
                            <form onSubmit={handleSubmit}>
                            <div className = " p-2 e border-b border-gray-300   flex mb-4 ">
                                <p className = "tracking-wid font-bold opacity-70"> Join Doczy </p>
                                {
                                    formData.role === "customer" ? (
                                    <p className  = "text-sm ml-auto font-semibold "> <span className = "opacity-50"> Are you Doctor ?</span>  <span className = "text-blue-400 font-semibold hover: cursor-pointer hover:underline" onClick = { handleRoleChange }> Register</span></p>) : 
                                    (<p className = "ml-auto text-sm opacity-70">
                                        <span className = "text-blue-400 font-semibold hover: cursor-pointer hover:underline" onClick = { handleRoleChange }> Not a Doctor ?</span>
                                    </p>)
                                }
                            </div>
                                <div className="  mt-3 mb-7 block ">
                                        <label className="   ml-1 block   text-sm font-medium text-gray-700"> User Name  : </label>
                                        <input   
                                            type="text"
                                            value={ formData.name }
                                            placeholder = "User Name "
                                            onChange={ ( e ) => {
                                            setFormData({ ...formData, name : e.target.value} );
                                            }}
                                            className={
                                                `${ clientErrors?.name ? " block border-2 border-b-red-400" : "border"}  p-1 w-80 m-auto mt-2 opacity-80 focus:outline-none   focus : shadow-md  rounded-md text-sm font-semibold focus:bg-slate-100`
                                            }
                                            />
                                            { clientErrors?.name && <span  className="text-sm text-red-400 font-semibold"> {clientErrors?.name}</span>}
                                    </div>
                                <div className=" mb-7 block ">
                                    <label className="   ml-1 block   text-sm font-medium text-gray-700"> Email ID  : </label>
                                    <input   
                                        type="text"
                                        value={ formData.email }
                                        placeholder = "Email ID"
                                        onChange={ ( e ) => {
                                           setFormData({ ...formData, email : e.target.value} );
                                        }}
                                        className={
                                            `${ clientErrors?.email ? " block border-2 border-b-red-400" : "border"}  p-1 w-80 m-auto mt-2 opacity-80 focus:outline-none   focus : shadow-md  rounded-md text-sm font-semibold focus:bg-slate-100`
                                        }
                                        />
                                        { clientErrors?.email && <span  className="text-sm text-red-400 font-semibold"> {clientErrors?.email}</span>}
                                </div>  
                                <div className=" mb-7 block ">
                                    <label className="   ml-1 block   text-sm font-medium text-gray-700"> PhoneNumber  : </label>
                                    <input   
                                        type="text"
                                        value={ formData.phoneNumber }
                                        placeholder = "Phone Number"
                                        onChange={ ( e ) => {
                                           setFormData({ ...formData, phoneNumber : e.target.value} );
                                        }}
                                        className={
                                            `${ clientErrors?.phoneNumber ? " block border-2 border-b-red-400" : "border"}  p-1 w-80 m-auto mt-2 opacity-80 focus:outline-none   focus : shadow-md  rounded-md text-sm font-semibold focus:bg-slate-100`
                                        }
                                        />
                                        { clientErrors?.phoneNumber && <span  className="text-sm text-red-400 font-semibold"> {clientErrors?.phoneNumber}</span>}
                                </div>
                                <div className = " mb-7 block ">
                                    <label className ="ml-1 block text-sm font-medium text-gray-700"> Password  : </label>
                                    <div className="relative">
                                        <input   
                                            type = "password"
                                            value={ formData.password }
                                            onChange={ ( e ) => {
                                                setFormData ( { ...formData, password :e.target.value } )
                                            }}
                                            placeholder="Password"
                                            className = { `flex p-1 w-80 m-auto mt-2 opacity-80 focus:outline-none   focus : shadow-md  rounded-md text-sm font-semibold focus:bg-slate-100 pr-10 ${ clientErrors?.password ? "border-2 border-b-red-400" : "border"}`}
                                            />
                                       
                                    </div>
                                        { clientErrors?.password && <span  className="text-sm text-red-400 font-semibold"> {clientErrors?.password}</span>}
                                </div>
                                <div className = " mb-7 block ">
                                    <label className ="ml-1 block text-sm font-medium text-gray-700"> Confirm Password    : </label>
                                    <div className="relative">
                                        <input   
                                            type = { click ? "text" : "password"}
                                            value={ formData.confirmPassword }
                                            onChange={ ( e ) => {
                                                setFormData ( { ...formData, confirmPassword :e.target.value } )
                                            }}
                                            placeholder="Password"
                                            className = { `flex p-1 w-80 m-auto mt-2 opacity-80 focus:outline-none   focus : shadow-md  rounded-md text-sm font-semibold focus:bg-slate-100 pr-10 ${ clientErrors?.confirmPassword ? "border-2 border-b-red-400" : "border"}`}
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
                                        { clientErrors?.confirmPassword && <span  className="text-sm text-red-400 font-semibold"> {clientErrors?.confirmPassword}</span>}
                                </div>
                                <div className = "mb-4 block">
                                    <input 
                                        type = "checkbox" 
                                        value = { isChecked }
                                        onClick =  { handleCheckBoxChange}
                                    />
                                    <span className = "text-sm font-semibold opacity-50 ml-2"> Agree with Terms & condition  of doczy</span>
                                    { clientErrors?.isChecked && <span  className=" block text-sm text-red-400 font-semibold"> {clientErrors?.isChecked}</span>}
                                </div>
                                <div >
                                {
                                    serverError && serverError.map( ( ele, i ) =>{
                                        return <li key={ i } className="text-sm font-semibold text-red-500 opacity-80"> { ele.msg }</li>
                                    })
                                }
                                </div>
                                <div className="  mt-2 mb-2 flex justify-center items-center ">
                                    <input type = "submit" 
                                        value= "Register"
                                        className="border rounded-md  bg-blue-400  text-white font-semibold  w-24 p-1 hover:bg-blue-600 focus:outline-none active:bg-blue-800"
                                        /> 
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
export default Register;