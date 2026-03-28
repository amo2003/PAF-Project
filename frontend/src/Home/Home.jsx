import { useNavigate } from 'react-router-dom'

const features = [
  { title: 'Book a Resource', desc: 'Request lecture halls, labs, meeting rooms or equipment.', icon: '📅', path: '/create-booking', bg: 'bg-blue-50' },
  { title: 'My Bookings',     desc: 'View all your booking requests and their approval status.', icon: '📋', path: '/my-bookings',     bg: 'bg-green-50' },
  { title: 'Admin Panel',     desc: 'Review, approve or reject pending booking requests.',       icon: '🛠️', path: '/admin/bookings', bg: 'bg-red-50' },
]

const steps = [
  { step: '01', title: 'Submit Request', desc: 'Fill in the resource, date, time range, purpose and attendees.' },
  { step: '02', title: 'Admin Reviews',  desc: 'An admin approves or rejects your request with a reason.' },
  { step: '03', title: 'Confirmed',      desc: 'You get an approved booking. Cancel anytime if plans change.' },
]

const stats = [
  { value: 'PENDING',   label: 'Awaiting Approval',  icon: '⏳' },
  { value: 'APPROVED',  label: 'Confirmed Bookings',  icon: '✅' },
  { value: 'REJECTED',  label: 'Declined Requests',   icon: '❌' },
  { value: 'CANCELLED', label: 'Cancelled Bookings',  icon: '🚫' },
]

function Home() {
  const navigate = useNavigate()
  return (
    <div className="bg-gray-50 min-h-screen font-sans">

      {/* Hero */}
      <div className="hero-bg text-white px-16 py-20 flex flex-wrap justify-between items-center gap-10">
        <div className="max-w-xl">
          <span className="bg-white/20 text-sm font-semibold px-4 py-1 rounded-full">Smart Campus Operations Hub</span>
          <h1 className="text-5xl font-extrabold leading-tight mt-5 mb-4">Manage Campus Resources<br />Smarter & Faster</h1>
          <p className="text-base text-blue-100 leading-relaxed mb-8">
            Book lecture halls, labs, meeting rooms and equipment in seconds. Track approvals and stay in control.
          </p>
          <div className="flex gap-4 flex-wrap">
            <button onClick={() => navigate('/create-booking')} className="bg-white text-blue-600 font-bold px-7 py-3 rounded-lg hover:bg-blue-50 transition">Book a Resource</button>
            <button onClick={() => navigate('/my-bookings')} className="border-2 border-white/70 text-white font-bold px-7 py-3 rounded-lg hover:bg-white/10 transition">View My Bookings</button>
          </div>
        </div>
        <div className="bg-white/15 backdrop-blur-md rounded-2xl px-14 py-12 text-center">
          <span className="text-7xl">🏛️</span>
          <p className="mt-4 text-sm font-semibold text-blue-100">University Resource Management</p>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-white shadow-sm px-16 py-8 flex flex-wrap justify-center gap-6">
        {stats.map(s => (
          <div key={s.value} className="flex flex-col items-center gap-1 bg-gray-50 rounded-xl px-8 py-4 min-w-[150px]">
            <span className="text-2xl">{s.icon}</span>
            <span className="text-blue-600 font-bold text-sm">{s.value}</span>
            <span className="text-gray-500 text-xs">{s.label}</span>
          </div>
        ))}
      </div>

      {/* Features */}
      <div className="px-16 py-16 text-center">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-2">What You Can Do</h2>
        <p className="text-gray-500 mb-12">Everything you need to manage campus facility bookings</p>
        <div className="flex flex-wrap justify-center gap-6">
          {features.map(f => (
            <div key={f.title} onClick={() => navigate(f.path)}
              className="bg-white rounded-2xl p-8 w-64 text-left shadow-md hover:shadow-lg hover:-translate-y-1 transition cursor-pointer">
              <div className={`w-12 h-12 ${f.bg} rounded-xl flex items-center justify-center text-2xl mb-4`}>{f.icon}</div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">{f.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed mb-4">{f.desc}</p>
              <span className="text-blue-600 text-sm font-semibold">Get started →</span>
            </div>
          ))}
        </div>
      </div>

      {/* How it works */}
      <div className="bg-white px-16 py-16 text-center">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-2">How It Works</h2>
        <p className="text-gray-500 mb-12">Simple 3-step booking process</p>
        <div className="flex flex-wrap justify-center gap-8">
          {steps.map(s => (
            <div key={s.step} className="max-w-xs text-center px-6">
              <div className="w-14 h-14 bg-blue-600 text-white text-xl font-extrabold rounded-full flex items-center justify-center mx-auto mb-4">{s.step}</div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">{s.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="cta-bg text-white text-center px-16 py-20">
        <h2 className="text-3xl font-extrabold mb-3">Ready to book a resource?</h2>
        <p className="text-blue-100 mb-8">Submit your request now and get it approved quickly.</p>
        <button onClick={() => navigate('/create-booking')} className="bg-white text-blue-600 font-bold px-10 py-4 rounded-lg hover:bg-blue-50 transition text-base">Make a Booking</button>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 text-center py-5 text-sm">
        © 2026 Smart Campus Operations Hub — SLIIT Faculty of Computing
      </footer>
    </div>
  )
}

export default Home
