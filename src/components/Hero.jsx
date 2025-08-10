import { useEffect } from 'react'
import { TypeAnimation } from 'react-type-animation'
import sakthiImg from '../assets/sakthi.jpg';

const Hero = () => {
  useEffect(() => {
    const particles = () => {
      const count = 30
      const section = document.querySelector('.hero')
      
      for (let i = 0; i < count; i++) {
        const particle = document.createElement('div')
        particle.classList.add('particle')
        
        particle.style.left = `${Math.random() * 100}%`
        particle.style.top = `${Math.random() * 100}%`
        particle.style.width = `${Math.random() * 5 + 2}px`
        particle.style.height = particle.style.width
        particle.style.animationDelay = `${Math.random() * 5}s`
        
        section.appendChild(particle)
      }
    }
    
    particles()
  }, [])

  return (
    <section id="hero" className="hero">
      <div className="container">
        <div className="hero-content fade-in">
          <h4 className="greeting">Hello, I'm</h4>
          <h1 className="name">SAKTHIVEL S</h1>
          <div className="type-animation">
            <TypeAnimation
              sequence={[
                'Frontend Developer',
                1000,
                'UI/UX Designer',
                1000,
                'React Specialist',
                1000,
                'Web Developer',
                1000
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </div>
          <p className="bio">
            I create beautiful, responsive websites with modern technologies.
            Let's build something amazing together!
          </p>
          <div className="hero-buttons">
            <a href="#contact" className="btn">Hire Me</a>
            <a href="#projects" className="btn btn-outline">View Work</a>
          </div>
        </div>
        <div className="hero-image fade-in delay-1">
          <div className="image-wrapper">
            <img src={sakthiImg} alt="Profile" />
          </div>
        </div>
      </div>
      {/* Add this down arrow div */}
      <div className="down-arrow">
        <span>&#9660;</span>
      </div>
    </section>
  )
}

export default Hero