import './App.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from './slices/authSlice';
import { getProfile } from './slices/profileSlice';
import { getSpecializations } from './slices/doctorDetailsSlice';


import PrivateRoute from './pages/mutual/PrivateRoute';
import Dashboard from './pages/Dashboard';
import Login from './pages/mutual/Login';

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

import VerifyDoctors from './pages/admin/VerifyDoctors';

import Details from "./pages/doctor/Details";
import GenerateSlots from './pages/doctor/GenerateSlots';

import FindDoctors from "./pages/customer/FindDoctors"
import BookAppontment from './pages/customer/BookAppointment';


function App() {
  const location = useLocation();
  const dispatch = useDispatch()
  const { userInfo } = useSelector(state => state.auth)
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
    <div className="flex flex-col ">
      <Navbar />
      <div className="flex-grow">
        {/* Ensures the footer always stays at the bottom without causing overflow. */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<PrivateRoute> <Login /> </PrivateRoute>} />
          <Route path="/register" element={<PrivateRoute> <Register /></PrivateRoute>} />
          <Route path='/option-login' element={<OptionLogin />} />
          <Route path="/verify" element={<VerifyAccount />} />
          <Route path='/profile' element={<PrivateRoute> <Profile /></PrivateRoute>} />
          <Route path='/dashboard' element={<PrivateRoute> <Dashboard /> </PrivateRoute>} />
          <Route path='/contact' element={<PrivateRoute permittedRoles={["customer", "doctor"]}> <Contact /></PrivateRoute>} />
          <Route path='/details' element={<PrivateRoute permittedRoles={["doctor"]}> <Details /></PrivateRoute>} />
          <Route path='/generate-slots' element={<PrivateRoute permittedRoles={["doctor"]}> <GenerateSlots /></PrivateRoute>} />
          <Route path='/find-doctors' element={<PrivateRoute permittedRoles={["customer"]}> <FindDoctors /></PrivateRoute>} />
          <Route path='/book-appointment' element={<PrivateRoute permittedRoles={["customer"]}> <BookAppontment /></PrivateRoute>} />
          <Route  path = "/verify-doctors" element = { <PrivateRoute permittedRoles = { ["admin"]}> <VerifyDoctors/> </PrivateRoute>}/>
          <Route path='*'  element = { <NotFound/> }/>
        </Routes>
      </div>
      {showFooter.includes(location.pathname) && <Footer />}
    </div>
  );
}

export default App;
