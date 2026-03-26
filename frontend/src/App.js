import { Routes, Route } from 'react-router-dom';
import Navbar from './Module2/Components/NavBar';
import Home from './Home/Homes';
import CreateBooking from './Module2/Pages/CreateBookings';
import MyBookings from './Module2/Pages/MyBookings';
import AdminBookings from './Module2/Pages/AdminBooking';
import AdminResources from './pages/AdminResources';
import ChatBot from './Module2/Pages/ChatBoot';
import './App.css';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/"                element={<Home />} />
        <Route path="/create-booking"  element={<CreateBooking />} />
        <Route path="/my-bookings"     element={<MyBookings />} />
        <Route path="/admin/bookings"  element={<AdminBookings />} />
        <Route path="/admin/resources" element={<AdminResources />} />
        <Route path="/chat"            element={<ChatBot />} />
        
        
      </Routes>
    </>
  );
}

export default App;
