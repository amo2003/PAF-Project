import { useEffect, useState } from 'react';
import { getAllBookings, approveBooking, rejectBooking, deleteBooking } from '../api/bookingApi';

function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [rejectReason, setRejectReason] = useState({});
  const [error, setError] = useState('');

const statusClass = {
  PENDING:   'bg-yellow-100 text-yellow-700',
  APPROVED:  'bg-green-100 text-green-700',
  REJECTED:  'bg-red-100 text-red-700',
  CANCELLED: 'bg-gray-100 text-gray-600',
};

function AdminBookings() {
  const [bookings, setBookings]       = useState([]);
  const [rejectReason, setRejectReason] = useState({});
  const [error, setError]             = useState('');
  const [loading, setLoading]         = useState(true);

  useEffect(() => { fetchAll(); }, []);

  const fetchAll = async () => {
    try {
      const res = await getAllBookings();
      setBookings(res.data);
    } catch { setError('Failed to load bookings.'); }
  };

  const handleApprove = async (id) => {
    try {
      const res = await approveBooking(id);
      setBookings(bookings.map(b => b.id === id ? res.data : b));
    } catch (err) { alert(err.response?.data?.message || 'Cannot approve.'); }
    setLoading(true);
    try { const res = await getAllBookings(); setBookings(res.data); }
    catch { setError('Failed to load bookings.'); }
    finally { setLoading(false); }
  };

  const handleApprove = async (id) => {
    try { const res = await approveBooking(id); setBookings(bookings.map(b => b.id === id ? res.data : b)); }
    catch (err) { alert(err.response?.data?.message || 'Cannot approve.'); }
  };

  const handleReject = async (id) => {
    const reason = rejectReason[id];
    if (!reason) return alert('Please enter a rejection reason.');
    try {
      const res = await rejectBooking(id, reason);
      setBookings(bookings.map(b => b.id === id ? res.data : b));
    } catch (err) { alert(err.response?.data?.message || 'Cannot reject.'); }
    try { const res = await rejectBooking(id, reason); setBookings(bookings.map(b => b.id === id ? res.data : b)); }
    catch (err) { alert(err.response?.data?.message || 'Cannot reject.'); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this booking?')) return;
    try {
      await deleteBooking(id);
      setBookings(bookings.filter(b => b.id !== id));
    } catch { alert('Cannot delete.'); }
  };

  const statusColor = { PENDING:'#f0a500', APPROVED:'green', REJECTED:'red', CANCELLED:'gray' };

  return (
    <div style={styles.container}>
      <h2>Admin — All Bookings</h2>
      {error && <p style={{ color:'red' }}>{error}</p>}
      {bookings.length === 0 && <p>No bookings found.</p>}
      {bookings.map(b => (
        <div key={b.id} style={styles.card}>
          <div style={styles.cardHeader}>
            <span>Booking #{b.id} — User {b.userId} — Resource {b.resourceId}</span>
            <span style={{ color: statusColor[b.status], fontWeight:'bold' }}>{b.status}</span>
          </div>
          <p><b>Date:</b> {b.bookingDate} &nbsp; <b>Time:</b> {b.startTime} – {b.endTime}</p>
          <p><b>Purpose:</b> {b.purpose} &nbsp; <b>Attendees:</b> {b.attendees}</p>
          {b.rejectionReason && <p style={{ color:'red' }}><b>Reason:</b> {b.rejectionReason}</p>}
          {b.status === 'PENDING' && (
            <div style={styles.actions}>
              <button onClick={() => handleApprove(b.id)} style={styles.approveBtn}>Approve</button>
              <input placeholder="Rejection reason" value={rejectReason[b.id] || ''}
                onChange={e => setRejectReason({ ...rejectReason, [b.id]: e.target.value })}
                style={styles.reasonInput} />
              <button onClick={() => handleReject(b.id)} style={styles.rejectBtn}>Reject</button>
            </div>
          )}
          <button onClick={() => handleDelete(b.id)} style={styles.deleteBtn}>Delete</button>
        </div>
      ))}
    try { await deleteBooking(id); setBookings(bookings.filter(b => b.id !== id)); }
    catch { alert('Cannot delete.'); }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-10 px-6">
      <div className="max-w-6xl mx-auto">

        <div className="mb-6">
          <h2 className="text-3xl font-extrabold text-gray-800">Admin — All Bookings</h2>
          <p className="text-gray-500 text-sm mt-1">Review, approve or reject booking requests</p>
        </div>

        {error && <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded-lg text-sm mb-5">{error}</div>}

        {loading ? (
          <div className="bg-white rounded-xl p-16 text-center text-gray-400 flex flex-col items-center gap-3">
            <span className="text-4xl">⏳</span><p>Loading bookings...</p>
          </div>
        ) : bookings.length === 0 ? (
          <div className="bg-white rounded-xl p-16 text-center text-gray-400 flex flex-col items-center gap-3">
            <span className="text-5xl">📭</span><p>No bookings found.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {bookings.map(b => (
              <div key={b.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">

                {/* Card Header */}
                <div className="flex justify-between items-center mb-3">
                  <span className="font-bold text-gray-700">
                    Booking #{b.id} — User {b.userId} — Resource {b.resourceId}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${statusClass[b.status]}`}>{b.status}</span>
                </div>

                {/* Details */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm text-gray-600 mb-3">
                  <span><span className="font-semibold">Date:</span> {b.bookingDate}</span>
                  <span><span className="font-semibold">Time:</span> {b.startTime} – {b.endTime}</span>
                  <span><span className="font-semibold">Purpose:</span> {b.purpose}</span>
                  <span><span className="font-semibold">Attendees:</span> {b.attendees}</span>
                </div>

                {b.rejectionReason && (
                  <p className="text-sm text-red-600 mb-3"><span className="font-semibold">Rejection Reason:</span> {b.rejectionReason}</p>
                )}

                {/* Actions */}
                <div className="flex flex-wrap gap-3 items-center mt-2">
                  {b.status === 'PENDING' && (
                    <>
                      <button onClick={() => handleApprove(b.id)}
                        className="bg-green-600 text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-green-700 transition">
                        ✅ Approve
                      </button>
                      <input placeholder="Enter rejection reason..."
                        value={rejectReason[b.id] || ''}
                        onChange={e => setRejectReason({ ...rejectReason, [b.id]: e.target.value })}
                        className="flex-1 min-w-[200px] border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-red-300" />
                      <button onClick={() => handleReject(b.id)}
                        className="bg-red-500 text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-red-600 transition">
                        ❌ Reject
                      </button>
                    </>
                  )}
                  <button onClick={() => handleDelete(b.id)}
                    className="bg-gray-500 text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-gray-600 transition ml-auto">
                    🗑 Delete
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

const styles = {
  container: { maxWidth:'800px', margin:'40px auto', padding:'24px' },
  card: { border:'1px solid #ddd', borderRadius:'8px', padding:'16px', marginBottom:'12px' },
  cardHeader: { display:'flex', justifyContent:'space-between', marginBottom:'8px', fontWeight:'bold' },
  actions: { display:'flex', gap:'8px', alignItems:'center', marginTop:'8px', flexWrap:'wrap' },
  approveBtn: { padding:'6px 14px', backgroundColor:'green', color:'#fff', border:'none', borderRadius:'4px', cursor:'pointer' },
  rejectBtn: { padding:'6px 14px', backgroundColor:'#e53935', color:'#fff', border:'none', borderRadius:'4px', cursor:'pointer' },
  deleteBtn: { marginTop:'8px', padding:'5px 12px', backgroundColor:'#555', color:'#fff', border:'none', borderRadius:'4px', cursor:'pointer' },
  reasonInput: { padding:'6px', borderRadius:'4px', border:'1px solid #ccc', fontSize:'13px', flex:1 }
};

export default AdminBookings;
