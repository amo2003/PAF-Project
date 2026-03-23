import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav style={styles.nav}>
      <span style={styles.brand}>Smart Campus</span>
      <div style={styles.links}>
        <Link to="/create-booking" style={styles.link}>New Booking</Link>
        <Link to="/my-bookings" style={styles.link}>My Bookings</Link>
        <Link to="/admin/bookings" style={styles.link}>Admin Panel</Link>
        <Link to="/admin/resources" style={styles.link}>Resources</Link>
      </div>
    </nav>
  );
}

const styles = {
  nav: { display:'flex', justifyContent:'space-between', alignItems:'center',
         padding:'12px 24px', backgroundColor:'#1a73e8', color:'#fff' },
  brand: { fontWeight:'bold', fontSize:'18px' },
  links: { display:'flex', gap:'20px' },
  link: { color:'#fff', textDecoration:'none', fontSize:'14px' }
};

export default Navbar;
