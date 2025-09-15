import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMail, FiGithub, FiLinkedin } from 'react-icons/fi';
import PropTypes from 'prop-types';
import Profile from '../../assets/Espela.jpg'
import Resume from '/public/Espela,Kenneth_Resume.pdf'
import OptimizedImage from './OptimizedImage'
const roles = [
  'Web Developer',
  'UI/UX Enthusiast',
  'Open to Work',
];

const highlight = {
  initial: { color: '#2563eb', scale: 1 },
  animate: { color: '#3b82f6', scale: 1.08 },
  transition: { repeat: Infinity, repeatType: 'mirror', duration: 1.2, ease: 'easeInOut' }
};

const badgeAnim = {
  animate: {
    scale: [1, 1.08, 1],
    boxShadow: [
      '0 0 0px 0px #f59e42',
      '0 0 16px 6px #f59e42',
      '0 0 0px 0px #f59e42',
    ],
    transition: {
      duration: 2.2,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

const ctaAnim = {
  whileHover: { scale: 1.06, boxShadow: '0 4px 24px 0 #2563eb40' },
  whileTap: { scale: 0.97 },
};

const HeroSection = ({ darkMode }) => {
  const [roleIdx, setRoleIdx] = useState(0);

  // Cycle role every 2.5s
  useState(() => {
    const interval = setInterval(() => setRoleIdx(idx => (idx + 1) % roles.length), 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="flex flex-col-reverse md:flex-row items-center justify-between gap-6 sm:gap-10 pt-16 sm:pt-20 pb-12 sm:pb-16 md:pb-28 relative">
      {/* Left: Text */}
      <motion.div
        initial={{ opacity: 0, x: -60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="flex-1 max-w-2xl z-10 text-center md:text-left"
      >
        <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
          <motion.span
            className="px-3 py-1 rounded-full text-xs font-bold bg-orange-200 text-orange-800 shadow-sm border border-orange-300"
            {...badgeAnim}
            animate="animate"
            style={{ background: 'linear-gradient(90deg, #fef6e4 0%, #f3e8ff 100%)', color: '#d97706' }}
          >
            Available for Hire
          </motion.span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 leading-tight">
          Hi, I'm{' '}
          <motion.span
            variants={highlight}
            initial="initial"
            animate="animate"
            transition={highlight.transition}
            className="inline-block text-blue-600 dark:text-blue-400 drop-shadow-lg"
          >
            Kenneth
          </motion.span>
        </h1>
        <div className="flex items-center justify-center md:justify-start gap-2 mb-3 sm:mb-4 h-8 sm:h-10">
          <AnimatePresence mode="wait">
            <motion.span
              key={roles[roleIdx]}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.5 }}
              className="text-base sm:text-lg md:text-2xl font-semibold text-indigo-500 bg-indigo-100 dark:bg-indigo-900/30 px-3 py-1 rounded-lg shadow-sm"
              aria-label="Current Role"
            >
              {roles[roleIdx]}
            </motion.span>
          </AnimatePresence>
        </div>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className={`mb-6 sm:mb-8 text-base sm:text-lg md:text-xl ${darkMode ? 'text-gray-400' : 'text-gray-600'} font-normal leading-relaxed`}
        >
          Transforming ideas into engaging digital experiences. <span className="font-bold text-blue-400">Let's build something amazing together!</span>
        </motion.p>
        <div className="flex justify-center md:justify-start gap-4 mb-4 sm:mb-6">
          <motion.a
            href="mailto:kenneth.espela@gmail.com"
            aria-label="Email"
            className="hover:text-blue-500 transition-colors text-xl sm:text-2xl"
            whileHover={{ scale: 1.2, color: '#2563eb' }}
            whileTap={{ scale: 0.93 }}
          >
            <FiMail />
          </motion.a>
          <motion.a
            href="https://github.com/alepse"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="hover:text-blue-500 transition-colors text-xl sm:text-2xl"
            whileHover={{ scale: 1.2, color: '#2563eb' }}
            whileTap={{ scale: 0.93 }}
          >
            <FiGithub />
          </motion.a>
          <motion.a
            href="https://www.linkedin.com/in/kenneth-espela-123653180/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="hover:text-blue-500 transition-colors text-xl sm:text-2xl"
            whileHover={{ scale: 1.2, color: '#2563eb' }}
            whileTap={{ scale: 0.93 }}
          >
            <FiLinkedin />
          </motion.a>
        </div>
        <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-3 sm:gap-4">
          <motion.a
            href="mailto:kenneth.espela@gmail.com"
            className="w-full sm:w-auto px-6 py-2 rounded-full bg-blue-400 text-white font-semibold shadow text-sm sm:text-base md:text-lg text-center focus:outline-none focus:ring-2 focus:ring-blue-200 focus:ring-offset-2 hover:bg-blue-500 transition-colors"
            {...ctaAnim}
            style={{ boxShadow: '0 2px 12px #60a5fa22' }}
          >
            Hire Me
          </motion.a>
          <motion.a
            href={Resume}
            download
            className="w-full sm:w-auto px-6 py-2 rounded-full bg-white dark:bg-gray-800 border border-blue-100 text-blue-500 dark:text-blue-300 font-semibold shadow text-sm sm:text-base md:text-lg text-center focus:outline-none focus:ring-2 focus:ring-blue-100 focus:ring-offset-2 hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors"
            {...ctaAnim}
            style={{ boxShadow: '0 2px 12px #c7d2fe22' }}
          >
            Download Resume
          </motion.a>
        </div>
      </motion.div>
      {/* Right: Animated Profile Photo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="flex-1  flex justify-center items-center z-10"
      >
        <motion.div
          whileHover={{ scale: 1.04, rotate: 1, boxShadow: '0 0 32px 0 #c7d2fe, 0 0 0 4px #fff' }}
          whileTap={{ scale: 0.97, rotate: -1 }}
          transition={{ type: 'spring', stiffness: 180, damping: 16 }}
          className="rounded-full shadow overflow-hidden border-4 border-white dark:border-gray-700 bg-gradient-to-tr from-blue-50 via-indigo-50 to-white dark:from-gray-800 dark:via-gray-900 dark:to-gray-800"
          style={{ boxShadow: '0 0 32px 0 #c7d2fe, 0 0 0 4px #fff' }}
        >
          <OptimizedImage
            src={Profile}
            alt="Kenneth Espela profile"
            className="w-48 h-48 sm:w-64 sm:h-64 md:w-[420px] md:h-[420px] object-cover"
            priority={true}
            draggable="false"
          />
        </motion.div>
      </motion.div>
      {/* Clean floating background shapes */}
      <motion.div
        className="absolute -top-16 left-1/4 w-48 sm:w-64 md:w-72 h-48 sm:h-64 md:h-72 bg-blue-100 dark:bg-blue-900/30 rounded-full blur-3xl z-0"
        animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0.7, 0.5] }}
        transition={{ repeat: Infinity, duration: 7, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-36 sm:w-48 md:w-56 h-36 sm:h-48 md:h-56 bg-indigo-100 dark:bg-indigo-900/30 rounded-full blur-2xl z-0"
        animate={{ scale: [1, 1.12, 1], opacity: [0.4, 0.6, 0.4] }}
        transition={{ repeat: Infinity, duration: 9, ease: 'easeInOut' }}
      />
    </section>
  );
};

HeroSection.propTypes = {
  darkMode: PropTypes.bool.isRequired,
};

export default HeroSection;
