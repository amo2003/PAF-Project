import { Link } from 'react-router-dom'

function NavBar() {
  return (
    <nav className="bg-blue-600 px-6 py-3 flex justify-between items-center shadow-md">
      <span className="text-white font-bold text-lg tracking-wide">🏛️ Smart Campus</span>
      <div className="flex gap-6 flex-wrap">
        <Link to="/"                className="text-white text-sm hover:text-blue-200 transition">Home</Link>
        <Link to="/create-booking"  className="text-white text-sm hover:text-blue-200 transition">New Booking</Link>
        <Link to="/my-bookings"     className="text-white text-sm hover:text-blue-200 transition">My Bookings</Link>
        <Link to="/admin/bookings"  className="text-white text-sm hover:text-blue-200 transition">Admin Panel</Link>
        <Link to="/admin/resources" className="text-white text-sm hover:text-blue-200 transition">Resources</Link>
        <Link to="/chat"            className="text-white text-sm hover:text-blue-200 transition">💬 Chat</Link>
      </div>
    </nav>
  )
}

export default NavBar
