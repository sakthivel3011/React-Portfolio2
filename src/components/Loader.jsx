import { motion } from 'framer-motion'

const Loader = () => {
  const loadingContainerVariants = {
    start: {
      transition: {
        staggerChildren: 0.2
      }
    },
    end: {
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const loadingCircleVariants = {
    start: {
      y: '0%'
    },
    end: {
      y: '100%'
    }
  }

  const loadingCircleTransition = {
    duration: 0.5,
    yoyo: Infinity,
    ease: 'easeInOut'
  }

  return (
    <div className="loader">
      <motion.div
        className="loading-container"
        variants={loadingContainerVariants}
        initial="start"
        animate="end"
      >
        <motion.span
          className="loading-circle"
          variants={loadingCircleVariants}
          transition={loadingCircleTransition}
        ></motion.span>
        <motion.span
          className="loading-circle"
          variants={loadingCircleVariants}
          transition={loadingCircleTransition}
        ></motion.span>
        <motion.span
          className="loading-circle"
          variants={loadingCircleVariants}
          transition={loadingCircleTransition}
        ></motion.span>
      </motion.div>
      <h2>Loading Portfolio...</h2>
    </div>
  )
}

export default Loader