import './App.css';
import { Route, Routes, useLocation } from 'react-router-dom';

import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Home from './pages/Home';
import Navbar from './pages/Navbar';
import Register from './pages/Register';
import Footer from './pages/Footer';
function App() {
  const location = useLocation();
  const showFooter = [ "/", "/login", "/register"];
  return (
    <div className="flex flex-col ">
      <Navbar />
      <div className="flex-grow">
        {/* Ensures the footer always stays at the bottom without causing overflow. */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
      {showFooter.includes(location.pathname) && <Footer />}
    </div>
  );
}

export default App;
