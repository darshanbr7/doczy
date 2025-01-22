import { useState } from "react";
import { useDispatch }  from "react-redux"
import { useNavigate, Link  } from "react-router-dom";
import { toast } from "react-toastify";
import { logout } from "../slices/authSlice";
import { TbLogout2 } from "react-icons/tb";
import { IoReorderThree } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";
const SideNavbar = ( ) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [ isExpanded, setIsExpanded ] = useState( false );
    const toggleSidebar = ( ) => {
        setIsExpanded(!isExpanded);
    }
    const handleLogout = ( ) => {
        dispatch( logout() );
        localStorage.removeItem( "token" );
       toast.success( "User logout succesfully", {
        autoClose: 2000
       })
        navigate("/login")
    }
    return ( 
        <div className=" relative w-auto h-auto  flex flex-col bg-slate-100 rounded-sm shadow-sm p-4 overflow-x-hidden ">
            <div className=" flex cursor-pointer p-4" onClick={toggleSidebar}>
                 <IoReorderThree size={30} />
            </div>
            <div className="flex flex-col items-center ">
            <p className="  p-4 flex text-bold cursor-pointer ">
                <Link to="/profile" className="flex items-center space-x-2" ><FaRegUserCircle size={25} /> 
                {isExpanded && <span className="ml-2 font-semibold text-sm text-blue-500"> Profile </span>}</Link>
            </p>
            <p className="  flex text-bold cursor-pointer p-4" onClick={handleLogout}><TbLogout2  size={ 25}/> {isExpanded && <span className="ml-2 font-semibold text-sm text-rose-500"> Logout</span>}</p>
        </div>
        </div>
    )
}
export default SideNavbar;