import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState, useRef } from "react";
import Select from "react-select";
import { format } from "date-fns"
import { debounce } from "lodash"
import SideNavbar from "../mutual/SideNavbar";
import Spinner from "../mutual/Spinner";
import Pagination from "./Pagination";
import { getDoctors, handleVerification } from "../../slices/doctorVerifySlice"
const VerifyDoctors = () => {
    const dispatch = useDispatch();
    const { items, currentPage, isLoading, serverError } = useSelector(state => state.VerifyDoctors);
    const [formData, setFormData] = useState({
        isVerified: false,
        name: "",
        page: currentPage,
        limit : 2,
    })
    
    
    const statusOptions = [
        { value: true, label: "Verified" },
        { value: false, label: "Not verified" }
    ]
    const handleSlect = (selectedValue) => {
        setFormData({ ...formData, isVerified: selectedValue.value || false })
    }
    //using debounce to handle unneccessary api calling
    const debounceApiCall = useRef(
        debounce((data) => {
           dispatch( getDoctors( data ) );
        }, 1000)
    ).current;
    useEffect(() => {
        debounceApiCall(formData);
    }, [formData])
    const hanldleApprove = ( id ) => {
        dispatch( handleVerification( { id,  isVerified : true  } ) );
    }
    const hanldleDiscard = ( id ) => {
        dispatch( handleVerification( { id,  isVerified : false  } ) );
    }
    return (
        <div className="flex  min-h-screen">
            { isLoading && <Spinner />}
            <div className="w-auto  p-4">
                <SideNavbar />
            </div>
            <div className="flex  flex-col h-auto w-11/12 ">
                <div className="flex  ml-auto mr-auto  p-2 w-[816px] flex-row items-center bg-blue-100">
                    <form className="flex w-full" >
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-3/4 h-9 pl-4  outline-none focus:outline-none ml-2 rounded-sm shadow-sm text-sm font-semibold opacity-80"
                            placeholder="Search Doctor By Name..."
                        />
                        <Select
                            options={statusOptions}
                            onChange={handleSlect}
                            placeholder="Status"
                            className="ml-2 w-1/4 h-9  focus:outline-none font-semibold text-sm opacity-90"
                        />
                    </form>
                </div>
                <div className=" block   ml-auto mr-auto w-[816px]  bg-slate-100 rounded-sm " >
                    {
                        items.map((ele) => {
                            return <div key={ele._id} className=" border-b border-gray-500 mt-2 mb-2  flex flex-row ">
                                <div className="p-4 w-60 ">
                                    <div className="h-40 w-40 p-2">
                                        <label className="text-sm font-semibold mb-2 opacity-80"> Profile Image : </label>
                                        <img src={ele.profile.avatar} alt="Profile" />
                                    </div>
                                    <div className="h-40 w-40 p-2 mt-5">
                                        <label className="text-sm font-semibold mb-2 opacity-80"> Licence Image : </label>
                                        <img src={ele?.licenceImage} alt=" Licence" />
                                    </div>
                                </div>
                                <div className=" p-4 w-72 ">
                                    <p className="font-semibold mt-2">  Doctor Details :  </p>
                                    <p className="mt-3  text-sm font-semibold opactity-80"> Name : <span className="ml-3"> {ele?.user?.name}</span> </p>
                                    <p className="mt-3  text-sm font-semibold opactity-80"> Email : <span className="ml-3"> {ele?.user?.email}</span> </p>
                                    <p className="mt-3  text-sm font-semibold opactity-80"> Phone Number : <span className="ml-3"> {ele?.user?.phoneNumber}</span> </p>
                                    <p className=" mt-5 font-semibold "> Working Details :  </p>
                                    <p className="text-sm font-semibold  mt-3">Buliding : <span className="ml-2 opacity-80"> {ele?.address?.buildingNo}</span> </p>
                                    <p className="text-sm font-semibold  mt-3">Street : <span className="ml-2 opacity-80"> {ele?.address?.street}</span> </p>
                                    <p className="text-sm font-semibold  mt-3">City : <span className="ml-2 opacity-80"> {ele?.address?.city}</span> </p>
                                    <p className="text-sm font-semibold  mt-3">State : <span className="ml-2 opacity-80"> {ele?.address?.state}</span> </p>
                                    <p className="text-sm font-semibold  mt-3">Country : <span className="ml-2 opacity-80"> {ele?.address?.country}</span> </p>
                                    <p className="text-sm font-semibold  mt-3">Pincode : <span className="ml-2 opacity-80"> {ele?.address?.pincode}</span> </p>
                                </div>
                                <div className="p-4 w-72">
                                    <p className="mt-2 font-semibold"> Other Details : </p>
                                    <p className="text-sm font-semibold  mt-2">Specializations :  <span className="ml-2  opacity-80"> {ele?.specialization[0].split(",").map((ele, i) => <li key={i} className=" ml-3  text-sm"> {ele}</li>)}</span> </p>
                                    <p className="text-sm font-semibold  mt-3">Licence Number : <span className="ml-2 opacity-80"> {ele?.licenceNumber}</span> </p>
                                    <p className="text-sm font-semibold  mt-3">Licence Expire At : <span className="ml-2 opacity-80"> {format(ele?.licenceExpiryDate, "dd-MM-yyyy")}</span> </p>
                                    <p className="text-sm font-semibold  mt-3">Experence : <span className="ml-2 opacity-80"> {ele?.yearsOfExperience} years</span> </p>
                                    <p className="text-sm font-semibold  mt-3">Consultation Fee : <span className="ml-2 opacity-80"> {ele?.consultationFee}</span> </p>
                                    <div className="flex justify-center items-center mt-10">
                                        {
                                            !ele?.isVerified && <button 
                                                className="p-2 w-auto text-sm font-semibold bg-green-500 rounded-sm shadow-sm text-white hover:bg-green-600 hover:shadow-lg"
                                                onClick={ ( ) => hanldleApprove( ele._id ) }
                                                > Approve </button>
                                        }
                                        {
                                            ele?.isVerified && <button 
                                            className="p-2 w-auto text-sm font-semibold bg-yellow-500 rounded-sm shadow-sm text-white pl-4 pr-4 hover:bg-yellow-600 hover:shadow-lg "
                                            onClick={ ( ) => hanldleDiscard( ele._id ) }
                                            > Discard  </button>
                                        }
                                    </div>
                                </div>
                            </div>
                        })
                    }
                    <div className=" flex justify-end items-end mr-5 p-3">
                        <Pagination formData= {formData} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VerifyDoctors;