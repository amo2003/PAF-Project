import { useState, useEffect } from 'react';
import { getAllBookings, cancelBooking } from '../api/bookingApi';

const statusClass = {
  PENDING:   'bg-yellow-100 text-yellow-700',
  APPROVED:  'bg-green-100 text-green-700',
  REJECTED:  'bg-red-100 text-red-700',
  CANCELLED: 'bg-gray-100 text-gray-600',
};

function MyBookings() {
  const [allBookings, setAllBookings] = useState([]);
  const [filtered, setFiltered]       = useState([]);
  const [userId, setUserId]           = useState('');
  const [statusFilter, setStatus]     = useState('ALL');
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState('');

  useEffect(() => { fetchAll(); }, []);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const res = await getAllBookings();
      setAllBookings(res.data);
      setFiltered(res.data);
    } catch { setError('Failed to load bookings.'); }
    finally { setLoading(false); }
  };

  const applyFilters = (uid, status) => {
    let data = [...allBookings];
    if (uid) data = data.filter(b => String(b.userId).includes(uid));
    if (status !== 'ALL') data = data.filter(b => b.status === status);
    setFiltered(data);
  };

  const handleCancel = async (id) => {
    if (!window.confirm('Cancel this booking?')) return;
    try {
      await cancelBooking(id);
      const updated = allBookings.map(b => b.id === id ? { ...b, status: 'CANCELLED' } : b);
      setAllBookings(updated);
      applyFilters(userId, statusFilter);
    } catch (err) { alert(err.response?.data?.message || 'Cannot cancel.'); }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-10 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-6">
          <h2 className="text-3xl font-extrabold text-gray-800">My Bookings</h2>
          <p className="text-gray-500 text-sm mt-1">View and manage all your booking requests</p>
        </div>

        {/* Filter Bar */}
        <div className="bg-white rounded-xl shadow-sm px-5 py-4 flex flex-wrap gap-3 items-center mb-6">
          <input type="number" placeholder="Filter by User ID..."
            value={userId}
            onChange={e => { setUserId(e.target.value); applyFilters(e.target.value, statusFilter); }}
            className="flex-1 min-w-[180px] border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-400" />
          <select value={statusFilter}
            onChange={e => { setStatus(e.target.value); applyFilters(userId, e.target.value); }}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-400 bg-white">
            <option value="ALL">All Statuses</option>
            <option value="PENDING">Pending</option>
            <option value="APPROVED">Approved</option>
            <option value="REJECTED">Rejected</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
          <button onClick={() => { setUserId(''); setStatus('ALL'); setFiltered(allBookings); }}
            className="bg-gray-100 text-gray-700 font-semibold px-4 py-2 rounded-lg text-sm hover:bg-gray-200 transition">
            Clear
          </button>
          <span className="text-gray-400 text-xs ml-auto">{filtered.length} record{filtered.length !== 1 ? 's' : ''} found</span>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { s: 'PENDING',   cls: 'bg-yellow-100 text-yellow-700' },
            { s: 'APPROVED',  cls: 'bg-green-100 text-green-700' },
            { s: 'REJECTED',  cls: 'bg-red-100 text-red-700' },
            { s: 'CANCELLED', cls: 'bg-gray-100 text-gray-600' },
          ].map(({ s, cls }) => (
            <div key={s} className={`${cls} rounded-xl px-5 py-4 flex flex-col items-center gap-1`}>
              <span className="text-3xl font-extrabold">{allBookings.filter(b => b.status === s).length}</span>
              <span className="text-xs font-semibold tracking-wide">{s}</span>
            </div>
          ))}
        </div>

        {error && <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded-lg text-sm mb-5">{error}</div>}

        {/* Table */}
        {loading ? (
          <div className="bg-white rounded-xl p-16 text-center text-gray-400 flex flex-col items-center gap-3">
            <span className="text-4xl">⏳</span><p>Loading bookings...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="bg-white rounded-xl p-16 text-center text-gray-400 flex flex-col items-center gap-3">
            <span className="text-5xl">📭</span><p>No bookings match your filter.</p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl shadow-md bg-white">
            <table className="w-full text-sm">
              <thead className="bg-blue-600 text-white">
                <tr>
                  {['#','User ID','Resource ID','Date','Start','End','Purpose','Attendees','Status','Rejection Reason','Action'].map(h => (
                    <th key={h} className="px-4 py-3 text-left font-semibold whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((b, i) => (
                  <tr key={b.id} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-4 py-3 border-b border-gray-100">{b.id}</td>
                    <td className="px-4 py-3 border-b border-gray-100">{b.userId}</td>
                    <td className="px-4 py-3 border-b border-gray-100">{b.resourceId}</td>
                    <td className="px-4 py-3 border-b border-gray-100 whitespace-nowrap">{b.bookingDate}</td>
                    <td className="px-4 py-3 border-b border-gray-100">{b.startTime}</td>
                    <td className="px-4 py-3 border-b border-gray-100">{b.endTime}</td>
                    <td className="px-4 py-3 border-b border-gray-100 max-w-[160px] truncate">{b.purpose}</td>
                    <td className="px-4 py-3 border-b border-gray-100 text-center">{b.attendees}</td>
                    <td className="px-4 py-3 border-b border-gray-100">
                      <span className={`px-2 py-1 rounded-full text-xs font-bold whitespace-nowrap ${statusClass[b.status]}`}>{b.status}</span>
                    </td>
                    <td className="px-4 py-3 border-b border-gray-100 text-red-600 text-xs">{b.rejectionReason || '—'}</td>
                    <td className="px-4 py-3 border-b border-gray-100">
                      {b.status === 'APPROVED'
                        ? <button onClick={() => handleCancel(b.id)} className="bg-red-500 text-white text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-red-600 transition">Cancel</button>
                        : <span className="text-gray-300 text-xs">—</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>
    </div>
  );
}

export default MyBookings;
