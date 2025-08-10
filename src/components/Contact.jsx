import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaLinkedin, 
  FaGithub, 
  FaTwitter, 
  FaInstagram, 
  FaEnvelope, 
  FaPhone, 
  FaMapMarkerAlt,
  FaPaperPlane,
  FaCheck,
  FaTimes,
  FaGlobe,
  FaUserAlt
} from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState({
    show: false,
    success: true,
    title: '',
    message: ''
  });

  // Replace with your Google Apps Script Web App URL
  const scriptUrl = 'https://script.google.com/macros/s/AKfycbxFnm0m4loBobvkvWVgbg9nQD-oUjpnvr1YjodgFB2XIFsIP0du924O3cIj0pFSQLlVOg/exec';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(scriptUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      showNotification(
        'Message Sent!',
        'Thank you for reaching out. I will get back to you soon.',
        true
      );
      
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error:', error);
      showNotification(
        'Error Sending Message',
        'Please try again later or contact me directly via email.',
        false
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const showNotification = (title, message, success) => {
    setNotification({
      show: true,
      success,
      title,
      message
    });

    setTimeout(() => {
      setNotification(prev => ({ ...prev, show: false }));
    }, 5000);
  };

  const closeNotification = () => {
    setNotification(prev => ({ ...prev, show: false }));
  };

  const socialLinks = [
    { icon: <FaLinkedin />, name: 'linkedin', url: 'https://www.linkedin.com/in/sakthivel-s-87a213362/' },
    { icon: <FaGithub />, name: 'github', url: 'https://github.com/sakthivel3011' },
    { icon: <FaTwitter />, name: 'twitter', url: 'https://x.com/sakthix11?t=lXSz0FPxgx0TcqvrhLk1hg&s=09' },
    { icon: <FaInstagram />, name: 'instagram', url: 'https://www.instagram.com/sakthiix/?igsh=MXEwNXV3cXduZmluMQ%3D%3D#' },
  ];

  const contactDetails = [
    { icon: <FaEnvelope />, title: 'Email', content: 'sakthii3011@gmail.com', link: 'mailto:sakthii3011@gmail.com' },
    { icon: <FaPhone />, title: 'Phone', content: '+91 8925490989', link: 'tel:+918925490989' },
    { icon: <FaMapMarkerAlt />, title: 'Location', content: 'Tirupur TamilNadu, India', link: 'https://maps.google.com?q=Tirupur+TamilNadu+India' },

  ];

  return (
    <section id="contact" className="contact-section">
      <div className="contact-container">
        <div className="contact-header">
          <motion.h2 
            className="contact-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Get In Touch
          </motion.h2>
          <motion.p 
            className="contact-subtitle"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Have a project idea or want to explore potential opportunities
            Feel free to reach out. I’d be happy to connect and discuss!
            
          </motion.p>
        </div>
        
        <div className="contact-grid">
          {/* Left Panel - Contact Info */}
          <motion.div 
            className="contact-info-panel"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="connect-header">
              <h3 className="connect-title">Contact Information</h3>
              <p className="connect-description">
                Reach out through any of these channels and I'll respond as soon as possible.
              </p>
            </div>
            
            <div className="contact-details">
              {contactDetails.map((detail, index) => (
                <motion.div 
                  className="detail-card"
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="detail-icon">
                    {detail.icon}
                  </div>
                  <div className="detail-content">
                    <div className="detail-title">{detail.title}</div>
                    {detail.link ? (
                      <a href={detail.link} className="detail-value">
                        {detail.content}
                      </a>
                    ) : (
                      <div className="detail-value">{detail.content}</div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="social-section">
              <div className="social-title">Connect With Me</div>
              <div className="social-links">
                {socialLinks.map((link, index) => (
                  <motion.a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`social-link ${link.name}`}
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {link.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
          
          {/* Right Panel - Contact Form */}
          <motion.form 
            className="contact-form-panel"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
          >
            <h3 className="form-title">Send Me a Message</h3>
            
            <div className="form-group">
              <label htmlFor="name" className="form-label">Your Name</label>
              <div className="input-with-icon">
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Sakthi"
                  required
                />
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-control"
                placeholder="your@email.com"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="message" className="form-label">Your Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="form-control"
                placeholder="Hello, I'd like to talk about..."
                required
              />
            </div>
            
            <motion.button 
              type="submit" 
              className="submit-btn"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isSubmitting ? (
                'Sending...'
              ) : (
                <>
                  <FaPaperPlane /> Send Message
                </>
              )}
            </motion.button>
          </motion.form>
        </div>
      </div>
      
      {/* Decorative Dots */}
      <div className="contact-dots dots-1"></div>
      <div className="contact-dots dots-2"></div>
      
      {/* Notification */}
      <motion.div 
        className={`notification ${notification.success ? 'success' : 'error'} ${notification.show ? 'active' : ''}`}
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: notification.show ? 1 : 0, y: notification.show ? 0 : 100 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      >
        <div className="notification-icon">
          {notification.success ? <FaCheck /> : <FaTimes />}
        </div>
        <div className="notification-content">
          <h4>{notification.title}</h4>
          <p>{notification.message}</p>
        </div>
        <div className="close-notification" onClick={closeNotification}>
          <FaTimes />
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;