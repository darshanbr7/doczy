import './App.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getUser } from './slices/authSlice';
import PrivateRoute from './pages/PrivateRoute';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Home from './pages/Home';
import Navbar from './pages/Navbar';
import Register from './pages/Register';
import Footer from './pages/Footer';
import OptionLogin from './pages/OptionLogin';
import Profile  from "./pages/Profile";
import VerifyAccount from './pages/VerifyAccount';
import Details from './pages/Details';

function App() {
  const location = useLocation();
  const dispatch = useDispatch()
  const showFooter = [ "/", "/login", "/register"];
  useEffect(()=>{
  const token = localStorage.getItem("token");
    if( token ){
      dispatch( getUser() )
    }
  },[ ])
  return (
    <div className="flex flex-col ">
      <Navbar />
      <div className="flex-grow">
        {/* Ensures the footer always stays at the bottom without causing overflow. */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path='/option-login' element = { <OptionLogin />} />
          <Route path = "/verify" element = { <VerifyAccount/>} />
          <Route path='/profile' element = { <PrivateRoute> <Profile/></PrivateRoute>} />
          <Route path='/dashboard' element = { <PrivateRoute> <Dashboard/> </PrivateRoute>} />
          <Route path='/details' element =  { <PrivateRoute permittedRoles = {[ "doctor"]}> <Details/></PrivateRoute>}/>
        </Routes>
      </div>
      {showFooter.includes(location.pathname) && <Footer />}
    </div>
  );
}

export default App;
