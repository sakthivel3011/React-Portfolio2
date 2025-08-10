import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCertificate, FaCalendarAlt, FaTimes } from 'react-icons/fa';
import certificate1 from '../assets/certificate1.jpg';  
import certificate2 from '../assets/certificate2.png';  
import certificate3 from '../assets/certificate3.png';  
const Certificates = () => {
  const [selectedCert, setSelectedCert] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const certificates = [
    {
      title: 'MongoDB Associate Developer',
      issuer: 'MongoDB, Inc.',
      date: 'June 2025',
      image: certificate1,
      description: 'Certified in MongoDB database design, implementation, and optimization.'
    },
    {
      title: 'Oracle APEX Cloud Developer',
      issuer: 'Oracle University',
      date: 'May 2025',
      image: certificate2,
      description: 'Certified in developing cloud applications using Oracle APEX platform.'
    },
    {
      title: 'Google Cloud Computing ',
      issuer: 'NPTEL',
      date: 'August 2024',
      image: certificate3,
      description: 'Fundamentals of cloud computing and Google Cloud Platform services.'
    },
  ];

  const openModal = (cert) => {
    setSelectedCert(cert);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  return (
    <section id="certificates" className="certificates-section">
      <div className="certificates-container">
        <motion.h2 
          className="certificates-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          My Certifications
        </motion.h2>
        
        <div className="certificates-grid">
          {certificates.map((cert, index) => (
            <motion.div 
              key={index}
              className="certificate-card"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              onClick={() => openModal(cert)}
            >
              <div className="certificate-info">
                <h3>{cert.title}</h3>
                <p className="issuer">
                  <FaCertificate style={{ fontSize: '0.9rem' }} /> {cert.issuer}
                </p>
                <p className="date">
                  <FaCalendarAlt style={{ fontSize: '0.8rem' }} /> {cert.date}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Modal */}
        <div className={`modal-overlay ${isModalOpen ? 'active' : ''}`} onClick={closeModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>
              <FaTimes />
            </button>
            {selectedCert && (
              <>
                <h3>{selectedCert.title}</h3>
                <p className="issuer">
                  <FaCertificate style={{ marginRight: '8px' }} />
                  {selectedCert.issuer}
                </p>
                <p className="date">
                  <FaCalendarAlt style={{ marginRight: '8px' }} />
                  {selectedCert.date}
                </p>
                <img 
                  src={selectedCert.image} 
                  alt={selectedCert.title} 
                  className="modal-image"
                />
                <p>{selectedCert.description}</p>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certificates;