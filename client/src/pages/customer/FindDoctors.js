import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import SideNavbar from "../mutual/SideNavbar";
import Pagination from "./Pagination";
import Select from "react-select"
import { debounce } from "lodash"
import { getDoctors } from "../../slices/customerSlice"

const FindDoctors = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { currentPage, doctors } = useSelector(state => state.customer);
    const { specializations } = useSelector(state => state.doctorDetails);
    const [formData, setFormData] = useState({
        name: "",
        location: "",
        expertIn: [],
        page: currentPage,
        limit: 2
    })
    const options = specializations.map(ele => ({ value: ele.name, label: ele.name }));
    const handleSelect = ((selectedValue) => {
        const selectedValues = selectedValue.map(option => option.value);
        setFormData({
            ...formData,
            expertIn: selectedValues
        });
    })

    const debounceApiCall = useRef(debounce((data) => {
        dispatch(getDoctors(data));
    }, 2000)).current;
    useEffect(() => {
        debounceApiCall(formData)
    }, [formData])
    return (
        <div className="flex bg-gradient-to-r from-blue-100 to-gray-200 relative">
            <div className="w-auto p-4">
                <SideNavbar />
            </div>
            <div className="flex flex-col h-auto w-11/12">
                <div className="flex  ml-auto mr-auto  p-2 w-[816px] flex-row items-center bg-blue-100">
                    <form className="flex w-full" >
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-2/4 h-9 pl-4  outline-none focus:outline-none ml-2 rounded-sm shadow-sm text-sm font-semibold opacity-80"
                            placeholder="Search Doctor By Name..."
                        />
                        <input
                            type="text"
                            value={formData.location}
                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                            className="w-1/4 h-9 pl-4  outline-none focus:outline-none ml-2 rounded-sm shadow-sm text-sm font-semibold opacity-80"
                            placeholder="Search By location ..."
                        />
                        <Select
                            isMulti
                            options={options}
                            onChange={handleSelect}
                            isSearchable
                            isClearable
                            placeholder="Specilizations"
                            className="ml-2 w-1/4 h-9  max-h-20 focus:outline-none font-semibold text-sm "
                        />
                    </form>
                </div>
                <div className=" block   ml-auto mr-auto w-[816px]  bg-slate-100 rounded-sm space-y-3 " >
                    {
                        doctors.map((ele) => {
                            return <div key={ele._id} className=" border-b border-gray-500 mt-2 mb-2  flex flex-row ">
                                <div className="p-4 w-60 mt-10  ">
                                    <div className="h-40 w-40 p-2">
                                        <img src={ele.profile.avatar} alt="Profile" className="rounded-full" />
                                    </div>
                                </div>
                                <div className=" p-4 w-72 opactity-80 ">
                                    <p className="mt-3  text-lg font-semibold "> {ele?.user?.name} </p>
                                    <p className="text-sm font-semibold  mt-3"> <span className="ml-2 opacity-80"> {ele?.yearsOfExperience} years  experience overall</span> </p>
                                    <p className="text-sm font-semibold  mt-1"><span className="ml-2 opacity-80"> {ele?.address?.street} {ele?.address?.city} </span> </p>
                                    <p className="text-sm font-semibold  mt-2">Specializations :  <span className="ml-2  opacity-80"> {ele?.specialization[0].split(",").map((ele, i) => <li key={i} className=" ml-3  text-sm"> {ele}</li>)}</span> </p>


                                    <p className="text-sm font-semibold  mt-3"><span className="ml-2 opacity-80"> ₹ {ele?.consultationFee} Consultation fee at clinic</span> </p>

                                </div>
                                <div className="p-4 w-72 flex justify-center items-center">
                                    <button
                                        className="bg-green-400 px-4 py-2 shadow-sm rounded-sm text-sm font-semibold text-white hover:scale-110 hover:bg-green-500"
                                        onClick={() => {
                                            navigate(`/book-appointment?doctorName=${ele.user.name}&doctorId=${ele.userId}`)
                                        }}
                                    >
                                        Book Appointment
                                    </button>
                                </div>

                            </div>
                        })
                    }
                    <div className=" flex justify-end items-end mr-5 p-3">
                        <Pagination formData={formData} />
                    </div>
                </div>
            </div>
        </div>

    )
}
export default FindDoctors;