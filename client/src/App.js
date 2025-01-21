import './App.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getUser } from './slices/authSlice';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Home from './pages/Home';
import Navbar from './pages/Navbar';
import Register from './pages/Register';
import Footer from './pages/Footer';
import OptionLogin from './pages/OptionLogin';
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
          <Route path='/dashboard' element = { <Dashboard/>} />
          <Route path='/option-login' element = { <OptionLogin />} />
        </Routes>
      </div>
      {showFooter.includes(location.pathname) && <Footer />}
    </div>
  );
}

export default App;
