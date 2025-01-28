import { useSelector, useDispatch } from "react-redux"
import { LiaUserEditSolid } from "react-icons/lia";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify";
import { format } from "date-fns"
import Spinner from "./Spinner"
import SideNavbar from "./SideNavbar"
import { uploadProfile, updateProfile } from "../../slices/profileSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector(state => state.auth);
  const { userDetail, isLoading, serverError } = useSelector(state => state.profile);
  const [formData, setFormData] = useState({
    avatar: null,
    gender: "",
    dob: "",
    file: null,
    isSubscriber : false
  })
  const [ clientError, setClientError ] = useState( "" );
  useEffect(() => {
    if (userDetail) {
      setFormData({
        avatar: userDetail?.avatar,
        gender: userDetail?.gender,
        dob: format( userDetail?.dob, "yyyy-MM-dd"),
        file: null,
        isSubscriber : userDetail?.isSubscriber || false 
      })
    }
  }, [userDetail])

  const fileInputRef = useRef(null)
  
  const handleImageChange = (e) => {
    const fileUrl = e.target.files[0]
    if (fileUrl) {
      const imageUrl = URL.createObjectURL(fileUrl)
      setFormData({
        ...formData,
        avatar: fileUrl,
        file: imageUrl
      })
    }
  }
  const errors = {};
  const validateForm = ( ) => {
    if( formData.dob.trim().length === 0 ) {
      errors.dob = "Date of Birth con't be empty"
    } else if( new Date( formData.dob ) > new Date()) {
      errors.dob = "Date of Birth con't be future"
    }
    if( formData.gender.trim().length === 0 ){
      errors.gender = "Gender Sould be any of one"
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    validateForm();
    if( Object.keys( errors ).length > 0 ) {
      setClientError( errors );
    } else {
      setClientError( null );
      try {
        const uploadData = new FormData();
        uploadData.append("avatar", formData.avatar);
        uploadData.append("gender", formData.gender);
        uploadData.append("dob", formData.dob);
        console.log( ! userDetail );
        if( !userDetail ){
        dispatch( uploadProfile( uploadData ) ) // post operation
        } else if( !userDetail.isSubscriber ){
          toast.warning( "User needs a subscription to Edit the Profile")
        } else if( userDetail && userDetail.isSubscriber ){
          dispatch( updateProfile( uploadData ) );
        }
      } catch (error) {
        console.log( error )
      }
    }
  }
  return (
    <div className="flex max-w-screen-lg">
      {isLoading && <Spinner />}
      <div className="w-auto p-4">
        <SideNavbar />
      </div>
      <div className="flex p-4 w-1/2 justify-center items-center bg-white flex-grow">
        <div className="flex flex-col items-center">
          <div className="p-7 mt-6 bg-slate-50">
            <div className="relative flex justify-center items-center w-40 h-40 rounded-full bg-slate-200"> 
              <img
                src={formData.file ? formData.file : formData.avatar}
                alt="Profile "
                className="w-full h-full rounded-full object-cover"
              />
              <div className="absolute bottom-0 right-4 bg-white p-2 rounded-full shadow-md">
                <LiaUserEditSolid size={18} onClick={() => fileInputRef.current.click()} />
              </div>
              <input
                type="file"
                ref={fileInputRef}
                name="avatar"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>
          </div>
          <div>
          <p className="text-sm font-semibold opacity-70 text-block-600 mt-4">
             Name :<span>  {userInfo.name} </span>
          </p>
          <p className="text-sm font-semibold opacity-70 text-block-600 mt-4">
             Email :<span>  {userInfo.email} </span>
          </p>
          <p className="text-sm font-semibold opacity-70 text-block-600 mt-4">
             Phone Number  :<span>  {userInfo.phoneNumber} </span>
          </p>
          <form onSubmit={ handleSubmit } encType="multipart/form-data">
            <div className=" mt-2">
              <label className="text-sm font-semibold opacity-70"> DOB : </label>
              <input 
                type="date"
                value={ formData.dob}
                onChange={( e ) =>  setFormData( { ...formData, dob: e.target.value})}
                className=" font-semibold text-sm ml-3 opacity-70"
                max={ new Date( Date.now()) }
              />
            </div>
            <div>
                {
                  clientError?.dob  && <span className="text-sm font-semibold opacity-70 text-red-500"> { clientError?.dob }</span>
                }
              </div>
            <div className=" mt-2">
              <label className="text-sm font-semibold opacity-70"> Gender : </label>
              <input 
                type="radio"
                name="gender"
                value="male"
                checked={formData.gender === "male"}
                onChange={ ( e ) => setFormData({...formData, gender : e.target.value}) }
                className=" font-semibold text-sm ml-3 opacity-70"
              />
              <span className="font-semibold text-sm ml-1 opacity-70">
                Male
              </span>
              <input 
                type="radio"
                name="gender"
                value= "female"
                checked={formData.gender === "female"}
                onChange={ ( e ) => setFormData({...formData, gender : e.target.value}) }
                className=" font-semibold text-sm ml-3 opacity-70"
              />
              <span className="font-semibold text-sm ml-1 opacity-70">
                Female
              </span>
              <input 
                type="radio"
                name="gender"
                value="other"
                checked={formData.gender === "other"}
                onChange={ ( e ) => setFormData({...formData, gender : e.target.value}) }
                className=" font-semibold text-sm ml-3 opacity-70"
              />
              <span className="font-semibold text-sm ml-1 opacity-70">
                Other
              </span>
              <div>
                {
                  clientError?.gender  && <span className="text-sm font-semibold opacity-70 text-red-500"> { clientError?.gender }</span>
                }
              </div>
            </div>
            <div >  
            { 
              serverError && serverError.map( ( ele, i ) =>{
                return <li key={ i } className="text-sm mt-2 font-semibold text-red-500 opacity-60"> { ele.msg }</li>
              })
            }
            </div>
            <div className=" mt-4 flex justify-center items-center ">
             {
              userDetail ? <> 
                <input type = "submit"
                       value = "Edit"
                       className=" p-1 bg-green-400 w-20 rounded-sm cursor-pointer text-white font-semibold  hover:bg-green-600"
                />
              </> : <> 
                <input type = "submit"
                       value = "Upload"
                       className=" p-1 bg-green-400 w-20 rounded-sm cursor-pointer text-white font-semibold  hover:bg-green-600"
                />
              </>
             }
            </div>
          </form>
          </div>
        </div>
      </div>
      <div className="w-1/2 flex flex-col justify-center items-center">
        {
          (!userDetail?.isSubscriber) && <div className=" bg-gray-400 p-10 text-white font-semibold opacity-80 rounded-sm">
          <h2 className="text-xl mb-4"> Benifits of having Subscription</h2>
          <li> Discount on the  consultation </li>
          <li> Early acess to the new feactures </li>
          <li> Health Reminders </li>
          <li> There is a acess to Records & Reliots </li>
          <div className="flex justify-center items-center mt-9">
           <button className="p-2 bg-blue-600 rounded-sm w-32 hover:bg-blue-700 "> Buy Now</button>
          </div>
         </div>
        }
        {
          userDetail?.isSubscriber && <div className=" bg-gray-400 p-10 text-white font-semibold opacity-80 rounded-sm">
          <h2 className="text-xl mb-4"> You Have !</h2>
          <li> Discount on the  consultation </li>
          <li> Early acess to the new feactures </li>
          <li> Health Reminders </li>
          <li> There is a acess to Records & Reliots </li>
          <div className="flex justify-center items-center mt-9">
           <button className="p-2 bg-blue-600 rounded-sm  hover:bg-blue-700 text-sm"
           onClick={ ( ) =>  navigate("/find-doctors")}
           > Book Appointment </button>
          </div>
     </div>
        }
      </div>
    </div>

  )
}

export default Profile