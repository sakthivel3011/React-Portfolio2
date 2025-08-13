import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiExternalLink, FiGithub } from 'react-icons/fi';
import sakthiImg from '../assets/Project1.png';
import sakthi2Img from '../assets/Project2.png';
import sakthi3Img from '../assets/Project3.png';
import sakthi4Img from '../assets/Project4.png';
import sakthi5Img from '../assets/Project5.png';
import sakthi6Img from '../assets/project6.png';
const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  
  const projects = [
    {
      id: 1,
      title: 'E-COMMERCE-FOR-RICE',
      description: 'Full-featured online store with product catalog, shopping cart, and secure checkout system.',
      tags: ['Html', 'css', 'JavaScript', 'Bootstrap' , 'Node.js', 'MongoDB'],
      image: sakthiImg,
      link: 'https://rice-web-html.vercel.app/',
      github: 'https://github.com/sakthivel3011/RICE-WEBSITE-HTML'
    },
    {
      id: 2,
      title: 'Energy & Environment Conservation Club',
      description: 'Official website showcasing our mission, events, and sustainability initiatives on campus.',
      tags: ['Html', 'css', 'JavaScript', 'Bootstrap'],
      image: sakthi2Img,
      link: 'https://eecc.kongu.edu/',
      github: 'https://github.com/sakthivel3011/EEC-CLUB'
    },
    {
      id: 3,
      title: 'SRI ANNAKAMATCHI TRADERS',
      description: 'Built a responsive e-commerce website with secure checkout and easy navigation.Focused on a smooth.',
      tags: ['Html', 'css', 'JavaScript', 'Bootstrap', 'Node.js', 'MongoDB'],
      image: sakthi3Img,
      link: 'https://adv-rice-live.vercel.app/',
      github: 'https://github.com/sakthivel3011/ADV-RICE-LIVE'
    },
    {
      id: 4,
      title: 'PORTFOLIO',
      description: 'Created a basic personal portfolio with backend integration and contact form mail functionality.',
      tags: [ 'Html', 'css', 'JavaScript', 'Bootstrap', 'Appscript','Firebase'],
      image: sakthi4Img,
      link: 'https://sakthi-html.vercel.app/',
      github: 'https://github.com/sakthivel3011/HTML-PORTFOLIO'
    },
    {
      id: 5,
      title: 'SMART DATA COLLECTION',
      description: 'Ongoing project focused on smart data collection using AI for efficient and intelligent insights.',
      tags: ['React', 'Tailwind CSS', 'Node.js','MongoDB'],
      image: sakthi5Img,
      link: '#',
      github: '#'
    },
    {
      id: 6,
      title: 'SMARTSEND',
      description: 'AI-powered email delivery system with smart personalization and optimized send times.',
      tags: ['React', 'Tailwind CSS', 'Node.js', 'MongoDB' ,'firebase'],
      image: sakthi6Img,
      link: '#',
      github: '#'
    }
  ];

  const filters = [];
  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  const cardVariants = {
    offscreen: {
      y: 50,
      opacity: 0
    },
    onscreen: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 0.8
      }
    }
  };

  const hoverVariants = {
    hover: {
      y: -15,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  return (
    <section id="projects" className="projects-section">
      <div className="projects-container">
        <motion.h2 
          className="projects-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          My Projects
        </motion.h2>
        
        <motion.div 
          className="project-filters"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          {filters.map((filter) => (
            <motion.button
              key={filter}
              className={`filter-btn ${activeFilter === filter ? 'active' : ''}`}
              onClick={() => setActiveFilter(filter)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {filter}
            </motion.button>
          ))}
        </motion.div>
        
        <div className="projects-grid">
          {filteredProjects.map((project) => (
            <motion.div 
              key={project.id}
              className="project-card"
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, margin: "-50px" }}
              whileHover="hover"
              variants={cardVariants}
            >
              <motion.div variants={hoverVariants}>
                <div className="project-image">
                  <img src={project.image} alt={project.title} loading="lazy" />
                  <div className="project-overlay">
                    <h4>{project.title}</h4>
                    <div className="project-btn-group">
                      <a href={project.link} className="project-btn">
                        <FiExternalLink /> Live Demo
                      </a>
                      <a href={project.github} className="project-btn github">
                        <FiGithub /> Code
                      </a>
                    </div>
                  </div>
                </div>
                <div className="project-info">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="project-tags">
                    {project.tags.map((tag) => (
                      <span key={tag} className="project-tag">{tag}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;