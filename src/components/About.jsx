import { motion } from 'framer-motion';
import { FiCode, FiCpu, FiMail, FiMapPin, FiUser } from 'react-icons/fi';
import { useEffect, useRef, useState } from "react";

const About = () => {
  // Helper for animated count

  // AnimatedCounter component
  const AnimatedCounter = ({ from = 0, to = 100, duration = 1000 }) => {
    const [count, setCount] = useState(from);
    const raf = useRef();

    useEffect(() => {
      let start = null;
      const step = (timestamp) => {
        if (!start) start = timestamp;
        const progress = Math.min((timestamp - start) / duration, 1);
        setCount(Math.floor(progress * (to - from) + from));
        if (progress < 1) {
          raf.current = requestAnimationFrame(step);
        } else {
          setCount(to);
        }
      };
      raf.current = requestAnimationFrame(step);
      return () => cancelAnimationFrame(raf.current);
    }, [from, to, duration]);

    return <span>{count}</span>;
  };

  return (
    <section id="about" className="about-section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="section-header"
        >
          <h2 className="section-title">
            <span className="gradient-text">About</span> Me
          </h2>
          <p className="section-subtitle">Let me introduce myself</p>
        </motion.div>

        <div className="about-content">
          {/* Introduction */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="intro-card"
          >
            <div className="intro-text">
              <h3>SAKTHIVEL S</h3>
              <p className="role">Full Stack Developer & AI/Data Science Student</p>
              <p className="description">
                I am pursuing a B.Tech in AI & Data Science at Kongu Engineering College (2023–2027), Tamil Nadu. I enjoy building clean, functional websites using both frontend and backend technologies. Since 2024, I’ve been working as a freelance developer, creating custom web applications with a focus on UI/UX and database design. I’m also passionate about graphic design and have completed 20+ projects for various companies.
              </p>
            </div>
          </motion.div>

          {/* Personal Info */}
                <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="info-grid"
                >
                <div className="info-item">
                  <div className="info-icon">
                  <FiUser />
                  </div>
                  <div className="info-content">
                  <h4>Name</h4>
                  <p>SAKTHIVEL S</p>
                  </div>
                </div>

                <div className="info-item">
                  <div className="info-icon">
                  <FiMail />
                  </div>
                  <div className="info-content">
                  <h4>Email</h4>
                  <p>
                    <a
                    href="mailto:sakthii3011@gmail.com"
                    style={{ color: "inherit", textDecoration: "none" }}
                    >
                    sakthii3011@gmail.com
                    </a>
                  </p>
                  </div>
                </div>

                <div className="info-item">
                  <div className="info-icon">
                  <FiMapPin />
                  </div>
                  <div className="info-content">
                  <h4>Location</h4>
                  <p>Tirupur, TamilNadu</p>
                  </div>
                </div>

                <div className="info-item">
                  <div className="info-icon">
                  {/* Use FiUser as age icon, or you can use another icon like FiCalendar */}
                  <FiUser />
                  </div>
                  <div className="info-content">
                  <h4>Age</h4>
                  <p>20</p>
                  </div>
                </div>
                </motion.div>

                {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="stats-container"
          >
            <div className="stat-item">
              <div className="stat-icon">
                <FiCode />
              </div>
              <div className="stat-number">
                <AnimatedCounter from={0} to={5} duration={700} />+
              </div>
              <div className="stat-title">Projects</div>
            </div>

            <div className="stat-item">
              <div className="stat-icon">
                <FiCode />
              </div>
              <div className="stat-number">
                <AnimatedCounter from={0} to={1000} duration={900} />+
              </div>
              <div className="stat-title">Hours Coding</div>
            </div>

            <div className="stat-item">
              <div className="stat-icon">
                <FiCode />
              </div>
              <div className="stat-number">
                <AnimatedCounter from={0} to={10} duration={600} />+
              </div>
              <div className="stat-title">Technologies</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;