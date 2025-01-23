import { useSelector } from "react-redux"
import SideNavbar from "./SideNavbar"
import { LiaUserEditSolid } from "react-icons/lia";
import { useState, useRef } from "react";

const Profile = ( ) => {
    const  { userInfo } = useSelector(  state => state.auth );
    const  [ formData, setFormData ] =  useState ( {
        profilePic : "",
        gender : "",
        dob : "",
        file : null 
    })
    const fileInputRef = useRef( null ) 
    const handleImageChange  = ( e ) => {
        const fileUrl = e.target.files[0]
        if( fileUrl ){
        const imageUrl = URL.createObjectURL( fileUrl )
        setFormData({...formData,
            profilePic: fileUrl, 
            file : imageUrl
        })
        }
    }
    const handleSubmit = ( e ) => {
        e.preventDefault()
    }
    return (
        <div className="flex max-w-screen-lg">
        <div className="w-auto">
          <SideNavbar />
        </div>
        <div className="flex flex-col flex-grow">
          <div className="p-3 ml-5">
            <p className="text-xl font-semibold opacity-70">Hi....</p>
            <p className="text-3xl font-semibold opacity-80 text-green-600">
              {userInfo.name}
            </p>
          </div>
          <div className="flex max-w-screen-md">
            <div className="flex items-center justify-center w-1/2">
                <div className="p-7 mt-6 bg-slate-50">
                    <div className="relative flex justify-center items-center w-40 h-40 rounded-full bg-slate-100">
                    <img
                        src={ formData.file ? formData.file : formData.profilePic }
                        alt="Profile"
                        className="w-full h-full rounded-full object-cover"
                    />
                    <div className="absolute bottom-0 right-4 bg-white p-2 rounded-full shadow-md">
                        <LiaUserEditSolid size={18} onClick={ () => fileInputRef.current.click()}  />
                    </div>
                    <input
                        type="file"
                        ref={ fileInputRef }
                        accept="image/*"
                        onChange={ handleImageChange}
                        className="hidden"
                    />  
                    </div>
                </div>
            </div>
            <div className="w-1/2">
              <p className="text-xl">Subscription Section</p>
            </div>
          </div>
        </div>
      </div>
      
    )
}

export default Profile