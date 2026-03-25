import { useEffect, useState } from 'react';
import { getAllBookings, approveBooking, rejectBooking, deleteBooking } from '../api/bookingApi';

function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [rejectReason, setRejectReason] = useState({});
  const [error, setError] = useState('');

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
  };

  const handleReject = async (id) => {
    const reason = rejectReason[id];
    if (!reason) return alert('Please enter a rejection reason.');
    try {
      const res = await rejectBooking(id, reason);
      setBookings(bookings.map(b => b.id === id ? res.data : b));
    } catch (err) { alert(err.response?.data?.message || 'Cannot reject.'); }
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
