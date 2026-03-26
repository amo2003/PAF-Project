import { useState } from 'react';
import { createBooking } from '../api/bookingApi';

function CreateBooking() {
  const [form, setForm] = useState({
    userId: '', resourceId: '', bookingDate: '',
    startTime: '', endTime: '', purpose: '', attendees: ''
  });
  const [alert, setAlert] = useState(null); // { type: 'success' | 'conflict' | 'error', message }
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
  const [form, setForm] = useState({ userId:'', resourceId:'', bookingDate:'', startTime:'', endTime:'', purpose:'', attendees:'' });
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
      setAlert({
        type: 'success',
        title: 'Booking Submitted',
        message: 'Your booking request has been submitted successfully. It is now pending admin approval.'
      });
    setAlert(null); setLoading(true);
    try {
      await createBooking({ ...form, userId: Number(form.userId), resourceId: Number(form.resourceId), attendees: Number(form.attendees) });
      setAlert({ type: 'success', title: 'Booking Submitted', message: 'Your request is now pending admin approval.' });
      setForm({ userId:'', resourceId:'', bookingDate:'', startTime:'', endTime:'', purpose:'', attendees:'' });
    } catch (err) {
      const msg = err.response?.data?.error || '';
      const isConflict = msg.toLowerCase().includes('conflict') || msg.toLowerCase().includes('already exists');
      if (isConflict) {
        setAlert({
          type: 'conflict',
          title: 'Scheduling Conflict Detected',
          message: `This resource is already booked for the selected time slot. Please choose a different time or date.`
        });
      } else {
        setAlert({
          type: 'error',
          title: 'Booking Failed',
          message: msg || 'Something went wrong. Please check your details and try again.'
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const alertConfig = {
    success: {
      bg: '#f0fdf4', border: '#86efac', icon: '✅',
      titleColor: '#15803d', textColor: '#166534'
    },
    conflict: {
      bg: '#fff7ed', border: '#fdba74', icon: '⚠️',
      titleColor: '#c2410c', textColor: '#9a3412'
    },
    error: {
      bg: '#fef2f2', border: '#fca5a5', icon: '❌',
      titleColor: '#dc2626', textColor: '#991b1b'
    }
  };

  const fields = [
    { label: 'User ID',      name: 'userId',      type: 'number', placeholder: 'Enter your user ID' },
    { label: 'Resource ID',  name: 'resourceId',  type: 'number', placeholder: 'Enter resource ID' },
    { label: 'Booking Date', name: 'bookingDate', type: 'date',   placeholder: '' },
    { label: 'Start Time',   name: 'startTime',   type: 'time',   placeholder: '' },
    { label: 'End Time',     name: 'endTime',     type: 'time',   placeholder: '' },
    { label: 'Attendees',    name: 'attendees',   type: 'number', placeholder: 'Number of attendees' },
  ];

  return (
    <div style={styles.page}>
      <div style={styles.container}>

        {/* Page Header */}
        <div style={styles.pageHeader}>
          <h2 style={styles.pageTitle}>Request a Booking</h2>
          <p style={styles.pageSubtitle}>Fill in the details below to submit a resource booking request</p>
        </div>

        {/* Alert Banner */}
        {alert && (() => {
          const cfg = alertConfig[alert.type];
          return (
            <div style={{ ...styles.alertBox, backgroundColor: cfg.bg, borderColor: cfg.border }}>
              <div style={styles.alertLeft}>
                <span style={styles.alertIcon}>{cfg.icon}</span>
                <div>
                  <p style={{ ...styles.alertTitle, color: cfg.titleColor }}>{alert.title}</p>
                  <p style={{ ...styles.alertMessage, color: cfg.textColor }}>{alert.message}</p>
                  {alert.type === 'conflict' && (
                    <div style={styles.conflictTips}>
                      <p style={{ ...styles.tipTitle, color: cfg.titleColor }}>Suggestions:</p>
                      <ul style={{ ...styles.tipList, color: cfg.textColor }}>
                        <li>Try an earlier or later time slot</li>
                        <li>Choose a different date</li>
                        <li>Select a different resource</li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
              <button onClick={() => setAlert(null)} style={styles.alertClose}>✕</button>
      setAlert(isConflict
        ? { type: 'conflict', title: 'Scheduling Conflict Detected', message: 'This resource is already booked for the selected time slot.' }
        : { type: 'error',    title: 'Booking Failed', message: msg || 'Something went wrong. Please try again.' }
      );
    } finally { setLoading(false); }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-10 px-6">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="mb-7">
          <h2 className="text-3xl font-extrabold text-gray-800">Request a Booking</h2>
          <p className="text-gray-500 text-sm mt-1">Fill in the details below to submit a resource booking request</p>
        </div>

        {/* Alert */}
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

        {/* Form Card */}
        <div style={styles.card}>
          <form onSubmit={handleSubmit}>
            <div style={styles.grid}>
              {fields.map(({ label, name, type, placeholder }) => (
                <div key={name} style={styles.field}>
                  <label style={styles.label}>{label}</label>
                  <input
                    type={type}
                    name={name}
                    value={form[name]}
                    onChange={handleChange}
                    placeholder={placeholder}
                    required
                    style={styles.input}
                  />
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

            <div style={styles.field}>
              <label style={styles.label}>Purpose</label>
              <textarea
                name="purpose"
                value={form.purpose}
                onChange={handleChange}
                required
                rows={3}
                placeholder="Describe the purpose of this booking..."
                style={{ ...styles.input, resize: 'vertical' }}
              />
            </div>

            <div style={styles.formFooter}>
              <p style={styles.note}>
                📌 Submitted bookings start as <strong>PENDING</strong> and require admin approval.
              </p>
              <button type="submit" style={styles.submitBtn} disabled={loading}>
                {loading ? (
                  <span>⏳ Submitting...</span>
                ) : (
                  <span>Submit Booking Request</span>
                )}
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

const styles = {
  page: { backgroundColor: '#f5f7fa', minHeight: '100vh', padding: '40px 24px' },
  container: { maxWidth: '680px', margin: '0 auto' },

  pageHeader: { marginBottom: '28px' },
  pageTitle: { fontSize: '28px', fontWeight: '800', color: '#1a1a2e', marginBottom: '6px' },
  pageSubtitle: { fontSize: '14px', color: '#666' },

  // Alert
  alertBox: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
    border: '1px solid', borderRadius: '12px', padding: '16px 20px',
    marginBottom: '24px', gap: '12px' },
  alertLeft: { display: 'flex', gap: '14px', alignItems: 'flex-start' },
  alertIcon: { fontSize: '22px', marginTop: '2px' },
  alertTitle: { fontWeight: '700', fontSize: '15px', marginBottom: '4px' },
  alertMessage: { fontSize: '14px', lineHeight: '1.5' },
  alertClose: { background: 'none', border: 'none', fontSize: '16px',
    cursor: 'pointer', color: '#999', padding: '0 4px', flexShrink: 0 },
  conflictTips: { marginTop: '10px' },
  tipTitle: { fontSize: '13px', fontWeight: '700', marginBottom: '4px' },
  tipList: { fontSize: '13px', paddingLeft: '18px', lineHeight: '1.8', margin: 0 },

  // Form
  card: { backgroundColor: '#fff', borderRadius: '16px', padding: '32px',
    boxShadow: '0 4px 16px rgba(0,0,0,0.07)' },
  grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' },
  field: { display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '4px' },
  label: { fontSize: '13px', fontWeight: '600', color: '#444' },
  input: { padding: '10px 14px', borderRadius: '8px', border: '1px solid #ddd',
    fontSize: '14px', outline: 'none', width: '100%', boxSizing: 'border-box',
    fontFamily: 'inherit' },

  formFooter: { display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    marginTop: '24px', flexWrap: 'wrap', gap: '16px' },
  note: { fontSize: '13px', color: '#888', flex: 1 },
  submitBtn: { padding: '12px 28px', backgroundColor: '#1a73e8', color: '#fff',
    border: 'none', borderRadius: '8px', fontWeight: '700', fontSize: '15px',
    cursor: 'pointer', whiteSpace: 'nowrap' },
};

export default CreateBooking;
