import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import CreatableSelect from 'react-select';
import SideNavbar from "./SideNavbar";
import { createSpecializations } from "../slices/doctorDetailsSlice";

const Details = ( ) => {
    const dispatch = useDispatch();
    const { specializations, isLoading } = useSelector( state => state.doctorDetails );
    const [ formData, setFormData ] = useState({
       
    })
    const [  specialization, setSpecialization ] = useState( [] );
    const handleSpecializationChange = ( selectedOptions ) => {
    console.log( "ss",specialization );
         setSpecialization( selectedOptions )
    }
    const handleCreate = async( newSpecialization ) => {
        try {
            const specializationExist = specializations.some( ( ele) => ele.name.toLowerCase() === newSpecialization.toLowerCase())
        if( ! specializationExist ){
            const newSpec = {
                name: newSpecialization,
            };
            await dispatch( createSpecializations( newSpec ) )
        }
        } catch (error) {
           console.log( error ); 
        }
    }
    const options = specializations.map( (ele) => {
        return { value : ele.name, label : ele.name }
    })
    const handleSubmit = ( e ) => {
        e.preventDefault();
    }

    return (
    <div className="flex max-w-screen-lg">
            <div className="w-auto">
                <SideNavbar/>       
            </div>
            <div>
                <form onSubmit = { handleSubmit } >
                <CreatableSelect
                    isMulti
                    options={ options }
                    value={ specialization }
                    onChange={ handleSpecializationChange}
                    /* onCreateOption={handleCreate} */
                    isClearable
                    placeholder="Select your specializations"
                />
                </form>
            </div>
        </div>
    )
}

export default Details;