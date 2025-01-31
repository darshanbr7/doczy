import { useEffect, useState, useRef } from "react";
import {  useSelector, useDispatch } from "react-redux" 
import SideNavbar from "../mutual/SideNavbar";
import Pagination from "./Pagination";
import Select from "react-select"
import { debounce } from "lodash"
import { getDoctors } from "../../slices/customerSlice"

const Doctors = () => {
    const dispatch = useDispatch();
    const { currentPage} = useSelector( state => state.customer );
    const  { specializations } = useSelector ( state =>  state.doctorDetails );
    const [ formData, setFormData ] = useState( {
        name : "",
        location : "",
        expertIn : [],
        page : currentPage,
        limit : 3
    })
    const options = specializations.map( ele => ( { value : ele.name, label : ele.name }));
    const handleSelect = ( ( selectedValue ) => {
        const selectedValues = selectedValue.map(option => option.value);
        setFormData({ 
            ...formData, 
            expertIn: selectedValues 
        });
    })

    const debounceApiCall = useRef( debounce( ( data ) => {
        dispatch( getDoctors( data ) );
    }, 2000)).current;
    useEffect(  ( ) => {
        debounceApiCall ( formData )
    },[ formData])
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
                            className="ml-2 w-1/4 h-9  focus:outline-none font-semibold text-sm opacity-90"
                        />
                    </form>
                </div>
            </div>

            <div className="absolute bottom-4 right-4 p-3">
                <Pagination formData={ formData } />
            </div>
        </div>

    )
}
export default Doctors;