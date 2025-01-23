import { useEffect } from "react";
import { useSelector } from "react-redux" 
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import Spinner from "./Spinner";
const PrivateRoute = ( props ) => {
    const { userInfo, isLoggedIn } = useSelector( state =>  state.auth );
    const navigate = useNavigate();
    const loaction = useLocation()
    // if the user is tries to access the certain pages before logging in it will navigate to login page and after successfull login it again navigate to that page if they have a access
    useEffect( (  ) => {
        if( !localStorage.getItem("token") ){
            return  navigate( "/login", { state : { from : loaction }})
        }
        
    }, [ navigate, loaction ] );
    if( isLoggedIn && props.permittedRoles && props.permittedRoles.includes( userInfo.role )){
        return props.children
    } else if( isLoggedIn && props.permittedRoles && !props.permittedRoles.includes(userInfo.role ) ){
        return <p> Unauthorized Access! </p>
    } else if( isLoggedIn && !props.permittedRoles){
        return props.children
    } else{
        return <Navigate to = "/login" replace/>// replace will block the browser from preventing to navigate back
    }
}
export default PrivateRoute;