import { useSelector, useDispatch } from "react-redux";
import { LiaUserEditSolid } from "react-icons/lia";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { format } from "date-fns";
import Spinner from "./Spinner";
import SideNavbar from "./SideNavbar";
import { uploadProfile, updateProfile, deleteAccount } from "../../slices/profileSlice";
import { getDoctorDetails } from "../../slices/doctorDetailsSlice";
import { logout } from "../../slices/authSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector(state => state.auth);
  const { userDetail, isLoading, serverError } = useSelector(state => state.profile);
  
  // Store the fetched user details
  const [formData, setFormData] = useState({
    avatar: null,
    gender: "",
    dob: "",
    file: null,
    isSubscriber: false
  });
  const [clientError, setClientError] = useState("");

  // Save the initial state of the profile data
  const [initialFormData, setInitialFormData] = useState({
    avatar: null,
    gender: "",
    dob: "",
    file: null,
    isSubscriber: false
  });

  useEffect(() => {
    if (userDetail) {
      // Set the initial state from the fetched user details
      setFormData({
        avatar: userDetail?.avatar,
        gender: userDetail?.gender,
        dob: format(userDetail?.dob, "yyyy-MM-dd"),
        file: null,
        isSubscriber: userDetail?.isSubscriber || false
      });
      setInitialFormData({
        avatar: userDetail?.avatar,
        gender: userDetail?.gender,
        dob: format(userDetail?.dob, "yyyy-MM-dd"),
        file: null,
        isSubscriber: userDetail?.isSubscriber || false
      });
    }

    if (userInfo?.role === "doctor") {
      dispatch(getDoctorDetails());
    }
  }, [userDetail]);

  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const fileUrl = e.target.files[0];
    if (fileUrl) {
      const imageUrl = URL.createObjectURL(fileUrl);
      setFormData({
        ...formData,
        avatar: fileUrl,
        file: imageUrl
      });
    }
  };

  const handleDelete = async ( )=> {
    const confirm = window.confirm ( "Are you sure for delete account");
    if( confirm ){
      const actionResult = await dispatch( deleteAccount())
      if( actionResult.type = deleteAccount.fulfilled.type ){
        dispatch( logout );
        navigate("/login")
      }
    }
  }
  const errors = {};

  const validateForm = () => {
    if (formData.dob.trim().length === 0) {
      errors.dob = "Date of Birth can't be empty";
    } else if (new Date(formData.dob) > new Date()) {
      errors.dob = "Date of Birth can't be in the future";
    }
    if (formData.gender.trim().length === 0) {
      errors.gender = "Gender should be selected";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    validateForm();
    if (Object.keys(errors).length > 0) {
      setClientError(errors);
    } else {
      setClientError(null);
      const uploadData = new FormData();
      uploadData.append("avatar", formData.avatar);
      uploadData.append("gender", formData.gender);
      uploadData.append("dob", formData.dob);

      if (!userDetail) {
        dispatch(uploadProfile(uploadData)); 
      } else if (!userDetail.isSubscriber) {
        toast.warning("User needs a subscription to Edit the Profile");
        setFormData({
          avatar: initialFormData.avatar,
          gender: initialFormData.gender,
          dob: initialFormData.dob,
          file: null,
          isSubscriber: initialFormData.isSubscriber
        });
      } else if (userDetail && userDetail.isSubscriber) {
        dispatch(updateProfile(uploadData));
      }
    }
  };

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
                src={formData.file ? formData?.file : formData?.avatar}
                alt="Profile "
                className="w-full h-full rounded-full object-cover"
              />
              <div className="absolute bottom-0 right-4 bg-white p-2 cursor-pointer rounded-full shadow-md">
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
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <div className="mt-2">
                <label className="text-sm font-semibold opacity-70">DOB:</label>
                <input
                  type="date"
                  value={formData.dob}
                  onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                  className="font-semibold text-sm ml-3 opacity-70"
                  max={new Date(Date.now()).toISOString().split('T')[0]}
                />
                <div>
                  {clientError?.dob && <span className="text-sm font-semibold opacity-70 text-red-500"> {clientError?.dob}</span>}
                </div>
              </div>

              <div className="mt-2">
                <label className="text-sm font-semibold opacity-70">Gender:</label>
                <div className="flex items-center">
                  <label className="mr-4">
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      checked={formData.gender === "male"}
                      onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                      className="mr-2"
                    />
                    Male
                  </label>
                  <label className="mr-4">
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                      checked={formData.gender === "female"}
                      onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                      className="mr-2"
                    />
                    Female
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="gender"
                      value="other"
                      checked={formData.gender === "other"}
                      onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                      className="mr-2"
                    />
                    Other
                  </label>
                </div>
                <div>
                  {clientError?.gender && <span className="text-sm font-semibold opacity-70 text-red-500"> {clientError?.gender}</span>}
                </div>
              </div>

              <div className="mt-2 flex justify-center">
                {userDetail ? (
                  <input
                    type="submit"
                    value="Edit"
                    className="p-1 bg-green-400 w-20 rounded-sm cursor-pointer text-white font-semibold hover:bg-green-600"
                  />
                ) : (
                  <input
                    type="submit"
                    value="Upload"
                    className="p-1 bg-green-400 w-20 rounded-sm cursor-pointer text-white font-semibold hover:bg-green-600"
                  />
                )}
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="w-1/2 flex flex-col justify-center">
        {!userDetail?.isSubscriber && (
          <div className="bg-gray-400 p-10 text-white font-semibold opacity-80 rounded-sm">
            <h2 className="text-xl mb-4">Benefits of having Subscription</h2>
            <li>Discount on the consultation</li>
            <li>Early access to the new features</li>
            <li>Health Reminders</li>
            <li>Access to Records & Reliots</li>
            <li> User can Update the Profile </li>
            <div className="flex justify-center items-center mt-9">
              <button className="p-2 bg-blue-600 rounded-sm w-32 hover:bg-blue-700">Buy Now</button>
            </div>
          </div>
        )}
        {userDetail?.isSubscriber && (
          <div className="bg-gray-400 p-10 text-white font-semibold opacity-80 rounded-sm">
            <h2 className="text-xl mb-4">You Have!</h2>
            <li>Discount on the consultation</li>
            <li>Early access to the new features</li>
            <li>Health Reminders</li>
            <li>Access to Records & Reliots</li>
            <div className="flex justify-center items-center mt-9">
              <button
                className="p-2 bg-blue-600 rounded-sm hover:bg-blue-700 text-sm"
                onClick={() => navigate("/find-doctors")}
              >
                Book Appointment
              </button>
            </div>
          </div>
        )}
        <div className="mt-3">
          <p
            onClick={() => navigate("/change-password")}
            className="flex font-semibold cursor-pointer hover:underline hover:text-blue-400"
          >
            Change Password
          </p>
        </div>
        <div className="mt-3">
          <p
            onClick={() => handleDelete()}
            className="flex font-semibold cursor-pointer hover:underline hover:text-blue-400"
          >
            Delete Account
          </p>
        </div>
        <div>
          {serverError && serverError.map((ele, i) => (
            <li key={i} className="text-sm mt-2 font-semibold text-red-500 opacity-60"> {ele.msg}</li>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
