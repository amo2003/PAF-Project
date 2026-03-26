import { Routes, Route } from 'react-router-dom';
import Navbar from './Module2/Components/Navbar';
import Home from './Home/Home';
import CreateBooking from './Module2/Pages/CreateBooking';
import MyBookings from './Module2/Pages/MyBooking';
import AdminBookings from './Module2/Pages/AdminBookings';
import AdminResources from './pages/AdminResources';
import ChatBot from './Module2/Pages/ChatBot';
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
