import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

const SkillsSection = ({ darkMode, skillsData, activeCategory, setActiveCategory }) => {
  const categories = Object.keys(skillsData);
  
  const containerAnimation = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemAnimation = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="space-y-8">
      {/* Category Tabs */}
      <div className="flex justify-center flex-wrap gap-2">
        {categories.map((category) => (
          <motion.button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
              activeCategory === category
                ? darkMode
                  ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/50'
                  : 'bg-blue-600 text-white shadow-lg shadow-blue-600/50'
                : darkMode
                  ? 'bg-gray-800 hover:bg-gray-700 text-gray-300'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {category}
          </motion.button>
        ))}
      </div>

      {/* Skills Grid */}
      <motion.div
        variants={containerAnimation}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {categories.map((category) => (
          <motion.div
            key={category}
            variants={itemAnimation}
            className={`${
              activeCategory !== category ? 'hidden' : ''
            }`}
          >
            <div className={`p-6 rounded-2xl ${
              darkMode ? 'bg-gray-800/50' : 'bg-white'
            } backdrop-blur-sm shadow-lg`}>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <span className={`${
                  darkMode ? 'text-blue-400' : 'text-blue-600'
                }`}>{category}</span>
                <span className={`h-px flex-1 ${
                  darkMode ? 'bg-gray-700' : 'bg-gray-200'
                }`}></span>
              </h3>
              <div className="space-y-4">
                {skillsData[category].map((skill) => (
                  <motion.div
                    key={skill.name}
                    className="group"
                    whileHover={{ y: -2 }}
                  >
                    <div className="flex items-center gap-3 mb-1">
                      <div className={`p-2 rounded-lg ${
                        darkMode ? 'bg-gray-700/50' : 'bg-gray-100'
                      } group-hover:bg-blue-500/10 transition-colors duration-300`}>
                        <img
                          src={skill.icon}
                          alt={`${skill.name} icon`}
                          className="w-5 h-5"
                          style={{ filter: darkMode ? 'invert(1)' : 'invert(0.5)' }}
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-sm">{skill.name}</span>
                          <span className={`text-xs ${
                            darkMode ? 'text-blue-400' : 'text-blue-600'
                          }`}>
                            {skill.proficiency}%
                          </span>
                        </div>
                        <div className="mt-1 h-1.5 w-full bg-gray-200 rounded-full overflow-hidden dark:bg-gray-700">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${skill.proficiency}%` }}
                            transition={{ duration: 1, delay: 0.2 }}
                            className={`h-full rounded-full ${
                              darkMode
                                ? 'bg-gradient-to-r from-blue-500 to-blue-400'
                                : 'bg-gradient-to-r from-blue-600 to-blue-500'
                            }`}
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

SkillsSection.propTypes = {
  darkMode: PropTypes.bool.isRequired,
  skillsData: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    proficiency: PropTypes.number.isRequired,
  }))).isRequired,
  activeCategory: PropTypes.string.isRequired,
  setActiveCategory: PropTypes.func.isRequired,
};

export default SkillsSection; 