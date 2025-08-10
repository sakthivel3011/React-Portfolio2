import { motion } from 'framer-motion';
import { 
  FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, 
  FaPython, FaJava, FaAws, FaDocker, FaBootstrap,
  FaFire, FaDatabase
} from 'react-icons/fa';
import { SiCplusplus, SiC, SiMongodb } from 'react-icons/si';

const Skills = () => {
  const techSkills = [
    { name: 'React', icon: <FaReact />, color: '#61DAFB' },
    { name: 'HTML5', icon: <FaHtml5 />, color: '#E34F26' },
    { name: 'CSS3', icon: <FaCss3Alt />, color: '#1572B6' },
    { name: 'JavaScript', icon: <FaJs />, color: '#F7DF1E' },
    { name: 'Bootstrap', icon: <FaBootstrap />, color: '#7952B3' },
    { name: 'Java', icon: <FaJava />, color: '#007396' },
    { name: 'Python', icon: <FaPython />, color: '#3776AB' },
    { name: 'C', icon: <SiC />, color: '#8593a2ff' },
    { name: 'MongoDB', icon: <SiMongodb />, color: '#47A248' },
    { name: 'Node.js', icon: <FaNodeJs />, color: '#339933' },
    { name: 'Firebase', icon: <FaFire />, color: '#FFCA28' },
    { name: 'Docker', icon: <FaDocker />, color: '#2496ED' },
    
  ];

  const softSkills = [
    'Problem Solving', 'Teamwork', 'Communication',
    'Creativity', 'Time Management', 'Adaptability',
    , 'Continuous Learning'
  ];

  return (
    <section id="skills" className="skills-section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="section-header"
        >
          <h2 className="section-title">
            <span className="gradient-text">What I'm</span> Good At
          </h2>
          <p className="section-subtitle">My Skills</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="skills-container"
        >
          <div className="skills-grid">
            {techSkills.map((skill, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="skill-card"
              >
                <div 
                  className="skill-icon"
                  style={{ color: skill.color }}
                >
                  {skill.icon}
                </div>
                <span className="skill-name">{skill.name}</span>
                <div 
                  className="skill-bg" 
                  style={{ backgroundColor: `${skill.color}10` }}
                ></div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="soft-skills-container"
        >
          <h3 className="skills-subtitle">Soft Skills</h3>
          <div className="soft-skills-grid">
            {softSkills.map((skill, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="soft-skill-item"
              >
                {skill}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;