import { useState } from "react";
import { useDispatch, useSelector }  from "react-redux"
import { useNavigate, Link  } from "react-router-dom";
import { toast } from "react-toastify";
import { TbLogout2 } from "react-icons/tb";
import { IoReorderThree } from "react-icons/io5";
import { FaRegUserCircle, FaBusinessTime } from "react-icons/fa";
import { TiDocumentText } from "react-icons/ti";
import { FaUserDoctor } from "react-icons/fa6";
import { MdOutlineWorkHistory } from "react-icons/md";
import { logout } from "../../slices/authSlice";


const SideNavbar = ( ) => {
    const dispatch = useDispatch();
    const {  userInfo } = useSelector( state => state.auth );
    const navigate = useNavigate();
    const [ isExpanded, setIsExpanded ] = useState( false );
    const toggleSidebar = ( ) => {
        setIsExpanded(!isExpanded);
    }
    const handleLogout = ( ) => {
        dispatch( logout() );
        localStorage.removeItem( "token" );
        toast.success( "User logout succesfully")
        navigate("/login")
    }
    return ( 
        <div className=" relative w-auto h-auto  flex flex-col bg-slate-100 rounded-sm shadow-sm p-4 overflow-x-hidden ">
            <div className=" flex cursor-pointer p-4" onClick={toggleSidebar}>
                 <IoReorderThree size={30} />
            </div>
            <div className="flex flex-col  ">
            <p className="  p-4 flex text-bold cursor-pointer ">
                <Link to="/profile" className="flex items-center space-x-2" ><FaRegUserCircle size={25} /> 
                {isExpanded && <span className="ml-2 font-semibold text-sm text-blue-500"> Profile </span>}</Link>
            </p>
            {userInfo.role === "doctor" && <p className="  p-4 flex text-bold cursor-pointer ">
                <Link to="/details" className="flex items-center space-x-2" ><TiDocumentText  color="black" size={25} /> 
                {isExpanded && <span className="ml-2 font-semibold text-sm text-blue-500"> Details </span>}</Link>
            </p>}
            {userInfo.role === "customer" && <p className="  p-4 flex text-bold cursor-pointer ">
                <Link to="/find-doctors" className="flex items-center space-x-2" ><FaUserDoctor  color="black" size={25} /> 
                {isExpanded && <span className="ml-2 font-semibold text-sm text-blue-500"> Doctors </span>}</Link>
            </p>}
            {userInfo.role === "customer" && <p className="  p-4 flex text-bold cursor-pointer ">
                <Link to="/appointment-history" className="flex items-center space-x-2" ><MdOutlineWorkHistory  color="black" size={25} /> 
                {isExpanded && <span className="ml-2 font-semibold text-sm text-blue-500"> History </span>}</Link>
            </p>}
            {userInfo.role === "admin" && <p className="  p-4 flex text-bold cursor-pointer ">
                <Link to="/verify-doctors" className="flex items-center space-x-2" ><FaUserDoctor  color="black" size={25} /> 
                {isExpanded && <span className="ml-2 font-semibold text-sm text-blue-500"> Doctors </span>}</Link>
            </p>}
            {userInfo.role === "doctor" && <p className="  p-4 flex text-bold cursor-pointer ">
                <Link to="/generate-slots" className="flex items-center space-x-2" ><FaBusinessTime  color="black" size={25} /> 
                {isExpanded && <span className="ml-2 font-semibold text-sm text-blue-500"> Generate Slots </span>}</Link>
            </p>}
            <p className="  flex text-bold cursor-pointer p-4" onClick={handleLogout}><TbLogout2  size={ 25}/> {isExpanded && <span className="ml-2 font-semibold text-sm text-rose-500"> Logout</span>}</p>
        </div>
        </div>
    )
}
export default SideNavbar;