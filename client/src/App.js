import './App.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { getUser } from './slices/authSlice';
import { getProfile } from './slices/profileSlice';
import { getSpecializations } from './slices/doctorDetailsSlice';


import PrivateRoute from './pages/mutual/PrivateRoute';
import Dashboard from './pages/Dashboard';
import Login from './pages/mutual/Login';
import ForgotPassword from './pages/mutual/ForgotPassword';
import ResetPassword from './pages/mutual/ResetPassword';
import ChangePassword from './pages/mutual/ChangePassword';

import Home from './pages/mutual/Home';
import Navbar from './pages/mutual/Navbar';
import Register from './pages/mutual/Register';
import Footer from './pages/mutual/Footer';
import OptionLogin from './pages/mutual/OptionLogin';
import Profile from "./pages/mutual/Profile";
import VerifyAccount from './pages/mutual/VerifyAccount';
import Spinner from './pages/mutual/Spinner';
import Contact from './pages/mutual/Contact';
import NotFound from './pages/mutual/NotFound';
import Payment from './pages/mutual/Payment';
import Review from './pages/mutual/Review';

import VerifyDoctors from './pages/admin/VerifyDoctors';

import Details from "./pages/doctor/Details";
import GenerateSlots from './pages/doctor/GenerateSlots';
import CustomerReviews from './pages/doctor/CustomerReviews';
import DoctorCalender from './pages/doctor/DoctorCalender';
import DoctorShedules from './pages/doctor/DoctorShedules';
import AppointmentSummary from './pages/doctor/AppointmentSummary';

import FindDoctors from "./pages/customer/FindDoctors"
import BookAppontment from './pages/customer/BookAppointment';
import AppointmentHistory from './pages/customer/AppointmentHistory';
import MyReviews from './pages/customer/MyReviews';
import ConsultationSummary from './pages/customer/ConsultationSummary';


function App() {
  const location = useLocation();
  const dispatch = useDispatch()
  const { userInfo } = useSelector(state => state.auth)
  const stripePromise = loadStripe("pk_test_51QngbLGyuPvXvXV2P1MHeuWmW65F367lFM1I84zHYDgQv8QLGjkz32gWANZIkSRRVH2oSGKXUxJDnPLnEYwEIRuI00btYQMQxT")
  const showFooter = ["/", "/login", "/register"];
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      dispatch(getUser());
      dispatch(getProfile());
      dispatch(getSpecializations());
    }
  }, [token])

  if (token && !userInfo) {
    return <Spinner />
  }
  return (
    <div className="flex flex-col  ">
      <Navbar />
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login /> } />
          <Route path="/register" element={ <Register />} />
          <Route path='/option-login' element={<OptionLogin />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/reset-password' element={<ResetPassword />} />
          <Route path="/verify" element={<VerifyAccount />} />
          <Route path='/profile' element={<PrivateRoute> <Profile /></PrivateRoute>} />
          <Route path='/change-password' element={<PrivateRoute permittedRoles={["customer", "doctor", "admin"]}> <ChangePassword /></PrivateRoute>} />
          <Route path='/dashboard' element={<PrivateRoute> <Dashboard /> </PrivateRoute>} />
          <Route path='/contact' element={<PrivateRoute permittedRoles={["customer", "doctor"]}> <Contact /></PrivateRoute>} />
          <Route path='/payment' element={ <PrivateRoute permittedRoles={["customer", "doctor"]}> <Payment /></PrivateRoute> }/>
          <Route path='/details' element={<PrivateRoute permittedRoles={["doctor"]}> <Details /></PrivateRoute>} />
          <Route path='/generate-slots' element={<PrivateRoute permittedRoles={["doctor"]}> <GenerateSlots /></PrivateRoute>} />
          <Route path='/doctor-calender' element={<PrivateRoute permittedRoles={["doctor"]}> <DoctorCalender /></PrivateRoute>} />
          <Route path='/doctor-shedules' element={<PrivateRoute permittedRoles={["doctor"]}> <DoctorShedules /></PrivateRoute>} />
          <Route path='/appointment-summary' element={<PrivateRoute permittedRoles={["doctor"]}> <AppointmentSummary /></PrivateRoute>} />
          <Route path='/find-doctors' element={<PrivateRoute permittedRoles={["customer"]}> <FindDoctors /></PrivateRoute>} />
          <Route path='/appointment-history' element={<PrivateRoute permittedRoles={["customer"]}> <AppointmentHistory /></PrivateRoute>} />
          <Route path='/customer-reviews' element={<PrivateRoute permittedRoles={["customer"]}> <CustomerReviews /></PrivateRoute>} />
          <Route path='/review' element={<PrivateRoute permittedRoles={["customer"]}> <Review /></PrivateRoute>} />
          <Route path='/my-reviews' element={<PrivateRoute permittedRoles={["customer"]}> <MyReviews /></PrivateRoute>} />
          <Route path='/consultation-summary' element={<PrivateRoute permittedRoles={["customer"]}> <ConsultationSummary /></PrivateRoute>} />
          <Route path='/book-appointment' element={<PrivateRoute permittedRoles={["customer"]}> <Elements stripe={stripePromise}> <BookAppontment /> </Elements> </PrivateRoute>} />
          <Route  path = "/verify-doctors" element = { <PrivateRoute permittedRoles = { ["admin"]}> <VerifyDoctors/> </PrivateRoute>}/>
          <Route path='*'  element = { <NotFound/> }/>

        </Routes>
      </div>
      {showFooter.includes(location.pathname) && <Footer />}
    </div>
  );
}

export default App;
