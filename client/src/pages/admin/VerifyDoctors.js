import { useSelector, useDispatch } from "react-redux";
import SideNavbar from "../mutual/SideNavbar";
import Spinner from "../mutual/Spinner";
import Pagination from "../mutual/Pagination";
import { getDoctors } from "../../slices/doctorVerifySlice"
import { useEffect } from "react";
const VerifyDoctors = () => {
    const dispatch = useDispatch();
    const  { items, currentPage, isLoading, serverError } = useSelector( state => state.VerifyDoctors);
    useEffect( () => {
        dispatch( getDoctors({ verified : false, page : currentPage, limit : 1 }))
    },[currentPage])
    return (
        <div className="flex  min-h-screen">
            {false && <Spinner />}
            <div className="w-auto  p-4">
                <SideNavbar />
            </div>
            <div className="flex  flex-col h-auto w-11/12 ">
                <div>
                    
                </div>
                <div className=" block   ml-4 mr-auto w-11/12  bg-slate-100 rounded-sm" >
                    {
                        items.map( ( ele ) => {
                            return <div key={ele._id} className=" flex flex-row "> 
                            <div className="p-4 ">
                                <div className="h-40 w-40 p-2"> 
                                    <label className="text-sm font-semibold mb-1 opacity-80"> Profile Image </label>
                                    <img src= { ele.profileId?.avatar} alt="Profile"/>
                                </div>
                                <div className="h-40 w-40 p-2 mt-3">
                                    <label className="text-sm font-semibold mb-1 opacity-80"> Licence Image </label>
                                    <img src = {ele?.licenceImage} alt=" Licence" />
                                </div>
                            </div>
                            <div className=" p-4 w-auto opacity-80 "> 
                                <p className="font-semibold mt-2">  Doctor Details :  </p>
                                <p className="mt-3  text-sm font-semibold opactity-80"> Name : <span className="ml-3"> { ele?.userId?.name}</span> </p>
                                <p className="mt-3  text-sm font-semibold opactity-80"> Email : <span className="ml-3"> { ele?.userId?.email}</span> </p>
                                <p className="mt-3  text-sm font-semibold opactity-80"> Phone Number : <span className="ml-3"> { ele?.userId?.phoneNumber}</span> </p>
                            </div>
                            </div>
                        })
                    }
                    <div className=" flex justify-end items-end mr-5">
                        <Pagination/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VerifyDoctors;