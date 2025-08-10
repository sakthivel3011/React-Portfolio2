import { FaArrowUp, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      <footer className="footer">
        <div className="container">
          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} Sakthivel S. All rights reserved.</p>
            <button className="scroll-top" onClick={scrollToTop}>
              <FaArrowUp />
            </button>
          </div>
        </div>

        {/* Floating back-to-top button for mobile */}
        <button className="floating-top-btn" onClick={scrollToTop}>
          <FaArrowUp />
        </button>
      </footer>
    </>
  );
};

export default Footer;