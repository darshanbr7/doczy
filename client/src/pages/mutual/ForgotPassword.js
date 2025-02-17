import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { isEmail } from "validator";
import { userLogin, forgotPassword } from "../../slices/authSlice";
import Spinner from "./Spinner";
import InfoPage from "../../images/InfoPage.jpg"
const ForgotPassword = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoading, serverError } = useSelector((state) => state.auth);
    const [email, setEmail] = useState("");
    const [clientErrors, setClientErrors] = useState(null);
    const errors = {}
    /**
     * This Function is used to Validate the input recived from the user
    */
    const validateInput = () => {
        if (!isEmail(email)) {
            errors.email = "Enter the Proper Email Format"
        }
    }
    /**
     * This function is used to Handle the Login Functionalities
     * @param {*} e  - It Takes event as a argumet and invoke the validateInput function dispatches the reducers
     */
    const handleSubmit = async (e) => {
        e.preventDefault()
        validateInput();
        if (Object.keys(errors).length > 0) {
            setClientErrors(errors);
        } else {
            setClientErrors({}); 
            const actionResult = await dispatch(forgotPassword(email));
            if (actionResult.type === forgotPassword.fulfilled.type) {
                navigate("/");
            }
        }
    }
    return (
        <div className="max-w-screen-xl h-auto   ">
            {isLoading && <Spinner />}
            <div className="flex items-center justify-center h-auto">
                <div className="w-2/3  font-bold opacity-70 bg-inherit  shadow-lg flex justify-center ">
                    <span className="p-3 mr-10"> <Link to="/register" > Register </Link></span>
                    <span className={
                        `${location.pathname === "/login" ? " text-blue-600 border-b-2 border-blue-600" : ""}  p-3  ml-10 `
                    } > <Link to="/login" > Login </Link></span>
                </div>
            </div>
            <div className="flex justify-between items-center h-96 mb-24 ">
                <div className="w-1/2 h-full flex justify-center items-center">
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
                <div className="w-1/2 h-full flex max-w-screen-sm ">
                    <div className=" bg-inherit  mt-6" >
                        <div className="bg-white p-8 rounded-lg shadow-md w-96  mt-10   mb-20">
                            <h3 className=" font-semibold text-sm mb-3"> Enter your Registered email to get Reset Password Link</h3>
                            <form onSubmit={handleSubmit}   >
                                <div className=" mb-7 block ">
                                    <label  htmlFor = "email"className="   ml-1 block   text-sm font-medium text-gray-700">Email : </label>
                                    <input
                                        type="text"
                                        id ="email"
                                        name = "email"
                                        value={email}
                                        placeholder="Enter your Registered email ..."
                                        onChange={(e) => {
                                            setEmail(e.target.value);
                                        }}
                                        className={
                                            `${clientErrors?.email ? "border-2 border-b-red-400" : "border"}  p-1 w-80 m-auto mt-2 opacity-80 focus:outline-none   focus : shadow-md  rounded-md text-sm font-semibold focus:bg-slate-100`
                                        }
                                    />
                                    {clientErrors?.email && <span className="text-sm text-red-400 font-semibold"> {clientErrors?.email}</span>}
                                </div>
                                
                                <div >
                                    {
                                        serverError && serverError.map((ele, i) => {
                                            return <li key={i} className="text-sm font-semibold text-red-500 opacity-80"> {ele.msg}</li>
                                        })
                                    }
                                </div>
                                <div className=" mt-2  mb-2 flex justify-center items-center ">
                                    <input type="submit"
                                        value="Get Link"
                                        className="border rounded-md  bg-blue-400  text-white font-semibold  w-24 p-1 hover:bg-blue-600 focus:outline-none active:bg-blue-800"
                                    />
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
export default ForgotPassword;