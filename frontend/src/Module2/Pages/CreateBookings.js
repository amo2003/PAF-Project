import { useState } from 'react';
import { createBooking } from '../api/BookingApi';

const alertConfig = {
  success: { bg: 'bg-green-50 border-green-300', icon: '✅', titleColor: 'text-green-700', msgColor: 'text-green-600' },
  conflict: { bg: 'bg-orange-50 border-orange-300', icon: '⚠️', titleColor: 'text-orange-700', msgColor: 'text-orange-600' },
  error:    { bg: 'bg-red-50 border-red-300',    icon: '❌', titleColor: 'text-red-700',    msgColor: 'text-red-600' },
};

const fields = [
  { label: 'User ID',      name: 'userId',      type: 'number', placeholder: 'Enter your user ID' },
  { label: 'Resource ID',  name: 'resourceId',  type: 'number', placeholder: 'Enter resource ID' },
  { label: 'Booking Date', name: 'bookingDate', type: 'date',   placeholder: '' },
  { label: 'Start Time',   name: 'startTime',   type: 'time',   placeholder: '' },
  { label: 'End Time',     name: 'endTime',     type: 'time',   placeholder: '' },
  { label: 'Attendees',    name: 'attendees',   type: 'number', placeholder: 'Number of attendees' },
];

function CreateBooking() {
  const [form, setForm]   = useState({ userId:'', resourceId:'', bookingDate:'', startTime:'', endTime:'', purpose:'', attendees:'' });
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAlert(null);
    setLoading(true);
    try {
      await createBooking({
        ...form,
        userId: Number(form.userId),
        resourceId: Number(form.resourceId),
        attendees: Number(form.attendees)
      });
      setAlert({ type: 'success', title: 'Booking Submitted', message: 'Your request is now pending admin approval.' });
      setForm({ userId:'', resourceId:'', bookingDate:'', startTime:'', endTime:'', purpose:'', attendees:'' });
    } catch (err) {
      const msg = err.response?.data?.error || '';
      const isConflict = msg.toLowerCase().includes('conflict') || msg.toLowerCase().includes('already exists');
      setAlert(isConflict
        ? { type: 'conflict', title: 'Scheduling Conflict Detected', message: 'This resource is already booked for the selected time slot.' }
        : { type: 'error', title: 'Booking Failed', message: msg || 'Something went wrong. Please try again.' }
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-bg min-h-screen py-10 px-6">
      <div className="max-w-2xl mx-auto">

        <div className="mb-7">
          <h2 className="text-3xl font-extrabold text-gray-800">Request a Booking</h2>
          <p className="text-gray-500 text-sm mt-1">Fill in the details below to submit a resource booking request</p>
        </div>

        {alert && (() => {
          const cfg = alertConfig[alert.type];
          return (
            <div className={`flex justify-between items-start border rounded-xl p-4 mb-6 gap-3 ${cfg.bg}`}>
              <div className="flex gap-3 items-start">
                <span className="text-xl mt-0.5">{cfg.icon}</span>
                <div>
                  <p className={`font-bold text-sm ${cfg.titleColor}`}>{alert.title}</p>
                  <p className={`text-sm mt-1 ${cfg.msgColor}`}>{alert.message}</p>
                  {alert.type === 'conflict' && (
                    <ul className={`text-xs mt-2 list-disc pl-4 leading-6 ${cfg.msgColor}`}>
                      <li>Try an earlier or later time slot</li>
                      <li>Choose a different date</li>
                      <li>Select a different resource</li>
                    </ul>
                  )}
                </div>
              </div>
              <button onClick={() => setAlert(null)} className="text-gray-400 hover:text-gray-600 text-lg leading-none">✕</button>
            </div>
          );
        })()}

        <div className="bg-white rounded-2xl shadow-md p-8">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-5 mb-5">
              {fields.map(({ label, name, type, placeholder }) => (
                <div key={name} className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-gray-600">{label}</label>
                  <input type={type} name={name} value={form[name]} onChange={handleChange}
                    placeholder={placeholder} required
                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-400" />
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-1 mb-6">
              <label className="text-xs font-semibold text-gray-600">Purpose</label>
              <textarea name="purpose" value={form.purpose} onChange={handleChange} required rows={3}
                placeholder="Describe the purpose of this booking..."
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-400 resize-y" />
            </div>
            <div className="flex justify-between items-center flex-wrap gap-4">
              <p className="text-xs text-gray-400">📌 Submitted bookings start as <strong>PENDING</strong> and require admin approval.</p>
              <button type="submit" disabled={loading}
                className="bg-blue-600 text-white font-bold px-7 py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-60 text-sm">
                {loading ? '⏳ Submitting...' : 'Submit Booking Request'}
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
}

export default CreateBooking;
