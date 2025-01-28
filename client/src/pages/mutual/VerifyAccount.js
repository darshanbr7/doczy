import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import InfoPage from "../../images/InfoPage.jpg"
import Spinner from "./Spinner";
import { verifyAccount } from "../../slices/authSlice";
/**
 * Creating Custom hook to fetch the values from query
 * @returns  - loaction.serch  value 
 */
const useQuery = ( ) => {
    return new URLSearchParams( useLocation().search )
}
const VerifyAccount = ( ) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoading, serverError } = useSelector( state => state.auth );
    const [ isChecked, setIsChecked ] = useState( false );
    const [ clientError, setClientError ] = useState ( null );
    const query = useQuery();
    const userId = query.get("userId");
    const token = query.get( "token" );
    const errors = {}
    const validateForm = () => {
        if( !isChecked ) {
            errors.isChecked = "Check box should be checked"
        }
    }
    const handleSubmit = async ( e ) => {
        e.preventDefault();
        validateForm();
        if( Object.keys(errors).length > 0) {
            setClientError( errors );
        } else {
            setClientError( null )
            const actionResult = await dispatch( verifyAccount( { userId, token, isChecked }))
            if(actionResult.type === verifyAccount.fulfilled.type){
                navigate("/login");
            }
        }
    }
    return (
            <div className="flex justify-between items-center h-96  ">
                { isLoading && <Spinner/>}
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
                <div className="w-1/2 h-full flex flex-col max-w-screen-sm  justify-center items-center">
                    <div> <p className="text-3xl font-semibold opacity-80"> Verify Account </p></div>
                    <form onSubmit={handleSubmit}>
                        <div className="flex mt-5 mb-3">
                            <input 
                                type="checkbox"
                                value={isChecked}
                                onChange={ ( ) => {
                                    setIsChecked(!isChecked)
                                }}
                            />
                            <p className="ml-3  flex font-semibold"> You are one step away from Verifying your account </p>
                            
                        </div>
                        <div>
                        {
                            clientError?.isChecked &&  <span  className="text-sm block text-red-400 font-semibold"> {clientError?.isChecked}</span>
                            }
                        </div>
                        <div>
                        {
                                    serverError && serverError.map( ( ele, i ) =>{
                                        return <li key={ i } className="text-sm font-semibold text-red-500 opacity-80"> { ele.msg }</li>
                                    })
                                }
                        </div>
                        <div className="flex items-center justify-center mt-5">
                            <input 
                                type="submit"
                                value = "Verify Account"
                                className="p-2 bg-green-400 rounded-sm shadow-sm cursor-pointer text-white font-semibold hover:bg-green-500"
                            />
                        </div>
                    </form>
                </div>
            </div>
        )
}
export default VerifyAccount;