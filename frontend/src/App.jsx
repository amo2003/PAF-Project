import { Routes, Route } from 'react-router-dom'
import NavBar from './Module2/Components/NavBar'
import Home from './Home/Home'
import CreateBookings from './Module2/Pages/CreateBookings'
import MyBookings from './Module2/Pages/MyBookings'
import AdminBooking from './Module2/Pages/AdminBooking'
import AdminResources from './pages/AdminResources'
import ChatBoot from './Module2/Pages/ChatBoot'
import './App.css'

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/"                element={<Home />} />
        <Route path="/create-booking"  element={<CreateBookings />} />
        <Route path="/my-bookings"     element={<MyBookings />} />
        <Route path="/admin/bookings"  element={<AdminBooking />} />
        <Route path="/admin/resources" element={<AdminResources />} />
        <Route path="/chat"            element={<ChatBoot />} />
      </Routes>
    </>
  )
}

export default App
