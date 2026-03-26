import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <div style={styles.page}>

      {/* Hero Section */}
      <div style={styles.hero}>
        <div style={styles.heroContent}>
          <span style={styles.badge}>Smart Campus Operations Hub</span>
          <h1 style={styles.heroTitle}>Manage Campus Resources<br />Smarter & Faster</h1>
          <p style={styles.heroSub}>
            Book lecture halls, labs, meeting rooms and equipment in seconds.
            Track approvals, manage schedules, and stay in control — all in one place.
          </p>
          <div style={styles.heroButtons}>
            <button style={styles.btnPrimary} onClick={() => navigate('/create-booking')}>
              Book a Resource
            </button>
            <button style={styles.btnOutline} onClick={() => navigate('/my-bookings')}>
              View My Bookings
            </button>
          </div>
        </div>
        <div style={styles.heroIllustration}>
          <div style={styles.illustrationBox}>
            <span style={styles.illustrationIcon}>🏛️</span>
            <p style={styles.illustrationText}>University Resource Management</p>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div style={styles.statsBar}>
        {[
          { value: 'PENDING', label: 'Awaiting Approval', icon: '⏳' },
          { value: 'APPROVED', label: 'Confirmed Bookings', icon: '✅' },
          { value: 'REJECTED', label: 'Declined Requests', icon: '❌' },
          { value: 'CANCELLED', label: 'Cancelled Bookings', icon: '🚫' },
        ].map((s) => (
          <div key={s.value} style={styles.statCard}>
            <span style={styles.statIcon}>{s.icon}</span>
            <span style={styles.statValue}>{s.value}</span>
            <span style={styles.statLabel}>{s.label}</span>
          </div>
        ))}
      </div>

      {/* Feature Cards */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>What You Can Do</h2>
        <p style={styles.sectionSub}>Everything you need to manage campus facility bookings</p>
        <div style={styles.cardGrid}>
          {features.map((f) => (
            <div key={f.title} style={styles.featureCard} onClick={() => navigate(f.path)}>
              <div style={{ ...styles.featureIcon, backgroundColor: f.color }}>
                {f.icon}
              </div>
              <h3 style={styles.featureTitle}>{f.title}</h3>
              <p style={styles.featureDesc}>{f.desc}</p>
              <span style={styles.featureLink}>Get started →</span>
            </div>
          ))}
        </div>
      </div>

      {/* How It Works */}
      <div style={styles.howSection}>
        <h2 style={styles.sectionTitle}>How It Works</h2>
        <p style={styles.sectionSub}>Simple 3-step booking process</p>
        <div style={styles.steps}>
          {[
            { step: '01', title: 'Submit Request', desc: 'Fill in the resource, date, time range, purpose and attendees.' },
            { step: '02', title: 'Admin Reviews', desc: 'An admin approves or rejects your request with a reason.' },
            { step: '03', title: 'Confirmed', desc: 'You get an approved booking. Cancel anytime if plans change.' },
          ].map((s) => (
            <div key={s.step} style={styles.stepCard}>
              <div style={styles.stepNumber}>{s.step}</div>
              <h3 style={styles.stepTitle}>{s.title}</h3>
              <p style={styles.stepDesc}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Banner */}
      <div style={styles.cta}>
        <h2 style={styles.ctaTitle}>Ready to book a resource?</h2>
        <p style={styles.ctaSub}>Submit your request now and get it approved quickly.</p>
        <button style={styles.ctaBtn} onClick={() => navigate('/create-booking')}>
          Make a Booking
        </button>
      </div>

      {/* Footer */}
      <footer style={styles.footer}>
        <p>© 2026 Smart Campus Operations Hub — SLIIT Faculty of Computing</p>
      </footer>

    </div>
  );
}

const features = [
  {
    title: 'Book a Resource',
    desc: 'Request lecture halls, labs, meeting rooms or equipment for your session.',
    icon: '📅',
    color: '#e8f0fe',
    path: '/create-booking',
  },
  {
    title: 'My Bookings',
    desc: 'View all your booking requests and their current approval status.',
    icon: '📋',
    color: '#e6f4ea',
    path: '/my-bookings',
  },
  {
    title: 'Admin Panel',
    desc: 'Review, approve or reject pending booking requests with reasons.',
    icon: '🛠️',
    color: '#fce8e6',
    path: '/admin/bookings',
  },
];

const styles = {
  page: { fontFamily: "'Segoe UI', sans-serif", color: '#333', backgroundColor: '#f5f7fa' },

  // Hero
  hero: { display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: '80px 80px 60px', background: 'linear-gradient(135deg, #1a73e8 0%, #0d47a1 100%)',
    color: '#fff', flexWrap: 'wrap', gap: '40px' },
  heroContent: { maxWidth: '560px' },
  badge: { backgroundColor: 'rgba(255,255,255,0.2)', padding: '6px 14px',
    borderRadius: '20px', fontSize: '13px', fontWeight: '600', letterSpacing: '0.5px' },
  heroTitle: { fontSize: '42px', fontWeight: '800', lineHeight: '1.2',
    margin: '20px 0 16px' },
  heroSub: { fontSize: '16px', lineHeight: '1.7', opacity: '0.9', marginBottom: '32px' },
  heroButtons: { display: 'flex', gap: '16px', flexWrap: 'wrap' },
  btnPrimary: { padding: '14px 28px', backgroundColor: '#fff', color: '#1a73e8',
    border: 'none', borderRadius: '8px', fontWeight: '700', fontSize: '15px', cursor: 'pointer' },
  btnOutline: { padding: '14px 28px', backgroundColor: 'transparent', color: '#fff',
    border: '2px solid rgba(255,255,255,0.7)', borderRadius: '8px', fontWeight: '700',
    fontSize: '15px', cursor: 'pointer' },
  heroIllustration: { display: 'flex', justifyContent: 'center' },
  illustrationBox: { backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: '20px',
    padding: '48px 56px', textAlign: 'center', backdropFilter: 'blur(10px)' },
  illustrationIcon: { fontSize: '80px' },
  illustrationText: { marginTop: '16px', fontSize: '14px', opacity: '0.9', fontWeight: '600' },

  // Stats
  statsBar: { display: 'flex', justifyContent: 'center', gap: '24px', flexWrap: 'wrap',
    padding: '32px 80px', backgroundColor: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' },
  statCard: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px',
    padding: '16px 32px', borderRadius: '12px', backgroundColor: '#f8f9fa', minWidth: '160px' },
  statIcon: { fontSize: '24px' },
  statValue: { fontSize: '15px', fontWeight: '700', color: '#1a73e8' },
  statLabel: { fontSize: '12px', color: '#666' },

  // Features
  section: { padding: '72px 80px', textAlign: 'center' },
  sectionTitle: { fontSize: '32px', fontWeight: '800', marginBottom: '10px' },
  sectionSub: { fontSize: '16px', color: '#666', marginBottom: '48px' },
  cardGrid: { display: 'flex', gap: '24px', justifyContent: 'center', flexWrap: 'wrap' },
  featureCard: { backgroundColor: '#fff', borderRadius: '16px', padding: '32px 28px',
    width: '260px', textAlign: 'left', boxShadow: '0 4px 16px rgba(0,0,0,0.07)',
    cursor: 'pointer', transition: 'transform 0.2s', },
  featureIcon: { width: '52px', height: '52px', borderRadius: '14px', display: 'flex',
    alignItems: 'center', justifyContent: 'center', fontSize: '26px', marginBottom: '16px' },
  featureTitle: { fontSize: '18px', fontWeight: '700', marginBottom: '10px' },
  featureDesc: { fontSize: '14px', color: '#666', lineHeight: '1.6', marginBottom: '16px' },
  featureLink: { fontSize: '14px', color: '#1a73e8', fontWeight: '600' },

  // How it works
  howSection: { padding: '72px 80px', backgroundColor: '#fff', textAlign: 'center' },
  steps: { display: 'flex', gap: '32px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '8px' },
  stepCard: { maxWidth: '260px', textAlign: 'center', padding: '24px' },
  stepNumber: { width: '56px', height: '56px', borderRadius: '50%',
    backgroundColor: '#1a73e8', color: '#fff', fontSize: '20px', fontWeight: '800',
    display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' },
  stepTitle: { fontSize: '18px', fontWeight: '700', marginBottom: '10px' },
  stepDesc: { fontSize: '14px', color: '#666', lineHeight: '1.6' },

  // CTA
  cta: { background: 'linear-gradient(135deg, #0d47a1, #1a73e8)', color: '#fff',
    textAlign: 'center', padding: '72px 80px' },
  ctaTitle: { fontSize: '32px', fontWeight: '800', marginBottom: '12px' },
  ctaSub: { fontSize: '16px', opacity: '0.9', marginBottom: '32px' },
  ctaBtn: { padding: '16px 40px', backgroundColor: '#fff', color: '#1a73e8',
    border: 'none', borderRadius: '8px', fontWeight: '700', fontSize: '16px', cursor: 'pointer' },

  // Footer
  footer: { textAlign: 'center', padding: '24px', backgroundColor: '#1a1a2e',
    color: '#aaa', fontSize: '13px' },
};

export default Home;
