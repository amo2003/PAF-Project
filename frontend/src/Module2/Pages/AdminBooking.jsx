import { useEffect, useState } from 'react'
import { getAllBookings, approveBooking, rejectBooking, deleteBooking } from '../api/BookingApi'

const statusClass = {
  PENDING:   'bg-yellow-100 text-yellow-700',
  APPROVED:  'bg-green-100 text-green-700',
  REJECTED:  'bg-red-100 text-red-700',
  CANCELLED: 'bg-gray-100 text-gray-600',
}

function AdminBooking() {
  const [allBookings, setAllBookings]   = useState([])
  const [bookings, setBookings]         = useState([])
  const [rejectReason, setRejectReason] = useState({})
  const [statusFilter, setStatusFilter] = useState('ALL')
  const [error, setError]               = useState('')
  const [loading, setLoading]           = useState(true)

  useEffect(() => { fetchAll() }, [])

  const fetchAll = async () => {
    setLoading(true)
    try {
      const res = await getAllBookings()
      setAllBookings(res.data); setBookings(res.data)
    } catch { setError('Failed to load bookings.') }
    finally { setLoading(false) }
  }

  const handleStatusFilter = (e) => {
    const val = e.target.value; setStatusFilter(val)
    setBookings(val === 'ALL' ? allBookings : allBookings.filter(b => b.status === val))
  }

  const handleApprove = async (id) => {
    try {
      const res = await approveBooking(id)
      const updated = allBookings.map(b => b.id === id ? res.data : b)
      setAllBookings(updated); setBookings(statusFilter === 'ALL' ? updated : updated.filter(b => b.status === statusFilter))
    } catch (err) { alert(err.response?.data?.message || 'Cannot approve.') }
  }

  const handleReject = async (id) => {
    const reason = rejectReason[id]
    if (!reason) return alert('Please enter a rejection reason.')
    try {
      const res = await rejectBooking(id, reason)
      const updated = allBookings.map(b => b.id === id ? res.data : b)
      setAllBookings(updated); setBookings(statusFilter === 'ALL' ? updated : updated.filter(b => b.status === statusFilter))
    } catch (err) { alert(err.response?.data?.message || 'Cannot reject.') }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this booking?')) return
    try {
      await deleteBooking(id)
      const updated = allBookings.filter(b => b.id !== id)
      setAllBookings(updated); setBookings(statusFilter === 'ALL' ? updated : updated.filter(b => b.status === statusFilter))
    } catch { alert('Cannot delete.') }
  }

  return (
    <div className="admin-bg min-h-screen py-10 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h2 className="text-3xl font-extrabold text-gray-800">Admin — All Bookings</h2>
          <p className="text-gray-500 text-sm mt-1">Review, approve or reject booking requests</p>
        </div>

        {/* Filter Bar */}
        <div className="bg-white rounded-xl shadow-sm px-5 py-4 flex flex-wrap gap-3 items-center mb-6">
          <select value={statusFilter} onChange={handleStatusFilter}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-400 bg-white">
            <option value="ALL">All Statuses</option>
            <option value="PENDING">Pending</option>
            <option value="APPROVED">Approved</option>
            <option value="REJECTED">Rejected</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
          <div className="flex gap-3 flex-wrap">
            {['PENDING','APPROVED','REJECTED','CANCELLED'].map(s => (
              <span key={s} className={`px-3 py-1 rounded-full text-xs font-bold ${statusClass[s]}`}>
                {s}: {allBookings.filter(b => b.status === s).length}
              </span>
            ))}
          </div>
          <span className="text-gray-400 text-xs ml-auto">{bookings.length} booking{bookings.length !== 1 ? 's' : ''} found</span>
        </div>

        {error && <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded-lg text-sm mb-5">{error}</div>}

        {loading ? (
          <div className="bg-white rounded-xl p-16 text-center text-gray-400 flex flex-col items-center gap-3">
            <span className="text-4xl">⏳</span><p>Loading bookings...</p>
          </div>
        ) : bookings.length === 0 ? (
          <div className="bg-white rounded-xl p-16 text-center text-gray-400 flex flex-col items-center gap-3">
            <span className="text-5xl">📭</span><p>No bookings match the selected filter.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {bookings.map(b => (
              <div key={b.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                <div className="flex justify-between items-center mb-3">
                  <span className="font-bold text-gray-700">Booking #{b.id} — User {b.userId} — Resource {b.resourceId}</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${statusClass[b.status]}`}>{b.status}</span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm text-gray-600 mb-3">
                  <span><span className="font-semibold">Date:</span> {b.bookingDate}</span>
                  <span><span className="font-semibold">Time:</span> {b.startTime} – {b.endTime}</span>
                  <span><span className="font-semibold">Purpose:</span> {b.purpose}</span>
                  <span><span className="font-semibold">Attendees:</span> {b.attendees}</span>
                </div>
                {b.rejectionReason && (
                  <p className="text-sm text-red-600 mb-3"><span className="font-semibold">Rejection Reason:</span> {b.rejectionReason}</p>
                )}
                <div className="flex flex-wrap gap-3 items-center mt-2">
                  {b.status === 'PENDING' && (
                    <>
                      <button onClick={() => handleApprove(b.id)} className="bg-green-600 text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-green-700 transition">✅ Approve</button>
                      <input placeholder="Enter rejection reason..." value={rejectReason[b.id] || ''}
                        onChange={e => setRejectReason({ ...rejectReason, [b.id]: e.target.value })}
                        className="flex-1 min-w-[200px] border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-red-300" />
                      <button onClick={() => handleReject(b.id)} className="bg-red-500 text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-red-600 transition">❌ Reject</button>
                    </>
                  )}
                  <button onClick={() => handleDelete(b.id)} className="bg-gray-500 text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-gray-600 transition ml-auto">🗑 Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminBooking
