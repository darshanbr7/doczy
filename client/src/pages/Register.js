import { Link, useLocation } from "react-router-dom";
import LoginPage from "../images/LoginPage.jpg"
const Register = ( ) => {
    /*  getting the current  location using useLocation hook that has a property pathname using that we are compring the current page  */
    const location = useLocation();
    return (
        <div className="max-w-screen-xl h-auto">
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
                    src={LoginPage}
                    alt="Account Hub page"
                    className="rounded-lg mt-12"
                    height="300"
                    width="300"
                    style={ {
                        backgroundColor :'transparent'
                    }}
                    />
                </div>
                <div className="w-1/2 h-full flex justify-center items-center">
                    
                </div>
            </div>

        </div>
    )
}
export default Register;