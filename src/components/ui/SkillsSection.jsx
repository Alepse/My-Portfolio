import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';

const SkillsSection = ({ skillsData, darkMode, activeCategory }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Filter skills based on active category
  const filteredSkills = skillsData.filter(skill => 
    activeCategory === 'All' || skill.category === activeCategory
  );

  // Determine which skills to show
  const visibleSkills = isExpanded ? filteredSkills : filteredSkills.slice(0, 8);
  const hasMoreSkills = filteredSkills.length > 8;

  const handleToggleExpand = () => {
    const newExpandedState = !isExpanded;
    setIsExpanded(newExpandedState);
    
    // If collapsing (showing less), scroll back to expertise section
    if (!newExpandedState) {
      setTimeout(() => {
        const expertiseSection = document.getElementById('expertise');
        if (expertiseSection) {
          const offset = 80; // Account for fixed navigation
          const targetPosition = expertiseSection.offsetTop - offset;
          window.scrollTo({ 
            top: targetPosition, 
            behavior: 'smooth' 
          });
        }
      }, 100); // Small delay to ensure state update completes
    }
  };

  // Only animate in when expanding; instantly hide when collapsing
  const skillsToRender = isExpanded ? filteredSkills : filteredSkills.slice(0, 8);
  const showAnimation = isExpanded;

  return (
    <div className="space-y-6">
      {/* Skills Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-3 md:gap-6 px-2 md:px-0">
        {showAnimation ? (
          <AnimatePresence mode="wait">
            {skillsToRender.map((skill, index) => (
              <motion.div
                key={skill.name}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                // No exit prop, so skills disappear instantly when collapsed
                transition={{ 
                  duration: 0.3, 
                  delay: index * 0.05,
                  type: 'spring',
                  stiffness: 200,
                  damping: 20
                }}
                className={`${
                  darkMode ? 'bg-gray-800' : 'bg-white'
                } p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300`}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className={`p-3 rounded-lg ${
                    darkMode ? 'bg-gray-700' : 'bg-gray-100'
                  }`}>
                    <img
                      src={skill.icon}
                      alt={`${skill.name} icon`}
                      className="w-8 h-8"
                      style={{ filter: darkMode ? 'invert(1)' : 'invert(0.5)' }}
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{skill.name}</h3>
                    <span className={`text-sm ${
                      darkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      {skill.category}
                    </span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className={`text-sm font-medium ${
                      darkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      Proficiency
                    </span>
                    <span className={`text-sm ${
                      darkMode ? 'text-blue-400' : 'text-blue-600'
                    }`}>
                      {skill.proficiency}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                    <motion.div
                      className={`h-2 rounded-full ${
                        darkMode 
                          ? 'bg-gradient-to-r from-blue-500 to-blue-400' 
                          : 'bg-gradient-to-r from-blue-600 to-blue-500'
                      }`}
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.proficiency}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        ) : (
          skillsToRender.map((skill, index) => (
            <div
              key={skill.name}
              className={`${
                darkMode ? 'bg-gray-800' : 'bg-white'
              } p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300`}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className={`p-3 rounded-lg ${
                  darkMode ? 'bg-gray-700' : 'bg-gray-100'
                }`}>
                  <img
                    src={skill.icon}
                    alt={`${skill.name} icon`}
                    className="w-8 h-8"
                    style={{ filter: darkMode ? 'invert(1)' : 'invert(0.5)' }}
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{skill.name}</h3>
                  <span className={`text-sm ${
                    darkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    {skill.category}
                  </span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className={`text-sm font-medium ${
                    darkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    Proficiency
                  </span>
                  <span className={`text-sm ${
                    darkMode ? 'text-blue-400' : 'text-blue-600'
                  }`}>
                    {skill.proficiency}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                  <div
                    className={`h-2 rounded-full ${
                      darkMode 
                        ? 'bg-gradient-to-r from-blue-500 to-blue-400' 
                        : 'bg-gradient-to-r from-blue-600 to-blue-500'
                    }`}
                    style={{ width: `${skill.proficiency}%`, transition: 'width 1s' }}
                  />
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Show More/Less Button */}
      {hasMoreSkills && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex justify-center"
        >
          <motion.button
            onClick={handleToggleExpand}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
              darkMode 
                ? 'bg-blue-500 hover:bg-blue-600 text-white shadow-lg shadow-blue-500/50' 
                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/50'
            }`}
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={isExpanded ? 'less' : 'more'}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {isExpanded ? 'Show Less' : `Show ${filteredSkills.length - 8} More`}
              </motion.span>
            </AnimatePresence>
          </motion.button>
        </motion.div>
      )}

      {/* Skills Count Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-center"
      >
        <span className={`text-sm ${
          darkMode ? 'text-gray-400' : 'text-gray-600'
        }`}>
          Showing {visibleSkills.length} of {filteredSkills.length} skills
          {activeCategory !== 'All' && ` in ${activeCategory}`}
        </span>
      </motion.div>
    </div>
  );
};

SkillsSection.propTypes = {
  skillsData: PropTypes.array.isRequired,
  darkMode: PropTypes.bool.isRequired,
  activeCategory: PropTypes.string.isRequired,
};

export default SkillsSection;