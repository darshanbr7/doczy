import { useEffect } from "react";
import { useSelector } from "react-redux" 
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import Unauthorized from "./Unauthorized";
const PrivateRoute = ( props ) => {
    const { userInfo, isLoggedIn } = useSelector( state =>  state.auth );
    const navigate = useNavigate();
    const location = useLocation()
    // if the user is tries to access the certain pages before logging in it will navigate to login page and after successfull login it again navigate to that page if they have a access
    useEffect( (  ) => {
        if( !localStorage.getItem("token") ){
            return  navigate( "/login", { state : { from : location }})
        }
        
    }, [ navigate, location ] );
    // conditions for if the user is already logs in preventing to access login || register page 
    /* if (isLoggedIn && (location.pathname === "/login" || location.pathname === "/register")) {
        return <Navigate to="/" replace />;
    } */
    if( isLoggedIn && props.permittedRoles && props.permittedRoles.includes( userInfo.role )){
        return props.children
    } else if( isLoggedIn && props.permittedRoles && !props.permittedRoles.includes(userInfo.role ) ){
        return <> <Unauthorized/> </>
    } else if( isLoggedIn && !props.permittedRoles){
        return props.children
    } else{
        return <Navigate to = "/login" replace/>// replace will block the browser from preventing to navigate back
    }
}
export default PrivateRoute;