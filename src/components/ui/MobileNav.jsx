import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiMenu } from 'react-icons/fi';
import PropTypes from 'prop-types';

const MobileNav = ({ isOpen, onToggle, darkMode, navItems, onNavClick, resumeLink }) => {
  return (
    <div className="md:hidden">
      {/* Mobile Menu Button */}
      <button
        onClick={onToggle}
        className={`p-2 rounded-lg ${
          darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
        } transition-colors duration-200`}
        aria-label="Toggle menu"
      >
        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/50 z-40"
              onClick={onToggle}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className={`fixed right-0 top-0 h-full w-64 ${
                darkMode ? 'bg-gray-900' : 'bg-white'
              } z-50 shadow-xl p-6`}
            >
              <div className="flex justify-end mb-6">
                <button
                  onClick={onToggle}
                  className={`p-2 rounded-lg ${
                    darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
                  } transition-colors duration-200`}
                  aria-label="Close menu"
                >
                  <FiX size={24} />
                </button>
              </div>
              <nav className="flex flex-col gap-4">
                {navItems.map((item) => (
                  <motion.button
                    key={item}
                    onClick={() => {
                      onNavClick(item);
                      onToggle();
                    }}
                    className={`text-left px-4 py-2 rounded-lg capitalize ${
                      darkMode
                        ? 'hover:bg-gray-800 hover:text-blue-400'
                        : 'hover:bg-gray-100 hover:text-blue-600'
                    } transition-colors duration-200`}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {item}
                  </motion.button>
                ))}
                <motion.a
                  href={resumeLink}
                  download
                  className={`mt-4 px-4 py-2 rounded-lg text-center ${
                    darkMode
                      ? 'bg-blue-500 hover:bg-blue-600 text-white'
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  } transition-colors duration-200`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Download Resume
                </motion.a>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

MobileNav.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  darkMode: PropTypes.bool.isRequired,
  navItems: PropTypes.arrayOf(PropTypes.string).isRequired,
  onNavClick: PropTypes.func.isRequired,
  resumeLink: PropTypes.string.isRequired,
};

export default MobileNav; 